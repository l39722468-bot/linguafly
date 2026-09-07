import { NextRequest, NextResponse } from "next/server";
import { DatabaseClient, resolveCloudflareEnv } from "@/lib/db/client";

export const runtime = "nodejs";

/**
 * GET /api/articles?page=1&limit=20
 *
 * Paginated list of published articles stored in Cloudflare D1.
 */
export async function GET(request: NextRequest) {
  try {
    const { env, ctx } = await resolveCloudflareEnv();
    const db = new DatabaseClient(env, ctx);

    const { searchParams } = new URL(request.url);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") || "20", 10) || 20, 1),
      100
    );

    const result = await db.listArticles(page, limit);

    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, max-age=1800" },
    });
  } catch (error) {
    console.error("[api/articles] Error listing articles:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
