import { getAbsoluteUrl } from "@/lib/site-brand";

/** Params that create duplicate URLs of the same page. Keep them out of canonicals. */
export const CANONICAL_STRIP_PARAMS = new Set([
  "fromArticle",
  "articulo",
  "index",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
  "ref",
]);

export function normalizeCanonicalPath(pathname: string): string {
  const stripped = (pathname || "/").split("?")[0].split("#")[0];
  if (stripped.length > 1 && stripped.endsWith("/")) {
    return stripped.slice(0, -1);
  }
  return stripped || "/";
}

export function getCanonicalSearch(
  search: string | URLSearchParams | null | undefined,
): string {
  const params =
    typeof search === "string"
      ? new URLSearchParams(search.startsWith("?") ? search.slice(1) : search)
      : search
        ? new URLSearchParams(search)
        : new URLSearchParams();

  const kept = new URLSearchParams();
  const page = params.get("page");
  if (page && page !== "1" && /^\d+$/.test(page) && Number(page) > 1) {
    kept.set("page", page);
  }

  const qs = kept.toString();
  return qs ? `?${qs}` : "";
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
