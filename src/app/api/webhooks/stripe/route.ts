import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { sendWelcomeEmail } from '@/lib/email-service';
import crypto from 'crypto';
import {
  syncHubSpotContact,
  createHubSpotTicket,
  associateTicketWithContact,
} from '@/lib/crm/hubspot';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-01-28.clover' as any,
    })
  : null;

async function findAuthUserIdByEmail(email: string): Promise<string | undefined> {
  if (!supabaseAdmin) return undefined;

  const normalized = email.toLowerCase().trim();

  // 1) Tablas de app
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

  // 2) Auth Admin API filtrando por email (más fiable que listar 1000 usuarios)
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
          (u: any) => String(u?.email || '').toLowerCase() === normalized
        );
        if (match?.id) return match.id;
      } else {
        console.warn('⚠️ Auth admin users?email lookup failed:', res.status);
      }
    } catch (err: any) {
      console.warn('⚠️ Auth admin email lookup error:', err?.message || err);
    }
  }

  // 3) Fallback paginado
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
): Promise<{ userId?: string; passwordReady: boolean }> {
  if (!supabaseAdmin) {
    console.error('❌ SUPABASE_SERVICE_ROLE_KEY no configurada');
    return { passwordReady: false };
  }

  const displayName = `${firstName} ${lastName}`.trim() || 'Estudiante';

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: displayName,
      first_name: firstName,
      last_name: lastName,
    },
  });

  if (!authError && authData.user?.id) {
    return { userId: authData.user.id, passwordReady: true };
  }

  const msg = (authError?.message || '').toLowerCase();
  const alreadyExists =
    msg.includes('already') ||
    msg.includes('registered') ||
    msg.includes('exists') ||
    authError?.status === 422;

  if (!alreadyExists) {
    console.error('❌ Auth createUser error:', authError?.message);
    return { passwordReady: false };
  }

  console.log('ℹ️ Usuario ya existía; buscando ID y actualizando contraseña...');
  const userId = await findAuthUserIdByEmail(email);
  if (!userId) {
    console.error('❌ No se encontró el usuario existente por email:', email);
    return { passwordReady: false };
  }

  const { error: updErr } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    password,
    email_confirm: true,
  });

  if (updErr) {
    console.error('❌ Error actualizando contraseña:', updErr.message);
    return { userId, passwordReady: false };
  }

  return { userId, passwordReady: true };
}

export async function POST(request: NextRequest) {
  console.log('🚀 Webhook POST request received at /api/webhooks/stripe');

  if (!stripe) {
    return NextResponse.json({ error: 'Stripe no está configurado' }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  try {
    console.log('📦 Stripe Webhook Event Received:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('💰 Processing Checkout Session:', session.id);

      const customerEmail =
        session.customer_details?.email || session.customer_email || session.metadata?.email;
      const firstName =
        session.metadata?.firstName ||
        (session.customer_details?.name || '').split(' ')[0] ||
        '';
      const lastName =
        session.metadata?.lastName ||
        (session.customer_details?.name || '').split(' ').slice(1).join(' ') ||
        '';
      const planName = session.metadata?.planName || 'Suscripción mensual';
      const planId = session.metadata?.planId || 'basic-monthly';
      const displayName = `${firstName} ${lastName}`.trim() || 'Estudiante';

      if (!customerEmail) {
        console.error('❌ No email found for session:', session.id);
        return NextResponse.json({ received: true });
      }

      const generatedPassword = crypto.randomBytes(12).toString('hex') + '!';
      let userId: string | undefined;
      let passwordReady = false;

      try {
        const ensured = await ensureUserWithPassword(
          customerEmail,
          generatedPassword,
          firstName,
          lastName
        );
        userId = ensured.userId;
        passwordReady = ensured.passwordReady;
      } catch (err: any) {
        console.error('❌ ensureUserWithPassword error:', err?.message || err);
      }

      if (userId && supabaseAdmin) {
        console.log('🔄 Updating user data for:', userId);
        const upserts = await Promise.allSettled([
          supabaseAdmin.from('users').upsert({
            id: userId,
            email: customerEmail,
            name: displayName,
            language_level: session.metadata?.currentLevel?.toUpperCase() || 'A1',
            updated_at: new Date().toISOString(),
          }),
          supabaseAdmin.from('user_profiles').upsert(
            {
              user_id: userId,
              email: customerEmail,
              name: displayName,
              subscription_status: 'active',
              subscription_plan: planId,
              subscription_start_date: new Date().toISOString(),
            },
            { onConflict: 'user_id' }
          ),
          supabaseAdmin.from('user_stats').upsert({ user_id: userId, level: 1 }),
          supabaseAdmin
            .from('user_xp')
            .upsert({ user_id: userId, total_xp: 0, level: 1, xp_to_next_level: 100 }),
          supabaseAdmin
            .from('user_streaks')
            .upsert({ user_id: userId, current_streak: 0, longest_streak: 0 }),
        ]);

        upserts.forEach((result, index) => {
          if (result.status === 'rejected') {
            console.error(`❌ Upsert #${index} rejected:`, result.reason);
          } else if (result.value?.error) {
            console.error(`❌ Upsert #${index} error:`, result.value.error.message);
          }
        });
      }

      // Siempre enviar email; incluir contraseña solo si quedó aplicada en Auth
      try {
        const mailSent = await sendWelcomeEmail({
          email: customerEmail,
          name: firstName || 'Estudiante',
          planName,
          tempPassword: passwordReady ? generatedPassword : undefined,
        });
        console.log(
          mailSent
            ? `✅ Welcome email sent to: ${customerEmail} (passwordReady=${passwordReady})`
            : `⚠️ Welcome email NOT sent to: ${customerEmail}`
        );
      } catch (mailErr: any) {
        console.error('❌ Welcome email exception:', mailErr?.message || mailErr);
      }

      try {
        const contactId = await syncHubSpotContact({
          email: customerEmail,
          firstName,
          lastName,
          extraProperties: {
            subscription_plan: planId,
            subscription_status: 'active',
            lifecyclestage: 'customer',
          },
        });

        if (contactId) {
          const ticketId = await createHubSpotTicket({
            subject: `Nueva Suscripción: ${planName}`,
            content: `El usuario ha completado el pago para el plan: ${planName}.
ID de Sesión: ${session.id}
Email: ${customerEmail}
Nombre: ${displayName}`,
          });

          if (ticketId) {
            await associateTicketWithContact(ticketId, contactId);
          }
        }
      } catch (err: any) {
        console.error('❌ HubSpot error:', err.message);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('❌ Webhook error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
