import { SubmitForm } from "@/components/submit/submit-form";
import { siteConfig } from "@/config/site";
import { getServerT } from "@/i18n/server";
import { constructMetadata } from "@/lib/metadata";
import type {
  CategoryListQueryResult,
  TagListQueryResult,
} from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { categoryListQuery, tagListQuery } from "@/sanity/lib/queries";

export async function generateMetadata() {
  const { t } = await getServerT();
  return constructMetadata({
    title: t("submit.meta1Title"),
    description: t("submit.meta1Desc"),
    canonicalUrl: `${siteConfig.url}/submit`,
  });
}

export default async function SubmitPage() {
  const [categoryList, tagList] = await Promise.all([
    sanityFetch<CategoryListQueryResult>({
      query: categoryListQuery,
    }),
    sanityFetch<TagListQueryResult>({
      query: tagListQuery,
    }),
  ]);

  return <SubmitForm tagList={tagList} categoryList={categoryList} />;
}
