import { applySubscriptionEvent } from "@/lib/billing/access";
import { verifyStripeSignature } from "@/lib/billing/stripe-signature";
import { stripeWebhookSecret, StripeConfigError, type StripeEvent } from "@/lib/billing/stripe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");
  let secret: string;
  try {
    secret = stripeWebhookSecret();
  } catch (error) {
    if (error instanceof StripeConfigError) {
      return Response.json({ error: "Webhook no configurado" }, { status: 500 });
    }
    throw error;
  }

  const valid = await verifyStripeSignature(payload, signature, secret);
  if (!valid) {
    return Response.json({ error: "Firma no válida" }, { status: 400 });
  }

  let event: StripeEvent;
  try {
    event = JSON.parse(payload) as StripeEvent;
  } catch {
    return Response.json({ error: "JSON no válido" }, { status: 400 });
  }

  try {
    await applySubscriptionEvent(event.type, event.data?.object ?? {});
  } catch (error) {
    console.error("[billing/webhook]", event.type, error);
    return Response.json({ error: "No se pudo registrar el estado" }, { status: 500 });
  }

  return Response.json({ received: true });
}
