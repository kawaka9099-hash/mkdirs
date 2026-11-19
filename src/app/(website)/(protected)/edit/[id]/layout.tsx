import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getServerT } from "@/i18n/server";

export default async function EditLayout({
  children,
}: { children: React.ReactNode }) {
  const { t } = await getServerT();
  return (
    <div>
      <DashboardHeader
        title={t("dashboard.editTitle")}
        subtitle={t("dashboard.editSubtitle")}
        showBackButton={true}
      />

      <div className="mt-8">{children}</div>
    </div>
  );
}
