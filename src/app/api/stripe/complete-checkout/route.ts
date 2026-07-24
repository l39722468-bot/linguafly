import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import {
  extractCheckoutIdentity,
  provisionSubscriberFromPayment,
} from '@/lib/stripe/provision-subscriber';

export const runtime = 'nodejs';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-01-28.clover' as any,
    })
  : null;

/**
 * Fallback si el webhook de Stripe falla o aún no llega:
 * la página /success llama aquí con session_id y se provisiona el alumno
 * solo si Stripe confirma que el checkout está pagado.
 */
export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe no configurado' }, { status: 500 });
    }

    const body = await request.json().catch(() => ({}));
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId.trim() : '';

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

    const result = await provisionSubscriberFromPayment({
      ...identity,
      stripeSessionId: session.id,
      // Evita regenerar contraseña / reenviar email si ya estaba provisionado
      skipEmailIfAlreadyProvisioned: true,
    });

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: result.error || 'No se pudo crear la cuenta',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      created: result.created,
      mailSent: result.mailSent,
      passwordReady: result.passwordReady,
      email: identity.email,
    });
  } catch (error: any) {
    console.error('❌ complete-checkout error:', error?.message || error);
    return NextResponse.json(
      { error: error?.message || 'Error al completar el alta' },
      { status: 500 }
    );
  }
}
