import { NextRequest } from "next/server";
import { buildMagazineSitemap, serializeSitemapXml } from "@/lib/content/sitemap";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
  return new Response(serializeSitemapXml(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
