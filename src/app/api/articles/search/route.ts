import { NextRequest, NextResponse } from "next/server";
import { DatabaseClient, resolveCloudflareEnv } from "@/lib/db/client";

export const runtime = "nodejs";

/**
 * GET /api/articles/search?category=tech&level=A1
 *
 * Published articles filtered by category and/or level.
 */
export async function GET(request: NextRequest) {
  try {
    const { env, ctx } = await resolveCloudflareEnv();
    const db = new DatabaseClient(env, ctx);

    const { searchParams } = new URL(request.url);
    const category = (searchParams.get("category") || "").slice(0, 80) || undefined;
    const level = (searchParams.get("level") || "").slice(0, 10) || undefined;
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") || "50", 10) || 50, 1),
      100
    );

    const articles = await db.searchArticles(category, level, limit);

    return NextResponse.json(
      { articles },
      { headers: { "Cache-Control": "public, max-age=3600" } }
    );
  } catch (error) {
    console.error("[api/articles/search] Error searching articles:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
