export type LocaleLensTranslations = Record<string, string>;

const LOCALELENS_API_BASE = "https://localelens.ai/api/v1";

export async function getTranslations(locale: string) {
  const projectId = process.env.LOCALELENS_PROJECT_ID;
  const apiKey = process.env.LOCALELENS_API_KEY;

  if (!projectId) {
    throw new Error("LocaleLens: LOCALELENS_PROJECT_ID environment variable is not set");
  }
  if (!apiKey) {
    throw new Error("LocaleLens: LOCALELENS_API_KEY environment variable is not set");
  }

  const url = `${LOCALELENS_API_BASE}/projects/${projectId}/translations/${locale}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`LocaleLens: failed to fetch translations for locale "${locale}"`);
  }

  const translations: LocaleLensTranslations = Object.freeze(await res.json());

  const t = (key: string): string => {
    return translations[key] ?? key;
  };

  const has = (key: string): boolean => {
    return key in translations;
  };

  return { t, has, translations };
}
