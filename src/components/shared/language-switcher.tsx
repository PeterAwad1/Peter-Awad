"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  return (
    <nav aria-label={t("label")} className="flex items-center gap-2 text-sm">
      {routing.locales.map((nextLocale) => {
        const isActive = nextLocale === locale;

        return (
          <Link
            key={nextLocale}
            href={{ pathname, query }}
            locale={nextLocale as AppLocale}
            hrefLang={nextLocale}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "rounded-full bg-zinc-900 px-3 py-1 font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "rounded-full px-3 py-1 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }
          >
            {t(nextLocale)}
          </Link>
        );
      })}
    </nav>
  );
}
