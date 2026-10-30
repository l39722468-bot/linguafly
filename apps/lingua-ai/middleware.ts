import { NextResponse, type NextRequest } from "next/server";

/**
 * Do not perform auth/database work in Next middleware. The protected route
 * checks Better Auth's validated session server-side; this middleware only
 * continues the request and must not depend on Supabase environment values.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
