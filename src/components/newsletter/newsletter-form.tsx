"use client";

import { subscribeToNewsletter } from "@/actions/subscribe-to-newsletter";
import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/i18n/language-provider";
import {
  type NewsletterFormData,
  createNewsletterFormSchema,
} from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function NewsletterForm() {
  const { t } = useLanguage();
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(createNewsletterFormSchema(t)),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: NewsletterFormData) {
    startTransition(async () => {
      subscribeToNewsletter({ email: data.email })
        .then((data) => {
          switch (data.status) {
            case "success":
              toast.success(t("newsletter.thanks"));
              form.reset();
              break;
            default:
              toast.error(t("newsletter.errorRetry"));
          }
        })
        .catch((error) => {
          console.error("NewsletterForm, onSubmit, error:", error);
          toast.error(t("newsletter.errorGeneric"));
        });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center justify-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative space-y-0">
              <FormLabel className="sr-only">{t("newsletter.emailLabel")}</FormLabel>
              <FormControl className="rounded-r-none">
                <Input
                  type="email"
                  className={cn(
                    "w-[280px] sm:w-[320px] md:w-[400px] h-12 rounded-r-none",
                    "focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary focus:border-2 focus:border-r-0",
                  )}
                  placeholder={t("newsletter.emailPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage className="pt-2 text-sm" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-l-none size-12"
          disabled={isPending}
        >
          {isPending ? (
            <Icons.spinner className="size-6 animate-spin" aria-hidden="true" />
          ) : (
            <PaperPlaneIcon className="size-6" aria-hidden="true" />
          )}
          <span className="sr-only">{t("newsletter.subscribe")}</span>
        </Button>
      </form>
    </Form>
  );
}
