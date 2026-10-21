import { AuthShell } from "@/components/layout/auth-shell";

export default function AuthLayout({ children }: LayoutProps<"/[locale]">) {
  return <AuthShell>{children}</AuthShell>;
}
