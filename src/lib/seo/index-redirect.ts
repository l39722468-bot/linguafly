import { isValidArticleReturnPath } from "@/lib/blog-article-return";
import { getCanonicalUrl, normalizeCanonicalPath } from "@/lib/seo/canonical";
import { getParkedPageRedirect } from "@/lib/site-catalog";

/** Query params that must not create an indexable URL variant. */
export const TRACKING_QUERY_PARAMS = [
  "fromarticle",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "fbclid",
  "msclkid",
  "mc_cid",
  "mc_eid",
  "igshid",
  "gbraid",
  "wbraid",
  "_ga",
] as const;

const TRACKING_QUERY_PARAM_SET = new Set<string>(TRACKING_QUERY_PARAMS);

export function isWwwHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return host === "www.linguafly.app" || host.startsWith("www.");
}

export function isIndexableSitemapLoc(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    if (parsed.hostname !== "linguafly.app") return false;
    if (parsed.search || parsed.hash) return false;
    if (parsed.pathname.length > 1 && parsed.pathname.endsWith("/")) return false;
    return true;
  } catch {
    return false;
  }
}

export function withoutTrackingParams(searchParams: URLSearchParams): {
  params: URLSearchParams;
  fromArticle: string | null;
  removedTracking: boolean;
} {
  const params = new URLSearchParams(searchParams.toString());
  let fromArticle: string | null = null;
  let removedTracking = false;

  for (const key of [...params.keys()]) {
    if (!TRACKING_QUERY_PARAM_SET.has(key.toLowerCase())) continue;
    if (key.toLowerCase() === "fromarticle") {
      const value = params.get(key);
      if (value && isValidArticleReturnPath(value)) fromArticle = value;
    }
    params.delete(key);
    removedTracking = true;
  }

  return { params, fromArticle, removedTracking };
}

export type IndexRedirect = {
  destination: string;
  /** Valid internal article path to keep for the return control, only when the page itself stays. */
  fromArticle: string | null;
};

function normalizeBlogCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

/**
 * One-hop 301 target for host, protocol, trailing slash, parked routes and
 * tracking parameters. Null when the request is already the indexable URL.
 * Benign query strings such as `page` stay on the URL and are not redirected
 * by themselves.
 */
export function resolveIndexRedirect(input: {
  pathname: string;
  searchParams: URLSearchParams;
  hostname: string;
  forwardedProto: string | null;
}): IndexRedirect | null {
  const hostname = input.hostname.toLowerCase();
  const proto = (input.forwardedProto || "").split(",")[0].trim().toLowerCase();
  const www = isWwwHost(hostname);
  const forceHttps =
    proto === "http" &&
    (hostname === "linguafly.app" || hostname === "www.linguafly.app");
  const trailingSlash = input.pathname.length > 1 && input.pathname.endsWith("/");
  const { params, fromArticle, removedTracking } = withoutTrackingParams(
    input.searchParams,
  );

  let pathForCanonical = input.pathname;
  if (normalizeCanonicalPath(input.pathname) === "/blog") {
    const category = params.get("category");
    if (category) {
      const normalizedCategory = normalizeBlogCategorySlug(category);
      if (normalizedCategory) {
        pathForCanonical = `/blog/${normalizedCategory}`;
        params.delete("category");
      }
    }
  }

  const parked = getParkedPageRedirect(pathForCanonical, params);
  const destinationBase = parked
    ? getCanonicalUrl(parked)
    : getCanonicalUrl(pathForCanonical);
  const pathChanged =
    normalizeCanonicalPath(pathForCanonical) !== normalizeCanonicalPath(input.pathname);
  const mustRedirect =
    www || forceHttps || trailingSlash || removedTracking || Boolean(parked) || pathChanged;
  if (!mustRedirect) return null;

  const rest = parked ? "" : params.toString();
  const destination = rest ? `${destinationBase}?${rest}` : destinationBase;
  const sameDocument =
    normalizeCanonicalPath(input.pathname) === new URL(destinationBase).pathname;

  return {
    destination,
    fromArticle: sameDocument ? fromArticle : null,
  };
}
