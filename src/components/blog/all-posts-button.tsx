"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/language-provider";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function AllPostsButton() {
  const { t } = useLanguage();
  return (
    <Button
      size="lg"
      variant="outline"
      className="inline-flex items-center gap-2 group"
      asChild
    >
      <Link href="/blog" prefetch={false}>
        <ArrowLeftIcon
          className="w-5 h-5 
                    transition-transform duration-200 group-hover:-translate-x-1"
        />
        <span>{t("blog.allPosts")}</span>
      </Link>
    </Button>
  );
}
