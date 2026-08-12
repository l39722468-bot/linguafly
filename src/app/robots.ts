import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://linguafly.app";

  return {
    rules: [
      {
        userAgent: "Mediapartners-Google",
        allow: ["/"],
        disallow: "",
      },
      {
        userAgent: "Google-Display-Ads-Bot",
        allow: ["/"],
        disallow: "",
      },
      {
        userAgent: "AdsBot-Google",
        allow: ["/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/ads.txt"],
      },
      {
        userAgent: "Google-InspectionTool",
        allow: ["/", "/ads.txt"],
      },
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/api/",
          "/demo-course/",
          // Rutas legacy retiradas (por si quedan URLs indexadas)
          "/cuenta/",
          "/auth/",
          "/checkout/",
          "/admin/",
          "/planes",
          "/success",
          "/mi-panel/",
          "/dashboard/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
