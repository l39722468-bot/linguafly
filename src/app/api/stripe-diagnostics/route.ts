import { NextRequest, NextResponse } from 'next/server';
import { getStripePriceId } from '@/lib/stripe-config';
import { getAllPlans } from '@/lib/subscription-plans';
import { supabaseAdmin } from '@/lib/supabase/client';

export const runtime = 'nodejs';

function projectRefFromUrl(url?: string | null): string | null {
  if (!url) return null;
  try {
    const host = new URL(url).hostname;
    return host.split('.')[0] || null;
  } catch {
    return null;
  }
}

function maskEmail(email?: string | null): string {
  if (!email) return '(sin email)';
  const [user, domain] = email.split('@');
  if (!domain) return '***';
  const visible = user.slice(0, 2);
  return `${visible}***@${domain}`;
}

export async function GET(request: NextRequest) {
  try {
    const plans = getAllPlans();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || null;
    const serviceRoleConfigured = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

    let supabaseAdminOk: boolean | null = null;
    let supabaseAdminError: string | null = null;
    let authUsersListed = 0;
    let authUsersSample: Array<{ id: string; email: string; created_at?: string }> = [];
    let profilesCount: number | null = null;
    let usersTableCount: number | null = null;

    if (supabaseAdmin) {
      try {
        const { data, error } = await supabaseAdmin.auth.admin.listUsers({
          page: 1,
          perPage: 5,
        });
        if (error) {
          supabaseAdminOk = false;
          supabaseAdminError = error.message;
        } else {
          supabaseAdminOk = true;
          authUsersListed = data?.users?.length || 0;
          authUsersSample = (data?.users || []).map((u) => ({
            id: String(u.id).slice(0, 8),
            email: maskEmail(u.email),
            created_at: u.created_at,
          }));
        }

        const profiles = await supabaseAdmin
          .from('user_profiles')
          .select('*', { count: 'exact', head: true });
        profilesCount = profiles.count ?? null;

        const users = await supabaseAdmin
          .from('users')
          .select('*', { count: 'exact', head: true });
        usersTableCount = users.count ?? null;
      } catch (err: any) {
        supabaseAdminOk = false;
        supabaseAdminError = err?.message || String(err);
      }
    } else {
      supabaseAdminOk = false;
      supabaseAdminError = serviceRoleConfigured
        ? 'supabaseAdmin=null pese a tener SERVICE_ROLE_KEY'
        : 'Falta SUPABASE_SERVICE_ROLE_KEY';
    }

    const site = (process.env.NEXT_PUBLIC_SITE_URL || 'https://linguafly.app').replace(
      /\/$/,
      ''
    );

    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      note:
        'Stripe NO se conecta solo a Supabase. Alta: webhook, /api/stripe/complete-checkout o /api/stripe/repair-subscriber.',
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
        authUsersSampleSize: authUsersListed,
        authUsersSample,
        userProfilesCount: profilesCount,
        publicUsersCount: usersTableCount,
      },
      webhookExpectedUrl: `${site}/api/webhooks/stripe`,
      repairUrl: `${site}/api/stripe/repair-subscriber`,
      tips: [
        'Webhook: checkout.session.completed + customer.subscription.created/updated',
        'Si Auth sigue vacío tras un pago, POST a /api/stripe/repair-subscriber con {"email":"..."} o {"sessionId":"cs_..."}',
        'Si createUser falla por password_hash: ejecuta supabase/migrations/20260724_fix_users_password_hash_default.sql',
        'Mira Authentication → Users en el proyecto nprqtjljoekoirlrjxlh (no otro proyecto)',
      ],
    };

    return NextResponse.json(diagnostics, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
