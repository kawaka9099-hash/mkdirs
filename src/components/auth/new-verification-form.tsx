"use client";

import { newVerification } from "@/actions/new-verification";
import { AuthCard } from "@/components/auth/auth-card";
import { Icons } from "@/components/icons/icons";
import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import { useLanguage } from "@/i18n/language-provider";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const NewVerificationForm = () => {
  const { t } = useLanguage();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError(t("misc.missingToken"));
      return;
    }

    newVerification(token)
      .then((data) => {
        if (data.status === "success") {
          setSuccess(data.message);
          console.log("newVerification, success:", data.message);
        }
        if (data.status === "error") {
          setError(data.message);
          console.log("newVerification, error:", data.message);
        }
      })
      .catch(() => {
        setError(t("auth.somethingWrong"));
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <AuthCard
      headerLabel={t("misc.confirmingVerification")}
      bottomButtonLabel={t("misc.backLogin")}
      bottomButtonHref="/auth/login"
      className="border-none"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && (
          <Icons.spinner className="w-4 h-4 animate-spin" />
        )}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </AuthCard>
  );
};
