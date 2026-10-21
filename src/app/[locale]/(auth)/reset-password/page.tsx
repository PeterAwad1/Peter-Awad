import { ResetPasswordForm } from "@/features/auth";
import { routes } from "@/lib/constants/routes";
import { buildLocaleMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/reset-password">) {
  const { locale } = await params;
  return buildLocaleMetadata({
    locale,
    pathname: routes.resetPassword,
    namespace: "Auth.ResetPassword",
  });
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
