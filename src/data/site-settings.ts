import { urlForIcon } from "@/lib/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";

/**
 * Site appearance settings, editable in Studio (Settings).
 * Returns null when no settings document exists yet or the fetch fails —
 * callers fall back to the code defaults (site.ts / marketing.ts).
 * Published changes reach the site within ~60s via sanityFetch revalidation.
 */

export interface SiteNavMenuItem {
  label: string;
  href: string;
}

export interface SiteSettings {
  siteName?: string;
  logoSrc?: string;
  logoDarkSrc?: string;
  navMenu: SiteNavMenuItem[];
}

interface SettingsQueryResult {
  siteName?: string;
  // biome-ignore lint/suspicious/noExplicitAny: Sanity image object
  logo?: any;
  // biome-ignore lint/suspicious/noExplicitAny: Sanity image object
  logoDark?: any;
  navMenu?: { label?: string; href?: string }[];
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const doc = await sanityFetch<SettingsQueryResult>({
      query: settingsQuery,
    });
    if (!doc) {
      return null;
    }
    return {
      siteName: doc.siteName || undefined,
      logoSrc: urlForIcon(doc.logo)?.src,
      logoDarkSrc: urlForIcon(doc.logoDark)?.src,
      navMenu: (doc.navMenu || [])
        .filter((item) => item.label && item.href)
        .map((item) => ({
          label: item.label as string,
          href: item.href as string,
        })),
    };
  } catch (error) {
    console.error("getSiteSettings, error:", error);
    return null;
  }
}
