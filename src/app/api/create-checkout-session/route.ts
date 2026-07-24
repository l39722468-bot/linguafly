import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { getPlanById } from '@/lib/subscription-plans';
import { getStripePriceId } from '@/lib/stripe-config';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-01-28.clover' as any,
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe no est? configurado. Por favor, contacta al administrador.' },
        { status: 500 }
      );
    }

    const { planId, email, firstName, lastName, phone, currentLevel } = await request.json();

    const plan = getPlanById(planId);
    if (!plan) {
      return NextResponse.json({ error: 'Plan de suscripci?n inv?lido' }, { status: 400 });
    }

    const stripePriceId = getStripePriceId(planId);
    let validatedPriceId = stripePriceId;
    if (stripePriceId) {
      try {
        const price = await stripe.prices.retrieve(stripePriceId);
        if (!price.active) validatedPriceId = null;
      } catch {
        validatedPriceId = null;
      }
    }

    if (!validatedPriceId) {
      console.error('[checkout] Stripe Price ID inv?lido o inactivo:', stripePriceId);
      return NextResponse.json(
        {
          error:
            'El precio de suscripci?n no est? configurado correctamente. Contacta soporte o revisa STRIPE_PRICE_BASIC_MONTHLY.',
        },
        { status: 500 }
      );
    }

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://linguafly.app').replace(/\/$/, '');

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: validatedPriceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}&next=/onboarding`,
      cancel_url: `${siteUrl}/planes`,
      customer_email: email,
      metadata: {
        planId,
        planName: plan.name,
        firstName,
        lastName,
        phone: phone || '',
        email,
        currentLevel: (currentLevel || '').toUpperCase(),
      },
      billing_address_collection: 'required',
      allow_promotion_codes: true,
      subscription_data: {
        metadata: {
          planId,
          email,
        },
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Error al crear sesi?n de pago' },
      { status: 500 }
    );
  }
}
