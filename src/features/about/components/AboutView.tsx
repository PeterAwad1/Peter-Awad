import { getTranslations } from "next-intl/server";

import { PageContainer } from "@/components/layout/page-container";

export async function AboutView() {
  const t = await getTranslations("About");

  return (
    <PageContainer>
      <main className="flex flex-col gap-4 text-center sm:text-start">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {t("title")}
        </h1>
        <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {t("description")}
        </p>
      </main>
    </PageContainer>
  );
}
