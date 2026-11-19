"use server";

import { getServerT } from "@/i18n/server";
import { resend } from "@/lib/mail";
import { type NewsletterFormData, NewsletterFormSchema } from "@/lib/schemas";

export type ServerActionResponse = {
  status: "success" | "error";
  message?: string;
};

export async function unsubscribeToNewsletter(
  formdata: NewsletterFormData,
): Promise<ServerActionResponse> {
  const { t } = await getServerT();
  try {
    const validatedInput = NewsletterFormSchema.safeParse(formdata);
    if (!validatedInput.success) {
      return { status: "error", message: t("toast.invalidInput") };
    }

    const unsubscribedResult = await resend.contacts.remove({
      email: validatedInput.data.email,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });
    console.log(
      "unsubscribeToNewsletter, unsubscribedResult",
      unsubscribedResult,
    );
    const unsubscribed = !unsubscribedResult.error;
    if (unsubscribed) {
      return {
        status: "success",
        message: t("toast.unsubscribedOk"),
      };
    }

    return {
      status: "error",
      message: t("toast.unsubscribeFailed"),
    };
  } catch (error) {
    console.error("unsubscribeToNewsletter, error", error);
    return {
      status: "error",
      message: t("toast.unsubscribeFailed"),
    };
  }
}
