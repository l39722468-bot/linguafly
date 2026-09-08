import { NextRequest, NextResponse } from "next/server";
import { searchPublishedArticles } from "@/lib/content/articles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").slice(0, 200);
  const category = (searchParams.get("category") || "all").slice(0, 80);
  const rawMatch = searchParams.get("match") || searchParams.get("m");
  const match: "any" | "all" =
    rawMatch === "all" ? "all" : "any";
  const limit = Math.min(
    Math.max(parseInt(searchParams.get("limit") || "24", 10) || 24, 1),
    100
  );
  const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10) || 0, 0);

  try {
    const { hits, total } = await searchPublishedArticles({
      query: q,
      category,
      match,
      limit,
      offset,
    });
    return NextResponse.json(
      { hits, total, q, category, match, limit, offset },
      { headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" } }
    );
  } catch (e) {
    console.error("[api/blog/search]", e);
    return NextResponse.json(
      { error: "No se pudo completar la búsqueda", hits: [], total: 0 },
      { status: 500 }
    );
  }
}
