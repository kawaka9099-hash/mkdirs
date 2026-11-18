import { getServerT } from "@/i18n/server";

export default async function EmptyGrid() {
  const { t } = await getServerT();
  return (
    <div>
      <div className="my-8 h-32 w-full flex items-center justify-center">
        <p className="font-medium text-muted-foreground">{t("search.noResults")}</p>
      </div>
    </div>
  );
}
