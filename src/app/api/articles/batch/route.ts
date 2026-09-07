import { NextRequest, NextResponse } from "next/server";
import {
  ArticleInput,
  DatabaseClient,
  resolveCloudflareEnv,
} from "@/lib/db/client";

export const runtime = "nodejs";

const MAX_BATCH_SIZE = 1000; // keep in sync with wrangler.toml BATCH_SIZE

function isArticleInput(value: unknown): value is ArticleInput {
  if (!value || typeof value !== "object") return false;
  const article = value as Record<string, unknown>;
  return (
    typeof article.slug === "string" &&
    article.slug.length > 0 &&
    article.slug.length <= 300 &&
    typeof article.title === "string" &&
    article.title.length > 0 &&
    typeof article.content === "string" &&
    article.content.length > 0 &&
    typeof article.category === "string" &&
    article.category.length > 0 &&
    (article.tags === undefined ||
      (Array.isArray(article.tags) &&
        article.tags.every((tag) => typeof tag === "string")))
  );
}

/**
 * POST /api/articles/batch (admin)
 *
 * Bulk-upsert articles into D1. Requires the `x-api-key` header to match the
 * `ARTICLES_API_KEY` secret. Body: `{ "articles": [...], "batchNumber": 1 }`.
 */
export async function POST(request: NextRequest) {
  try {
    const { env, ctx } = await resolveCloudflareEnv();

    if (!env.ARTICLES_API_KEY) {
      console.error("[api/articles/batch] ARTICLES_API_KEY is not configured");
      return NextResponse.json(
        { error: "Batch import is not configured" },
        { status: 503 }
      );
    }

    if (request.headers.get("x-api-key") !== env.ARTICLES_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { articles, batchNumber } = (body ?? {}) as {
      articles?: unknown;
      batchNumber?: unknown;
    };

    if (!Array.isArray(articles) || articles.length === 0) {
      return NextResponse.json(
        { error: "Invalid articles array" },
        { status: 400 }
      );
    }

    if (articles.length > MAX_BATCH_SIZE) {
      return NextResponse.json(
        { error: `Batch size exceeds the maximum of ${MAX_BATCH_SIZE} articles` },
        { status: 400 }
      );
    }

    if (!articles.every(isArticleInput)) {
      return NextResponse.json(
        {
          error:
            "Invalid article payload: slug, title, content and category are required strings; tags must be a string array",
        },
        { status: 400 }
      );
    }

    const batch =
      typeof batchNumber === "number" && Number.isInteger(batchNumber) && batchNumber > 0
        ? batchNumber
        : 1;

    const db = new DatabaseClient(env, ctx);
    const result = await db.insertArticlesBatch(articles, batch);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("[api/articles/batch] Error inserting articles batch:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
