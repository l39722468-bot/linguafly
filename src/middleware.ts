import { NextResponse, type NextRequest } from "next/server";
import { isLegacyCourseRedirectRoute } from "@/lib/routes/course-access";
import { getProductRouteRedirect } from "@/lib/product-config";
import { canonicalLinkHeaderValue, getCanonicalUrl } from "@/lib/seo/canonical";
import { resolveIndexRedirect } from "@/lib/seo/index-redirect";
import { linkHeaderCanonicalPath } from "@/lib/seo/unit-topic-canonical";

function normalizeBlogCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

function requestHostname(request: NextRequest): string {
  const raw =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    request.nextUrl.hostname ||
    "";
  return raw.split(",")[0].trim().split(":")[0].toLowerCase();
}

function redirectToCanonical(destUrl: string, fromArticle?: string | null): NextResponse {
  const response = NextResponse.redirect(destUrl, 301);
  response.headers.append("Link", `<${destUrl}>; rel="canonical"`);
  if (fromArticle) {
    response.cookies.set("lf_from_article", fromArticle, {
      path: "/",
      maxAge: 60 * 30,
      sameSite: "lax",
      secure: destUrl.startsWith("https://"),
    });
  }
  return response;
}

/**
 * Middleware SEO/redirects only — blog gratuito sin auth.
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isLlmMarkdown = pathname.endsWith(".md");
  const isLlmsTxt = pathname === "/llms.txt";
  const isGoogleTagGateway =
    pathname === "/gtag" || pathname.startsWith("/gtag/");
  const isStaticAsset =
    pathname.startsWith("/_next/") ||
    (pathname.includes(".") && !isLlmMarkdown && !isLlmsTxt);
  const isApi = pathname.startsWith("/api/");

  if (isGoogleTagGateway) {
    return NextResponse.next({ request });
  }

  if (!isStaticAsset && !isApi) {
    const indexRedirect = resolveIndexRedirect({
      pathname,
      searchParams: request.nextUrl.searchParams,
      hostname: requestHostname(request),
      forwardedProto: request.headers.get("x-forwarded-proto"),
    });
    if (indexRedirect) {
      return redirectToCanonical(indexRedirect.destination, indexRedirect.fromArticle);
    }
  }

  if (!isStaticAsset && !isApi && isLegacyCourseRedirectRoute(pathname)) {
    return redirectToCanonical(getCanonicalUrl("/blog"));
  }

  if (pathname === "/blog") {
    const category = request.nextUrl.searchParams.get("category");
    if (category) {
      const normalizedCategory = normalizeBlogCategorySlug(category);
      if (normalizedCategory) {
        return redirectToCanonical(getCanonicalUrl(`/blog/${normalizedCategory}`));
      }
    }
  }

  if (!isStaticAsset && !isApi) {
    const productRedirect = getProductRouteRedirect(pathname);
    if (productRedirect) {
      return redirectToCanonical(getCanonicalUrl(productRedirect));
    }
  }

  if (isLlmMarkdown) {
    const url = request.nextUrl.clone();
    url.pathname = "/api/llm-markdown";
    url.search = "";
    url.searchParams.set("path", pathname);
    return NextResponse.rewrite(url);
  }

  const response = NextResponse.next({ request });
  if (!isStaticAsset && !isApi) {
    response.headers.append(
      "Link",
      canonicalLinkHeaderValue(
        linkHeaderCanonicalPath(pathname),
        request.nextUrl.searchParams,
      ),
    );
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|gtag(?:/|$)|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp3|pdf)$).*)",
  ],
};
