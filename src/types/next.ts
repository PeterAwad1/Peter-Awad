export type LocaleParams = Promise<{ locale: string }>;

export type LocalePageProps = {
  params: LocaleParams;
};

export type LocaleLayoutProps = {
  children: React.ReactNode;
  params: LocaleParams;
};
