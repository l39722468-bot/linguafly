/**
 * Path helpers for magazine URLs. The slug map is a small JSON index (not
 * article bodies) so Worker pages can 301 /blog/temas/{slug} to the article.
 */

import { getArticleCanonicalPath } from "@/lib/seo/article-paths";
import { getParkedPageRedirect } from "@/lib/site-catalog";

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

export function getCanonicalTopicPath(
  keywordOrSlug: string,
  fallbackCategory?: string | null,
): string {
  const slug = slugify(keywordOrSlug);
  const article = slug ? getArticleCanonicalPath(slug) : null;
  if (article) return article;
  if (fallbackCategory) return `/blog/${normalizeCategory(fallbackCategory)}`;
  return "/blog";
}

/** Rewrite parked in-article links so crawlers hit a 200, not a 301. */
export function resolveTopicHref(href: string, fallbackCategory?: string | null): string {
  if (!href || !href.startsWith("/")) return href;

  const match = href.match(/^([^?#]+)(\?[^#]*)?(#.*)?$/);
  if (!match) return href;
  const [, rawPath, search = "", hash = ""] = match;
  const path = rawPath.length > 1 && rawPath.endsWith("/") ? rawPath.slice(0, -1) : rawPath;

  if (path === "/aprender-ingles") {
    return `/idiomas${search}${hash}`;
  }

  const temaMatch = path.match(/^\/blog\/temas\/([^/]+)$/);
  if (temaMatch) {
    return `${getCanonicalTopicPath(temaMatch[1], fallbackCategory)}${search}${hash}`;
  }

  const parked = getParkedPageRedirect(
    path,
    search ? new URLSearchParams(search.startsWith("?") ? search.slice(1) : search) : null,
  );
  if (parked) return `${parked}${hash}`;

  return href;
}
