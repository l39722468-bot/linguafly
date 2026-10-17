import type { CookieOptions } from "@supabase/ssr";

/**
 * Shared attributes for the Supabase session cookies.
 *
 * Every current flow reads and writes those cookies on the server:
 * Server Actions, Server Components, middleware and the auth callback.
 * They all receive the Cookie header, so httpOnly does not hide the
 * session from them.
 *
 * `secure` is on only in production. `next dev` uses http://localhost:5440
 * and must be allowed to store the cookie. `next start` and Vercel run
 * with NODE_ENV=production, so the cookie is marked Secure there.
 */
export function sessionCookieOptions(): CookieOptions {
  return {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
}
