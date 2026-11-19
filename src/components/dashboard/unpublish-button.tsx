"use client";

import { unpublish } from "@/actions/unpublish";
import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/language-provider";
import type { ItemInfo } from "@/types";
import { ArrowDownToLineIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnpublishButtonProps {
  item: ItemInfo;
}

export function UnpublishButton({ item }: UnpublishButtonProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const unpublishAction = () => {
    startTransition(async () => {
      unpublish(item._id)
        .then((data) => {
          if (data.status === "success") {
            console.log("unpublishAction, success:", data.message);
            router.refresh();
            toast.success(t("toast.unpublishedOk"));
          }
          if (data.status === "error") {
            console.error("unpublishAction, error:", data.message);
            toast.error(t("toast.failedUnpublish"));
          }
        })
        .catch((error) => {
          console.error("unpublishAction, error:", error);
          toast.error(t("toast.failedUnpublish"));
        });
    });
  };

  return (
    <Button
      variant="outline"
      disabled={isPending}
      onClick={unpublishAction}
      className="group overflow-hidden"
    >
      {isPending ? (
        <div className="flex items-center justify-center">
          <Icons.spinner className="mr-2 w-4 h-4 animate-spin" />
          <span>{t("dashboard.unpublish")}</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <ArrowDownToLineIcon className="mr-2 w-4 h-4 icon-scale" />
          <span>{t("dashboard.unpublish")}</span>
        </div>
      )}
    </Button>
  );
}
