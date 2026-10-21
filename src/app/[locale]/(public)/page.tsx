import { HomeView } from "@/features/home";
import { buildLocaleMetadata } from "@/lib/metadata";
import { routes } from "@/lib/constants/routes";
import type { LocalePageProps } from "@/types/next";

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  return buildLocaleMetadata({
    locale,
    pathname: routes.home,
    namespace: "Metadata",
  });
}

export default function HomePage() {
  return <HomeView />;
}
