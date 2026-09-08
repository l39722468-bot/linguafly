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
          "/demo-course/",
          "/cuenta/",
          "/auth/",
          "/checkout/",
          "/admin/",
          "/planes",
          "/success",
          "/mi-panel/",
          "/dashboard/",
          "/curso-a1",
          "/curso-a2",
          "/curso-b1",
          "/curso-b2",
          "/curso-c1",
          "/curso-c2",
          "/frases-en-ingles",
          "/vocabulario",
          "/aprender-ingles",
          "/blog/gramatica",
          "/blog/viajes",
          "/blog/trabajo",
          "/blog/examenes",
          "/blog/metodos",
          "/blog/temas",
          "/blog/curso-a1",
          "/blog/curso-a2",
          "/blog/curso-b1",
          "/blog/curso-b2",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
