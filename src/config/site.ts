import type { SiteConfig } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "CN OPC",
  tagline: "收录国内优质一人公司",
  description:
    "CN OPC 收录国内优质一人公司：独立开发者、自由职业者与一人团队，一个人也能做出好产品",
  keywords: [
    "一人公司",
    "OPC",
    "独立开发",
    "自由职业",
    "收录",
    "导航",
    "CN OPC",
  ],
  author: "CN OPC",
  url: SITE_URL,
  logo: "/logo.png",
  // set the logoDark if you have put the logo-dark.png in the public folder
  // logoDark: "/logo-dark.png",
  // please increase the version number when you update the image
  image: `${SITE_URL}/og.png?v=1`,
  mail: "kawaka9099@gmail.com",
  utm: {
    source: "cn-opc",
    medium: "referral",
    campaign: "navigation",
  },
  links: {
    // leave it blank if you don't want to show the link (don't delete)
    twitter: "",
    github: "",
    youtube: "",
  },
};
