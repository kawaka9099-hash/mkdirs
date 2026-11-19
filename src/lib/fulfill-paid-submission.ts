import { getOrderByUserIdAndItemId } from "@/data/order";
import { getUserById } from "@/data/user";
import { sendPaymentSuccessEmail } from "@/lib/mail";
import { PricePlans, ProPlanStatus, SponsorPlanStatus } from "@/lib/submission";
import { getItemLinkInWebsite } from "@/lib/utils";
import { sanityClient } from "@/sanity/lib/client";

/**
 * 付费成功后的统一履约：幂等（同一用户+条目已有成功订单直接返回），
 * 建 order、把条目标记已付费/精选、发付款成功邮件。
 * 与 Stripe webhook 的履约步骤一致，供小豆回调与查单轮询共用。
 */
export async function fulfillPaidSubmission({
  userId,
  itemId,
  pricePlan,
}: {
  userId: string;
  itemId: string;
  pricePlan: string;
}): Promise<{ already: boolean }> {
  const existing = await getOrderByUserIdAndItemId(userId, itemId);
  if (existing) {
    return { already: true };
  }

  const user = await getUserById(userId);
  if (!user) {
    throw new Error("user not found");
  }

  const order = await sanityClient.create({
    _type: "order",
    user: {
      _type: "reference",
      _ref: user._id,
    },
    item: {
      _type: "reference",
      _ref: itemId,
    },
    status: "success",
    date: new Date().toISOString(),
  });
  if (!order) {
    throw new Error("create order failed");
  }

  const res = await sanityClient
    .patch(itemId)
    .set({
      paid: true,
      featured: true,
      pricePlan: pricePlan, // pro or sponsor
      sponsor: pricePlan === PricePlans.SPONSOR,
      proPlanStatus:
        pricePlan === PricePlans.PRO
          ? ProPlanStatus.SUCCESS
          : ProPlanStatus.SUBMITTING,
      sponsorPlanStatus:
        pricePlan === PricePlans.SPONSOR
          ? SponsorPlanStatus.SUCCESS
          : SponsorPlanStatus.SUBMITTING,
      order: {
        _type: "reference",
        _ref: order._id,
      },
    })
    .commit();
  if (!res) {
    throw new Error("update item failed");
  }

  const itemLink = getItemLinkInWebsite(res.slug.current);
  await sendPaymentSuccessEmail(user.name, user.email, itemLink);
  return { already: false };
}
