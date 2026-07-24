import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-01-28.clover' as any,
    })
  : null;

export async function GET(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.redirect(new URL('/mi-panel/cuenta?billing=not-configured', request.url), 303);
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.redirect(new URL('/cuenta/login?next=/mi-panel/cuenta', request.url), 303);
    }

    const url = new URL(request.url);
    const intent = (url.searchParams.get('intent') || '').toLowerCase();

    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });
    const customer = customers.data?.[0];

    if (!customer) {
      return NextResponse.redirect(new URL('/mi-panel/cuenta?billing=no-customer', request.url), 303);
    }

    const returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL || url.origin}/mi-panel/cuenta`;

    const sessionParams: Stripe.BillingPortal.SessionCreateParams = {
      customer: customer.id,
      return_url: returnUrl,
    };

    if (intent === 'cancel') {
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'active',
        limit: 1,
      });
      const subscription =
        subscriptions.data[0] ||
        (
          await stripe.subscriptions.list({
            customer: customer.id,
            status: 'trialing',
            limit: 1,
          })
        ).data[0];

      if (subscription) {
        sessionParams.flow_data = {
          type: 'subscription_cancel',
          subscription_cancel: {
            subscription: subscription.id,
          },
        };
      }
    }

    const portal = await stripe.billingPortal.sessions.create(sessionParams);
    return NextResponse.redirect(portal.url, 303);
  } catch (error) {
    console.error('[stripe/customer-portal] error', error);
    return NextResponse.redirect(new URL('/mi-panel/cuenta?billing=error', request.url), 303);
  }
}
