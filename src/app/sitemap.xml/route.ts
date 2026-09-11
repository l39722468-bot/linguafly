import { getSiteUrl } from "@/lib/site-brand";
import {
  magazineSitemapIds,
  serializeSitemapIndex,
} from "@/lib/content/sitemap";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const ids = await magazineSitemapIds();
  const body = serializeSitemapIndex(ids, getSiteUrl());

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
