"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { getServerT } from "@/i18n/server";
import { sendVerificationEmail } from "@/lib/mail";
import { LoginSchema } from "@/lib/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import type * as z from "zod";

export type ServerActionResponse = {
  status: "success" | "error";
  message?: string;
  redirectUrl?: string;
};

export async function login(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
): Promise<ServerActionResponse> {
  const { t } = await getServerT();
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { status: "error", message: t("toast.invalidFields") };
  }

  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { status: "error", message: t("toast.userNotExist") };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    await sendVerificationEmail(
      verificationToken.identifier,
      verificationToken.token,
    );
    return {
      status: "success",
      message: t("toast.checkEmailVerification"),
    };
  }

  try {
    console.log("login, start signIn");
    // https://youtu.be/1MTyCvS05V4?t=9828
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return {
      status: "success",
      message: t("toast.loginSuccess"),
      redirectUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    };
  } catch (error) {
    // console.error("login, error:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", message: t("toast.invalidCredentials") };
        default:
          return { status: "error", message: t("toast.somethingWrong") };
      }
    }
    return { status: "error", message: t("toast.somethingWrong") };
  }
}
