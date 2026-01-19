import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { getTranslations } from "@/lib/i18n";
import { LocaleSwitcher } from "@/components/locale-switcher";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DEFAULT_LOCALE = "en";

export const metadata: Metadata = {
  title: "LocaleLens Demo",
  description: "Next.js i18n demo powered by LocaleLens",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? DEFAULT_LOCALE;

  const { t } = await getTranslations(locale);

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <h1 className="text-lg font-semibold">{t("app.title")}</h1>
          <LocaleSwitcher currentLocale={locale} />
        </header>
        {children}
      </body>
    </html>
  );
}
