import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "en-LK": absoluteUrl("/"),
          en: absoluteUrl("/"),
        },
      },
    },
    {
      url: absoluteUrl("/portfolio"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: {
          "en-LK": absoluteUrl("/portfolio"),
          en: absoluteUrl("/portfolio"),
        },
      },
    },
    {
      url: absoluteUrl("/privacy-policy"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: {
        languages: {
          "en-LK": absoluteUrl("/privacy-policy"),
          en: absoluteUrl("/privacy-policy"),
        },
      },
    },
  ];
}
