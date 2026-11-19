"use server";

import { getUserByEmail } from "@/data/user";
import { getServerT } from "@/i18n/server";
import { sendVerificationEmail } from "@/lib/mail";
import { RegisterSchema } from "@/lib/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import { sanityClient } from "@/sanity/lib/client";
import { UserRole } from "@/types/user-role";
import { uuid } from "@sanity/uuid";
import bcrypt from "bcryptjs";
import type * as z from "zod";

export type ServerActionResponse = {
  status: "success" | "error";
  message?: string;
};

export async function register(
  values: z.infer<typeof RegisterSchema>,
): Promise<ServerActionResponse> {
  const { t } = await getServerT();
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { status: "error", message: t("toast.invalidFields") };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { status: "error", message: t("toast.emailInUse") };
  }

  await sanityClient.create({
    _type: "user",
    _id: `user.${uuid()}`,
    name,
    email,
    role: UserRole.USER,
    password: hashedPassword,
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.identifier,
    verificationToken.token,
  );
  return {
    status: "success",
    message: t("toast.checkEmailVerification"),
  };
}
