"use server";

import { getItemById } from "@/data/item";
import { currentUser } from "@/lib/auth";
import { getServerT } from "@/i18n/server";
import { sanityClient } from "@/sanity/lib/client";

export type ServerActionResponse = {
  status: "success" | "error";
  message?: string;
};

export async function publish(itemId: string): Promise<ServerActionResponse> {
  console.log("publish, itemId:", itemId);
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
        publishDate: new Date().toISOString(),
      })
      .commit();
    // console.log('publish, result:', result);

    if (!result) {
      return { status: "error", message: t("toast.publishFailed") };
    }
    return { status: "success", message: t("toast.publishSuccess") };
  } catch (error) {
    console.log("publish, error", error);
    return { status: "error", message: t("toast.publishFailed") };
  }
}
