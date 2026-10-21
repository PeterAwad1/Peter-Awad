import { HomeView } from "@/features/home";
import { buildLocaleMetadata } from "@/lib/metadata";
import { routes } from "@/lib/constants/routes";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return buildLocaleMetadata({ locale, pathname: routes.home, namespace: "Home" });
}

export default function HomePage() {
  return <HomeView />;
}
