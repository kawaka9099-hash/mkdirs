// Frontend language switcher (CN OPC) — zero-dependency i18n.
// The locale lives in a cookie so BOTH server components (hero, sections,
// footer, item page) and client components (navbar, search box, cards)
// render the same language. No next-intl, no [locale] routes, no middleware
// changes — /studio and /api are untouched.

export const LOCALES = [
  "en",
  "zh",
  "ja",
  "ko",
  "fr",
  "es",
  "pt",
  "de",
] as const;

export type Locale = (typeof LOCALES)[number];

export const LOCALE_COOKIE = "cn-opc-locale";

export const DEFAULT_LOCALE: Locale = "zh";

export const LOCALE_META: Record<Locale, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇺🇸" },
  zh: { label: "中文", flag: "🇨🇳" },
  ja: { label: "日本語", flag: "🇯🇵" },
  ko: { label: "한국어", flag: "🇰🇷" },
  fr: { label: "Français", flag: "🇫🇷" },
  es: { label: "Español", flag: "🇪🇸" },
  pt: { label: "Português", flag: "🇵🇹" },
  de: { label: "Deutsch", flag: "🇩🇪" },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/**
 * Pick a locale from an Accept-Language header value, e.g.
 * "zh-CN,zh;q=0.9,en;q=0.8". Falls back to the site default (zh).
 */
export function resolveLocaleFromHeader(
  acceptLanguage: string | null | undefined,
): Locale {
  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }
  const tags = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);
  for (const tag of tags) {
    // exact match first: zh-cn -> zh, pt-br -> pt
    const primary = tag.split("-")[0];
    if (isLocale(primary)) {
      return primary;
    }
    if (isLocale(tag)) {
      return tag as Locale;
    }
  }
  return DEFAULT_LOCALE;
}

/** Pick a locale from navigator.language on the client. */
export function resolveLocaleFromNavigator(language: string | undefined): Locale {
  if (!language) {
    return DEFAULT_LOCALE;
  }
  return resolveLocaleFromHeader(language);
}
