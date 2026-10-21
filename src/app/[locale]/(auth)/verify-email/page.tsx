import { VerifyEmailView } from "@/features/auth";
import { routes } from "@/lib/constants/routes";
import { buildLocaleMetadata } from "@/lib/metadata";
import type { LocalePageProps } from "@/types/next";

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  return buildLocaleMetadata({
    locale,
    pathname: routes.verifyEmail,
    namespace: "Auth.VerifyEmail",
  });
}

export default function VerifyEmailPage() {
  return <VerifyEmailView />;
}
