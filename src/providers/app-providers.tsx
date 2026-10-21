import { NextIntlClientProvider } from "next-intl";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
