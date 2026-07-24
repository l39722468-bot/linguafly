import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    let callbackUrl = (formData.get('callbackUrl') as string) || '/admin';

    if (callbackUrl.startsWith('http')) {
      try {
        const u = new URL(callbackUrl);
        callbackUrl = u.pathname + u.search;
      } catch {
        callbackUrl = '/admin';
      }
    }

    // Evitar open-redirect: solo permitimos rutas del panel admin.
    if (!callbackUrl.startsWith('/admin')) {
      callbackUrl = '/admin';
    }

    if (!email || !password) {
      return NextResponse.redirect(
        new URL(
          `/cuenta/login-admin?error=missing&next=${encodeURIComponent(callbackUrl)}`,
          request.url
        ),
        303
      );
    }

    const cookieStore = await cookies();
    const cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[] = [];

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSetInner) {
            cookiesToSet.push(...cookiesToSetInner);
            cookiesToSetInner.forEach(({ name, value, options }) => {
              try {
                cookieStore.set(name, value, options ?? {});
              } catch {
                // Ignorar en Server Components
              }
            });
          },
        },
      }
    );

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return NextResponse.redirect(
        new URL(
          `/cuenta/login-admin?error=auth&next=${encodeURIComponent(callbackUrl)}`,
          request.url
        ),
        303
      );
    }

    if (!data.user) {
      return NextResponse.redirect(
        new URL(
          `/cuenta/login-admin?error=auth&next=${encodeURIComponent(callbackUrl)}`,
          request.url
        ),
        303
      );
    }

    // Validar rol admin (service role evita fallos de RLS)
    let role: string | null = null;
    if (supabaseAdmin) {
      const { data: profile } = await supabaseAdmin
        .from('user_profiles')
        .select('role')
        .eq('user_id', data.user.id)
        .maybeSingle();
      role = profile?.role ?? null;
    } else {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('user_id', data.user.id)
        .maybeSingle();
      role = profile?.role ?? null;
    }

    if (role !== 'admin') {
      return NextResponse.redirect(
        new URL(
          `/cuenta/login-admin?error=forbidden&next=${encodeURIComponent(callbackUrl)}`,
          request.url
        ),
        303
      );
    }

    const url = new URL(callbackUrl, request.url);
    const response = NextResponse.redirect(url, 303);

    cookiesToSet.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options ?? {});
    });

    return response;
  } catch (err) {
    console.error('[auth/login-admin]', err);
    return NextResponse.redirect(new URL('/cuenta/login-admin?error=server', request.url), 303);
  }
}
