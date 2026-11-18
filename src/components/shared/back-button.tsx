"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
}

export default function BackButton({ className }: BackButtonProps) {
  const { t } = useLanguage();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      size="lg"
      variant="outline"
      className={cn("inline-flex items-center gap-2 group", className)}
      asChild
    >
      <Link href="#" onClick={handleBack}>
        <ArrowLeftIcon
          className="w-5 h-5 
                    transition-transform duration-200 group-hover:-translate-x-1"
        />
        <span>{t("common.back")}</span>
      </Link>
    </Button>
  );
}
