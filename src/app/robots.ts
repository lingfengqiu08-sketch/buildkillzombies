import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.buildkillzombies.xyz"
  const siteUrl = SITE_URL;
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
