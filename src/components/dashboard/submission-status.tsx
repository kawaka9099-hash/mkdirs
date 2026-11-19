"use client";

import { Card } from "@/components/ui/card";
import { useLanguage } from "@/i18n/language-provider";
import {
  type BadgeStyle,
  BadgeStyles,
  FreePlanStatus,
  PricePlans,
  getBadgeStyle,
} from "@/lib/submission";
import { cn } from "@/lib/utils";
import type { ItemInfo } from "@/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { InfoIcon } from "lucide-react";

type SubmissionStatusProps = {
  item: ItemInfo;
};

function StatusWrapper({
  badgeStyle,
  children,
}: { badgeStyle: BadgeStyle; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "px-2 py-1 rounded-md text-sm font-bold capitalize",
        badgeStyle === BadgeStyles.SUCCESS && "bg-green-100 text-green-800",
        badgeStyle === BadgeStyles.DANGER && "bg-red-100 text-red-800",
        badgeStyle === BadgeStyles.WARNING && "bg-yellow-100 text-yellow-800",
        badgeStyle === BadgeStyles.NORMAL && "bg-gray-100 text-gray-800",
      )}
    >
      {children}
    </div>
  );
}

export default function SubmissionStatus({ item }: SubmissionStatusProps) {
  const { t } = useLanguage();
  const badgeStyle = getBadgeStyle(item);
  const status =
    item.pricePlan === PricePlans.FREE
      ? item.freePlanStatus
      : item.proPlanStatus;
  const statusLabelByValue: Record<string, string> = {
    approved: t("dashboard.statusApproved"),
    rejected: t("dashboard.statusRejected"),
    pending: t("dashboard.statusPending"),
    submitting: t("dashboard.statusSubmitting"),
    success: t("dashboard.statusSuccess"),
    failed: t("dashboard.statusFailed"),
  };
  const statusLabel = status ? statusLabelByValue[status] ?? status : "";

  return (
    <div>
      {status === FreePlanStatus.REJECTED ? (
        <Popover>
          <PopoverTrigger>
            <StatusWrapper badgeStyle={badgeStyle}>
              <div className="flex items-center gap-2">
                <span className="capitalize">{statusLabel}</span>
                <InfoIcon className="w-4 h-4" />
              </div>
            </StatusWrapper>
          </PopoverTrigger>
          <PopoverContent>
            <Card>
              <p className="p-4 text-red-800">{item.rejectionReason}</p>
            </Card>
          </PopoverContent>
        </Popover>
      ) : (
        <StatusWrapper badgeStyle={badgeStyle}>
          <span className="capitalize">{statusLabel}</span>
        </StatusWrapper>
      )}
    </div>
  );
}
