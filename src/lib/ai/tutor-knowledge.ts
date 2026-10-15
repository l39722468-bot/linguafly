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
 * Small, bounded retrieval over the existing D1 full-text index. The blog
 * remains the source of truth; no separate training or article copy is needed.
 */
export async function searchTutorKnowledge(
  query: string,
  topic: string,
  limit = 3,
): Promise<TutorKnowledgeArticle[]> {
  const topicTerms = TOPIC_SEARCH_TERMS[topic] ?? TOPIC_SEARCH_TERMS.general;
  const terms = [...new Set([...tokenizeQuery(query), ...tokenizeQuery(topicTerms)])].slice(0, 10);
  if (terms.length === 0) return [];

  const ftsQuery = terms.map((term) => `"${term.replace(/"/g, "")}"`).join(" OR ");

  try {
    const cloudflare = await getCloudflareContext({ async: true });
    const env = cloudflare.env as unknown as TutorSearchEnv;
    if (!env.DB) return [];

    const safeLimit = Math.max(1, Math.min(limit, 4));
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

    return (result.results ?? [])
      .filter((row): row is Record<string, unknown> => Boolean(row && typeof row === "object"))
      .map((row) => {
        const slug = typeof row.slug === "string" ? row.slug : "";
        const category = typeof row.category === "string" ? row.category : "idiomas";
        const rawCanonical = typeof row.canonical === "string" ? row.canonical.trim() : "";
        const url = rawCanonical.startsWith("https://")
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
  } catch (error: unknown) {
    // Retrieval is best effort: a temporary D1/FTS issue must not block practice.
    console.error(
      "Tutor knowledge retrieval failed:",
      error instanceof Error ? error.name : "UnknownError",
    );
    return [];
  }
}
