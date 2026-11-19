export const runtime = "nodejs";

import { NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import { fulfillPaidSubmission } from "@/lib/fulfill-paid-submission";
import { PricePlans, ProPlanStatus, SponsorPlanStatus } from "@/lib/submission";
import { sanityFetch } from "@/sanity/lib/fetch";
import { itemByIdQuery } from "@/sanity/lib/queries";
import type { ItemInfo } from "@/types";
import {
  getXiaodouConfig,
  planAmountCents,
  xiaodouOrderRef,
  xiaodouOutTradeNo,
  xiaodouQuery,
} from "@/lib/xiaodou";

/**
 * 前端轮询：查网关订单状态。已付时直接履约（回调万一没到也能推进），
 * 再返回 paid，兜底回调延迟或丢失。
 */
export async function GET(req: Request) {
  const user = await currentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  const config = getXiaodouConfig();
  if (!config) {
    return NextResponse.json({ error: "支付未配置" }, { status: 503 });
  }

  const url = new URL(req.url);
  const itemId = url.searchParams.get("itemId") ?? "";
  const plan = (url.searchParams.get("plan") ?? "").toLowerCase();
  if (
    !itemId ||
    (plan !== PricePlans.PRO && plan !== PricePlans.SPONSOR)
  ) {
    return NextResponse.json({ error: "参数错误" }, { status: 400 });
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
    return NextResponse.json({ paid: true });
  }

  const ref = xiaodouOrderRef(user.id, itemId, plan);
  try {
    const result = await xiaodouQuery(config, xiaodouOutTradeNo(ref));
    if (result.status !== "paid") {
      return NextResponse.json({ paid: false });
    }
    const amountCents = planAmountCents(plan);
    const paidCents = Math.round(Number(result.money) * 100);
    if (amountCents === null || paidCents !== amountCents) {
      return NextResponse.json({ paid: false, error: "金额不一致" });
    }
    await fulfillPaidSubmission({ userId: user.id, itemId, pricePlan: plan });
    return NextResponse.json({ paid: true });
  } catch (error) {
    console.error("xiaodou status failed:", error);
    return NextResponse.json({ paid: false });
  }
}
