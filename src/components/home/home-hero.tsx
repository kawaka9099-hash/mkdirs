import { Icons } from "@/components/icons/icons";
import { buttonVariants } from "@/components/ui/button";
import { heroConfig } from "@/config/hero";
import { cn } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  type HomeStatsQueryResult,
  homeStatsQuery,
} from "@/sanity/lib/queries";
import Link from "next/link";
import HomeSearchBox from "./home-search-box";

/**
 * 更新频率文案：全部由最新收录的 publishDate 推导，不写死“每日更新”
 */
function getUpdateText(latestPublishDate: string | null): string {
  if (!latestPublishDate) {
    return "持续收集中";
  }
  const latest = new Date(latestPublishDate).getTime();
  if (Number.isNaN(latest)) {
    return "持续收集中";
  }
  const days = Math.floor((Date.now() - latest) / (1000 * 60 * 60 * 24));
  if (days <= 0) {
    return "今日已更新";
  }
  if (days <= 7) {
    return "本周已更新";
  }
  if (days <= 30) {
    return "本月已更新";
  }
  const d = new Date(latest);
  return `最近更新于 ${d.getMonth() + 1}月${d.getDate()}日`;
}

export default async function HomeHero() {
  const LabelIcon = Icons[heroConfig.label.icon];

  // 统计数字从站内数据算出；Sanity 不可达时降级为占位文案，不让首页挂掉
  let stats: HomeStatsQueryResult | null = null;
  try {
    stats = await sanityFetch<HomeStatsQueryResult>({
      query: homeStatsQuery,
    });
  } catch (error) {
    console.error("HomeHero, failed to fetch stats:", error);
    stats = null;
  }

  const totalItems = stats?.totalItems ?? 0;
  const totalCategories = stats?.totalCategories ?? 0;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-5xl flex flex-col items-center text-center gap-8">
        <Link
          href={heroConfig.label.href}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "px-4 rounded-full",
          )}
        >
          <span className="mr-2">🎉</span>
          <span>{heroConfig.label.text}</span>
          <LabelIcon className="size-4" />
        </Link>

        {/* maybe font-sourceSans is better */}
        <h1 className="max-w-5xl font-bold text-balance text-3xl sm:text-4xl md:text-5xl">
          {heroConfig.title.first}{" "}
          <span className="text-gradient_teal-emerald font-bold">
            {heroConfig.title.second}
          </span>
        </h1>

        <p className="max-w-4xl text-balance text-muted-foreground sm:text-xl">
          {heroConfig.subtitle}
        </p>

        {/* 数据行：收录总数 · 分类数 · 更新频率（数字来自 Sanity，无数据时显示占位） */}
        <p className="text-sm sm:text-base font-medium tracking-wide text-muted-foreground">
          {totalItems > 0 ? (
            <>
              <span className="text-foreground font-semibold">
                {totalItems}+
              </span>{" "}
              收录
              <span className="mx-2 text-muted-foreground/50">·</span>
              <span className="text-foreground font-semibold">
                {totalCategories}+
              </span>{" "}
              分类
              <span className="mx-2 text-muted-foreground/50">·</span>
              {getUpdateText(stats?.latestPublishDate ?? null)}
            </>
          ) : (
            <>持续收集中，欢迎提交你的一人公司</>
          )}
        </p>

        <div className="w-full">
          <HomeSearchBox urlPrefix="/search" />
        </div>
      </div>
    </div>
  );
}
