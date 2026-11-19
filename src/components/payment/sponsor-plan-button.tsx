"use client";

import { Button } from "@/components/ui/button";
import { XiaodouPayButton } from "@/components/payment/xiaodou-pay-button";
import { useLanguage } from "@/i18n/language-provider";
import { SponsorPlanStatus } from "@/lib/submission";
import { cn } from "@/lib/utils";
import type { ItemInfo, PricePlan } from "@/types";
import { ArrowRightIcon, ArrowUpLeftIcon, CheckCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface SponsorPlanButtonProps {
  item?: ItemInfo;
  pricePlan: PricePlan;
  className?: string;
}

export function SponsorPlanButton({
  item,
  pricePlan,
  className,
}: SponsorPlanButtonProps) {
  const { t } = useLanguage();
  const router = useRouter();

  const buttonClassName = cn(
    "overflow-hidden rounded-full",
    "group transition-transform duration-300 ease-in-out hover:scale-105",
    "bg-primary text-primary-foreground dark:bg-primary/90",
    "hover:bg-primary/90 dark:hover:bg-primary/80",
    "shadow-lg hover:shadow-xl",
    className,
  );

  if (!item) {
    // no specific item in pricing page
    return (
      <Button
        size="lg"
        variant="default"
        className={buttonClassName}
        onClick={() => router.push("/submit")}
      >
        <div className="flex items-center justify-center gap-2">
          <span>{t("dashboard.goSubmit")}</span>
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Button>
    );
  }

  if (item.sponsorPlanStatus === SponsorPlanStatus.SUCCESS) {
    // maybe published already(pay success or approved in free plan)
    return (
      <Button
        size="lg"
        variant="default"
        className={buttonClassName}
        onClick={() =>
          router.push(
            item.publishDate ? "/dashboard" : `/publish/${item._id}`,
          )
        }
      >
        {item.publishDate ? (
          <div className="flex items-center justify-center">
            <ArrowUpLeftIcon className="mr-2 size-4 icon-scale" />
            <span>{t("dashboard.goDashboard")}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <CheckCircleIcon className="mr-2 size-4 icon-scale" />
            <span>{t("dashboard.goPublish")}</span>
          </div>
        )}
      </Button>
    );
  }

  // not paid yet: pay with Xiaodou (WeChat / Alipay)
  return (
    <XiaodouPayButton item={item} pricePlan={pricePlan} className={className} />
  );
}
