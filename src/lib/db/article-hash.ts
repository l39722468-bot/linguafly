import { createHash } from "crypto";

/** Fields that change the public HTML. Dates stay out so a no-op sync does not rewrite lastmod. */
export interface ArticleHashSource {
  slug: string;
  title: string;
  description?: string;
  excerpt?: string;
  content: string;
  category: string;
  level?: string;
  tags?: string[];
  author?: string;
  readTime?: string;
  faqs?: { question: string; answer: string }[];
  featured?: boolean;
  image?: string;
  alt?: string;
  relatedRoutes?: string[];
  canonical?: string;
  isPublished?: boolean;
}

export function articleSyncKey(category: string, slug: string): string {
  return `${category.trim()}/${slug.trim()}`;
}

export function articleContentHash(article: ArticleHashSource): string {
  const payload = {
    slug: article.slug,
    title: article.title,
    description: article.description ?? "",
    excerpt: article.excerpt ?? "",
    content: article.content,
    category: article.category,
    level: article.level ?? "",
    tags: article.tags ?? [],
    author: article.author ?? "",
    readTime: article.readTime ?? "",
    faqs: article.faqs ?? [],
    featured: Boolean(article.featured),
    image: article.image ?? "",
    alt: article.alt ?? "",
    relatedRoutes: article.relatedRoutes ?? [],
    canonical: article.canonical ?? "",
    isPublished: article.isPublished !== false,
  };
  return createHash("sha256").update(JSON.stringify(payload), "utf8").digest("hex");
}
