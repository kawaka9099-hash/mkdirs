import { UserLinkForm } from "@/components/settings/user-link-form";
import { UserNameForm } from "@/components/settings/user-name-form";
import { UserPasswordForm } from "@/components/settings/user-password-form";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { currentUser } from "@/lib/auth";
import { getServerT } from "@/i18n/server";
import { constructMetadata } from "@/lib/metadata";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  const { t } = await getServerT();
  return constructMetadata({
    title: t("dashboard.settingsTitle"),
    description: t("dashboard.settingsSubtitle"),
    canonicalUrl: `${siteConfig.url}/settings`,
  });
}

export default async function SettingsPage() {
  const user = await currentUser();
  // console.log("SettingsPage, user:", user);

  if (!user) {
    console.error("SettingsPage, user not found");
    return redirect("/auth/login");
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-4">
        <UserNameForm />
        <UserLinkForm />
        <UserPasswordForm />
      </CardContent>
    </Card>
  );
}
