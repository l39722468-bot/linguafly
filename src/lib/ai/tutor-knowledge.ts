import { getCloudflareContext } from "@opennextjs/cloudflare";

export type TutorKnowledgeArticle = {
  title: string;
  slug: string;
  category: string;
  level: string | null;
  url: string;
  excerpt: string;
};

type D1Statement = {
  bind(...values: (string | number)[]): {
    all(): Promise<{ results?: unknown[] }>;
  };
};

type TutorSearchEnv = {
  DB?: { prepare(query: string): D1Statement };
};

const TOPIC_SEARCH_TERMS: Record<string, string> = {
  general: "conversation speaking everyday english dialogue",
  social: "everyday life family friends daily routine conversation",
  travel: "travel airport hotel restaurant directions holiday vacation",
  business: "business work job interview email meeting professional",
  grammar: "grammar verb tense past simple present perfect preposition",
  exams: "Cambridge IELTS TOEFL exam speaking writing",
  vocabulary: "vocabulary words phrases expressions meaning",
};

const HOT_CACHE_TTL_MS = 10 * 60 * 1000;
const MAX_HOT_CACHE_ENTRIES = 128;
const PERSONAL_QUERY = /\b(?:my name|my address|my phone|my email|my password|mi nombre|mi direcci[oó]n|mi tel[eé]fono|mi correo|mi contrase[nñ]a|i live at|vivo en la calle)\b/i;
const knowledgeHotCache = new Map<string, { expiresAt: number; articles: TutorKnowledgeArticle[] }>();

const STOP_WORDS = new Set([
  "the", "and", "for", "are", "you", "your", "with", "what", "want", "would",
  "like", "practice", "practise", "please", "about", "have", "from", "that",
  "this", "into", "today", "level", "learn", "know", "english", "could",
  "can", "how", "tell", "help", "me", "my", "is", "in", "on", "to", "of",
]);

function tokenizeQuery(value: string): string[] {
  return [...new Set(
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .map((token) => token.trim())
      .filter((token) => token.length >= 3 && !STOP_WORDS.has(token)),
  )].slice(0, 10);
}

function stripMarkup(value: string): string {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_\x60~]/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Every published article is already stored in D1 and indexed by articles_fts,
 * including its full text. This isolate-local hot cache avoids repeating the
 * same FTS query for common, non-personal topics without duplicating the blog
 * corpus or persisting learners' question text.
 */
async function makeHotCacheKey(terms: string[], topic: string, limit: number): Promise<string> {
  const identity = `tutor-knowledge-v1\u001f${topic}\u001f${limit}\u001f${terms.join(" ")}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(identity));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function cloneArticles(articles: TutorKnowledgeArticle[]): TutorKnowledgeArticle[] {
  return articles.map((article) => ({ ...article }));
}

function getHotCachedArticles(key: string): TutorKnowledgeArticle[] | null {
  const entry = knowledgeHotCache.get(key);
  if (!entry) return null;
  if (entry.expiresAt <= Date.now()) {
    knowledgeHotCache.delete(key);
    return null;
  }
  // Refresh insertion order so frequently used entries survive the bounded LRU.
  knowledgeHotCache.delete(key);
  knowledgeHotCache.set(key, entry);
  return cloneArticles(entry.articles);
}

function setHotCachedArticles(key: string, articles: TutorKnowledgeArticle[]): void {
  if (articles.length === 0) return;
  knowledgeHotCache.delete(key);
  knowledgeHotCache.set(key, { expiresAt: Date.now() + HOT_CACHE_TTL_MS, articles: cloneArticles(articles) });
  while (knowledgeHotCache.size > MAX_HOT_CACHE_ENTRIES) {
    const oldestKey = knowledgeHotCache.keys().next().value;
    if (typeof oldestKey !== "string") break;
    knowledgeHotCache.delete(oldestKey);
  }
}

export function clearTutorKnowledgeHotCacheForTests(): void {
  knowledgeHotCache.clear();
}
export async function searchTutorKnowledge(
  query: string,
  topic: string,
  limit = 3,
): Promise<TutorKnowledgeArticle[]> {
  const topicTerms = TOPIC_SEARCH_TERMS[topic] ?? TOPIC_SEARCH_TERMS.general;
  const terms = [...new Set([...tokenizeQuery(query), ...tokenizeQuery(topicTerms)])].slice(0, 10);
  if (terms.length === 0) return [];

  const ftsQuery = terms.map((term) => `"${term.replace(/"/g, "")}"`).join(" OR ");
  const safeLimit = Math.max(1, Math.min(limit, 4));
  const safeToCache = query.length <= 180 && !PERSONAL_QUERY.test(query) && !/@|\b\\d{7,}\b/.test(query);
  let hotCacheKey: string | null = null;

  if (safeToCache) {
    try {
      hotCacheKey = await makeHotCacheKey(terms, topic, safeLimit);
      const cached = getHotCachedArticles(hotCacheKey);
      if (cached) return cached;
    } catch {
      // Hashing/cache is an optional optimisation; the indexed D1 search remains available.
    }
  }

  try {
    const cloudflare = await getCloudflareContext({ async: true });
    const env = cloudflare.env as unknown as TutorSearchEnv;
    if (!env.DB) return [];
    const result = await env.DB.prepare(`
      SELECT
        a.title AS title,
        a.slug AS slug,
        a.category AS category,
        a.level AS level,
        a.canonical AS canonical,
        COALESCE(
          snippet(articles_fts, 6, '', '', ' … ', 34),
          a.excerpt,
          a.description,
          substr(a.content, 1, 1200)
        ) AS excerpt
      FROM articles_fts
      INNER JOIN articles a
        ON a.slug = articles_fts.slug AND a.category = articles_fts.category
      WHERE articles_fts MATCH ?
        AND a.is_published = 1
        AND a.category IN (
          'idiomas', 'actualidad', 'gramatica', 'viajes', 'trabajo',
          'examenes', 'metodos', 'habilidades',
          'curso-a1', 'curso-a2', 'curso-b1', 'curso-b2', 'curso-c1', 'curso-c2'
        )
      ORDER BY bm25(articles_fts)
      LIMIT ?
    `).bind(ftsQuery, safeLimit).all();

    const articles = (result.results ?? [])
      .filter((row): row is Record<string, unknown> => Boolean(row && typeof row === "object"))
      .map((row) => {
        const slug = typeof row.slug === "string" ? row.slug : "";
        const category = typeof row.category === "string" ? row.category : "idiomas";
        const rawCanonical = typeof row.canonical === "string" ? row.canonical.trim() : "";
        const url = rawCanonical.startsWith("https://linguafly.app/")
          ? rawCanonical
          : rawCanonical.startsWith("/")
            ? `https://linguafly.app${rawCanonical}`
            : `https://linguafly.app/blog/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`;
        const excerptValue = typeof row.excerpt === "string" ? row.excerpt : "";
        return {
          title: typeof row.title === "string" ? row.title : slug,
          slug,
          category,
          level: typeof row.level === "string" ? row.level : null,
          url,
          excerpt: stripMarkup(excerptValue).slice(0, 1400),
        };
      })
      .filter((article) => article.title && article.excerpt);

    if (safeToCache && hotCacheKey) setHotCachedArticles(hotCacheKey, articles);
    return articles;
  } catch (error: unknown) {
    // Retrieval is best effort: a temporary D1/FTS issue must not block practice.
    console.error(
      "Tutor knowledge retrieval failed:",
      error instanceof Error ? error.name : "UnknownError",
    );
    return [];
  }
}
