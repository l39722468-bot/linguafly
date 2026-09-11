import type { MetadataRoute } from "next";

/**
 * URLs that Google should not spend crawl budget on.
 * Google still fetches `noindex` pages, then stops — that wastes crawl budget.
 * robots.txt prevents the fetch. See:
 * https://developers.google.com/crawling/docs/crawl-budget
 *
 * Pagination wildcards (`?page=` / `&page=`) cover /blog, category indexes and
 * vertical hubs. Do not Disallow article URLs or /sitemaps/.
 */
export const ROBOTS_DISALLOW = [
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
  "/monetag",
  "/*?page=",
  "/*&page=",
] as const;

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://linguafly.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/ads.txt", "/llms.txt"],
        disallow: [...ROBOTS_DISALLOW],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
