import { AuthCard } from "@/components/auth/auth-card";
import { getServerT } from "@/i18n/server";
import { TriangleAlertIcon } from "lucide-react";

export const ErrorCard = async () => {
  const { t } = await getServerT();
  return (
    <AuthCard
      headerLabel={t("misc.oops")}
      bottomButtonHref="/auth/login"
      bottomButtonLabel={t("misc.backLogin")}
      className="border-none"
    >
      <div className="w-full flex justify-center items-center py-4 gap-2">
        <TriangleAlertIcon className="text-destructive size-4" />
        <p className="font-medium text-destructive">{t("misc.tryAgain")}</p>
      </div>
    </AuthCard>
  );
};
