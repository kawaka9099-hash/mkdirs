"use client";

import { updateUserPassword } from "@/actions/update-password";
import { SectionColumns } from "@/components/settings/section-columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useLanguage } from "@/i18n/language-provider";
import { type UserPasswordData, createUserPasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Icons } from "../icons/icons";

export function UserPasswordForm() {
  const { t } = useLanguage();
  const user = useCurrentUser();
  if (!user || user.isOAuth) {
    console.log("UserPasswordForm, oauth user has no password");
    return null;
  }

  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UserPasswordData>({
    resolver: zodResolver(createUserPasswordSchema(t)),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      updateUserPassword(values)
        .then((data) => {
          if (data.status === "error") {
            console.log("UserPasswordForm, error:", data.message);
            toast.error(data.message);
          }
          if (data.status === "success") {
            console.log("UserPasswordForm, success:", data.message);
            update();
            form.reset();
            toast.success(data.message);
          }
        })
        .catch(() => {
          toast.error(t("toast.somethingWrong"));
        });
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <SectionColumns
        title={t("settings.changePassword")}
        description={t("settings.changePasswordDesc")}
      >
        <div className="flex flex-col gap-4 w-full rounded-lg border p-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">{t("settings.currentPassword")}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("settings.currentPasswordPlaceholder")}
              {...form.register("password")}
            />
            <div className="flex flex-col justify-between p-1">
              {form.formState.errors?.password && (
                <p className="pb-0.5 text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="newPassword">{t("settings.newPassword")}</Label>
            <Input
              id="newPassword"
              type="password"
              {...form.register("newPassword")}
              placeholder={t("settings.newPasswordPlaceholder")}
            />
            <div className="flex flex-col justify-between p-1">
              {form.formState.errors?.newPassword && (
                <p className="pb-0.5 text-sm text-red-500">
                  {form.formState.errors.newPassword.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">{t("settings.confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...form.register("confirmPassword")}
              placeholder={t("settings.confirmPasswordPlaceholder")}
            />
            <div className="flex flex-col justify-between p-1">
              {form.formState.errors?.confirmPassword && (
                <p className="pb-0.5 text-sm text-red-500">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-start">
            <Button
              type="submit"
              disabled={isPending}
              className=""
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Icons.spinner className="size-4 animate-spin" />
                  <p>{t("submit.updating")}</p>
                </div>
              ) : (
                <p>{t("settings.updatePassword")}</p>
              )}
            </Button>
          </div>
        </div>
      </SectionColumns>
    </form>
  );
}
