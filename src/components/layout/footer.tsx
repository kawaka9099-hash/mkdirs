import { Icons } from "@/components/icons/icons";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { footerConfig } from "@/config/footer";
import { siteConfig } from "@/config/site";
import { getServerT } from "@/i18n/server";
import { currentRole } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types/user-role";
import Link from "next/link";
import type * as React from "react";
import Container from "../container";
import { Logo } from "../logo";
import BuiltWithButton from "../shared/built-with-button";

// Footer link titles come from the language dictionary, keyed by the
// English title in the config. Config titles stay as the fallback.
const SECTION_LABEL_BY_TITLE: Record<string, string> = {
  Product: "footer.product",
  Resources: "footer.resources",
  Pages: "footer.pages",
  Company: "footer.company",
};

const LINK_LABEL_BY_TITLE: Record<string, string> = {
  Search: "footer.search",
  Collection: "footer.collection",
  Category: "footer.category",
  Tag: "footer.tag",
  Blog: "footer.blog",
  Pricing: "footer.pricing",
  Submit: "footer.submit",
  Studio: "footer.studio",
  "Home 2": "footer.home2",
  "Home 3": "footer.home3",
  "Collection 1": "footer.collection1",
  "Collection 2": "footer.collection2",
  "About Us": "footer.about",
  "Privacy Policy": "footer.privacy",
  "Terms of Service": "footer.terms",
  Sitemap: "footer.sitemap",
};

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  // Site appearance from Studio settings (Settings). Falls back to code defaults.
  siteName?: string;
  logoSrc?: string;
  logoDarkSrc?: string;
}

export async function Footer({
  className,
  siteName,
  logoSrc,
  logoDarkSrc,
}: FooterProps) {
  const { t } = await getServerT();
  // The Studio link opens the content backend: only ADMIN sees it.
  const isAdmin = (await currentRole()) === UserRole.ADMIN;

  const displayName = siteName ?? siteConfig.name;

  return (
    <footer className={cn("border-t", className)}>
      <Container className="grid grid-cols-2 gap-8 py-12 md:grid-cols-6">
        <div className="flex flex-col items-start col-span-full md:col-span-2">
          <div className="space-y-4">
            <div className="items-center space-x-2 flex">
              <Logo src={logoSrc} srcDark={logoDarkSrc} />

              <span className="text-xl font-bold">{displayName}</span>
            </div>

            <p className="text-muted-foreground text-base p4-4 md:pr-12">
              {t("footer.tagline")}
            </p>

            <div className="flex items-center gap-2">
              {siteConfig.links.github && (
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                >
                  <Icons.github className="size-4" aria-hidden="true" />
                </Link>
              )}
              {siteConfig.links.twitter && (
                <Link
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                >
                  <Icons.twitter className="size-4" aria-hidden="true" />
                </Link>
              )}
              {siteConfig.links.youtube && (
                <Link
                  href={siteConfig.links.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                >
                  <Icons.youtube className="size-4" aria-hidden="true" />
                </Link>
              )}
              {siteConfig.mail && (
                <Link
                  href={`mailto:${siteConfig.mail}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Email"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                >
                  <Icons.email className="size-4" aria-hidden="true" />
                </Link>
              )}
            </div>

            <BuiltWithButton />
          </div>
        </div>

        {footerConfig.links.map((section) => (
          <div
            key={section.title}
            className="col-span-1 md:col-span-1 items-start"
          >
            <span className="text-sm font-semibold uppercase">
              {t(SECTION_LABEL_BY_TITLE[section.title] ?? section.title)}
            </span>
            <ul className="mt-4 list-inside space-y-3">
              {section.items?.map(
                (link) =>
                  link.href &&
                  (link.href !== "/studio" || isAdmin) && (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        {t(LINK_LABEL_BY_TITLE[link.title] ?? link.title)}
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t py-4">
        <Container className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">
            Copyright &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </span>

          <div className="flex items-center gap-3">
            <ModeToggle />
          </div>
        </Container>
      </div>
    </footer>
  );
}
