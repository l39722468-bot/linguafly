import { NextRequest, NextResponse } from 'next/server';
import { getStripePriceId } from '@/lib/stripe-config';
import { getAllPlans } from '@/lib/subscription-plans';


export const runtime = 'edge';
export async function GET(request: NextRequest) {
  try {
    const plans = getAllPlans();
    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      plans: plans.map(plan => ({
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
        priceVars: {
          basicMonthly: process.env.STRIPE_PRICE_BASIC_MONTHLY || 'NOT_SET',
        }
      }
    };

    return NextResponse.json(diagnostics, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
