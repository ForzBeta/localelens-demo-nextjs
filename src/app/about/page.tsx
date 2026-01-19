import { cookies } from "next/headers";
import Link from "next/link";
import { getTranslations } from "@/lib/i18n";

const DEFAULT_LOCALE = "en";

export default async function About() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? DEFAULT_LOCALE;
  const { t } = await getTranslations(locale);

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t("about.title")}</h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        {t("about.description")}
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <h3 className="font-semibold">{t("about.no_framework")}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t("about.no_framework_detail")}
          </p>
        </div>
        <div>
          <h3 className="font-semibold">{t("about.server_first")}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t("about.server_first_detail")}
          </p>
        </div>
        <div>
          <h3 className="font-semibold">{t("about.cache_friendly")}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t("about.cache_friendly_detail")}
          </p>
        </div>
      </div>

      <Link
        href="/"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        ← {t("nav.home")}
      </Link>
    </main>
  );
}
