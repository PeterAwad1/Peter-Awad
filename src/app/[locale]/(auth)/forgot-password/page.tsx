import { ForgotPasswordForm } from "@/features/auth";
import { routes } from "@/lib/constants/routes";
import { buildLocaleMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/forgot-password">) {
  const { locale } = await params;
  return buildLocaleMetadata({
    locale,
    pathname: routes.forgotPassword,
    namespace: "Auth.ForgotPassword",
  });
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
