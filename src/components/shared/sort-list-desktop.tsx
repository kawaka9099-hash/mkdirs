"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/i18n/language-provider";
import { type SortFilterItem } from "@/lib/constants";
import { createUrl } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type SortListProps = {
  sortList: SortFilterItem[];
};

export function SortListDesktop({ sortList }: SortListProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState("");
  // Sort labels are translated by slug, not by the English label
  // in constants.ts, so the dropdown follows the chosen language.
  const sortLabelBySlug: Record<string, string> = {
    "date-asc": t("search.sortTimeAsc"),
    "name-desc": t("search.sortNameDesc"),
    "name-asc": t("search.sortNameAsc"),
  };
  const sortLabel = (item: SortFilterItem) =>
    item.slug ? (sortLabelBySlug[item.slug] ?? item.label) : t("search.sortTimeDesc");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const activeItem = sortList.find(
      (item) => searchParams.get("sort") === item.slug,
    );
    if (activeItem) {
      setActive(activeItem.slug);
    }
  }, [pathname, sortList, searchParams]);

  const generateUrl = (slug: string) => {
    const q = searchParams.get("q");
    return createUrl(
      pathname,
      new URLSearchParams({
        ...(q && { q }),
        ...(slug && { sort: slug }),
      }),
    );
  };

  const onSelectChange = (value: string) => {
    setActive(value);
    const href = generateUrl(value);
    router.push(href);
  };

  return (
    <Select onValueChange={onSelectChange} value={active}>
      <SelectTrigger className="w-[220px] h-8 text-sm">
        <SelectValue placeholder={t("search.sortTimeDesc")} />
      </SelectTrigger>
      <SelectContent className="text-sm">
        {sortList.map((item) => (
          <SelectItem
            key={item.slug}
            value={item.slug}
            className="cursor-pointer"
          >
            {sortLabel(item)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
