import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Callback de Supabase Auth (PKCE).
 * El email de recuperación redirige aquí con ?code=...
 * Intercambiamos el code por sesión y mandamos a /cuenta/resetear.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const nextRaw = url.searchParams.get('next') || '/cuenta/resetear';
  const next = nextRaw.startsWith('/') ? nextRaw : '/cuenta/resetear';
  const siteOrigin =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || url.origin;

  const redirectUrl = `${siteOrigin}${next}`;
  const errorUrl = `${siteOrigin}/cuenta/recuperar?error=link_invalid`;

  if (!code) {
    return NextResponse.redirect(redirectUrl);
  }

  const cookieStore = await cookies();
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nprqtjljoekoirlrjxlh.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  let response = NextResponse.redirect(redirectUrl);

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          try {
            cookieStore.set(name, value, options);
          } catch {
            // ignore
          }
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.error('❌ auth/callback exchangeCodeForSession:', error.message);
    response = NextResponse.redirect(errorUrl);
  }

  return response;
}
