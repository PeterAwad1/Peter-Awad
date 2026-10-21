import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/constants/routes";

export async function VerifyEmailView() {
  const t = await getTranslations("Auth.VerifyEmail");

  return (
    <div className="flex flex-col gap-6 text-center sm:text-start">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {t("title")}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("description")}</p>
      </div>
      <Link
        href={routes.login}
        className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {t("backToLogin")}
      </Link>
    </div>
  );
}
