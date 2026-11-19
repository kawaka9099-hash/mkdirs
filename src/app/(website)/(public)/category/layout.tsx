import { CategoryFilter } from "@/components/category/category-filter";
import Container from "@/components/container";
import { HeaderSection } from "@/components/shared/header-section";
import { getServerT } from "@/i18n/server";

export default async function CategoryLayout({
  children,
}: { children: React.ReactNode }) {
  const { t } = await getServerT();
  return (
    <div className="mb-16">
      <div className="mt-8">
        <div className="w-full flex flex-col items-center justify-center gap-8">
          <HeaderSection
            labelAs="h1"
            label={t("misc.category")}
            titleAs="h2"
            title={t("misc.exploreCategories")}
          />

          <div className="w-full">
            <CategoryFilter />
          </div>
        </div>
      </div>

      <Container className="mt-4">{children}</Container>
    </div>
  );
}
