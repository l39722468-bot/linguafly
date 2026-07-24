import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import {
  extractCheckoutIdentity,
  hasActiveStripeSubscription,
  provisionSubscriberFromPayment,
} from '@/lib/stripe/provision-subscriber';
import { supabaseAdmin } from '@/lib/supabase/client';

export const runtime = 'nodejs';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-01-28.clover' as any,
    })
  : null;

/**
 * Alta post-pago:
 * - { sessionId: "cs_..." } → verifica checkout pagado
 * - { email: "..." } → verifica suscripción Stripe activa y crea usuario en Supabase
 */
export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe no configurado' }, { status: 500 });
    }
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'SUPABASE_SERVICE_ROLE_KEY ausente (supabaseAdmin=null)' },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId.trim() : '';
    const emailRaw = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    let email = emailRaw;
    let firstName = '';
    let lastName = '';
    let planId = 'basic-monthly';
    let planName = 'Suscripción mensual';
    let stripeSessionId: string | undefined;
    let skipEmailIfAlreadyProvisioned = true;
    let forcePasswordReset = false;

    if (sessionId) {
      if (!sessionId.startsWith('cs_')) {
        return NextResponse.json({ error: 'sessionId inválido' }, { status: 400 });
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const paid =
        session.payment_status === 'paid' ||
        session.status === 'complete' ||
        session.payment_status === 'no_payment_required';

      if (!paid) {
        return NextResponse.json(
          { error: 'El pago aún no está confirmado', payment_status: session.payment_status },
          { status: 402 }
        );
      }

      const identity = extractCheckoutIdentity(session);
      if (!identity.email) {
        return NextResponse.json({ error: 'Checkout sin email' }, { status: 400 });
      }

      email = identity.email.toLowerCase();
      firstName = identity.firstName;
      lastName = identity.lastName;
      planId = identity.planId;
      planName = identity.planName;
      stripeSessionId = session.id;
    } else if (email) {
      // Ruta por email solo para admin (evita que cualquiera fuerce reset de contraseña).
      const { ensureAdmin } = await import('@/lib/admin/ensure-admin');
      const adminCheck = await ensureAdmin();
      if (!adminCheck.ok) {
        return NextResponse.json(
          { error: 'Para reparar por email necesitas sesión de administrador.' },
          { status: 403 }
        );
      }
      const paid = await hasActiveStripeSubscription(stripe, email);
      if (!paid) {
        return NextResponse.json(
          {
            ok: false,
            error:
              'No hay suscripción activa en Stripe para ese email. Revisa email exacto y modo test/live.',
            email,
          },
          { status: 402 }
        );
      }
      skipEmailIfAlreadyProvisioned = false;
      forcePasswordReset = true;
    } else {
      return NextResponse.json(
        { error: 'Indica sessionId (cs_...) o email' },
        { status: 400 }
      );
    }

    const result = await provisionSubscriberFromPayment({
      email,
      firstName,
      lastName,
      planId,
      planName,
      stripeSessionId,
      skipEmailIfAlreadyProvisioned,
      forcePasswordReset,
    });

    let authVisible = false;
    if (result.userId) {
      const { data } = await supabaseAdmin.auth.admin.getUserById(result.userId);
      authVisible = !!data?.user?.id;
    }

    const { count: profileRowsForEmail } = await supabaseAdmin
      .from('user_profiles')
      .select('*', { count: 'exact', head: true })
      .eq('email', email);

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          email,
          error: result.error || 'No se pudo crear la cuenta',
          userId: result.userId || null,
          authVisible,
          profileRowsForEmail: profileRowsForEmail ?? 0,
          whereToLook: {
            auth: 'Supabase → Authentication → Users',
            profile: 'Table Editor → user_profiles',
            projectRef: 'nprqtjljoekoirlrjxlh',
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      email,
      created: result.created,
      mailSent: result.mailSent,
      passwordReady: result.passwordReady,
      userId: result.userId,
      authVisible,
      profileRowsForEmail: profileRowsForEmail ?? 0,
      whereToLook: {
        auth: 'Supabase → Authentication → Users',
        profile: 'Table Editor → user_profiles',
        projectRef: 'nprqtjljoekoirlrjxlh',
      },
    });
  } catch (error: any) {
    console.error('❌ complete-checkout error:', error?.message || error);
    return NextResponse.json(
      { error: error?.message || 'Error al completar el alta' },
      { status: 500 }
    );
  }
}
