import Container from "@/components/container";
import { SearchFilter } from "@/components/search/search-filter";
import { getServerT } from "@/i18n/server";
import { HeaderSection } from "@/components/shared/header-section";

export default async function SearchLayout({
  children,
}: { children: React.ReactNode }) {
  const { t } = await getServerT();
  return (
    <div className="mb-16">
      <div className="mt-8">
        <div className="w-full flex flex-col items-center justify-center gap-8">
          <HeaderSection
            labelAs="h1"
            label={t("nav.search")}
            titleAs="h2"
            title={t("search.title")}
          />

          <div className="w-full">
            <SearchFilter urlPrefix="/search" />
          </div>
        </div>
      </div>

      <Container className="mt-8">{children}</Container>
    </div>
  );
}
