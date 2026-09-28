import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/site";
import { routing } from "@/i18n/routing";
import { SCHEMA_CONTEXT, SITE_NAME, SITE_URL } from "@/lib/site-url";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = SITE_URL;
const defaultTitle = "Build and Kill Zombies Wiki";
const defaultDescription = "Your fan-made Build and Kill Zombies wiki for codes, beginner guides, vehicle builds, weapons, and fuel tips. Upgrade your car and push for longer runs.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const image = { url: `${siteUrl}/images/hero.webp`, width: 768, height: 429, alt: "Build and Kill Zombies vehicle upgrade artwork" };
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: defaultTitle, template: "%s" },
    description: defaultDescription,
    keywords: ["Build and Kill Zombies", "Roblox", "codes", "car builds", "weapons", "parts", "fuel", "beginner guide"],
    applicationName: SITE_NAME,
    manifest: "/manifest.json",
    icons: { icon: [{ url: "/favicon-32x32.png", sizes: "32x32" }, { url: "/favicon-16x16.png", sizes: "16x16" }], apple: "/apple-touch-icon.png" },
    openGraph: { type: "website", locale, url: `${siteUrl}/${locale}`, siteName: SITE_NAME, title: defaultTitle, description: defaultDescription, images: [image] },
    twitter: { card: "summary_large_image", title: defaultTitle, description: defaultDescription, images: [image.url] },
    ...(adsenseId ? { other: { "google-adsense-account": adsenseId } } : {}),
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages({ locale });
  const organization = {
    "@context": SCHEMA_CONTEXT,
    "@type": "Organization",
    "name": SITE_NAME,
    "url": siteUrl,
    "logo": `${siteUrl}/android-chrome-512x512.png`,
    "image": `${siteUrl}/images/hero.webp`,
    "description": defaultDescription,
  };

  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  return (
    <html lang={locale} className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {adsenseId && (
          <Script
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          />
        )}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            <JsonLd data={organization} />
            <SiteHeader locale={locale} />
            {children}
            <SiteFooter locale={locale} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
