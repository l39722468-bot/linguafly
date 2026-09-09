import articleCanonicalPaths from "@/lib/seo/article-canonical-paths.json";

const ARTICLE_CANONICAL_PATHS = articleCanonicalPaths as Record<string, string>;

/** `/blog/{category}/{slug}` for a markdown article slug, if it exists. */
export function getArticleCanonicalPath(slug: string): string | null {
  const key = slug.replace(/^\/+|\/+$/g, "");
  return ARTICLE_CANONICAL_PATHS[key] || null;
}
