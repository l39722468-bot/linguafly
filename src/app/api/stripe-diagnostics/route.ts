import { NextRequest, NextResponse } from 'next/server';
import { getStripePriceId } from '@/lib/stripe-config';
import { getAllPlans } from '@/lib/subscription-plans';
import { supabaseAdmin } from '@/lib/supabase/client';

export const runtime = 'nodejs';

function projectRefFromUrl(url?: string | null): string | null {
  if (!url) return null;
  try {
    const host = new URL(url).hostname; // xxx.supabase.co
    return host.split('.')[0] || null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const plans = getAllPlans();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || null;
    const serviceRoleConfigured = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

    let supabaseAdminOk: boolean | null = null;
    let supabaseAdminError: string | null = null;

    if (supabaseAdmin) {
      try {
        // Prueba mínima de Auth Admin (no crea usuarios)
        const { error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 });
        if (error) {
          supabaseAdminOk = false;
          supabaseAdminError = error.message;
        } else {
          supabaseAdminOk = true;
        }
      } catch (err: any) {
        supabaseAdminOk = false;
        supabaseAdminError = err?.message || String(err);
      }
    } else {
      supabaseAdminOk = false;
      supabaseAdminError = serviceRoleConfigured
        ? 'supabaseAdmin=null pese a tener SERVICE_ROLE_KEY (¿falta NEXT_PUBLIC_SUPABASE_URL?)'
        : 'Falta SUPABASE_SERVICE_ROLE_KEY';
    }

    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      note:
        'Stripe NO se conecta solo a Supabase. El alta ocurre en /api/webhooks/stripe o en /api/stripe/complete-checkout tras un pago válido.',
      plans: plans.map((plan) => ({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        stripePriceId: getStripePriceId(plan.id),
        hasPriceId: !!getStripePriceId(plan.id),
      })),
      envVars: {
        hasStripeSecretKey: !!process.env.STRIPE_SECRET_KEY,
        hasStripePublishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
        hasSupabaseUrl: !!supabaseUrl,
        hasSupabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasSupabaseServiceRoleKey: serviceRoleConfigured,
        hasResendApiKey: !!process.env.RESEND_API_KEY,
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'NOT_SET',
        emailFrom: process.env.EMAIL_FROM || process.env.RESEND_FROM || 'DEFAULT',
        supabaseProjectRef: projectRefFromUrl(supabaseUrl),
        priceVars: {
          basicMonthly: process.env.STRIPE_PRICE_BASIC_MONTHLY || 'NOT_SET',
        },
      },
      supabaseAdmin: {
        clientReady: !!supabaseAdmin,
        authAdminOk: supabaseAdminOk,
        error: supabaseAdminError,
      },
      webhookExpectedUrl: `${(process.env.NEXT_PUBLIC_SITE_URL || 'https://linguafly.app').replace(/\/$/, '')}/api/webhooks/stripe`,
      tips: [
        'En Stripe Dashboard → Webhooks: evento checkout.session.completed apuntando a webhookExpectedUrl',
        'SUPABASE_SERVICE_ROLE_KEY debe ser del MISMO proyecto que NEXT_PUBLIC_SUPABASE_URL',
        'El PR con el alta post-pago debe estar desplegado en producción (merge a main)',
      ],
    };

    return NextResponse.json(diagnostics, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
