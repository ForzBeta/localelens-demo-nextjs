import { cookies } from "next/headers";
import Link from "next/link";
import { getTranslations } from "@/lib/i18n";

const DEFAULT_LOCALE = "en";

export default async function Home() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? DEFAULT_LOCALE;
  const { t, has } = await getTranslations(locale);

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t("home.title")}</h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        {t("home.description")}
      </p>

      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">
          <span className="opacity-70 mr-1.5">→</span>
          {t("home.how_it_works")}
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <li>{t("home.step_1")}</li>
          <li>{t("home.step_2")}</li>
          <li>{t("home.step_3")}</li>
        </ul>
      </div>

      <div className="border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">
          <span className="opacity-70 mr-1.5">⚠</span>
          {t("home.missing_key_title")}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
          {t("home.missing_key_description")}
        </p>
        <code className="text-sm bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded">
          t(&quot;demo.missing_key&quot;) → &quot;{t("demo.missing_key")}&quot;
        </code>
        <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
          has(&quot;demo.missing_key&quot;) → {has("demo.missing_key") ? "true" : "false"}
        </p>
      </div>

      <Link
        href="/about"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        {t("nav.about")} →
      </Link>
    </main>
  );
}
