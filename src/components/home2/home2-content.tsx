import type {
  BlogPostListQueryResult,
  ItemListQueryResult,
} from "@/sanity.types";
import { getServerT } from "@/i18n/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  blogPostListOfLatestQuery,
  itemListOfFeaturedQuery,
  itemListOfLatestQuery,
} from "@/sanity/lib/queries";
import {
  ArrowRightIcon,
  FileTextIcon,
  SparklesIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import BlogGrid from "../blog/blog-grid";
import ItemGrid2 from "../item/item-grid-2";
import { Button } from "../ui/button";

export async function HomeContent() {
  const { dict } = await getServerT();
  const [featuredItems, latestItems, latestBlogPosts] = await Promise.all([
    sanityFetch<ItemListQueryResult>({
      query: itemListOfFeaturedQuery,
      params: { count: 6 },
    }),
    sanityFetch<ItemListQueryResult>({
      query: itemListOfLatestQuery,
      params: { count: 6 },
    }),
    sanityFetch<BlogPostListQueryResult>({
      query: blogPostListOfLatestQuery,
      params: { count: 6 },
    }),
  ]);

  return (
    <div className="flex flex-col gap-8">
      {/* latest products */}
      {latestItems && latestItems.length > 0 && (
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-indigo-500" />
              <h2 className="text-lg tracking-wider font-semibold text-gradient_indigo-purple">
                {dict.home.latest}
              </h2>
            </div>

            {/* <Link href="/search" className="text-lg group flex items-center gap-2">
              <span>More</span>
              <ArrowRightIcon className="size-4 icon-scale" />
            </Link> */}
          </div>

          <ItemGrid2 items={latestItems} />

          <Button asChild variant="default" size="lg" className="mx-auto">
            <Link
              href="/search"
              className="text-lg font-semibold px-16 group flex items-center gap-2"
            >
              <span className="tracking-wider">{dict.home.viewAllItems}</span>
              <ArrowRightIcon className="size-4 icon-scale" />
            </Link>
          </Button>
        </div>
      )}

      {/* featured products */}
      {featuredItems && featuredItems.length > 0 && (
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <StarIcon className="w-4 h-4 text-indigo-500" />
              <h2 className="text-lg tracking-wider font-semibold text-gradient_indigo-purple">
                {dict.home.hot}
              </h2>
            </div>

            {/* <Link href="/search" className="text-lg group flex items-center gap-2">
              <span>More</span>
              <ArrowRightIcon className="size-4 icon-scale" />
            </Link> */}
          </div>

          <ItemGrid2 items={featuredItems} />

          <Button asChild variant="default" size="lg" className="mx-auto">
            <Link
              href="/search?f=featured%3D%3Dtrue"
              className="text-lg font-semibold px-16 group flex items-center gap-2"
            >
              <span className="tracking-wider">{dict.home.viewAllItems}</span>
              <ArrowRightIcon className="size-4 icon-scale" />
            </Link>
          </Button>
        </div>
      )}

      {/* latest posts */}
      {latestBlogPosts && latestBlogPosts.length > 0 && (
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <FileTextIcon className="w-4 h-4 text-indigo-500" />
              <h2 className="text-lg tracking-wider font-semibold text-gradient_indigo-purple">
                {dict.home.posts}
              </h2>
            </div>

            {/* <Link href="/blog" className="text-lg group flex items-center gap-2">
              <span>More</span>
              <ArrowRightIcon className="size-4 icon-scale" />
            </Link> */}
          </div>

          <BlogGrid posts={latestBlogPosts} />

          <Button asChild variant="default" size="lg" className="mx-auto">
            <Link
              href="/blog"
              className="text-lg font-semibold px-16 group flex items-center gap-2"
            >
              <span className="tracking-wider">{dict.home.viewAllPosts}</span>
              <ArrowRightIcon className="size-4 icon-scale" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
