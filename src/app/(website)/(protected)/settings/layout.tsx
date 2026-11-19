import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getServerT } from "@/i18n/server";

export default async function SettingsLayout({
  children,
}: { children: React.ReactNode }) {
  const { t } = await getServerT();
  return (
    <div>
      <DashboardHeader
        title={t("dashboard.settingsTitle")}
        subtitle={t("dashboard.settingsSubtitle")}
      />

      <div className="mt-8">{children}</div>
    </div>
  );
}
