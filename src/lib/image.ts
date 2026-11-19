import { dataset, projectId } from "@/sanity/lib/api";
import createImageUrlBuilder from "@sanity/image-url";

/**
 * https://www.sanity.io/docs/image-url
 */
const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const urlForImage = (source: any, maxWidth = 1000) => {
  if (!source || !source.asset) return;
  const dimensions = source?.asset?._ref.split("-")[2];

  const [width, height] = dimensions
    .split("x")
    .map((num: string) => Number.parseInt(num, 10));

  // NOTICE: width is limited to avoid performance issues caused by large images
  // you can increase this number if you want to have higher quality images.
  // Cards pass a smaller maxWidth (640) since they display at ~350px wide.
  const url = imageBuilder
    .image(source)
    .auto("format")
    .width(Math.min(width, maxWidth))
    .url();

  return {
    src: url,
    width: width,
    height: height,
  };
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const urlForIcon = (source: any) => {
  if (!source || !source.asset) return;
  const dimensions = source?.asset?._ref.split("-")[2];

  const [width, height] = dimensions
    .split("x")
    .map((num: string) => Number.parseInt(num, 10));

  const url = imageBuilder
    .image(source)
    .auto("format")
    .width(Math.min(width, 64))
    .url();

  return {
    src: url,
    width: width,
    height: height,
  };
};
