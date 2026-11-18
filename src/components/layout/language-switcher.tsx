"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/i18n/language-provider";
import { LOCALES, LOCALE_META } from "@/i18n/config";
import { CheckIcon, LanguagesIcon } from "lucide-react";

/**
 * Language switcher in the navbar — same pattern as mkdirs.com:
 * a translate icon button opening a dropdown of 8 languages with flags.
 * Switching writes the locale cookie and refreshes the page so server
 * components re-render in the new language.
 */
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="px-0"
          aria-label={t("nav.language")}
        >
          <LanguagesIcon className="size-5" />
          <span className="sr-only">{t("nav.language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        {LOCALES.map((code) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLocale(code)}
            className="cursor-pointer"
          >
            <span className="mr-2 text-base leading-none">
              {LOCALE_META[code].flag}
            </span>
            <span className="flex-1">{LOCALE_META[code].label}</span>
            {locale === code && <CheckIcon className="ml-2 size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
