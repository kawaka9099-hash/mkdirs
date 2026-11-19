"use server";

import { getItemById } from "@/data/item";
import { currentUser } from "@/lib/auth";
import { getServerT } from "@/i18n/server";
import { sanityClient } from "@/sanity/lib/client";

export type ServerActionResponse = {
  status: "success" | "error";
  message?: string;
};

export async function unpublish(itemId: string): Promise<ServerActionResponse> {
  console.log("unpublish, itemId:", itemId);
  const { t } = await getServerT();
  try {
    const user = await currentUser();
    if (!user) {
      return { status: "error", message: t("toast.unauthorized") };
    }
    // console.log("publish, user:", user);

    const item = await getItemById(itemId);
    if (!item) {
      return { status: "error", message: t("toast.itemNotFound") };
    }
    if (item.submitter._ref !== user.id) {
      return { status: "error", message: t("toast.notAllowed") };
    }

    const result = await sanityClient
      .patch(itemId)
      .set({
        publishDate: null,
      })
      .commit();
    // console.log('unpublish, result:', result);

    if (!result) {
      return { status: "error", message: t("toast.unpublishFailed") };
    }

    return { status: "success", message: t("toast.unpublishSuccess") };
  } catch (error) {
    console.log("unpublish, error", error);
    return { status: "error", message: t("toast.unpublishFailed") };
  }
}
