import { getSiteUrl } from "@/lib/site-brand";
import { magazineSitemapIds } from "@/lib/content/sitemap";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const baseUrl = getSiteUrl();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${magazineSitemapIds()
  .map(
    ({ id }) =>
      `  <sitemap><loc>${baseUrl}/sitemaps/${id}.xml</loc></sitemap>`
  )
  .join("\n")}
</sitemapindex>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
