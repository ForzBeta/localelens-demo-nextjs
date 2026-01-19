"use client";

import { useTransition } from "react";
import { setLocale } from "@/app/actions/set-locale";

const LOCALES = ["en", "de"];

export function LocaleSwitcher({
  currentLocale,
}: {
  currentLocale: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2" title="Stored in cookie">
      <span className="text-sm text-zinc-500 dark:text-zinc-400">Locale:</span>
      {isPending && (
        <span className="text-xs text-zinc-400 dark:text-zinc-500 animate-pulse">
          Switching…
        </span>
      )}
      {LOCALES.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <button
            key={locale}
            onClick={() =>
              startTransition(() => {
                setLocale(locale);
              })
            }
            disabled={isPending || isActive}
            aria-current={isActive ? "true" : undefined}
            className={`px-2 py-1 text-sm border rounded transition-all ${
              isActive
                ? "font-semibold border-zinc-400 dark:border-zinc-500 bg-zinc-100 dark:bg-zinc-800"
                : "border-zinc-200 dark:border-zinc-700 opacity-60 hover:opacity-100 hover:border-zinc-300 dark:hover:border-zinc-600 cursor-pointer"
            }`}
          >
            {locale.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
