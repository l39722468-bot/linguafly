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

      const identity = extractCheckoutIdentity(session);

      if (!identity.email) {
        console.error('❌ No email found for session:', session.id);
        return NextResponse.json({ received: true });
      }

      const result = await provisionSubscriberFromPayment({
        ...identity,
        stripeSessionId: session.id,
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
          extraProperties: {
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
Provision: ok=${result.ok} userId=${result.userId || 'n/a'}`,
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
