import { DashboardSubmitHeader } from "@/components/dashboard/dashboard-submit-header";
import { SubmitStepper } from "@/components/submit/submit-stepper";
import { getServerT } from "@/i18n/server";

export default async function PublishLayout({
  children,
}: { children: React.ReactNode }) {
  const { t } = await getServerT();
  return (
    <div>
      <DashboardSubmitHeader
        title={t("nav.submit")}
        subtitle={t("submit.step3Subtitle")}
        label="3 / 3"
      >
        <SubmitStepper initialStep={3} />
      </DashboardSubmitHeader>

      <div className="mt-8">{children}</div>
    </div>
  );
}
