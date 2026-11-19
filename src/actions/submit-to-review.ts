"use server";

import { getItemById } from "@/data/item";
import { currentUser } from "@/lib/auth";
import { getServerT } from "@/i18n/server";
import { sendNotifySubmissionEmail } from "@/lib/mail";
import { FreePlanStatus, PricePlans } from "@/lib/submission";
import { getItemLinkInStudio, getItemStatusLinkInWebsite } from "@/lib/utils";
import { sanityClient } from "@/sanity/lib/client";

export type ServerActionResponse = {
  status: "success" | "error";
  message?: string;
};

export const submitToReview = async (
  itemId: string,
): Promise<ServerActionResponse> => {
  console.log("submitToReview, itemId:", itemId);
  const { t } = await getServerT();
  try {
    const user = await currentUser();
    if (!user) {
      return { status: "error", message: t("toast.unauthorized") };
    }
    // console.log("submitToReview, user:", user);

    const item = await getItemById(itemId);
    if (!item) {
      return { status: "error", message: t("toast.itemNotFound") };
    }
    if (item.submitter._ref !== user.id) {
      return { status: "error", message: t("toast.notAllowed") };
    }
    if (
      item.pricePlan !== PricePlans.FREE ||
      item.freePlanStatus !== FreePlanStatus.SUBMITTING
    ) {
      return { status: "error", message: t("toast.wrongPlanStatus") };
    }

    const result = await sanityClient
      .patch(itemId)
      .set({
        pricePlan: PricePlans.FREE,
        freePlanStatus: FreePlanStatus.PENDING,
      })
      .commit();
    // console.log('submitToReview, result:', result);
    if (!result) {
      return { status: "error", message: t("toast.reviewFailed") };
    }

    const statusLink = getItemStatusLinkInWebsite(itemId);
    const reviewLink = getItemLinkInStudio(itemId);
    sendNotifySubmissionEmail(
      user.name,
      user.email,
      result.name,
      statusLink,
      reviewLink,
    );

    return { status: "success", message: t("toast.reviewSuccess") };
  } catch (error) {
    console.log("submitToReview, error", error);
    return { status: "error", message: t("toast.reviewFailed") };
  }
};
