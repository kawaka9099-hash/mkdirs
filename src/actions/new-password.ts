"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { getServerT } from "@/i18n/server";
import { NewPasswordSchema } from "@/lib/schemas";
import { sanityClient } from "@/sanity/lib/client";
import bcrypt from "bcryptjs";
import type * as z from "zod";

export type ServerActionResponse = {
  status: "success" | "error";
  message?: string;
};

export async function newPassword(
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
): Promise<ServerActionResponse> {
  const { t } = await getServerT();
  // console.log('newPassword, token:', token);
  if (!token) {
    return { status: "error", message: t("toast.missingToken") };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { status: "error", message: t("toast.invalidFields") };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { status: "error", message: t("toast.invalidToken") };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { status: "error", message: t("toast.tokenExpired") };
  }

  const existingUser = await getUserByEmail(existingToken.identifier);
  if (!existingUser) {
    return { status: "error", message: t("toast.emailNotExist") };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await sanityClient
    .patch(existingUser._id)
    .set({
      password: hashedPassword,
    })
    .commit();

  await sanityClient.delete(existingToken._id);
  return { status: "success", message: t("toast.passwordChanged") };
}
