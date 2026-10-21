import { getTranslations } from "next-intl/server";

import { PageContainer } from "@/components/layout/page-container";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/constants/routes";

export async function HomeView() {
  const t = await getTranslations("Home");

  return (
    <PageContainer className="font-sans">
      <main className="flex flex-col items-center justify-center gap-6 text-center sm:items-start sm:text-start">
        <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {t("title")}
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {t("description")}
        </p>
        <Link
          href={routes.about}
          className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {t("cta")}
        </Link>
      </main>
    </PageContainer>
  );
}
