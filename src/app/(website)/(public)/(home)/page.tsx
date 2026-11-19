import { HomeContent } from "@/components/home/home-content";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "",
  canonicalUrl: `${siteConfig.url}/`,
});

// 首页只做落地展示（分区内容），列表浏览 / 搜索 / 筛选 / 分页由 /search 承担。
// 用 60 秒增量静态再生：首屏走边缘缓存，内容发布后 1 分钟内更新。
export const revalidate = 60;

export default async function HomePage() {
  return <HomeContent />;
}
