import type { MetadataRoute } from "next";
import { CONTENT_TYPES, getAllContentPaths } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = SITE_URL;

  // Listing pages come straight from CONTENT_TYPES so the sitemap never drifts from the navigation config
  const listingPaths: string[] = CONTENT_TYPES.map((ct) => `/${ct}`);
  const staticPaths = ["/", ...listingPaths, "/privacy-policy", "/terms-of-service", "/copyright", "/about"];

  // Dynamic paths: scan actual MDX content files
  const contentPaths = await getAllContentPaths("en");
  const dynamicPaths = contentPaths.map((item) => `/${[item.contentType, ...item.slug].join("/")}`);

  const paths = [...staticPaths, ...dynamicPaths];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("daily" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : listingPaths.includes(path) ? 0.8 : 0.6,
    })),
  );
}
