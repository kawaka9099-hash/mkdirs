"use client";

import { useLanguage } from "@/i18n/language-provider";
import { HeaderSection } from "../shared/header-section";
import { NewsletterForm } from "./newsletter-form";

export function NewsletterCard() {
  const { t } = useLanguage();
  return (
    <div className="w-full px-4 py-8 md:p-12 bg-muted rounded-lg">
      <div className="flex flex-col items-center justify-center gap-8">
        <HeaderSection
          id="newsletter"
          labelAs="h2"
          label={t("newsletter.label")}
          title={t("newsletter.title")}
          titleAs="h3"
          subtitle={t("newsletter.subtitle")}
        />

        <NewsletterForm />
      </div>
    </div>
  );
}
