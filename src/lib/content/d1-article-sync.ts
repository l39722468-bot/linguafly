import type { ArticleInput } from "@/lib/db/client";
import { articleContentHash, articleSyncKey } from "@/lib/db/article-hash";

export type ArticleHashMap = Map<string, string | null>;

export interface SelectArticlesToSyncOptions {
  /** Rewrite every public markdown row. Use when D1 is empty or hashes are unavailable. */
  forceAll?: boolean;
  /** category/slug → sha256 from D1. Null/empty means the row has never been hashed. */
  existingHashes?: ArticleHashMap;
  /** category/slug keys from git (or a weekly generator delta). */
  changedKeys?: Set<string>;
}

export interface SelectArticlesToSyncResult {
  toSync: ArticleInput[];
  skipped: number;
}

function extractResultRows(raw: unknown): Record<string, unknown>[] {
  if (Array.isArray(raw)) {
    if (
      raw.length > 0 &&
      raw[0] &&
      typeof raw[0] === "object" &&
      "results" in (raw[0] as object)
    ) {
      return (raw as { results?: unknown }[]).flatMap((block) =>
        Array.isArray(block.results) ? (block.results as Record<string, unknown>[]) : []
      );
    }
    return raw as Record<string, unknown>[];
  }
  if (raw && typeof raw === "object" && "results" in raw) {
    const results = (raw as { results: unknown }).results;
    if (Array.isArray(results)) return results as Record<string, unknown>[];
  }
  return [];
}

/** Parse wrangler `d1 execute --json` output or a plain array of {category,slug,content_hash}. */
export function parseArticleHashRows(raw: unknown): ArticleHashMap {
  const map: ArticleHashMap = new Map();
  for (const row of extractResultRows(raw)) {
    if (!row || typeof row !== "object") continue;
    const category = String(row.category ?? "").trim();
    const slug = String(row.slug ?? "").trim();
    if (!category || !slug) continue;
    const hashValue = row.content_hash;
    const hash =
      hashValue == null || hashValue === "" ? null : String(hashValue);
    map.set(articleSyncKey(category, slug), hash);
  }
  return map;
}

export function parseArticleHashFile(text: string): ArticleHashMap {
  const trimmed = text.trim();
  const start = trimmed.search(/[\[{]/);
  if (start === -1) return new Map();
  const parsed = JSON.parse(trimmed.slice(start)) as unknown;
  return parseArticleHashRows(parsed);
}

/** `src/content/blog/{category}/{slug}.md` → `category/slug`. */
export function blogMarkdownPathToKey(filePath: string): string | null {
  const normalized = filePath.replaceAll("\\", "/");
  const match = normalized.match(
    /(?:^|\/)src\/content\/blog\/([^/]+)\/([^/]+)\.mdx?$/
  );
  if (!match) return null;
  return articleSyncKey(match[1], match[2]);
}

export function blogMarkdownPathsToKeys(paths: string[]): Set<string> {
  const keys = new Set<string>();
  for (const path of paths) {
    const key = blogMarkdownPathToKey(path);
    if (key) keys.add(key);
  }
  return keys;
}

export function selectArticlesToSync(
  articles: ArticleInput[],
  options: SelectArticlesToSyncOptions = {}
): SelectArticlesToSyncResult {
  const { forceAll, existingHashes, changedKeys } = options;
  const hasHashes = existingHashes !== undefined;
  const hasChangedKeys = changedKeys !== undefined;

  if (forceAll || (!hasHashes && !hasChangedKeys)) {
    return { toSync: articles, skipped: 0 };
  }

  const toSync: ArticleInput[] = [];
  let skipped = 0;

  for (const article of articles) {
    const key = articleSyncKey(article.category, article.slug);
    const hash = articleContentHash(article);
    const stored = existingHashes?.get(key);
    const missingInD1 = hasHashes && !existingHashes!.has(key);
    const hashDiffers = hasHashes && stored !== hash;
    const listedAsChanged = hasChangedKeys && changedKeys!.has(key);

    if (missingInD1 || hashDiffers || listedAsChanged) {
      toSync.push(article);
    } else {
      skipped += 1;
    }
  }

  return { toSync, skipped };
}
