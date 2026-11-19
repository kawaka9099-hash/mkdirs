"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { getServerT } from "@/i18n/server";
import type { UserPasswordData } from "@/lib/schemas";
import { sanityClient } from "@/sanity/lib/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export type ServerActionResponse = {
  status: "success" | "error";
  message?: string;
};

export async function updateUserPassword(
  values: UserPasswordData,
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

    // password change needs verification
    if (values.password && values.newPassword && dbUser.password) {
      const passwordsMatch = await bcrypt.compare(
        values.password,
        dbUser.password,
      );

      if (!passwordsMatch) {
        return { status: "error", message: t("toast.incorrectPassword") };
      }

      const hashedPassword = await bcrypt.hash(values.newPassword, 10);
      const updatedUser = await sanityClient
        .patch(dbUser._id)
        .set({
          password: hashedPassword,
        })
        .commit();
      console.log("updateUserPassword, user:", updatedUser);

      revalidatePath("/settings");
      return { status: "success", message: t("toast.passwordChanged") };
    }
    return { status: "error", message: t("toast.noPassword") };
  } catch (error) {
    console.log("updateUserPassword, error", error);
    return {
      status: "error",
      message: t("toast.passwordChangeFailed"),
    };
  }
}
