import "@/styles/globals.css";

import {
  fontBricolageGrotesque as fontBricolage,
  fontSourceSans,
  fontSourceSerif,
  fontWorkSans,
} from "@/assets/fonts";
import { auth } from "@/auth";
import { Analytics } from "@/components/analytics/analytics";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/i18n/language-provider";
import { getLocale } from "@/i18n/server";
import { constructMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { draftMode } from "next/headers";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { VisualEditing } from "next-sanity";

export const metadata = constructMetadata();

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // https://youtu.be/1MTyCvS05V4?t=21464
  const session = await auth();
  const locale = await getLocale();
  // 展示（Presentation）工具要靠它和 Studio 建连：没挂它，预览页永远连不上。
  const isDraftMode = draftMode().isEnabled;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          fontBricolage.className,
          // fontSourceSans.className,
          // fontSourceSerif.className,
          // fontWorkSans.className,
          fontSourceSerif.variable,
          fontSourceSans.variable,
          fontWorkSans.variable,
          fontBricolage.variable,
        )}
      >
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LanguageProvider initialLocale={locale}>
              {children}
            </LanguageProvider>

            {/* https://sonner.emilkowal.ski/toaster */}
            <Toaster richColors position="top-right" offset={64} />

            <TailwindIndicator />

            <Analytics />
          </ThemeProvider>
        </SessionProvider>

        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
