import crypto from 'crypto';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase/client';
import { sendWelcomeEmail } from '@/lib/email-service';

/** Valores permitidos por el CHECK de user_profiles.subscription_plan */
export function mapSubscriptionPlanToAllowedValue(
  input: string
): 'free' | 'basic' | 'premium' {
  const v = (input ?? '').trim().toLowerCase();
  if (!v || v === 'free') return 'free';
  if (v.startsWith('basic')) return 'basic';
  if (v.startsWith('premium')) return 'premium';
  return 'premium';
}

export async function findAuthUserIdByEmail(email: string): Promise<string | undefined> {
  if (!supabaseAdmin) return undefined;

  const normalized = email.toLowerCase().trim();

  const { data: userRow } = await supabaseAdmin
    .from('users')
    .select('id')
    .ilike('email', normalized)
    .maybeSingle();
  if (userRow?.id) return userRow.id;

  const { data: profileRow } = await supabaseAdmin
    .from('user_profiles')
    .select('user_id')
    .ilike('email', normalized)
    .maybeSingle();
  if (profileRow?.user_id) return profileRow.user_id;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    try {
      const res = await fetch(
        `${supabaseUrl}/auth/v1/admin/users?email=${encodeURIComponent(normalized)}`,
        {
          headers: {
            Authorization: `Bearer ${serviceKey}`,
            apikey: serviceKey,
          },
          cache: 'no-store',
        }
      );
      if (res.ok) {
        const json = await res.json();
        const users = Array.isArray(json?.users) ? json.users : Array.isArray(json) ? json : [];
        const match = users.find(
          (u: { email?: string; id?: string }) =>
            String(u?.email || '').toLowerCase() === normalized
        );
        if (match?.id) return match.id;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn('⚠️ Auth admin email lookup error:', message);
    }
  }

  for (let page = 1; page <= 5; page++) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) break;
    const match = data?.users?.find((u) => u.email?.toLowerCase() === normalized);
    if (match?.id) return match.id;
    if (!data?.users?.length || data.users.length < 200) break;
  }

  return undefined;
}

async function ensureUserWithPassword(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<{ userId?: string; passwordReady: boolean; created: boolean; authError?: string }> {
  if (!supabaseAdmin) {
    console.error('❌ SUPABASE_SERVICE_ROLE_KEY no configurada (supabaseAdmin=null)');
    return {
      passwordReady: false,
      created: false,
      authError: 'SUPABASE_SERVICE_ROLE_KEY ausente (supabaseAdmin=null)',
    };
  }

  const displayName = `${firstName} ${lastName}`.trim() || 'Estudiante';
  const normalizedEmail = email.toLowerCase().trim();

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: normalizedEmail,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: displayName,
      first_name: firstName,
      last_name: lastName,
    },
  });

  if (!authError && authData.user?.id) {
    return { userId: authData.user.id, passwordReady: true, created: true };
  }

  const errMsg = authError?.message || 'createUser failed';
  const msg = errMsg.toLowerCase();
  const alreadyExists =
    msg.includes('already') ||
    msg.includes('registered') ||
    msg.includes('exists') ||
    authError?.status === 422;

  if (!alreadyExists) {
    console.error('❌ Auth createUser error:', errMsg, authError);

    // Error típico: trigger/constraint en public.users (password_hash NOT NULL, name NOT NULL…)
    if (msg.includes('database error') || msg.includes('password_hash') || msg.includes('null value')) {
      return {
        passwordReady: false,
        created: false,
        authError:
          `${errMsg}. Suele ser un trigger/constraint en public.users. Ejecuta en Supabase SQL: ` +
          `ALTER TABLE public.users ALTER COLUMN password_hash SET DEFAULT 'managed-by-supabase-auth'; ` +
          `ALTER TABLE public.users ALTER COLUMN name SET DEFAULT '';`,
      };
    }

    return { passwordReady: false, created: false, authError: errMsg };
  }

  console.log('ℹ️ Usuario ya existía; buscando ID y actualizando contraseña...');
  const userId = await findAuthUserIdByEmail(normalizedEmail);
  if (!userId) {
    const notFound =
      'createUser dice que el email ya existe, pero no aparece en Auth/admin ni en tablas. Revisa el proyecto Supabase.';
    console.error('❌', notFound, normalizedEmail);
    return { passwordReady: false, created: false, authError: notFound };
  }

  const { error: updErr } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    password,
    email_confirm: true,
  });

  if (updErr) {
    console.error('❌ Error actualizando contraseña:', updErr.message);
    return { userId, passwordReady: false, created: false, authError: updErr.message };
  }

  return { userId, passwordReady: true, created: false };
}

export type ProvisionInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  planId?: string;
  planName?: string;
  languageLevel?: string;
  /** Si true, no reenvía email si el usuario ya existía con suscripción activa */
  skipEmailIfAlreadyProvisioned?: boolean;
  stripeSessionId?: string;
};

export type ProvisionResult = {
  ok: boolean;
  userId?: string;
  passwordReady: boolean;
  created: boolean;
  mailSent: boolean;
  tempPassword?: string;
  error?: string;
};

/**
 * Crea/actualiza el alumno en Supabase Auth + tablas tras un pago Stripe válido.
 * Esta es la “conexión” Stripe → Supabase (no hay integración nativa).
 */
export async function provisionSubscriberFromPayment(
  input: ProvisionInput
): Promise<ProvisionResult> {
  if (!supabaseAdmin) {
    return {
      ok: false,
      passwordReady: false,
      created: false,
      mailSent: false,
      error: 'SUPABASE_SERVICE_ROLE_KEY ausente o no válida (supabaseAdmin=null)',
    };
  }

  const email = input.email.toLowerCase().trim();
  if (!email || !email.includes('@')) {
    return {
      ok: false,
      passwordReady: false,
      created: false,
      mailSent: false,
      error: 'Email inválido',
    };
  }

  const firstName = (input.firstName || '').trim();
  const lastName = (input.lastName || '').trim();
  const displayName = `${firstName} ${lastName}`.trim() || 'Estudiante';
  const planId = input.planId || 'basic-monthly';
  const planName = input.planName || 'Suscripción mensual';
  const languageLevel = (input.languageLevel || 'A1').toUpperCase();
  const dbPlan = mapSubscriptionPlanToAllowedValue(planId);
  const nowIso = new Date().toISOString();

  // Si ya hay perfil activo, no regenerar contraseña (evita invalidar acceso)
  if (input.skipEmailIfAlreadyProvisioned) {
    const existingId = await findAuthUserIdByEmail(email);
    if (existingId) {
      const { data: profile } = await supabaseAdmin
        .from('user_profiles')
        .select('subscription_status')
        .eq('user_id', existingId)
        .maybeSingle();

      if (profile?.subscription_status === 'active') {
        // Asegura datos de perfil actualizados sin tocar la contraseña
        await supabaseAdmin.from('user_profiles').upsert(
          {
            user_id: existingId,
            email,
            name: displayName,
            role: 'user',
            subscription_status: 'active',
            subscription_plan: dbPlan,
            subscription_start_date: nowIso,
          },
          { onConflict: 'user_id' }
        );

        return {
          ok: true,
          userId: existingId,
          passwordReady: true,
          created: false,
          mailSent: false,
        };
      }
    }
  }

  const generatedPassword = crypto.randomBytes(12).toString('hex') + '!';
  let userId: string | undefined;
  let passwordReady = false;
  let created = false;
  let authError: string | undefined;

  try {
    const ensured = await ensureUserWithPassword(email, generatedPassword, firstName, lastName);
    userId = ensured.userId;
    passwordReady = ensured.passwordReady;
    created = ensured.created;
    authError = ensured.authError;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('❌ ensureUserWithPassword error:', message);
    return {
      ok: false,
      passwordReady: false,
      created: false,
      mailSent: false,
      error: message,
    };
  }

  if (!userId) {
    return {
      ok: false,
      passwordReady: false,
      created: false,
      mailSent: false,
      error:
        authError ||
        'No se pudo crear/encontrar usuario en Supabase Auth. Revisa SUPABASE_SERVICE_ROLE_KEY y el proyecto nprqtjljoekoirlrjxlh.',
    };
  }

  const usersRes = await supabaseAdmin.from('users').upsert({
    id: userId,
    email,
    name: displayName,
    password_hash: 'managed-by-supabase-auth',
    email_verified: nowIso,
    language_level: languageLevel,
    image: null,
    updated_at: nowIso,
  });
  if (usersRes.error) {
    console.error('❌ users upsert error:', usersRes.error.message);
  }

  const profileRes = await supabaseAdmin.from('user_profiles').upsert(
    {
      user_id: userId,
      email,
      name: displayName,
      role: 'user',
      subscription_status: 'active',
      subscription_plan: dbPlan,
      subscription_start_date: nowIso,
    },
    { onConflict: 'user_id' }
  );
  if (profileRes.error) {
    console.error('❌ user_profiles upsert error:', profileRes.error.message);
    return {
      ok: false,
      userId,
      passwordReady,
      created,
      mailSent: false,
      error: `user_profiles: ${profileRes.error.message}`,
    };
  }

  await Promise.allSettled([
    supabaseAdmin.from('user_stats').upsert({ user_id: userId, level: 1 }),
    supabaseAdmin
      .from('user_xp')
      .upsert({ user_id: userId, total_xp: 0, level: 1, xp_to_next_level: 100 }),
    supabaseAdmin
      .from('user_streaks')
      .upsert({ user_id: userId, current_streak: 0, longest_streak: 0 }),
  ]);

  let mailSent = false;
  try {
    mailSent = await sendWelcomeEmail({
      email,
      name: firstName || 'Estudiante',
      planName,
      tempPassword: passwordReady ? generatedPassword : undefined,
    });
  } catch (mailErr: unknown) {
    const message = mailErr instanceof Error ? mailErr.message : String(mailErr);
    console.error('❌ Welcome email exception:', message);
  }

  console.log('✅ provisionSubscriberFromPayment', {
    email,
    userId,
    created,
    passwordReady,
    mailSent,
    stripeSessionId: input.stripeSessionId,
  });

  return {
    ok: true,
    userId,
    passwordReady,
    created,
    mailSent,
    tempPassword: passwordReady ? generatedPassword : undefined,
  };
}

export function extractCheckoutIdentity(session: Stripe.Checkout.Session) {
  const email =
    session.customer_details?.email ||
    session.customer_email ||
    session.metadata?.email ||
    '';
  const firstName =
    session.metadata?.firstName ||
    (session.customer_details?.name || '').split(' ')[0] ||
    '';
  const lastName =
    session.metadata?.lastName ||
    (session.customer_details?.name || '').split(' ').slice(1).join(' ') ||
    '';

  return {
    email,
    firstName,
    lastName,
    planId: session.metadata?.planId || 'basic-monthly',
    planName: session.metadata?.planName || 'Suscripción mensual',
    languageLevel: (session.metadata?.currentLevel || 'A1').toUpperCase(),
  };
}

/** Comprueba en Stripe si el email tiene suscripción activa (control de acceso). */
export async function hasActiveStripeSubscription(
  stripe: Stripe,
  email: string
): Promise<boolean> {
  const normalized = email.toLowerCase().trim();
  const candidates = Array.from(new Set([normalized, email.trim()].filter(Boolean)));

  for (const candidate of candidates) {
    const customers = await stripe.customers.list({ email: candidate, limit: 10 });

    for (const customer of customers.data) {
      for (const status of ['active', 'trialing'] as const) {
        const subs = await stripe.subscriptions.list({
          customer: customer.id,
          status,
          limit: 1,
        });
        if (subs.data.length > 0) return true;
      }
    }
  }

  return false;
}

/**
 * Si el email tiene suscripción Stripe activa, marca user_profiles como active.
 * Corrige alumnos que pudieron entrar (Auth) sin el flag de pago.
 */
export async function syncPaidEntitlementFromStripe(params: {
  email: string;
  userId?: string;
  name?: string;
}): Promise<{ synced: boolean; userId?: string; reason?: string }> {
  if (!supabaseAdmin) {
    return { synced: false, reason: 'supabaseAdmin=null' };
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return { synced: false, reason: 'STRIPE_SECRET_KEY missing' };
  }

  const email = params.email.toLowerCase().trim();
  if (!email) return { synced: false, reason: 'email vacío' };

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-01-28.clover' as any,
  });

  const paid = await hasActiveStripeSubscription(stripe, email);
  if (!paid) {
    return { synced: false, userId: params.userId, reason: 'sin suscripción Stripe activa' };
  }

  const userId = params.userId || (await findAuthUserIdByEmail(email));
  if (!userId) {
    return { synced: false, reason: 'usuario Auth no encontrado' };
  }

  const nowIso = new Date().toISOString();
  const displayName = (params.name || '').trim() || email.split('@')[0] || 'Estudiante';

  const { error } = await supabaseAdmin.from('user_profiles').upsert(
    {
      user_id: userId,
      email,
      name: displayName,
      role: 'user',
      subscription_status: 'active',
      subscription_plan: 'basic',
      subscription_start_date: nowIso,
    },
    { onConflict: 'user_id' }
  );

  if (error) {
    console.warn('⚠️ upsert user_profiles falló, intento update:', error.message);
    const { error: updErr } = await supabaseAdmin
      .from('user_profiles')
      .update({
        email,
        name: displayName,
        subscription_status: 'active',
        subscription_plan: 'basic',
        subscription_start_date: nowIso,
      })
      .eq('user_id', userId);

    if (updErr) {
      console.error('❌ syncPaidEntitlementFromStripe update:', updErr.message);
      return { synced: false, userId, reason: updErr.message };
    }
  }

  console.log('✅ Suscripción sincronizada desde Stripe → active', { email, userId });
  return { synced: true, userId };
}
