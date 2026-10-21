"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import { SOCIAL_PROVIDERS } from "../constants/auth.constants";

export function SocialLoginButtons() {
  const t = useTranslations("Auth.Social");

  return (
    <div className="flex flex-col gap-2">
      {SOCIAL_PROVIDERS.map((provider) => (
        <Button key={provider} variant="secondary">
          {t(provider)}
        </Button>
      ))}
    </div>
  );
}
