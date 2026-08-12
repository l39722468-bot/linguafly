import { NextResponse, type NextRequest } from "next/server";
import { isLegacyCourseRedirectRoute } from "@/lib/routes/course-access";
import { getProductRouteRedirect } from "@/lib/product-config";

function normalizeBlogCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

/**
 * Middleware SEO/redirects only — blog gratuito sin auth.
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isStaticAsset = pathname.includes(".") || pathname.startsWith("/_next/");
  const isApi = pathname.startsWith("/api/");

  if (!isStaticAsset && !isApi && isLegacyCourseRedirectRoute(pathname)) {
    const blogUrl = request.nextUrl.clone();
    blogUrl.pathname = "/blog";
    blogUrl.searchParams.delete("next");
    return NextResponse.redirect(blogUrl, 301);
  }

  if (pathname === "/blog") {
    const category = request.nextUrl.searchParams.get("category");
    if (category) {
      const normalizedCategory = normalizeBlogCategorySlug(category);
      if (normalizedCategory) {
        const url = request.nextUrl.clone();
        url.pathname = `/blog/${normalizedCategory}`;
        url.search = "";
        return NextResponse.redirect(url, { status: 301 });
      }
    }
  }

  if (!isStaticAsset && !isApi) {
    const productRedirect = getProductRouteRedirect(pathname);
    if (productRedirect) {
      const url = request.nextUrl.clone();
      url.pathname = productRedirect;
      url.search = "";
      return NextResponse.redirect(url, 303);
    }
  }

  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp3|pdf)$).*)",
  ],
};
