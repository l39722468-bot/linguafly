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
 * Repara / fuerza el alta en Supabase si el pago existe en Stripe
 * pero el usuario no aparece en Auth.
 *
 * POST { email?: string, sessionId?: string }
 * - Con sessionId (cs_...): verifica checkout pagado
 * - Con email: verifica suscripción activa en Stripe
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
    const emailRaw = typeof body.email === 'string' ? body.email.trim() : '';

    let email = emailRaw.toLowerCase();
    let firstName = '';
    let lastName = '';
    let planId = 'basic-monthly';
    let planName = 'Suscripción mensual';
    let stripeSessionId: string | undefined;

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
          { error: 'Pago no confirmado', payment_status: session.payment_status },
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
      const paid = await hasActiveStripeSubscription(stripe, email);
      if (!paid) {
        return NextResponse.json(
          {
            error:
              'No hay suscripción activa en Stripe para ese email. Revisa que el email coincida con el del pago (y modo test/live).',
            email,
          },
          { status: 402 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Indica email o sessionId' },
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
      skipEmailIfAlreadyProvisioned: false,
    });

    // Verificación inmediata en Auth
    let authVisible = false;
    let authUserId: string | undefined = result.userId;
    if (result.userId) {
      const { data } = await supabaseAdmin.auth.admin.getUserById(result.userId);
      authVisible = !!data?.user?.id;
      authUserId = data?.user?.id || result.userId;
    }

    const { count: profilesCount } = await supabaseAdmin
      .from('user_profiles')
      .select('*', { count: 'exact', head: true })
      .eq('email', email);

    return NextResponse.json({
      ok: result.ok,
      email,
      created: result.created,
      passwordReady: result.passwordReady,
      mailSent: result.mailSent,
      userId: authUserId,
      authVisible,
      profileRowsForEmail: profilesCount ?? 0,
      error: result.error || null,
      whereToLook: {
        auth: 'Supabase → Authentication → Users',
        profile: 'Table Editor → user_profiles',
        projectRef: 'nprqtjljoekoirlrjxlh',
      },
    }, { status: result.ok ? 200 : 500 });
  } catch (error: any) {
    console.error('❌ repair-subscriber:', error?.message || error);
    return NextResponse.json(
      { error: error?.message || 'Error al reparar alta' },
      { status: 500 }
    );
  }
}
