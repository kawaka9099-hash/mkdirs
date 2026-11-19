export const runtime = "nodejs";

import { fulfillPaidSubmission } from "@/lib/fulfill-paid-submission";
import { PricePlans } from "@/lib/submission";
import {
  getXiaodouConfig,
  planAmountCents,
  xiaodouVerifyNotify,
  type XiaodouPayType,
} from "@/lib/xiaodou";

/**
 * 小豆支付成功回调（网关 GET 通知）：验签、验金额后履约，
 * 成功必须回纯文本 "success"，否则网关会重试。
 * 回调带 type 参数，按它取对应渠道的商户配置验签。
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const params: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const payType: XiaodouPayType =
    params.type === "wxpay" ? "wxpay" : "alipay";
  const config = getXiaodouConfig(payType);
  if (!config) {
    return new Response("not configured", { status: 503 });
  }

  const verified = xiaodouVerifyNotify(config, params);
  if (!verified) {
    return new Response("invalid signature", { status: 400 });
  }

  const [userId, itemId, plan] = verified.ref.split(":");
  if (
    !userId ||
    !itemId ||
    (plan !== PricePlans.PRO && plan !== PricePlans.SPONSOR)
  ) {
    return new Response("invalid ref", { status: 400 });
  }

  const amountCents = planAmountCents(plan);
  const paidCents = Math.round(Number(verified.money) * 100);
  if (amountCents === null || paidCents !== amountCents) {
    return new Response("amount mismatch", { status: 400 });
  }

  try {
    await fulfillPaidSubmission({ userId, itemId, pricePlan: plan });
  } catch (error) {
    console.error("xiaodou notify fulfill failed:", error);
    return new Response("fulfill failed", { status: 500 });
  }
  return new Response("success", { status: 200 });
}
