import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-zinc-200 px-6 py-4 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
      {t("copyright", { year: new Date().getFullYear() })}
    </footer>
  );
}
