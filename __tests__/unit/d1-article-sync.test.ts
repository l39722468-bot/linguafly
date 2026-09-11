import { articleContentHash, articleSyncKey } from "@/lib/db/article-hash";
import {
  blogMarkdownPathToKey,
  parseArticleHashFile,
  selectArticlesToSync,
} from "@/lib/content/d1-article-sync";
import { serializeSitemapIndex } from "@/lib/content/sitemap";
import type { ArticleInput } from "@/lib/db/client";

const sample = (slug: string, content = "hello"): ArticleInput => ({
  slug,
  title: slug,
  content,
  category: "metodos",
});

describe("article content hash", () => {
  it("is stable for the same body and changes when copy changes", () => {
    const a = articleContentHash(sample("uno"));
    const b = articleContentHash(sample("uno"));
    const c = articleContentHash(sample("uno", "hello world"));
    expect(a).toBe(b);
    expect(a).not.toBe(c);
    expect(a).toHaveLength(64);
  });

  it("ignores updatedAt so a no-op weekly job does not rewrite lastmod", () => {
    const left = articleContentHash({ ...sample("uno"), updatedAt: "2026-01-01" } as ArticleInput);
    const right = articleContentHash({ ...sample("uno"), updatedAt: "2026-09-11" } as ArticleInput);
    expect(left).toBe(right);
  });
});

describe("incremental D1 selection", () => {
  it("writes everything when no fingerprints are provided", () => {
    const articles = [sample("a"), sample("b")];
    expect(selectArticlesToSync(articles).toSync).toEqual(articles);
  });

  it("writes nothing when git reports an empty delta and there are no hashes", () => {
    const articles = [sample("a"), sample("b")];
    const result = selectArticlesToSync(articles, { changedKeys: new Set() });
    expect(result.toSync).toEqual([]);
    expect(result.skipped).toBe(2);
  });

  it("skips rows whose D1 hash already matches", () => {
    const articles = [sample("a"), sample("b", "changed")];
    const hashes = new Map([
      [articleSyncKey("metodos", "a"), articleContentHash(articles[0])],
      [articleSyncKey("metodos", "b"), "outdated"],
    ]);
    const result = selectArticlesToSync(articles, { existingHashes: hashes });
    expect(result.toSync.map((row) => row.slug)).toEqual(["b"]);
    expect(result.skipped).toBe(1);
  });

  it("treats a missing D1 row as changed even if git did not list it", () => {
    const articles = [sample("nuevo")];
    const result = selectArticlesToSync(articles, { existingHashes: new Map() });
    expect(result.toSync).toHaveLength(1);
  });

  it("parses wrangler --json dumps and markdown paths", () => {
    const dump = `[
      {"results":[{"category":"metodos","slug":"a","content_hash":"abc"}],"success":true}
    ]`;
    const map = parseArticleHashFile(`noise before json\n${dump}`);
    expect(map.get("metodos/a")).toBe("abc");
    expect(blogMarkdownPathToKey("src/content/blog/gramatica/present-perfect.md")).toBe(
      "gramatica/present-perfect"
    );
    expect(blogMarkdownPathToKey("README.md")).toBeNull();
  });
});

describe("sitemap index", () => {
  it("lists only the shards that exist", () => {
    const xml = serializeSitemapIndex([{ id: 0 }, { id: 1 }], "https://linguafly.app");
    expect(xml).toContain("https://linguafly.app/sitemaps/0.xml");
    expect(xml).toContain("https://linguafly.app/sitemaps/1.xml");
    expect(xml).not.toContain("sitemaps/2.xml");
  });
});
