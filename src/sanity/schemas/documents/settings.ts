import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  description: "网站外观设置：logo、站名、导航菜单。改完发布后，网站 1 分钟内自动更新。",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "siteName",
      title: "网站名称",
      description: "导航栏 logo 旁边的文字。留空则使用默认名称。",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo（浅色）",
      description: "导航栏和页脚显示的 logo，方形透明底 PNG 最好。留空则使用默认 logo。",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "logoDark",
      title: "Logo（深色）",
      description: "深色模式下显示的 logo。留空则与浅色用同一张。",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "navMenu",
      title: "导航菜单",
      description:
        "留空则使用默认菜单。填了就用你填的：显示名字按你填的文字原样显示，站内链接写 /search 这样的路径，站外链接写完整网址。管理后台入口不受影响，仅管理员可见。",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "显示名字",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "链接",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
  ],
});
