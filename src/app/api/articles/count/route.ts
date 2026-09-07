import { NextResponse } from "next/server";
import { DatabaseClient, resolveCloudflareEnv } from "@/lib/db/client";

export const runtime = "nodejs";

/**
 * GET /api/articles/count
 *
 * Total number of published articles in D1.
 */
export async function GET() {
  try {
    const { env, ctx } = await resolveCloudflareEnv();
    const db = new DatabaseClient(env, ctx);
    const count = await db.getArticleCount();

    return NextResponse.json(
      { count },
      { headers: { "Cache-Control": "public, max-age=300" } }
    );
  } catch (error) {
    console.error("[api/articles/count] Error getting article count:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
