import { createHash } from "node:crypto";

import { priceConfig } from "@/config/price";

/**
 * 小豆易支付（epay 兼容网关），协议与店里 GATEWAYB 实现一致：
 * 下单 POST /mapi.php（form），签名 MD5：除 sign、sign_type 与空值外全部参数
 * 按 key 排序拼成 k=v，用 & 连接后追加商户密钥再 MD5（小写十六进制）。
 * 查单 GET /api.php?act=order；回调为 GET 通知，验签规则相同，
 * trade_status 须为 TRADE_SUCCESS，成功后网关要求回 "success"。
 *
 * 商户值只从环境变量读，绝不写进代码：
 * 主配置（支付宝走新渠道）：XIAODOU_GATEWAY_URL / XIAODOU_PID / XIAODOU_KEY /
 * XIAODOU_CHANNEL_ID（可选）。微信走老渠道（新渠道微信尚未开通）：
 * XIAODOU_WXPAY_GATEWAY_URL / XIAODOU_WXPAY_PID / XIAODOU_WXPAY_KEY /
 * XIAODOU_WXPAY_CHANNEL_ID（可选）；没配时微信回落主配置。
 *
 * 教训（2026-11-19 ¥0.1 实测）：网关回调可能一次都不来（该单 1 小时日志
 * 零次 notify，回调地址本身是对的）——回调只作快路径，前端必须在进
 * 付款页时就查一次状态、轮询跟收银台 30 分钟有效期对齐，不能只靠回调。
 */

export type XiaodouPayType = "wxpay" | "alipay";

export type XiaodouConfig = {
  gatewayUrl: string;
  pid: string;
  key: string;
  channelId: string;
};

/**
 * 网关地址归一化：卖家中心展示的接口地址带 /submit.php 后缀
 * （如 https://pay.xiaodouap.cn/submit.php），而下单/查单要在域名后
 * 直接拼 /mapi.php 与 /api.php——带后缀拼出来就是死地址
 * /submit.php/mapi.php，网关直接拒掉。去掉它再用。
 */
function normalizeGatewayUrl(raw: string): string {
  return raw
    .trim()
    .replace(/\/$/, "")
    .replace(/\/submit\.php$/i, "");
}

/** 按支付方式取商户配置：微信优先老渠道三值（配了才用），其余走主配置。 */
export function getXiaodouConfig(
  payType: XiaodouPayType = "alipay",
): XiaodouConfig | null {
  if (payType === "wxpay") {
    const gatewayUrl = normalizeGatewayUrl(
      process.env.XIAODOU_WXPAY_GATEWAY_URL ?? "",
    );
    const pid = (process.env.XIAODOU_WXPAY_PID ?? "").trim();
    const key = (process.env.XIAODOU_WXPAY_KEY ?? "").trim();
    if (gatewayUrl && pid && key) {
      return {
        gatewayUrl,
        pid,
        key,
        channelId: (process.env.XIAODOU_WXPAY_CHANNEL_ID ?? "").trim(),
      };
    }
  }
  const gatewayUrl = normalizeGatewayUrl(
    process.env.XIAODOU_GATEWAY_URL ?? "",
  );
  const pid = (process.env.XIAODOU_PID ?? "").trim();
  const key = (process.env.XIAODOU_KEY ?? "").trim();
  if (!gatewayUrl || !pid || !key) {
    return null;
  }
  return {
    gatewayUrl,
    pid,
    key,
    channelId: (process.env.XIAODOU_CHANNEL_ID ?? "").trim(),
  };
}

export function planAmountCents(plan: string): number | null {
  const found = priceConfig.plans.find(
    (p) => p.title.toLowerCase() === plan.toLowerCase(),
  );
  if (!found) {
    return null;
  }
  return Math.round(found.price * 100);
}

/** 分转元文本，如 6800 -> "68.00"，与店里 AmountText 一致。 */
export function amountText(cents: number): string {
  return `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, "0")}`;
}

/** 订单引用：userId:itemId:plan，回调里用它找回用户、条目与套餐。 */
export function xiaodouOrderRef(
  userId: string,
  itemId: string,
  plan: string,
): string {
  return `${userId}:${itemId}:${plan.toLowerCase()}`;
}

/** 网关订单号限 32 字符：取引用 sha256 的前 32 位十六进制。 */
export function xiaodouOutTradeNo(ref: string): string {
  return createHash("sha256").update(ref).digest("hex").slice(0, 32);
}

function canonical(params: Record<string, string>): string {
  return Object.keys(params)
    .filter((k) => params[k] !== "" && k !== "sign" && k !== "sign_type")
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
}

export function xiaodouSign(params: Record<string, string>, key: string): string {
  return createHash("md5").update(canonical(params) + key).digest("hex");
}

async function callGateway(
  config: XiaodouConfig,
  path: string,
  params: Record<string, string>,
  method: "GET" | "POST",
): Promise<Record<string, string>> {
  const body = new URLSearchParams(params);
  const url =
    method === "GET"
      ? `${config.gatewayUrl}${path}?${body.toString()}`
      : `${config.gatewayUrl}${path}`;
  const res = await fetch(url, {
    method,
    headers:
      method === "POST"
        ? { "Content-Type": "application/x-www-form-urlencoded" }
        : undefined,
    body: method === "POST" ? body.toString() : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`xiaodou request failed: ${res.status}`);
  }
  const data = (await res.json()) as Record<string, unknown>;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(data)) {
    if (typeof v === "string") {
      out[k] = v;
    } else if (typeof v === "number") {
      out[k] = String(v);
    } else if (v === null) {
      out[k] = "";
    }
  }
  if (out.code !== "1") {
    // 把网关原话带进报错，否则只剩一句 rejected，查原因得再跑一轮。
    throw new Error(
      `xiaodou request rejected${out.msg ? `: ${out.msg}` : ""}`,
    );
  }
  return out;
}

export async function xiaodouQuery(
  config: XiaodouConfig,
  outTradeNo: string,
): Promise<{ status: "pending" | "paid"; tradeNo: string; money: string }> {
  const out = await callGateway(
    config,
    "/api.php",
    {
      act: "order",
      pid: config.pid,
      key: config.key,
      out_trade_no: outTradeNo,
    },
    "GET",
  );
  if (out.status === "1") {
    return { status: "paid", tradeNo: out.trade_no ?? "", money: out.money ?? "" };
  }
  if (out.status === "0") {
    return { status: "pending", tradeNo: out.trade_no ?? "", money: out.money ?? "" };
  }
  throw new Error("xiaodou order status unknown");
}

export async function xiaodouCreate(
  config: XiaodouConfig,
  opts: {
    ref: string;
    payType: XiaodouPayType;
    name: string;
    amountCents: number;
    clientIp: string;
    notifyUrl: string;
    returnUrl?: string;
  },
): Promise<{ qrcode: string; tradeNo: string; outTradeNo: string }> {
  const outTradeNo = xiaodouOutTradeNo(opts.ref);
  const params: Record<string, string> = {
    pid: config.pid,
    type: opts.payType,
    out_trade_no: outTradeNo,
    notify_url: opts.notifyUrl,
    name: opts.name.slice(0, 100),
    money: amountText(opts.amountCents),
    clientip: opts.clientIp,
    param: opts.ref,
    sign_type: "MD5",
  };
  if (opts.returnUrl) {
    // 付完收银台把用户浏览器带回付款页，进页时的状态检查会接住这笔。
    params.return_url = opts.returnUrl;
  }
  if (config.channelId) {
    params.cid = config.channelId;
  }
  params.sign = xiaodouSign(params, config.key);
  const out = await callGateway(config, "/mapi.php", params, "POST");
  const tradeNo = out.trade_no ?? "";
  if (!tradeNo) {
    throw new Error("xiaodou trade_no missing");
  }
  // 下单后立即查单核对，防止拿到伪造或错单的付款码。
  const verified = await xiaodouQuery(config, outTradeNo);
  if (verified.tradeNo !== "" && verified.tradeNo !== tradeNo) {
    throw new Error("xiaodou trade not verified");
  }
  const qrcode = out.qrcode || out.payurl || "";
  if (!qrcode) {
    throw new Error("xiaodou qrcode missing");
  }
  return { qrcode, tradeNo, outTradeNo };
}

/** 验回调：签名、状态、商户、类型、订单号与引用一致才认。 */
export function xiaodouVerifyNotify(
  config: XiaodouConfig,
  params: Record<string, string>,
): { ref: string; money: string } | null {
  if (params.sign_type !== "MD5") {
    return null;
  }
  if (params.trade_status !== "TRADE_SUCCESS") {
    return null;
  }
  if (params.pid !== config.pid) {
    return null;
  }
  if (params.type !== "wxpay" && params.type !== "alipay") {
    return null;
  }
  const sign = params.sign ?? "";
  if (!sign || xiaodouSign(params, config.key) !== sign) {
    return null;
  }
  const ref = params.param ?? "";
  if (!ref || params.out_trade_no !== xiaodouOutTradeNo(ref)) {
    return null;
  }
  return { ref, money: params.money ?? "" };
}
