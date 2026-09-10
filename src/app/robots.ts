import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://linguafly.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/ads.txt"],
        disallow: [
          "/api/",
          "/gtag",
          "/demo-course/",
          "/cuenta/",
          "/auth/",
          "/checkout/",
          "/admin/",
          "/planes",
          "/success",
          "/mi-panel/",
          "/dashboard/",
          "/frases-en-ingles",
          "/vocabulario",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
