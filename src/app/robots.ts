import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.focus-on-english.com";

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
      // Explícito para evitar falsos positivos en validadores de AdSense / GTM
      // (el bloque * sigue aplicando a otros bots; Googlebot no queda “solo” en *).
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
          "/cuenta/",
          "/dashboard/",
          "/api/",
          "/auth/",
          "/checkout/",
          "/admin/",
          "/planes",
          "/success",
          "/mi-panel/",
          "/curso/",
          "/curso-a1/",
          "/curso-a2/",
          "/curso-b1/",
          "/curso-b2/",
          "/demo-course/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
