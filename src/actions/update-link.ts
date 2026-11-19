"use server";

import { unstable_update } from "@/auth";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { getServerT } from "@/i18n/server";
import { type UserLinkData, UserLinkSchema } from "@/lib/schemas";
import { sanityClient } from "@/sanity/lib/client";
import { revalidatePath } from "next/cache";

export type ServerActionResponse = {
  status: "success" | "error";
  message?: string;
};

export async function updateUserLink(
  values: UserLinkData,
): Promise<ServerActionResponse> {
  const { t } = await getServerT();
  try {
    const user = await currentUser();
    if (!user) {
      return { status: "error", message: t("toast.unauthorized") };
    }

    const dbUser = await getUserById(user.id);
    if (!dbUser) {
      return { status: "error", message: t("toast.userNotFound") };
    }

    // console.log('updateUserLink, values:', values);
    const { link } = UserLinkSchema.parse(values);

    const updatedUser = await sanityClient
      .patch(dbUser._id)
      .set({
        link: link,
      })
      .commit();
    // console.log("updateUserLink, user:", updatedUser);

    // unstable update in Beta version
    unstable_update({
      user: {
        link: updatedUser.link,
      },
    });

    revalidatePath("/settings");
    return { status: "success", message: t("toast.linkUpdated") };
  } catch (error) {
    console.log("updateUserLink, error", error);
    return {
      status: "error",
      message: t("toast.linkUpdateFailed"),
    };
  }
}
