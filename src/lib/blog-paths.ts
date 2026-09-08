/**
 * Path helpers for magazine URLs. Kept free of filesystem / generated JSON
 * so Cloudflare Worker pages can import them without embedding article bodies.
 */

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
  return `/blog/temas/${slugify(keywordOrSlug)}`;
}

export function resolveTopicHref(href: string): string {
  const match = href.match(/^\/blog\/temas\/([^?#]+)(\?[^#]*)?(#.*)?$/);
  if (!match) return href;

  const [, keywordOrSlug, search = "", hash = ""] = match;
  return `${getCanonicalTopicPath(keywordOrSlug)}${search}${hash}`;
}
