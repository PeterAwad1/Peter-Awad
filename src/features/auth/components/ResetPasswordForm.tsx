"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/constants/routes";

export function ResetPasswordForm() {
  const t = useTranslations("Auth.ResetPassword");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center sm:text-start">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {t("title")}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("description")}</p>
      </div>
      <form className="flex flex-col gap-4" onSubmit={(event) => event.preventDefault()}>
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t("password")}
          <Input type="password" name="password" autoComplete="new-password" required />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t("confirmPassword")}
          <Input type="password" name="confirmPassword" autoComplete="new-password" required />
        </label>
        <Button type="submit">{t("submit")}</Button>
      </form>
      <Link
        href={routes.login}
        className="text-center text-sm font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
      >
        {t("backToLogin")}
      </Link>
    </div>
  );
}
