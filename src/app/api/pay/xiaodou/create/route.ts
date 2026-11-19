export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { currentUser } from "@/lib/auth";
import { absoluteUrl } from "@/lib/utils";
import { PricePlans, ProPlanStatus, SponsorPlanStatus } from "@/lib/submission";
import { sanityFetch } from "@/sanity/lib/fetch";
import { itemByIdQuery } from "@/sanity/lib/queries";
import type { ItemInfo } from "@/types";
import {
  getXiaodouConfig,
  planAmountCents,
  xiaodouCreate,
  xiaodouOrderRef,
  type XiaodouPayType,
} from "@/lib/xiaodou";

/** 小豆下单：校验登录与条目归属，调网关拿付款码（qrcode）返回前端展示。 */
export async function POST(req: Request) {
  const user = await currentUser();
  if (!user?.id || !user.email) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as {
    itemId?: string;
    plan?: string;
    type?: string;
  } | null;
  const itemId = body?.itemId ?? "";
  const plan = (body?.plan ?? "").toLowerCase();
  const payType: XiaodouPayType =
    body?.type === "alipay" ? "alipay" : "wxpay";
  if (
    !itemId ||
    (plan !== PricePlans.PRO && plan !== PricePlans.SPONSOR)
  ) {
    return NextResponse.json({ error: "参数错误" }, { status: 400 });
  }

  const config = getXiaodouConfig(payType);
  if (!config) {
    return NextResponse.json({ error: "支付未配置，请联系站长" }, { status: 503 });
  }

  const item = await sanityFetch<ItemInfo>({
    query: itemByIdQuery,
    params: { id: itemId },
    disableCache: true,
  });
  if (!item || item.submitter._id !== user.id) {
    return NextResponse.json({ error: "无权操作该条目" }, { status: 403 });
  }

  const alreadyPaid =
    plan === PricePlans.PRO
      ? item.proPlanStatus === ProPlanStatus.SUCCESS
      : item.sponsorPlanStatus === SponsorPlanStatus.SUCCESS;
  if (alreadyPaid) {
    return NextResponse.json({ alreadyPaid: true });
  }

  const amountCents = planAmountCents(plan);
  if (amountCents === null) {
    return NextResponse.json({ error: "套餐价格未配置" }, { status: 500 });
  }

  const forwarded = headers().get("x-forwarded-for");
  const clientIp =
    forwarded?.split(",")[0]?.trim() ||
    headers().get("x-real-ip") ||
    "127.0.0.1";
  const ref = xiaodouOrderRef(user.id, itemId, plan);
  const name = `CN OPC ${plan === PricePlans.PRO ? "Pro" : "赞助"} - ${item.name}`;

  try {
    const result = await xiaodouCreate(config, {
      ref,
      payType,
      name,
      amountCents,
      clientIp,
      notifyUrl: absoluteUrl("/api/pay/xiaodou/notify"),
      returnUrl: absoluteUrl(`/payment/${itemId}`),
    });
    return NextResponse.json({
      qrcode: result.qrcode,
      tradeNo: result.tradeNo,
      outTradeNo: result.outTradeNo,
    });
  } catch (error) {
    console.error("xiaodou create failed:", error);
    return NextResponse.json(
      { error: "创建支付订单失败，请稍后再试" },
      { status: 502 },
    );
  }
}
