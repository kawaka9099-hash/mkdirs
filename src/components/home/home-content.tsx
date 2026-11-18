import type {
  BlogPostListQueryResult,
  CollectionQueryResult,
  ItemListQueryResult,
} from "@/sanity.types";
import { getServerT } from "@/i18n/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  type CategoryWithCount,
  blogPostListOfLatestQuery,
  categoryListWithCountQuery,
  collectionQuery,
  itemListByCollectionIdQuery,
  itemListOfFeaturedQuery,
  itemListOfLatestQuery,
} from "@/sanity/lib/queries";
import {
  ArrowRightIcon,
  FileTextIcon,
  FlameIcon,
  LayoutGridIcon,
  SparklesIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import BlogGrid from "../blog/blog-grid";
import ItemCard from "../item/item-card";

/**
 * 首页分区（CN OPC，参考 topai.tools 的排版，只参考布局，不抄文案与素材）
 *
 * 数据来源：
 * - 最新收录：Sanity item，按 publishDate 倒序
 * - 最热收录：fallback —— item 表里没有浏览量/投票/点赞字段，
 *   也没有人气排序，只能用 featured（编辑标记的优质条目）做代理
 * - 分类浏览：Sanity category，count 为该分类下的已发布收录数
 * - 编辑精选：slug 为 editors-picks 的合集下的条目；
 *   若该合集不存在或为空，兜底用 featured 中未在“最热”里出现的部分
 * - 最新文章：Sanity blog post，按时间倒序
 *
 * 每个分区在无数据时整个隐藏；Sanity 不可达时降级为空，不让首页挂掉
 */

const LATEST_COUNT = 8;
const HOT_COUNT = 8;
const FEATURED_FETCH_COUNT = 12;
const PICKS_COUNT = 8;
const POST_COUNT = 3;

function SectionHeader({
  icon,
  title,
  moreHref,
  moreText,
}: {
  icon: React.ReactNode;
  title: string;
  moreHref: string;
  moreText: string;
}) {
  return (
    <div className="flex items-center justify-between gap-8">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-lg tracking-wider font-semibold text-gradient_teal-emerald">
          {title}
        </h2>
      </div>
      <Link
        href={moreHref}
        className="text-sm sm:text-base group flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
      >
        <span>{moreText}</span>
        <ArrowRightIcon className="size-4 icon-scale" />
      </Link>
    </div>
  );
}

function HomeItemGrid({ items }: { items: ItemListQueryResult }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}

export async function HomeContent() {
  const { dict } = await getServerT();
  const [
    latestItems,
    featuredItems,
    categories,
    picksCollection,
    latestBlogPosts,
  ] = await Promise.all([
    sanityFetch<ItemListQueryResult>({
      query: itemListOfLatestQuery,
      params: { count: LATEST_COUNT },
    }).catch(() => null),
    sanityFetch<ItemListQueryResult>({
      query: itemListOfFeaturedQuery,
      params: { count: FEATURED_FETCH_COUNT },
    }).catch(() => null),
    sanityFetch<CategoryWithCount[]>({
      query: categoryListWithCountQuery,
    }).catch(() => null),
    sanityFetch<CollectionQueryResult>({
      query: collectionQuery,
      params: { slug: "editors-picks" },
    }).catch(() => null),
    sanityFetch<BlogPostListQueryResult>({
      query: blogPostListOfLatestQuery,
      params: { count: POST_COUNT },
    }).catch(() => null),
  ]);

  const latest = latestItems ?? [];
  const featured = featuredItems ?? [];
  // 最热收录：无浏览量/投票字段，用 featured 做代理
  const hotItems = featured.slice(0, HOT_COUNT);

  // 编辑精选：先取 editors-picks 合集下的条目
  let picksItems: ItemListQueryResult = [];
  if (picksCollection?._id) {
    picksItems =
      (await sanityFetch<ItemListQueryResult>({
        query: itemListByCollectionIdQuery,
        params: { collectionId: picksCollection._id, count: PICKS_COUNT },
      }).catch(() => null)) ?? [];
  }
  // 合集不存在或为空时，兜底用 featured 里未在“最热”出现过的部分
  if (picksItems.length === 0) {
    picksItems = featured.slice(HOT_COUNT, HOT_COUNT + PICKS_COUNT);
  }

  const categoryList = categories ?? [];
  const posts = latestBlogPosts ?? [];

  return (
    <div className="flex flex-col gap-12">
      {/* 最新收录 */}
      {latest.length > 0 && (
        <section className="flex flex-col gap-6">
          <SectionHeader
            icon={<SparklesIcon className="w-4 h-4 text-teal-600" />}
            title={dict.home.latest}
            moreHref="/search"
            moreText={dict.home.viewAllItems}
          />
          <HomeItemGrid items={latest} />
        </section>
      )}

      {/* 最热收录 */}
      {hotItems.length > 0 && (
        <section className="flex flex-col gap-6">
          <SectionHeader
            icon={<FlameIcon className="w-4 h-4 text-teal-600" />}
            title={dict.home.hot}
            moreHref="/search"
            moreText={dict.home.viewAllItems}
          />
          <HomeItemGrid items={hotItems} />
        </section>
      )}

      {/* 分类浏览 */}
      {categoryList.length > 0 && (
        <section className="flex flex-col gap-6">
          <SectionHeader
            icon={<LayoutGridIcon className="w-4 h-4 text-teal-600" />}
            title={dict.home.categories}
            moreHref="/category"
            moreText={dict.home.viewAllCategories}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryList.map((category) => (
              <Link
                key={category._id}
                href={`/category/${category.slug?.current ?? ""}`}
                className="border rounded-lg p-5 flex flex-col gap-2 hover:bg-accent/60 transition-colors duration-300"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-medium truncate">
                    {category.name}
                  </h3>
                  <span className="text-sm text-muted-foreground shrink-0">
                    {category.count > 0
                      ? dict.home.countItems.replace("{n}", String(category.count))
                      : dict.home.noItems}
                  </span>
                </div>
                {category.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 编辑精选 */}
      {picksItems.length > 0 && (
        <section className="flex flex-col gap-6">
          <SectionHeader
            icon={<StarIcon className="w-4 h-4 text-teal-600" />}
            title={dict.home.picks}
            moreHref="/search"
            moreText={dict.home.viewAllItems}
          />
          <HomeItemGrid items={picksItems} />
        </section>
      )}

      {/* 最新文章 */}
      {posts.length > 0 && (
        <section className="flex flex-col gap-6">
          <SectionHeader
            icon={<FileTextIcon className="w-4 h-4 text-teal-600" />}
            title={dict.home.posts}
            moreHref="/blog"
            moreText={dict.home.viewAllPosts}
          />
          <BlogGrid posts={posts} />
        </section>
      )}
    </div>
  );
}
