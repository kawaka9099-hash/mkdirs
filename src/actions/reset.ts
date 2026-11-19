"use server";

import { getUserByEmail } from "@/data/user";
import { getServerT } from "@/i18n/server";
import { sendPasswordResetEmail } from "@/lib/mail";
import { ResetSchema } from "@/lib/schemas";
import { generatePasswordResetToken } from "@/lib/tokens";
import type * as z from "zod";

export type ServerActionResponse = {
  status: "success" | "error";
  message?: string;
};

export async function reset(
  values: z.infer<typeof ResetSchema>,
): Promise<ServerActionResponse> {
  const { t } = await getServerT();
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { status: "error", message: t("toast.invalidEmail") };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { status: "error", message: t("toast.emailNotFound") };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    existingUser.name,
    passwordResetToken.identifier,
    passwordResetToken.token,
  );

  return { status: "success", message: t("toast.resetEmailSent") };
}
