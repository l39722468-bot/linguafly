/**
 * Path helpers for magazine URLs. The slug map is a small JSON index (not
 * article bodies) so Worker pages can 301 /blog/temas/{slug} to the article.
 */

import { getArticleCanonicalPath } from "@/lib/seo/article-paths";

export function normalizeCategory(category: string): string {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getArticlePath(article: { category: string; slug: string }): string {
  return `/blog/${normalizeCategory(article.category)}/${article.slug}`;
}

/** Par teoría ↔ cuaderno: `unidad-N-…` ↔ `unidad-N-…-ejercicios-soluciones`. */
export function getTheoryWorkbookPeerSlug(slug: string): string | null {
  if (slug.endsWith("-ejercicios-soluciones")) {
    return slug.slice(0, -"-ejercicios-soluciones".length);
  }
  return `${slug}-ejercicios-soluciones`;
}

export function getCanonicalTopicPath(keywordOrSlug: string): string {
  const slug = slugify(keywordOrSlug);
  return getArticleCanonicalPath(slug) || `/blog/temas/${slug}`;
}

export function resolveTopicHref(href: string): string {
  const match = href.match(/^\/blog\/temas\/([^?#]+)(\?[^#]*)?(#.*)?$/);
  if (!match) return href;

  const [, keywordOrSlug, search = "", hash = ""] = match;
  return `${getCanonicalTopicPath(keywordOrSlug)}${search}${hash}`;
}
