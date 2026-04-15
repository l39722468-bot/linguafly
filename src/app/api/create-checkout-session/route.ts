import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { getPlanById } from '@/lib/subscription-plans';
import { getStripePriceId } from '@/lib/stripe-config';


// Inicializar Stripe solo si la clave está disponible (evita errores en build time)
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-01-28.clover' as any,
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    // Verificar que Stripe esté inicializado
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe no está configurado. Por favor, contacta al administrador.' },
        { status: 500 }
      );
    }

    const { planId, email, firstName, lastName, phone, currentLevel } = await request.json();

    // Validar que el plan existe
    const plan = getPlanById(planId);
    if (!plan) {
      return NextResponse.json(
        { error: 'Plan de suscripción inválido' },
        { status: 400 }
      );
    }

    // Obtener Price ID de Stripe (si está configurado)
    const stripePriceId = getStripePriceId(planId);
    
    // Validar el Price ID si está configurado
    let validatedPriceId = stripePriceId;
    if (stripePriceId) {
      try {
        const price = await stripe.prices.retrieve(stripePriceId);
        if (!price.active) {
          validatedPriceId = null;
        }
      } catch (error: any) {
        validatedPriceId = null;
      }
    }
    
    // Crear line_items dependiendo si hay Price ID válido o no
    const lineItems = validatedPriceId
      ? [
          {
            price: validatedPriceId, // Usar Price ID validado
            quantity: 1,
          },
        ]
      : [
          {
            // Fallback: crear precio dinámicamente si no hay Price ID configurado
            price_data: {
              currency: plan.currency,
              product_data: {
                name: `Focus English - ${plan.name}`,
                description: `Plan ${plan.name} - ${plan.features[0]}`,
              },
              unit_amount: plan.price,
              recurring: {
                interval: plan.interval,
              },
            },
            quantity: 1,
          },
        ];

    // Crear sesión de checkout en Stripe para suscripción
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}&next=/onboarding`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/planes`,
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
      // Configurar el formulario de billing
      billing_address_collection: 'required',
      // Permitir códigos promocionales
      allow_promotion_codes: true,
      // Configurar período de prueba si es necesario (opcional)
      // subscription_data: {
      //   trial_period_days: 7,
      // },
      subscription_data: {
        metadata: {
          planId,
          email,
        }
      }
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Error al crear sesión de pago' },
      { status: 500 }
    );
  }
}
