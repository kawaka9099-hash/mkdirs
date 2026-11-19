import type { Category } from "@/sanity.types";
import groq, { defineQuery } from "groq";

/**
 * https://www.sanity.io/plugins/next-sanity#using-query-result-types
 * https://www.sanity.io/plugins/next-sanity#generate-typescript-types
 */

// ======================================================================================================================

/**
 * Item Queries
 */
const tagFields = /* groq */ `
  ...,
`;

const categoryFields = /* groq */ `
  ...,
`;

export const groupFields = /* groq */ `
  ...,
  "categories": *[_type=='category' && references(^._id)] | order(priority desc, _createdAt asc)
  { 
    ..., 
  }
`;

export const collectionFields = /* groq */ `
  ...,
  icon {
    ...,
    "blurDataURL": asset->metadata.lqip,
    "imageColor": asset->metadata.palette.dominant.background,
  },
`;

// also used in file data/item.ts and data/submission.ts
export const itemSimpleFields = /* groq */ `
  _id,
  _createdAt,
  name,
  slug,
  description,
  link,
  affiliateLink,
  sponsor,
  sponsorStartDate,
  sponsorEndDate,
  note,
  featured,
  icon {
    ...,
    "blurDataURL": asset->metadata.lqip,
    "imageColor": asset->metadata.palette.dominant.background,
  },
  image {
    ...,
    "blurDataURL": asset->metadata.lqip,
    "imageColor": asset->metadata.palette.dominant.background,
  },
  publishDate,
  paid,
  order,
  pricePlan,
  freePlanStatus,
  proPlanStatus,
  sponsorPlanStatus,
  rejectionReason,
  submitter->,
  collections[]->,
  categories[]->,
  tags[]->,
`;

const itemFields = /* groq */ `
  ${itemSimpleFields}
  introduction,
`;

// auto generate related items
const itemFieldsWithRelated = /* groq */ `
  introduction,
  "related": *[_type == "item" && defined(slug.current) 
    && defined(publishDate) 
    && forceHidden != true
    && sponsor != true
    && count(categories[@._ref in ^.^.categories[]._ref]) > 0 && _id != ^._id] 
    | order(publishedDate desc, _createdAt desc) [0...3] {
      ${itemSimpleFields}
  },
  ${itemSimpleFields}
`;

export const itemByIdQuery = defineQuery(`*[_type == "item" && _id == $id][0] {
  ${itemSimpleFields}
}`);

export const itemInfoBySlugQuery = defineQuery(`*[_type == "item" && slug.current == $slug][0] {
  ${itemSimpleFields}
}`);

export const itemFullInfoByIdQuery = defineQuery(`*[_type == "item" && _id == $id][0] {
  ${itemFields}
}`);

export const itemFullInfoBySlugQuery = defineQuery(`*[_type == "item" && slug.current == $slug 
&& forceHidden != true] [0] {
  ${itemFieldsWithRelated}
}`);

/**
 * NOTICE: this query is not used in the app,
 * but it is used to generate the type of ItemListQueryResult,
 * if you want to change this query, please update data/item.ts
 */
export const itemListQuery = defineQuery(`*[_type == "item" && defined(slug.current) 
  && defined(publishDate)
  && forceHidden != true
  && sponsor != true]
  | order(coalesce(orderRank, "zzzzzzzz") asc, coalesce(featured, false) desc, publishDate desc) {
    ${itemSimpleFields}
}`);

// get sponsor items
export const sponsorItemListQuery = defineQuery(`*[_type == "item" && defined(slug.current) 
  && defined(publishDate)
  && forceHidden != true
  && sponsor == true
  && sponsorStartDate <= now()
  && sponsorEndDate >= now()] 
  | order(coalesce(orderRank, "zzzzzzzz") asc, coalesce(featured, false) desc, publishDate desc) {
    ${itemSimpleFields}
}`);

export const itemListOfFeaturedQuery = defineQuery(`*[_type == "item" && defined(slug.current) 
  && defined(publishDate) 
  && forceHidden != true 
  && sponsor != true
  && featured == true] 
  | order(coalesce(orderRank, "zzzzzzzz") asc, coalesce(featured, false) desc, publishDate desc) [0...$count] {
    ${itemSimpleFields}
}`);

export const itemListOfLatestQuery = defineQuery(`*[_type == "item" && defined(slug.current) 
  && defined(publishDate) 
  && forceHidden != true
  && sponsor != true] 
  | order(coalesce(orderRank, "zzzzzzzz") asc, coalesce(featured, false) desc, publishDate desc) [0...$count] {
    ${itemSimpleFields}
}`);

export const collectionListQuery = defineQuery(`*[_type == "collection" && defined(slug.current)] 
  | order(priority desc) {
    ${collectionFields}
}`);

export const collectionQuery = defineQuery(`*[_type == "collection" && slug.current == $slug][0] {
  ${collectionFields}
}`);

export const groupListQuery = groq`*[_type=="group"] | order(priority desc, _createdAt asc) {
  ${groupFields}
}`;

export const categoryListQuery = defineQuery(`*[_type == "category" && defined(slug.current)] 
  | order(priority desc) {
    ${categoryFields}
}`);

export const categoryQuery = defineQuery(`*[_type == "category" && slug.current == $slug][0] {
  ${categoryFields}
}`);

export const tagListQuery = defineQuery(`*[_type == "tag" && defined(slug.current)] 
  | order(slug.current asc) {
    ${tagFields}
}`);

export const tagQuery = defineQuery(`*[_type == "tag" && slug.current == $slug][0] {
  ${tagFields}
}`);

/**
 * 首页统计（CN OPC）：收录总数、分类数、最新收录时间
 * 数字全部从站内数据算出，不写死
 */
export type HomeStatsQueryResult = {
  totalItems: number;
  totalCategories: number;
  latestPublishDate: string | null;
};

export const homeStatsQuery = defineQuery(`{
  "totalItems": count(*[_type == "item" && defined(slug.current)
    && defined(publishDate)
    && forceHidden != true
    && sponsor != true]),
  "totalCategories": count(*[_type == "category" && defined(slug.current)]),
  "latestPublishDate": *[_type == "item" && defined(publishDate)
    && forceHidden != true] | order(publishDate desc)[0].publishDate
}`);

/**
 * 分类列表（含每个分类下的收录数）
 */
export type CategoryWithCount = Category & { count: number };

export const categoryListWithCountQuery = defineQuery(`*[_type == "category" && defined(slug.current)]
  | order(priority desc) {
    ...,
    "count": count(*[_type == "item" && references(^._id)
      && defined(publishDate)
      && forceHidden != true
      && sponsor != true])
}`);

/**
 * 编辑精选：取 slug 为 editors-picks 的合集下的条目
 * 若该合集不存在或为空，首页用 featured 条目兜底（见 home-content.tsx）
 */
export const itemListByCollectionIdQuery = defineQuery(`*[_type == "item" && references($collectionId)
  && defined(slug.current)
  && defined(publishDate)
  && forceHidden != true
  && sponsor != true]
  | order(coalesce(orderRank, "zzzzzzzz") asc, publishDate desc) [0...$count] {
    ${itemSimpleFields}
}`);

// ======================================================================================================================

/**
 * Submission Queries
 */

/**
 * NOTICE: this query is not used in the app,
 * but it is used to generate the type of SubmissionListQueryResult,
 * if you want to change this query, please update data/submission.ts
 */
export const submissionListQuery = defineQuery(`*[_type == "item" && defined(slug.current)
  && submitter._ref == $userId] 
  | order(_createdAt desc) {
    ${itemSimpleFields}
}`);

// Page Queries
export const pageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    ...,
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "slug": @.reference->slug
        }
      }
    },
  }
`);

// ======================================================================================================================

/**
 * Blog Queries
 */

// also used in file data/blog.ts
export const blogPostSimpleFields = /* groq */ `
  _id,
  _createdAt,
  title,
  slug,
  excerpt,
  featured,
  image {
    ...,
    "blurDataURL": asset->metadata.lqip,
    "imageColor": asset->metadata.palette.dominant.background,
  },
  publishDate,
  author->,
  categories[]->,
`;

const blogPostFields = /* groq */ `
  relatedPosts[]-> {
    ${blogPostSimpleFields}
  },
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  },
  ${blogPostSimpleFields}
  
  // "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  // "related": *[_type == "blogPost" && count(categories[@._ref in ^.^.categories[]._ref]) > 0 ] | order(publishedDate desc, _createdAt desc) [0...2] {
  //   slug,
  //   title,
  //   excerpt,
  //   publishDate,
  //   "date": coalesce(publishedDate, _createdAt),
  //   "image": image
  // },
`;

const blogCategoryFields = /* groq */ `
  name,
  slug,
  description,
  priority,
`;

export const blogCategoryListQuery = defineQuery(`
  *[_type == "blogCategory" && defined(slug.current)] 
  | order(priority desc) {
    ${blogCategoryFields}
}`);

export const blogCategoryMetadateQuery = defineQuery(`
  *[_type == "blogCategory" && slug.current == $slug][0] {
    ${blogCategoryFields}
  }
`);

export const blogPostQuery = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    ${blogPostFields}
}`);

export const blogPostMetadataQuery = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    ${blogPostSimpleFields}
}`);

/**
 * NOTICE: this query is not directly used in the app,
 * but it is used to generate the type of BlogPostListQueryResult,
 * if you want to change this query, please update data/blog.ts
 */
export const blogPostListQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current) && defined(publishDate)] 
  | order(publishDate desc) {
    ${blogPostSimpleFields}
}`);

export const blogPostListOfLatestQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current) && defined(publishDate)] 
  | order(publishDate desc) [0...$count] {
    ${blogPostSimpleFields}
}`);

// search blog posts by keywords, not used in the app
export const searchBlogQuery = groq`
  *[_type == "blogPost" && defined(slug.current) && defined(publishDate) && _score > 0]
  | score(title match $query || excerpt match $query || pt::text(body) match $query)
  | order(_score desc) {
  _score,
  ${blogPostSimpleFields}
}`;

// get top 5 categories, not used in the app
export const blogCategoryWithCountQuery = groq`
  *[_type == "blogCategory"] {
  ${blogCategoryFields}
  "count": count(*[_type == "blogPost" && references(^._id)])
} | order(count desc) [0...5]`;

// ======================================================================================================================

/**
 * User Queries
 */

export const userWithAccountsQuery = defineQuery(`
  *[_type == "user" && _id == $id][0] {
    ...,
    accounts[]->,
  }
`);

// ======================================================================================================================

/**
 * Sitemap Queries
 */

export const itemListQueryForSitemap = groq`*[_type == "item" && defined(slug.current) && defined(publishDate)] | order(_createdAt asc) {
  _id,
  _updatedAt,
  "slug": slug.current,
}`;

export const categoryListQueryForSitemap = groq`*[_type == "category" && defined(slug.current)] | order(_createdAt asc) {
  _id,  
  _updatedAt,
  "slug": slug.current,
  "count": count(*[_type == "item" && defined(publishDate) && forceHidden != true && references(^._id)])
}`;

export const tagListQueryForSitemap = groq`*[_type == "tag" && defined(slug.current)] | order(_createdAt asc) {
  _id,  
  _updatedAt,
  "slug": slug.current,
  "count": count(*[_type == "item" && defined(publishDate) && forceHidden != true && references(^._id)])
}`;

export const collectionListQueryForSitemap = groq`*[_type == "collection" && defined(slug.current)] | order(_createdAt asc) {
  _id,  
  _updatedAt,
  "slug": slug.current,
  "count": count(*[_type == "item" && defined(publishDate) && forceHidden != true && references(^._id)])
}`;

export const blogListQueryForSitemap = groq`*[_type == "blogPost" && defined(slug.current) && defined(publishDate)] | order(publishDate desc, _createdAt asc) {
  _id,  
  _updatedAt,
  "slug": slug.current,
}`;

export const blogCategoryListQueryForSitemap = groq`*[_type == "blogCategory" && defined(slug.current)] | order(_createdAt asc) {
  _id,  
  _updatedAt,
  "slug": slug.current,
  "count": count(*[_type == "blogPost" && defined(publishDate) && references(^._id)])
}`;

export const pageListQueryForSitemap = groq`*[_type == "page" && defined(slug.current)] | order(_createdAt asc) {
  _id,  
  _updatedAt,
  "slug": slug.current,
}`;

// ======================================================================================================================

/**
 * Site Settings Queries
 * Single settings document (singleton, id "settings").
 * Logo / site name / nav menu editable in Studio.
 */
export const settingsQuery = defineQuery(`*[_type == "settings"][0] {
  siteName,
  logo,
  logoDark,
  "navMenu": navMenu[] {
    label,
    href
  }
}`);
