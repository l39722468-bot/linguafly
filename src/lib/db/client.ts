/**
 * D1-backed data access layer for Linguafly articles.
 *
 * Pure access layer: no framework imports (Next.js / itty-router) so the same
 * code runs in Next.js route handlers (OpenNext) and in the standalone
 * Worker entrypoint (src/index.ts). Caching is Cloudflare-native:
 * read-through KV cache (when bound) plus `ctx.waitUntil` for non-blocking
 * writes; handlers add `Cache-Control` headers for the CDN.
 */

export interface CloudflareEnv {
  DB: D1Database;
  CACHE?: KVNamespace;
  SEARCH_INDEX?: KVNamespace;
  ARTICLES_BUCKET?: R2Bucket;
  ANALYTICS?: AnalyticsEngineDataset;
  ARTICLES_API_KEY?: string;
  ENVIRONMENT?: string;
}

/** Subset of ExecutionContext used for non-blocking cache maintenance. */
export interface WaitUntilContext {
  waitUntil(promise: Promise<unknown>): void;
}

export interface ArticleRecord {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  content: string;
  category: string;
  level?: string | null;
  views?: number;
  likes?: number;
  is_published?: number | boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ArticleInput {
  slug: string;
  title: string;
  description?: string;
  content: string;
  category: string;
  level?: string;
  tags?: string[];
}

export interface ArticleListResult {
  articles: ArticleRecord[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface BatchImportResult {
  success: boolean;
  batchNumber: number;
  count: number;
  failed: number;
}

const ARTICLE_CACHE_TTL_SECONDS = 86400; // 24h, per README.CLOUDFLARE.md
const LIST_CACHE_TTL_SECONDS = 3600; // 1h, per README.CLOUDFLARE.md
const MAX_BATCH_SIZE = 1000; // keep in sync with wrangler.toml BATCH_SIZE

function isCloudflareRuntime(): boolean {
  return (
    typeof (globalThis as { caches?: unknown }).caches !== "undefined" &&
    typeof (globalThis as { WebSocketPair?: unknown }).WebSocketPair !==
      "undefined"
  );
}

export class DatabaseClient {
  constructor(
    private env: CloudflareEnv,
    private ctx?: WaitUntilContext
  ) {}

  /** Schedule background work without blocking the response. */
  private waitUntil(promise: Promise<unknown>): void {
    if (this.ctx) {
      this.ctx.waitUntil(promise);
      return;
    }
    // Avoid unhandled rejections when no execution context is available.
    Promise.resolve(promise).catch((error) =>
      console.error("[DatabaseClient] background task failed:", error)
    );
  }

  private async cacheGet<T>(key: string): Promise<T | null> {
    if (!this.env.CACHE) return null;
    try {
      const cached = await this.env.CACHE.get(key);
      return cached ? (JSON.parse(cached) as T) : null;
    } catch (error) {
      console.error("[DatabaseClient] cache read failed:", error);
      return null;
    }
  }

  private cachePut(key: string, value: unknown, ttlSeconds: number): void {
    if (!this.env.CACHE) return;
    this.waitUntil(
      this.env.CACHE.put(key, JSON.stringify(value), {
        expirationTtl: ttlSeconds,
      })
    );
  }

  private cacheDelete(key: string): void {
    if (!this.env.CACHE) return;
    this.waitUntil(this.env.CACHE.delete(key));
  }

  private async getTags(articleId: number): Promise<string[]> {
    const { results } = await this.env.DB.prepare(
      "SELECT tag FROM article_tags WHERE article_id = ? ORDER BY tag"
    )
      .bind(articleId)
      .all();
    return (results || [])
      .map((row) => (row as { tag?: unknown }).tag)
      .filter((tag): tag is string => typeof tag === "string");
  }

  // Get single published article by slug (tags included).
  async getArticle(slug: string): Promise<(ArticleRecord & { tags: string[] }) | null> {
    const cacheKey = `article:${slug}`;
    const cached = await this.cacheGet<ArticleRecord & { tags: string[] }>(cacheKey);
    if (cached) return cached;

    const article = (await this.env.DB.prepare(
      "SELECT * FROM articles WHERE slug = ? AND is_published = 1"
    )
      .bind(slug)
      .first()) as ArticleRecord | null;

    if (!article) return null;

    const result = { ...article, tags: await this.getTags(article.id) };
    this.cachePut(cacheKey, result, ARTICLE_CACHE_TTL_SECONDS);
    return result;
  }

  // List published articles with pagination (content column excluded).
  async listArticles(page = 1, limit = 20): Promise<ArticleListResult> {
    const safePage = Math.max(1, Math.floor(page) || 1);
    const safeLimit = Math.min(Math.max(1, Math.floor(limit) || 20), 100);
    const offset = (safePage - 1) * safeLimit;

    const cacheKey = `articles:page:${safePage}:limit:${safeLimit}`;
    const cached = await this.cacheGet<ArticleListResult>(cacheKey);
    if (cached) return cached;

    const [{ results }, count] = await Promise.all([
      this.env.DB.prepare(
        "SELECT id, slug, title, description, category, level, views, likes, created_at, updated_at FROM articles WHERE is_published = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?"
      )
        .bind(safeLimit, offset)
        .all(),
      this.env.DB.prepare(
        "SELECT COUNT(*) as total FROM articles WHERE is_published = 1"
      ).first(),
    ]);

    const total = Number((count as { total?: unknown } | null)?.total ?? 0) || 0;
    const result: ArticleListResult = {
      articles: (results || []) as ArticleRecord[],
      total,
      page: safePage,
      limit: safeLimit,
      pages: total > 0 ? Math.ceil(total / safeLimit) : 0,
    };

    this.cachePut(cacheKey, result, LIST_CACHE_TTL_SECONDS);
    return result;
  }

  // Search published articles by category and/or level.
  async searchArticles(
    category?: string,
    level?: string,
    limit = 50
  ): Promise<ArticleRecord[]> {
    const safeLimit = Math.min(Math.max(1, Math.floor(limit) || 50), 100);
    let query =
      "SELECT id, slug, title, description, category, level, views, likes, created_at FROM articles WHERE is_published = 1";
    const bindings: (string | number)[] = [];

    if (category) {
      query += " AND category = ?";
      bindings.push(category);
    }

    if (level) {
      query += " AND level = ?";
      bindings.push(level);
    }

    query += " ORDER BY created_at DESC LIMIT ?";
    bindings.push(safeLimit);

    const { results } = await this.env.DB.prepare(query)
      .bind(...bindings)
      .all();
    return (results || []) as ArticleRecord[];
  }

  // Total number of published articles.
  async getArticleCount(): Promise<number> {
    const result = (await this.env.DB.prepare(
      "SELECT COUNT(*) as count FROM articles WHERE is_published = 1"
    ).first()) as { count?: unknown } | null;

    return Number(result?.count ?? 0) || 0;
  }

  /**
   * Batch upsert articles (bulk import). Uses D1 `batch()` so all statements
   * run atomically; rows with an existing slug are updated instead of failing.
   */
  async insertArticlesBatch(
    articles: ArticleInput[],
    batchNumber: number
  ): Promise<BatchImportResult> {
    const batch = articles.slice(0, MAX_BATCH_SIZE);
    const statements: D1PreparedStatement[] = [
      this.env.DB.prepare(
        "INSERT INTO import_logs (batch_number, status, imported_count, error_count) VALUES (?, ?, ?, ?)"
      ).bind(batchNumber, "processing", batch.length, 0),
    ];

    for (const article of batch) {
      statements.push(
        this.env.DB.prepare(
          `INSERT INTO articles (slug, title, description, content, category, level)
           VALUES (?, ?, ?, ?, ?, ?)
           ON CONFLICT(slug) DO UPDATE SET
             title = excluded.title,
             description = excluded.description,
             content = excluded.content,
             category = excluded.category,
             level = excluded.level,
             updated_at = CURRENT_TIMESTAMP`
        ).bind(
          article.slug,
          article.title,
          article.description ?? null,
          article.content,
          article.category,
          article.level ?? null
        )
      );

      statements.push(
        this.env.DB.prepare(
          `DELETE FROM article_tags WHERE article_id IN (SELECT id FROM articles WHERE slug = ?)`
        ).bind(article.slug)
      );

      for (const tag of article.tags ?? []) {
        statements.push(
          this.env.DB.prepare(
            `INSERT INTO article_tags (article_id, tag)
             SELECT id, ? FROM articles WHERE slug = ?`
          ).bind(tag, article.slug)
        );
      }
    }

    statements.push(
      this.env.DB.prepare(
        "UPDATE import_logs SET status = ?, completed_at = CURRENT_TIMESTAMP WHERE batch_number = ?"
      ).bind("completed", batchNumber)
    );

    try {
      const results = await this.env.DB.batch(statements);
      // Import log + upsert + tag cleanup + completion log per article batch.
      const upsertResults = results.slice(1, results.length - 1);
      const failed = upsertResults.filter((r) => !r.success).length;
      return { success: failed === 0, batchNumber, count: batch.length, failed };
    } catch (error) {
      await this.env.DB.prepare(
        "UPDATE import_logs SET status = ?, error_count = ? WHERE batch_number = ?"
      )
        .bind("failed", batch.length, batchNumber)
        .run();
      throw error;
    }
  }

  // Increment a metric counter (views/likes) for an article.
  async incrementMetrics(articleId: number, type: "views" | "likes"): Promise<void> {
    const column = type === "views" ? "views" : "likes";

    await this.env.DB.prepare(
      `UPDATE articles SET ${column} = ${column} + 1 WHERE id = ?`
    )
      .bind(articleId)
      .run();

    const article = (await this.env.DB.prepare(
      "SELECT slug FROM articles WHERE id = ?"
    )
      .bind(articleId)
      .first()) as { slug: string } | null;

    // Invalidate the per-article cache; list pages refresh when their TTL expires.
    if (article) {
      this.cacheDelete(`article:${article.slug}`);
    }
  }
}

/**
 * Resolve the Cloudflare env from the OpenNext context when running on
 * Cloudflare, or from the argument passed by the standalone Worker.
 */
export async function resolveCloudflareEnv(
  env?: CloudflareEnv
): Promise<{ env: CloudflareEnv; ctx?: WaitUntilContext }> {
  if (env) return { env };

  if (isCloudflareRuntime()) {
    try {
      const mod = await import("@opennextjs/cloudflare");
      const { env: cfEnv, ctx } = await mod.getCloudflareContext({
        async: true,
      });
      return {
        env: cfEnv as unknown as CloudflareEnv,
        ctx: ctx as WaitUntilContext,
      };
    } catch (error) {
      console.error("[DatabaseClient] Cloudflare context unavailable:", error);
    }
  }

  throw new Error(
    "Cloudflare bindings unavailable: run under OpenNext/Wrangler or pass an env explicitly"
  );
}
