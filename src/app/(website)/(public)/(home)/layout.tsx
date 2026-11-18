import Container from "@/components/container";
import HomeHero from "@/components/home/home-hero";
import { NewsletterCard } from "@/components/newsletter/newsletter-card";

/**
 * 首页布局（CN OPC，参考 topai.tools 的全宽排版）：
 * 大标题 hero + 分区内容 + 订阅卡片，无侧栏。
 * 列表浏览 / 筛选 / 分页由 /search 承担，不在首页重复。
 */
export default function HomeLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <Container className="mt-12 mb-16 flex flex-col gap-12">
      <HomeHero />

      <div className="flex-1">{children}</div>

      <NewsletterCard />
    </Container>
  );
}
