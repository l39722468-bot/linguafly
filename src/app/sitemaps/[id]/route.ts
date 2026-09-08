import { NextRequest } from "next/server";
import type { MetadataRoute } from "next";
import { buildMagazineSitemap } from "@/lib/content/sitemap";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function toUrlset(entries: MetadataRoute.Sitemap): string {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastModified
        ? `<lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>`
        : "";
      const changefreq = entry.changeFrequency
        ? `<changefreq>${entry.changeFrequency}</changefreq>`
        : "";
      const priority =
        typeof entry.priority === "number"
          ? `<priority>${entry.priority.toFixed(1)}</priority>`
          : "";
      return `<url><loc>${entry.url}</loc>${lastmod}${changefreq}${priority}</url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await context.params;
  const id = Number.parseInt(String(rawId).replace(/\.xml$/i, ""), 10);
  if (!Number.isFinite(id) || id < 0) {
    return new Response("Not found", { status: 404 });
  }

  const entries = await buildMagazineSitemap(id, { includeLegal: true });
  return new Response(toUrlset(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
