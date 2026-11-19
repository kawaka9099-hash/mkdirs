import Container from "@/components/container";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { dashboardConfig } from "@/config/dashboard";
import { getSiteSettings } from "@/data/site-settings";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const user = await currentUser();
  // console.log(`ProtectedLayout, user:`, user);
  if (!user) {
    return redirect("/auth/login");
  }

  // Logo / site name follow Studio settings; dashboard menus stay as-is.
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        scroll={false}
        config={dashboardConfig}
        siteName={settings?.siteName}
        logoSrc={settings?.logoSrc}
        logoDarkSrc={settings?.logoDarkSrc}
      />

      <main className="flex-1">
        <Container className="mt-8 pb-16">{children}</Container>
      </main>

      <Footer
        siteName={settings?.siteName}
        logoSrc={settings?.logoSrc}
        logoDarkSrc={settings?.logoDarkSrc}
      />
    </div>
  );
}
