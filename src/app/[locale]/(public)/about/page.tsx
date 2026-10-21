import { redirect } from "next/navigation";

import { buildLocaleMetadata } from "@/lib/metadata";
import { routes } from "@/lib/constants/routes";
import type { LocalePageProps } from "@/types/next";

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  return buildLocaleMetadata({
    locale,
    pathname: routes.about,
    namespace: "About",
  });
}

export default async function AboutPage({ params }: LocalePageProps) {
  const { locale } = await params;
  redirect(`/${locale}#about`);
}
