import { NextRequest, NextResponse } from "next/server";
import { DatabaseClient, resolveCloudflareEnv } from "@/lib/db/client";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/articles/:id/like
 *
 * Increment the like counter of an article in D1.
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const articleId = parseInt(id, 10);

    if (!Number.isInteger(articleId) || articleId <= 0) {
      return NextResponse.json(
        { error: "Invalid article id" },
        { status: 400 }
      );
    }

    const { env, ctx } = await resolveCloudflareEnv();
    const db = new DatabaseClient(env, ctx);
    await db.incrementMetrics(articleId, "likes");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/articles/[id]/like] Error liking article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
