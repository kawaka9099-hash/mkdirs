// Server-side locale resolution: cookie first, then Accept-Language, then zh.
// Used by server components (hero, sections, footer, item page) so the
// first paint already matches the visitor's language.

import { cookies, headers } from "next/headers";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
  resolveLocaleFromHeader,
  type Locale,
} from "./config";
import { getDictionary, translate, type Dictionary } from "./dictionaries";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const fromCookie = store.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) {
    return fromCookie;
  }
  const acceptLanguage = (await headers()).get("accept-language");
  return resolveLocaleFromHeader(acceptLanguage);
}

export async function getServerDictionary(): Promise<{
  locale: Locale;
  dict: Dictionary;
}> {
  const locale = await getLocale();
  return { locale, dict: getDictionary(locale) };
}

/** Bound t() for a server component: t("nav.signIn"), t("home.countItems", {n: 3}) */
export async function getServerT(): Promise<{
  locale: Locale;
  dict: Dictionary;
  t: (key: string, vars?: Record<string, string | number>) => string;
}> {
  const { locale, dict } = await getServerDictionary();
  return { locale, dict, t: (key, vars) => translate(dict, key, vars) };
}

export { DEFAULT_LOCALE };
