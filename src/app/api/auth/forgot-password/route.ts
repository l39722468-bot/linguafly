import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import {
  findAuthUserIdByEmail,
  hasActiveStripeSubscription,
  provisionSubscriberFromPayment,
  syncPaidEntitlementFromStripe,
} from '@/lib/stripe/provision-subscriber';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const DEFAULT_SITE_URL = 'https://linguafly.app';

function getPublicSiteUrl(): string {
  const candidates = [
    process.env.EMAIL_SITE_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXTAUTH_URL,
    DEFAULT_SITE_URL,
  ];

  for (const raw of candidates) {
    if (!raw) continue;
    const cleaned = raw.trim().replace(/\/$/, '');
    if (!cleaned) continue;
    if (/focus-on-english\.com/i.test(cleaned)) continue;
    if (/^https?:\/\//i.test(cleaned)) return cleaned;
  }

  return DEFAULT_SITE_URL;
}

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-01-28.clover' as any,
    })
  : null;

/**
 * Control:
 * - Si el usuario ya existe en Auth → email de reset (Supabase).
 * - Si no existe pero tiene suscripción activa en Stripe → se crea la cuenta y se envía bienvenida.
 * - Si no pagó → misma respuesta genérica (no revelamos si el email existe).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.toLowerCase().trim() : '';

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    const genericOk = NextResponse.json(
      { message: 'Si el email existe o tiene un pago activo, recibirás las instrucciones en breve.' },
      { status: 200 }
    );

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('❌ Supabase URL/anon key missing');
      return genericOk;
    }

    let authUserId = await findAuthUserIdByEmail(email);

    // Control de pago: si no hay usuario Auth pero sí suscripción Stripe, dar de alta
    if (!authUserId && stripe) {
      try {
        const paid = await hasActiveStripeSubscription(stripe, email);
        if (paid) {
          console.log('💳 Forgot-password: email con suscripción Stripe sin Auth; provisionando…', email);
          const provisioned = await provisionSubscriberFromPayment({
            email,
            planId: 'basic-monthly',
            planName: 'Suscripción mensual',
          });
          if (provisioned.ok && provisioned.userId) {
            // Ya se envió email de bienvenida con contraseña temporal
            return genericOk;
          }
          authUserId = provisioned.userId;
        }
      } catch (err: any) {
        console.error('⚠️ Stripe subscription check failed:', err?.message || err);
      }
    }

    if (!authUserId) {
      // No existe en Auth y no hay pago activo → respuesta genérica
      return genericOk;
    }

    // Usuario Auth existe: activar suscripción si Stripe confirma el pago
    try {
      await syncPaidEntitlementFromStripe({ email, userId: authUserId });
    } catch (err: any) {
      console.warn('⚠️ syncPaidEntitlementFromStripe:', err?.message || err);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const redirectTo = `${getPublicSiteUrl()}/auth/callback?next=${encodeURIComponent('/cuenta/resetear')}`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      console.error('Supabase resetPasswordForEmail error:', error.message);
      // Seguimos con 200 genérico para no filtrar existencia
      return genericOk;
    }

    return genericOk;
  } catch (err: any) {
    console.error('forgot-password route error:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
