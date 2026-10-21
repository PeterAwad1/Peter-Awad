import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/constants/routes";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        {t("title")}
      </h1>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">{t("description")}</p>
      <Link
        href={routes.home}
        className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
