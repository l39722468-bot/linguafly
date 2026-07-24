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

async function findUserIdByEmail(email: string): Promise<string | undefined> {
  if (!supabaseAdmin) return undefined;

  const { data: userData } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();
  if (userData?.id) return userData.id;

  const { data: profileData } = await supabaseAdmin
    .from('user_profiles')
    .select('user_id')
    .eq('email', email)
    .maybeSingle();
  if (profileData?.user_id) return profileData.user_id;

  // Fallback: buscar en Auth (paginado básico)
  const { data } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
  return data?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase())?.id;
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
      let credentialsReady = false;

      if (!supabaseAdmin) {
        console.error(
          '❌ SUPABASE_SERVICE_ROLE_KEY no configurada: no se puede crear usuario ni enviar claves'
        );
      } else {
        try {
          const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: customerEmail,
            password: generatedPassword,
            email_confirm: true,
            user_metadata: {
              full_name: displayName,
              first_name: firstName,
              last_name: lastName,
            },
          });

          if (authError) {
            const errorMsg = authError.message.toLowerCase();
            if (
              errorMsg.includes('already') ||
              errorMsg.includes('registered') ||
              authError.status === 422
            ) {
              console.log('ℹ️ User already exists, updating password...');
              userId = await findUserIdByEmail(customerEmail);
              if (userId) {
                const { error: updErr } = await supabaseAdmin.auth.admin.updateUserById(userId, {
                  password: generatedPassword,
                });
                if (updErr) {
                  console.error('❌ Error updating password:', updErr.message);
                } else {
                  credentialsReady = true;
                  console.log('✅ Password updated for existing user:', userId);
                }
              } else {
                console.error('❌ Existing user not found by email:', customerEmail);
              }
            } else {
              console.error('❌ Auth Error:', authError.message);
            }
          } else if (authData.user) {
            userId = authData.user.id;
            credentialsReady = true;
            console.log('✅ User created:', userId);
          }

          if (userId) {
            console.log('🔄 Updating user data for:', userId);

            // Upserts independientes: un fallo no debe impedir el email
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
        } catch (err: any) {
          console.error('❌ Supabase error:', err.message);
        }
      }

      // El correo de bienvenida se intenta SIEMPRE tras el pago
      try {
        const mailSent = await sendWelcomeEmail({
          email: customerEmail,
          name: firstName || 'Estudiante',
          planName,
          tempPassword: credentialsReady ? generatedPassword : undefined,
        });
        console.log(
          mailSent
            ? `✅ Welcome email sent to: ${customerEmail}`
            : `⚠️ Welcome email NOT sent to: ${customerEmail}`
        );
      } catch (mailErr: any) {
        console.error('❌ Welcome email exception:', mailErr?.message || mailErr);
      }

      // HubSpot (no bloquea el email)
      try {
        console.warn(`Syncing subscription to HubSpot for: ${customerEmail}`);
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
            console.log(`✅ HubSpot ticket ${ticketId} created for subscription`);
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
