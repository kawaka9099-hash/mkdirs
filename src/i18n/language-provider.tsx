"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
  type Locale,
} from "./config";
import { getDictionary, translate } from "./dictionaries";

function readLocaleCookie(): Locale | null {
  if (typeof document === "undefined") {
    return null;
  }
  const match = document.cookie
    .split(";")
    .map((part) => part.trim().split("="))
    .find(([name]) => name === LOCALE_COOKIE);
  const value = match?.[1];
  return isLocale(value) ? value : null;
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key) => key,
});

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  /** Locale resolved on the server (cookie → Accept-Language → zh). */
  initialLocale: Locale;
}) {
  const router = useRouter();
  // Initialized from the server-resolved locale so SSR and hydration agree.
  // Do NOT read navigator.language here: on the server it reports en-US
  // even for zh visitors, which would split server/client languages.
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Keep the cookie in sync when the locale was resolved from the browser
  // (so the next server render uses the same language).
  useEffect(() => {
    if (!readLocaleCookie()) {
      document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
      setLocaleState(next);
      // Re-render server components (hero, sections, footer, item page)
      // with the new language.
      router.refresh();
    },
    [router],
  );

  const value = useMemo<LanguageContextValue>(() => {
    const dict = getDictionary(locale);
    return {
      locale,
      setLocale,
      t: (key, vars) => translate(dict, key, vars),
    };
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
