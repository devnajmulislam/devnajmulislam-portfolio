import type { MetadataRoute } from "next";
import { seo } from "@/data/seo";

const siteUrl = seo.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
