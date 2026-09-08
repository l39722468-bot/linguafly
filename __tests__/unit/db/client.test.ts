import { DatabaseClient, type CloudflareEnv } from "@/lib/db/client";

/**
 * In-memory fakes for the Cloudflare D1 / KV bindings so the data access
 * layer can be tested under plain Jest (no workerd needed).
 */

type Row = Record<string, unknown>;

function createMockStatement(
  rows: Row[] = [],
  firstRow: Row | null = null
) {
  const statement = {
    bound: [] as unknown[],
    bind(...args: unknown[]) {
      statement.bound = args;
      return statement;
    },
    all: jest.fn(async () => ({ results: rows, success: true })),
    first: jest.fn(async () => firstRow),
    run: jest.fn(async () => ({ success: true, meta: {} })),
  };
  return statement;
}

function createMockDb() {
  const statements: ReturnType<typeof createMockStatement>[] = [];
  const prepare = jest.fn((sql: string) => {
    const statement = createMockStatement();
    (statement as { sql?: string }).sql = sql;
    statements.push(statement);
    return statement;
  });
  const batch = jest.fn(async (stmts: unknown[]) =>
    (stmts as { run?: unknown }[]).map(() => ({ success: true }))
  );
  return { prepare, batch, statements };
}

function createMockCache() {
  const store = new Map<string, string>();
  return {
    store,
    get: jest.fn(async (key: string) => store.get(key) ?? null),
    put: jest.fn(async (key: string, value: string) => {
      store.set(key, value);
    }),
    delete: jest.fn(async (key: string) => {
      store.delete(key);
    }),
  };
}

function createEnv(overrides: Partial<CloudflareEnv> = {}) {
  const db = createMockDb();
  const cache = createMockCache();
  const env = {
    DB: db as unknown as CloudflareEnv["DB"],
    CACHE: cache as unknown as NonNullable<CloudflareEnv["CACHE"]>,
    ...overrides,
  } as CloudflareEnv;
  return { env, db, cache };
}

describe("DatabaseClient", () => {
  describe("getArticle", () => {
    it("queries D1 by slug and hydrates tags", async () => {
      const { env, db } = createEnv();
      const article = {
        id: 7,
        slug: "hola-mundo",
        title: "Hola Mundo",
        content: "contenido",
        category: "viajes",
      };
      const articleStmt = createMockStatement([], article);
      const tagsStmt = createMockStatement([{ tag: "a1" }, { tag: "viajes" }]);
      db.prepare
        .mockReturnValueOnce(articleStmt)
        .mockReturnValueOnce(tagsStmt);

      const client = new DatabaseClient(env);
      const result = await client.getArticle("hola-mundo");

      expect(db.prepare).toHaveBeenCalledWith(
        "SELECT * FROM articles WHERE slug = ? AND is_published = 1"
      );
      expect(articleStmt.bound).toEqual(["hola-mundo"]);
      expect(result).toEqual({ ...article, tags: ["a1", "viajes"] });
    });

    it("returns null for missing articles without caching", async () => {
      const { env, db, cache } = createEnv();
      db.prepare.mockReturnValue(createMockStatement([], null));

      const client = new DatabaseClient(env);
      const result = await client.getArticle("missing");

      expect(result).toBeNull();
      expect(cache.put).not.toHaveBeenCalled();
    });

    it("still returns the article (without tags) when tag lookup fails", async () => {
      const { env, db, cache } = createEnv();
      const article = { id: 7, slug: "hola-mundo", title: "Hola Mundo" };
      const articleStmt = createMockStatement([], article);
      const failingTagsStmt = createMockStatement();
      failingTagsStmt.all = jest.fn(async () => {
        throw new Error("D1 unavailable");
      });
      db.prepare
        .mockReturnValueOnce(articleStmt)
        .mockReturnValueOnce(failingTagsStmt);

      const client = new DatabaseClient(env);
      const result = await client.getArticle("hola-mundo");

      expect(result).toEqual({ ...article, tags: [] });
      expect(cache.put).not.toHaveBeenCalled();
    });

    it("serves from the KV cache without hitting D1", async () => {
      const { env, db, cache } = createEnv();
      const article = { id: 1, slug: "cached", title: "Cached", tags: ["x"] };
      cache.store.set("article:cached", JSON.stringify(article));

      const client = new DatabaseClient(env);
      const result = await client.getArticle("cached");

      expect(result).toEqual(article);
      expect(db.prepare).not.toHaveBeenCalled();
    });
  });

  describe("listArticles", () => {
    it("paginates with clamped inputs and caches the page", async () => {
      const { env, db, cache } = createEnv();
      const listStmt = createMockStatement([{ id: 1, slug: "a" }]);
      const countStmt = createMockStatement([], { total: 41 });
      db.prepare
        .mockReturnValueOnce(listStmt)
        .mockReturnValueOnce(countStmt);

      const client = new DatabaseClient(env);
      const result = await client.listArticles(2, 5000);

      // limit clamped to 100, offset = (page - 1) * limit
      expect(listStmt.bound).toEqual([100, 100]);
      expect(result).toEqual({
        articles: [{ id: 1, slug: "a" }],
        total: 41,
        page: 2,
        limit: 100,
        pages: 1,
      });
      expect(cache.put).toHaveBeenCalledWith(
        "articles:page:2:limit:100:cat::author:",
        expect.any(String),
        expect.objectContaining({ expirationTtl: 3600 })
      );
    });
  });

  describe("searchArticles", () => {
    it("binds category and level filters", async () => {
      const { env, db } = createEnv();
      const stmt = createMockStatement([{ id: 3, slug: "b" }]);
      db.prepare.mockReturnValue(stmt);

      const client = new DatabaseClient(env);
      const results = await client.searchArticles("viajes", "A1", 10);

      const sql = (db.prepare.mock.calls[0] as string[])[0];
      expect(sql).toContain("AND category = ?");
      expect(sql).toContain("AND level = ?");
      expect(stmt.bound).toEqual(["viajes", "A1", 10]);
      expect(results).toEqual([{ id: 3, slug: "b" }]);
    });

    it("omits optional filters when not provided", async () => {
      const { env, db } = createEnv();
      const stmt = createMockStatement([]);
      db.prepare.mockReturnValue(stmt);

      const client = new DatabaseClient(env);
      await client.searchArticles();

      const sql = (db.prepare.mock.calls[0] as string[])[0];
      expect(sql).not.toContain("AND category = ?");
      expect(sql).not.toContain("AND level = ?");
      expect(stmt.bound).toEqual([50]);
    });
  });

  describe("getArticleCount", () => {
    it("returns the numeric count of published articles", async () => {
      const { env, db } = createEnv();
      db.prepare.mockReturnValue(createMockStatement([], { count: 123 }));

      const client = new DatabaseClient(env);
      await expect(client.getArticleCount()).resolves.toBe(123);
    });
  });

  describe("insertArticlesBatch", () => {
    it("runs an atomic D1 batch with upserts, tags and import logs", async () => {
      const { env, db } = createEnv();
      const client = new DatabaseClient(env);

      const result = await client.insertArticlesBatch(
        [
          {
            slug: "a1",
            title: "A1",
            content: "content",
            category: "viajes",
            tags: ["tag1", "tag2"],
          },
        ],
        5
      );

      expect(db.batch).toHaveBeenCalledTimes(1);
      const statements = db.batch.mock.calls[0][0] as {
        bound: unknown[];
      }[];

      // log + upsert + tag cleanup + 2 tag inserts + fts delete + fts insert + completion
      expect(statements).toHaveLength(8);
      expect(statements[1].bound).toEqual([
        "a1",
        "A1",
        null,
        "content",
        "viajes",
        null,
        null,
        null,
        null,
        "[]",
        0,
        null,
        null,
        "[]",
        null,
        null,
        null,
        1,
      ]);
      expect(result).toEqual({
        success: true,
        batchNumber: 5,
        count: 1,
        failed: 0,
      });
    });

    it("marks the import log as failed when the batch throws", async () => {
      const { env, db } = createEnv();
      db.batch.mockRejectedValueOnce(new Error("boom"));
      const failStmt = createMockStatement();
      db.prepare.mockReturnValue(failStmt);

      const client = new DatabaseClient(env);
      await expect(
        client.insertArticlesBatch(
          [{ slug: "x", title: "X", content: "c", category: "c" }],
          9
        )
      ).rejects.toThrow("boom");

      expect(failStmt.bound).toEqual(["failed", 1, 9]);
    });
  });

  describe("incrementMetrics", () => {
    it("increments the counter and invalidates the article cache", async () => {
      const { env, db, cache } = createEnv();
      const updateStmt = createMockStatement();
      const slugStmt = createMockStatement([], { slug: "hola-mundo" });
      db.prepare
        .mockReturnValueOnce(updateStmt)
        .mockReturnValueOnce(slugStmt);

      const client = new DatabaseClient(env);
      await client.incrementMetrics(7, "likes");

      const sql = (db.prepare.mock.calls[0] as string[])[0];
      expect(sql).toContain("SET likes = likes + 1");
      expect(updateStmt.bound).toEqual([7]);

      // cache deletion is scheduled via the fallback (no ctx) — flush microtasks
      await Promise.resolve();
      expect(cache.delete).toHaveBeenCalledWith("article:hola-mundo");
    });
  });

  describe("caching disabled", () => {
    it("works without a CACHE binding", async () => {
      const db = createMockDb();
      const article = { id: 1, slug: "a", title: "A" };
      db.prepare
        .mockReturnValueOnce(createMockStatement([], article))
        .mockReturnValueOnce(createMockStatement([]));

      const env = { DB: db as unknown as CloudflareEnv["DB"] } as CloudflareEnv;
      const client = new DatabaseClient(env);
      const result = await client.getArticle("a");

      expect(result).toEqual({ ...article, tags: [] });
    });
  });
});
