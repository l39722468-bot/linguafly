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
  return `<${getCanonicalUrl(pathname, search)}>; rel="canonical"`;
}

export function canonicalAlternates(
  pathname: string,
  search?: string | URLSearchParams | null,
) {
  return {
    canonical: getCanonicalUrl(pathname, search),
  };
}
