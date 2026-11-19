import Container from "@/components/container";
import { HeaderSection } from "@/components/shared/header-section";
import { getServerT } from "@/i18n/server";
import { TagFilter } from "@/components/tag/tag-filter";

export default async function TagLayout({ children }: { children: React.ReactNode }) {
  const { t } = await getServerT();
  return (
    <div className="mb-16">
      <div className="mt-8">
        <div className="w-full flex flex-col items-center justify-center gap-8">
          <HeaderSection
            labelAs="h1"
            label={t("submit.tags")}
            titleAs="h2"
            title={t("misc.exploreTags")}
          />

          <div className="w-full">
            <TagFilter />
          </div>
        </div>
      </div>

      <Container className="mt-4">{children}</Container>
    </div>
  );
}
