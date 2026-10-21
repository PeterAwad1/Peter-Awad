import { AboutView } from "@/features/about";
import { buildLocaleMetadata } from "@/lib/metadata";
import { routes } from "@/lib/constants/routes";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  return buildLocaleMetadata({
    locale,
    pathname: routes.about,
    namespace: "About",
  });
}

export default function AboutPage() {
  return <AboutView />;
}
