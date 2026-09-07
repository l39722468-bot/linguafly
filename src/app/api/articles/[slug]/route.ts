import { NextRequest, NextResponse } from "next/server";
import { DatabaseClient, resolveCloudflareEnv } from "@/lib/db/client";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/articles/:slug
 *
 * Single published article (with tags) from D1. Article views are counted
 * in D1 and, when the Analytics Engine binding is present, as data points.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const { env, ctx } = await resolveCloudflareEnv();
    const db = new DatabaseClient(env, ctx);

    const article = await db.getArticle(slug);

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Metrics/analytics are best-effort: never let their failure turn a
    // successful article fetch into a 500 response.
    const trackView = async () => {
      try {
        await db.incrementMetrics(article.id, "views");
      } catch (error) {
        console.error("[api/articles/[slug]] view metric failed:", error);
      }

      if (env.ANALYTICS) {
        try {
          await env.ANALYTICS.writeDataPoint({
            indexes: [slug],
            blobs: ["article_view"],
            doubles: [1],
          });
        } catch (error) {
          console.error("[api/articles/[slug]] analytics failed:", error);
        }
      }
    };

    if (ctx) {
      ctx.waitUntil(trackView());
    } else {
      void trackView();
    }

    return NextResponse.json(article, {
      headers: { "Cache-Control": "public, max-age=3600" },
    });
  } catch (error) {
    console.error("[api/articles/[slug]] Error fetching article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
