import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/constants/routes";

type AuthShellProps = {
  children: React.ReactNode;
};

export async function AuthShell({ children }: AuthShellProps) {
  const t = await getTranslations("Metadata");

  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-50 dark:bg-black">
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          href={routes.home}
          className="text-sm font-semibold text-zinc-950 dark:text-zinc-50"
        >
          {t("siteName")}
        </Link>
        <Suspense fallback={null}>
          <LanguageSwitcher />
        </Suspense>
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          {children}
        </div>
      </div>
    </div>
  );
}
