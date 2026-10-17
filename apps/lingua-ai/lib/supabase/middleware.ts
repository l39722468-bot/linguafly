import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { sessionCookieOptions } from "@/lib/supabase/cookies";
import { getPublicSupabaseEnv } from "@/lib/supabase/env";

function isPrivatePath(pathname: string): boolean {
  return pathname === "/app" || pathname.startsWith("/app/") || pathname === "/restablecer-contrasena";
}

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!getPublicSupabaseEnv()) {
    if (!isPrivatePath(pathname)) {
      return NextResponse.next({ request });
    }
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  let response = NextResponse.next({ request });
  const env = getPublicSupabaseEnv();
  if (!env) {
    return response;
  }

  const pendingCookies: { name: string; value: string; options: CookieOptions }[] = [];

  const supabase = createServerClient(env.url, env.anonKey, {
    cookieOptions: sessionCookieOptions(),
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        pendingCookies.push(...cookiesToSet);
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
    auth: {
      flowType: "pkce",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  });

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user && isPrivatePath(pathname)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    const redirectResponse = NextResponse.redirect(loginUrl);
    pendingCookies.forEach(({ name, value, options }) => {
      redirectResponse.cookies.set(name, value, options);
    });
    return redirectResponse;
  }

  return response;
}
