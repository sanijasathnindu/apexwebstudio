import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const productionReady = !siteConfig.url.endsWith(".example");

  return {
    rules: productionReady
      ? {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/"],
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
