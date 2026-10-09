import premiumKeysJson from "@/lib/content/premium-articles.json";
import { normalizeCategory } from "@/lib/blog-paths";

const PAYWALL_MARKER = /<!--\s*paywall\s*-->/i;
const TEASER_PARAGRAPHS = 2;
const TEASER_WORDS = 120;

/** Headings, rules and callout quotes do not count as the preview itself. */
function isStructuralBlock(block: string): boolean {
  const text = block.trim();
  if (!text || text === "---" || text === "***") return true;
  if (/^#{1,6}\s+\S/.test(text) && !text.includes("\n")) return true;
  if (text.startsWith(">")) return true;
  return false;
}

const premiumKeys = new Set(
  (premiumKeysJson as string[])
    .map((key) => key.trim().toLowerCase())
    .filter(Boolean),
);

export function parsePremiumFlag(value: unknown): boolean {
  return value === true || value === 1 || value === "1" || value === "true" || value === "yes";
}

export function premiumArticleKey(category: string, slug: string): string {
  return `${normalizeCategory(category)}/${slug.trim().toLowerCase()}`;
}

export function isPremiumArticle(article: {
  premium?: boolean;
  category: string;
  slug: string;
}): boolean {
  if (article.premium === true) return true;
  return premiumKeys.has(premiumArticleKey(article.category, article.slug));
}

/**
 * Public preview of a premium article. Prefer an explicit `<!-- paywall -->`
 * marker; otherwise keep the first two paragraphs, capped at 120 words.
 * The remainder never leaves the server.
 */
export function premiumTeaser(content: string): string {
  const raw = content.replace(/\r\n/g, "\n").trim();
  if (!raw) return "";
  const marker = raw.search(PAYWALL_MARKER);
  if (marker >= 0) return raw.slice(0, marker).trim();

  const blocks = raw
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const picked: string[] = [];
  let proseBlocks = 0;
  let words = 0;
  for (const block of blocks) {
    picked.push(block);
    if (!isStructuralBlock(block)) {
      proseBlocks += 1;
      words += block.split(/\s+/).filter(Boolean).length;
    }
    if (proseBlocks >= TEASER_PARAGRAPHS || words >= TEASER_WORDS) break;
  }
  let teaser = picked.join("\n\n");
  const teaserWords = teaser.split(/\s+/).filter(Boolean);
  if (teaserWords.length > TEASER_WORDS) {
    teaser = `${teaserWords.slice(0, TEASER_WORDS).join(" ")}…`;
  }
  return teaser;
}

type Redactable = {
  premium?: boolean;
  category: string;
  slug: string;
  content: string;
  faqs?: { question: string; answer: string }[];
  downloadPdf?: boolean;
};

export function redactPremiumArticle<T extends Redactable>(article: T): T {
  if (!isPremiumArticle(article)) return article;
  return {
    ...article,
    content: premiumTeaser(article.content),
    faqs: [],
    downloadPdf: false,
  };
}

/** Body stored in public search indexes. Full text stays in `articles.content`. */
export function indexableArticleBody(article: {
  premium?: boolean;
  category: string;
  slug: string;
  content: string;
}): string {
  return isPremiumArticle(article) ? premiumTeaser(article.content) : article.content;
}

export function redactPublicArticleRecord<T extends {
  premium?: number | boolean | null;
  category: string;
  slug: string;
  content?: string | null;
  faqs?: string | null;
}>(row: T): T {
  const premium = isPremiumArticle({
    premium: parsePremiumFlag(row.premium),
    category: row.category,
    slug: row.slug,
  });
  if (!premium) return row;
  return {
    ...row,
    content: premiumTeaser(row.content || ""),
    faqs: "[]",
  };
}
