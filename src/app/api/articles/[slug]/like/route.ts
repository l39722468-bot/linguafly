import { NextRequest, NextResponse } from "next/server";
import { DatabaseClient, resolveCloudflareEnv } from "@/lib/db/client";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * POST /api/articles/:id/like
 *
 * Increment the like counter of an article in D1.
 * The dynamic segment is named `slug` to share the tree with GET /api/articles/:slug.
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const articleId = parseInt(slug, 10);

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
    console.error("[api/articles/[slug]/like] Error liking article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
