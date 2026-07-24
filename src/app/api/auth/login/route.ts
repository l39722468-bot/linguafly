import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { syncPaidEntitlementFromStripe } from '@/lib/stripe/provision-subscriber';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = (formData.get('email') as string)?.trim() || '';
    const password = formData.get('password') as string;
    // Student login should always land on "Mi Panel".
    const callbackUrl = '/mi-panel';

    if (!email || !password) {
      return NextResponse.redirect(
        new URL(`/cuenta/login?error=missing&next=${encodeURIComponent(callbackUrl)}`, request.url),
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
          setAll(cookies: { name: string; value: string; options?: Record<string, unknown> }[]) {
            cookiesToSet.push(...cookies);
            cookies.forEach(({ name, value, options }) => {
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
        new URL(`/cuenta/login?error=auth&next=${encodeURIComponent(callbackUrl)}`, request.url),
        303
      );
    }

    if (!data.user) {
      return NextResponse.redirect(
        new URL(`/cuenta/login?error=auth&next=${encodeURIComponent(callbackUrl)}`, request.url),
        303
      );
    }

    // Sincronizar pago Stripe → user_profiles.subscription_status = active
    // (si no, las unidades 2+ siguen bloqueadas aunque el login funcione)
    try {
      const sync = await syncPaidEntitlementFromStripe({
        email: data.user.email || email,
        userId: data.user.id,
        name:
          data.user.user_metadata?.full_name ||
          data.user.user_metadata?.name ||
          '',
      });

      if (!sync.synced) {
        // Si no hay pago Stripe, asegurar que exista un perfil mínimo
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('subscription_status')
          .eq('user_id', data.user.id)
          .maybeSingle();

        if (!profile) {
          await supabase.from('user_profiles').insert({
            user_id: data.user.id,
            email: data.user.email,
            name:
              data.user.user_metadata?.full_name ||
              data.user.user_metadata?.name ||
              '',
            subscription_status: 'inactive',
            subscription_plan: 'free',
          });
        }
      }
    } catch (syncErr) {
      console.error('[auth/login] sync subscription:', syncErr);
    }

    const url = new URL(callbackUrl, request.url);
    const response = NextResponse.redirect(url, 303);
    cookiesToSet.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options ?? {});
    });
    return response;
  } catch (err) {
    console.error('[auth/login]', err);
    return NextResponse.redirect(
      new URL('/cuenta/login?error=server', request.url),
      303
    );
  }
}
