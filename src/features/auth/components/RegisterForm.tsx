"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/constants/routes";

import { SocialLoginButtons } from "./SocialLoginButtons";

export function RegisterForm() {
  const t = useTranslations("Auth.Register");

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
          {t("name")}
          <Input type="text" name="name" autoComplete="name" required />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t("email")}
          <Input type="email" name="email" autoComplete="email" required />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t("password")}
          <Input type="password" name="password" autoComplete="new-password" required />
        </label>
        <Button type="submit">{t("submit")}</Button>
      </form>
      <SocialLoginButtons />
      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        {t("hasAccount")}{" "}
        <Link href={routes.login} className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50">
          {t("login")}
        </Link>
      </p>
    </div>
  );
}
