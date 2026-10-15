import { NextResponse } from "next/server";

/**
 * OAuth/email callbacks are handled by Better Auth under /api/auth.
 * Keep the historical URL safe during the migration; it no longer accepts
 * or exchanges Supabase authorization codes.
 */
export async function GET(request: Request) {
  const loginUrl = new URL("/login?error=auth", request.url);
  return NextResponse.redirect(loginUrl);
}
