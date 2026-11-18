import { HomeContent } from "@/components/home/home-content";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "",
  canonicalUrl: `${siteConfig.url}/`,
});

// 首页只做落地展示（分区内容），不在构建时拉取 Sanity；
// 列表浏览 / 搜索 / 筛选 / 分页由 /search 承担
export const dynamic = "force-dynamic";

export default async function HomePage() {
  return <HomeContent />;
}
