import { DashboardSubmitHeader } from "@/components/dashboard/dashboard-submit-header";
import { SubmitStepper } from "@/components/submit/submit-stepper";
import { getServerT } from "@/i18n/server";

export default async function PlanLayout({
  children,
}: { children: React.ReactNode }) {
  const { t } = await getServerT();
  return (
    <div>
      <DashboardSubmitHeader
        title={t("nav.submit")}
        subtitle={t("submit.step2Subtitle")}
        label="2 / 3"
      >
        <SubmitStepper initialStep={2} />
      </DashboardSubmitHeader>

      <div className="mt-8">{children}</div>
    </div>
  );
}
