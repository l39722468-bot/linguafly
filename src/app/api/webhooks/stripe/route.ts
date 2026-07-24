import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import {
  extractCheckoutIdentity,
  provisionSubscriberFromPayment,
} from '@/lib/stripe/provision-subscriber';
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

async function provisionFromCheckoutSession(session: Stripe.Checkout.Session) {
  const identity = extractCheckoutIdentity(session);
  if (!identity.email) {
    console.error('❌ No email found for session:', session.id);
    return;
  }

  const result = await provisionSubscriberFromPayment({
    ...identity,
    stripeSessionId: session.id,
    skipEmailIfAlreadyProvisioned: true,
    forcePasswordReset: false,
  });

  if (!result.ok) {
    console.error('❌ Provision failed after checkout:', result.error);
  } else {
    console.log('✅ Provision OK', {
      userId: result.userId,
      created: result.created,
      passwordReady: result.passwordReady,
      mailSent: result.mailSent,
    });
  }

  try {
    const contactId = await syncHubSpotContact({
      email: identity.email,
      firstName: identity.firstName,
      lastName: identity.lastName,
      properties: {
        subscription_plan: identity.planId,
        subscription_status: 'active',
        lifecyclestage: 'customer',
      },
    });

    if (contactId) {
      const ticketId = await createHubSpotTicket({
        subject: `Nueva Suscripción: ${identity.planName}`,
        content: `El usuario ha completado el pago para el plan: ${identity.planName}.
ID de Sesión: ${session.id}
Email: ${identity.email}
Nombre: ${`${identity.firstName} ${identity.lastName}`.trim()}
Provision: ok=${result.ok} userId=${result.userId || 'n/a'}
Error: ${result.error || 'none'}`,
      });

      if (ticketId) {
        await associateTicketWithContact(ticketId, contactId);
      }
    }
  } catch (err: any) {
    console.error('❌ HubSpot error:', err.message);
  }
}

async function provisionFromSubscription(subscription: Stripe.Subscription) {
  if (!stripe) return;
  if (subscription.status !== 'active' && subscription.status !== 'trialing') {
    console.log('ℹ️ Subscription not active yet:', subscription.id, subscription.status);
    return;
  }

  const customerId =
    typeof subscription.customer === 'string'
      ? subscription.customer
      : subscription.customer?.id;
  if (!customerId) return;

  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted || !('email' in customer) || !customer.email) {
    console.error('❌ Subscription sin email de customer:', subscription.id);
    return;
  }

  const result = await provisionSubscriberFromPayment({
    email: customer.email,
    firstName: customer.name?.split(' ')[0] || '',
    lastName: customer.name?.split(' ').slice(1).join(' ') || '',
    planId: subscription.metadata?.planId || 'basic-monthly',
    planName: 'Suscripción mensual',
    skipEmailIfAlreadyProvisioned: true,
  });

  console.log(
    result.ok
      ? `✅ Provision from subscription ${subscription.id}`
      : `❌ Provision from subscription failed: ${result.error}`
  );
}

async function markSubscriptionCancelled(subscription: Stripe.Subscription) {
  if (!stripe) return;

  const { supabaseAdmin } = await import('@/lib/supabase/client');
  if (!supabaseAdmin) {
    console.error('❌ supabaseAdmin no disponible para cancelación');
    return;
  }

  const customerId =
    typeof subscription.customer === 'string'
      ? subscription.customer
      : subscription.customer?.id;
  if (!customerId) return;

  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted || !('email' in customer) || !customer.email) {
    console.error('❌ Cancelación sin email de customer:', subscription.id);
    return;
  }

  const email = customer.email.trim().toLowerCase();
  const nowIso = new Date().toISOString();
  const ended =
    subscription.status === 'canceled' ||
    subscription.status === 'unpaid' ||
    subscription.status === 'incomplete_expired';

  // Si solo programó cancelación al final del periodo, mantiene acceso (active)
  const payload: Record<string, unknown> = {
    subscription_status: ended ? 'cancelled' : 'active',
    updated_at: nowIso,
  };
  if (ended) {
    payload.subscription_end_date = nowIso;
  }

  const { data: byEmail } = await supabaseAdmin
    .from('user_profiles')
    .select('id,user_id,email')
    .ilike('email', email)
    .limit(1)
    .maybeSingle();

  if (!byEmail) {
    console.warn('⚠️ No profile for cancelled subscription email:', email);
    return;
  }

  const update = byEmail.user_id
    ? await supabaseAdmin.from('user_profiles').update(payload).eq('user_id', byEmail.user_id)
    : await supabaseAdmin.from('user_profiles').update(payload).eq('id', byEmail.id);

  if (update.error) {
    console.error('❌ Error marcando cancelación:', update.error.message);
  } else {
    console.log('✅ Suscripción actualizada en perfil', {
      email,
      status: payload.subscription_status,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      subscriptionId: subscription.id,
    });
  }

  try {
    await syncHubSpotContact({
      email,
      properties: {
        subscription_status: String(payload.subscription_status),
        lifecyclestage: 'customer',
      },
    });
  } catch (e) {
    console.warn('HubSpot cancel sync skipped', e);
  }
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
      await provisionFromCheckoutSession(event.data.object as Stripe.Checkout.Session);
    }

    if (
      event.type === 'customer.subscription.created' ||
      event.type === 'customer.subscription.updated'
    ) {
      const subscription = event.data.object as Stripe.Subscription;
      if (
        subscription.status === 'canceled' ||
        subscription.status === 'unpaid' ||
        subscription.cancel_at_period_end
      ) {
        await markSubscriptionCancelled(subscription);
      } else {
        await provisionFromSubscription(subscription);
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      await markSubscriptionCancelled(event.data.object as Stripe.Subscription);
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
