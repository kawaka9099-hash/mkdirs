import { DashboardButton } from "@/components/dashboard/dashboard-button";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { getServerT } from "@/i18n/server";
import { UploadIcon } from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  const { t } = await getServerT();
  return (
    <div>
      <DashboardHeader title={t("dashboard.title")} subtitle={t("dashboard.subtitle")}>
        <div className="flex items-center space-x-4">
          <DashboardButton />

          <Button asChild disabled className="group whitespace-nowrap">
            <Link
              href="/submit"
              prefetch={false}
              className="flex items-center justify-center space-x-2"
            >
              <UploadIcon className="w-4 h-4" />
              <span>{t("nav.submit")}</span>
            </Link>
          </Button>
        </div>
      </DashboardHeader>

      <div className="mt-8">{children}</div>
    </div>
  );
}
