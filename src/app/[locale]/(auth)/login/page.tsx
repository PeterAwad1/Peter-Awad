import { LoginForm } from "@/features/auth";
import { routes } from "@/lib/constants/routes";
import { buildLocaleMetadata } from "@/lib/metadata";
import type { LocalePageProps } from "@/types/next";

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  return buildLocaleMetadata({
    locale,
    pathname: routes.login,
    namespace: "Auth.Login",
  });
}

export default function LoginPage() {
  return <LoginForm />;
}
