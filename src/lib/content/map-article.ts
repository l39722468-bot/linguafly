import { getAuthor } from "@/lib/authors";
import { SITE_BRAND_NAME } from "@/lib/site-brand";
import { normalizeCategory } from "@/lib/blog-paths";
import type { BlogPost } from "@/lib/blog";
import type { ArticleFaq, ArticleInput, ArticleRecord } from "@/lib/db/client";

function parseJsonArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value !== "string" || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function toIsoDate(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString();
}

export function articleRecordToBlogPost(
  row: ArticleRecord & { tags?: string[] }
): BlogPost {
  const faqs = parseJsonArray<ArticleFaq>(row.faqs).filter(
    (faq) => faq && typeof faq.question === "string" && typeof faq.answer === "string"
  );
  const relatedRoutes = parseJsonArray<unknown>(row.related_routes)
    .map((route) => String(route).trim())
    .filter(Boolean);
  const published =
    row.is_published === 1 || row.is_published === true || row.is_published == null;

  return {
    slug: row.slug,
    title: row.title,
    date: toIsoDate(row.created_at) || new Date().toISOString(),
    updatedDate: toIsoDate(row.updated_at),
    author: row.author || SITE_BRAND_NAME,
    authorData: getAuthor(row.author || "linguafly-team"),
    excerpt: row.excerpt || row.description || "",
    description: row.description || row.excerpt || undefined,
    category: normalizeCategory(row.category),
    readTime: row.read_time || "5 min",
    image: row.image || undefined,
    alt: row.alt || undefined,
    keywords: row.tags ?? [],
    faqs,
    relatedRoutes,
    featured: Boolean(row.featured),
    published,
    canonical: row.canonical || undefined,
    content: row.content || "",
  };
}

export function blogPostToArticleInput(article: BlogPost): ArticleInput {
  return {
    slug: article.slug,
    title: article.title,
    description: article.description || article.excerpt,
    excerpt: article.excerpt,
    content: article.content,
    category: normalizeCategory(article.category),
    tags: article.keywords,
    author: article.author,
    readTime: article.readTime,
    faqs: article.faqs,
    featured: article.featured === true,
    image: article.image,
    alt: article.alt,
    relatedRoutes: article.relatedRoutes,
    canonical: article.canonical,
    publishedAt: article.date,
    updatedAt: article.updatedDate || article.date,
    isPublished: article.published === true,
  };
}
