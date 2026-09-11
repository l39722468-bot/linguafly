import { getAbsoluteUrl } from "@/lib/site-brand";

export function normalizeCanonicalPath(pathname: string): string {
  const stripped = (pathname || "/").split("?")[0].split("#")[0];
  if (stripped.length > 1 && stripped.endsWith("/")) {
    return stripped.slice(0, -1);
  }
  return stripped || "/";
}

/** Canonicals never include query strings (pagination, search facets, tracking). */
export function getCanonicalSearch(
  _search?: string | URLSearchParams | null,
): string {
  return "";
}

export function getCanonicalUrl(
  pathname: string,
  search?: string | URLSearchParams | null,
): string {
  const path = normalizeCanonicalPath(pathname);
  return `${getAbsoluteUrl(path)}${getCanonicalSearch(search)}`;
}

export function canonicalLinkHeaderValue(
  pathname: string,
  search?: string | URLSearchParams | null,
): string {
  const canonical = getCanonicalUrl(pathname, search);
  return `<${canonical}>; rel="canonical", <${canonical}>; rel="alternate"; hreflang="es", <${canonical}>; rel="alternate"; hreflang="x-default"`;
}

/** Sitio solo en español: cada URL canónica se declara es y x-default. */
export function languageAlternates(canonicalUrl: string) {
  return {
    es: canonicalUrl,
    "x-default": canonicalUrl,
  };
}

export function canonicalAlternates(
  pathname: string,
  search?: string | URLSearchParams | null,
) {
  const canonical = getCanonicalUrl(pathname, search);
  return {
    canonical,
    languages: languageAlternates(canonical),
  };
}

/** HTML path for a markdown twin (`/blog/cat/slug.md` → `/blog/cat/slug`). */
export function htmlPathFromMarkdownTwin(pathname: string): string | null {
  const path = normalizeCanonicalPath(pathname);
  if (path === "/index.md") return "/";
  if (path.endsWith("/index.md")) {
    const base = path.slice(0, -"/index.md".length);
    return base || "/";
  }
  if (path.endsWith(".md")) return path.slice(0, -3) || "/";
  return null;
}

/** Markdown twin path (`/` → `/index.md`). */
export function htmlToMarkdownPath(htmlPath: string): string {
  const path = normalizeCanonicalPath(htmlPath);
  if (path === "/") return "/index.md";
  return `${path}.md`;
}

export function llmMarkdownUrl(htmlPath: string): string {
  return getAbsoluteUrl(htmlToMarkdownPath(htmlPath));
}

export function llmMarkdownAlternates(htmlPath: string) {
  const canonical = getCanonicalUrl(htmlPath);
  return {
    canonical,
    languages: languageAlternates(canonical),
    types: {
      "text/markdown": llmMarkdownUrl(htmlPath),
    },
  };
}
