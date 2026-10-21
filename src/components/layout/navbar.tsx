import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/constants/routes";

export async function Navbar() {
  const t = await getTranslations("Navigation");

  return (
    <header className="flex w-full items-center justify-between gap-4 border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
      <nav className="flex items-center gap-4 text-sm font-medium">
        <Link
          href={routes.home}
          className="text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
        >
          {t("home")}
        </Link>
        <Link
          href={routes.about}
          className="text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
        >
          {t("about")}
        </Link>
        <Link
          href={routes.login}
          className="text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
        >
          {t("login")}
        </Link>
      </nav>
      <Suspense fallback={null}>
        <LanguageSwitcher />
      </Suspense>
    </header>
  );
}
