import { BannerAd } from "@/components/layout/banner-ad";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { marketingConfig } from "@/config/marketing";
import { getSiteSettings } from "@/data/site-settings";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const settings = await getSiteSettings();
  return (
    <div className="flex flex-col min-h-screen">
      {/* <div className="sticky top-0 z-50">
        <BannerAd />
        <Navbar scroll={true} config={marketingConfig} />
      </div> */}
      <Navbar
        scroll={true}
        config={marketingConfig}
        siteName={settings?.siteName}
        logoSrc={settings?.logoSrc}
        logoDarkSrc={settings?.logoDarkSrc}
        customMenus={settings?.navMenu}
      />
      <main className="flex-1">{children}</main>
      <Footer
        siteName={settings?.siteName}
        logoSrc={settings?.logoSrc}
        logoDarkSrc={settings?.logoDarkSrc}
      />
    </div>
  );
}
