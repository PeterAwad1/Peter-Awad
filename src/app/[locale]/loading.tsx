import { getTranslations } from "next-intl/server";

import { LoadingState } from "@/components/shared/loading-state";

export default async function Loading() {
  const t = await getTranslations("Common");

  return <LoadingState label={t("loading")} />;
}
