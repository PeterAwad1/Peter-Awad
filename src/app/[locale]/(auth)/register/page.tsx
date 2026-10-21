import { RegisterForm } from "@/features/auth";
import { routes } from "@/lib/constants/routes";
import { buildLocaleMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/register">) {
  const { locale } = await params;
  return buildLocaleMetadata({
    locale,
    pathname: routes.register,
    namespace: "Auth.Register",
  });
}

export default function RegisterPage() {
  return <RegisterForm />;
}
