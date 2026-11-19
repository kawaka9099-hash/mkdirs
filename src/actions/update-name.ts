"use server";

import { unstable_update } from "@/auth";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { getServerT } from "@/i18n/server";
import { type UserNameData, UserNameSchema } from "@/lib/schemas";
import { sanityClient } from "@/sanity/lib/client";
import { revalidatePath } from "next/cache";

export type ServerActionResponse = {
  status: "success" | "error";
  message?: string;
};

export async function updateUserName(
  values: UserNameData,
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

    // console.log('updateUserName, values:', values);
    const { name } = UserNameSchema.parse(values);

    const updatedUser = await sanityClient
      .patch(dbUser._id)
      .set({
        name: name,
      })
      .commit();
    // console.log("updateUserName, user:", updatedUser);

    // unstable update in Beta version
    unstable_update({
      user: {
        name: updatedUser.name,
      },
    });

    revalidatePath("/settings");
    return { status: "success", message: t("toast.nameUpdated") };
  } catch (error) {
    console.log("updateUserName, error", error);
    return {
      status: "error",
      message: t("toast.nameUpdateFailed"),
    };
  }
}
