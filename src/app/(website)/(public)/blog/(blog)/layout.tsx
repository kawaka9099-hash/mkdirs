import { BlogCategoryFilter } from "@/components/blog/blog-category-filter";
import Container from "@/components/container";
import { NewsletterCard } from "@/components/newsletter/newsletter-card";
import { HeaderSection } from "@/components/shared/header-section";
import { getServerT } from "@/i18n/server";

export default async function BlogListLayout({
  children,
}: { children: React.ReactNode }) {
  const { t } = await getServerT();
  return (
    <div className="mb-16">
      <div className="mt-8 w-full flex flex-col items-center justify-center gap-8">
        <HeaderSection
          labelAs="h1"
          label={t("misc.blog")}
          titleAs="h2"
          title={t("misc.blogSubtitle")}
        />

        <BlogCategoryFilter />
      </div>

      <Container className="mt-8">{children}</Container>

      <Container className="mt-8">
        <NewsletterCard />
      </Container>
    </div>
  );
}
