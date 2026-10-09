import { getReaderSession } from "@/lib/billing/session-cookie";
import { redirectTo, safeNextPath } from "@/lib/billing/http";
import {
  customerIdOf,
  getCheckoutSession,
  getSubscription,
  syncSubscriptionMetadata,
} from "@/lib/billing/stripe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Stripe redirects here after Checkout so the reader is not stuck waiting on the webhook. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id") || "";
  const nextPath = safeNextPath(url.searchParams.get("next"), "/cuenta");
  if (!sessionId) return redirectTo(request, "/cuenta?error=stripe");

  try {
    const checkout = await getCheckoutSession(sessionId);
    const customerId = customerIdOf(checkout.customer);
    const subscriptionId =
      typeof checkout.subscription === "string"
        ? checkout.subscription
        : customerIdOf(checkout.subscription);
    if (customerId && subscriptionId) {
      const subscription = await getSubscription(subscriptionId);
      await syncSubscriptionMetadata(customerId, subscription);
    }

    const reader = await getReaderSession();
    if (!reader || !customerId || reader.customerId !== customerId) {
      const params = new URLSearchParams({
        error: "entra",
        next: nextPath,
      });
      return redirectTo(request, `/cuenta/entrar?${params.toString()}`);
    }
    const params = new URLSearchParams({ checkout: "ok" });
    const destination = nextPath === "/cuenta" ? `/cuenta?${params.toString()}` : nextPath;
    return redirectTo(request, destination);
  } catch (error) {
    console.error("[billing/return]", error);
    return redirectTo(request, "/cuenta?error=stripe");
  }
}
