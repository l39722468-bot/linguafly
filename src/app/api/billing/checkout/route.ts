import { getReaderSession } from "@/lib/billing/session-cookie";
import { redirectTo, requestOrigin, safeNextPath } from "@/lib/billing/http";
import {
  createCheckoutSession,
  StripeApiError,
  StripeConfigError,
  stripePriceId,
} from "@/lib/billing/stripe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const nextPath = safeNextPath(String(form?.get("next") || "/cuenta"));
  const reader = await getReaderSession();
  if (!reader) {
    const params = new URLSearchParams({ next: nextPath });
    return redirectTo(request, `/cuenta/entrar?${params.toString()}`);
  }

  try {
    const origin = requestOrigin(request);
    const successUrl = `${origin}/api/billing/return?session_id={CHECKOUT_SESSION_ID}&next=${encodeURIComponent(nextPath)}`;
    const session = await createCheckoutSession({
      customerId: reader.customerId,
      priceId: stripePriceId(),
      successUrl,
      cancelUrl: new URL(`/cuenta?checkout=cancel&next=${encodeURIComponent(nextPath)}`, origin).toString(),
    });
    if (!session.url) {
      return redirectTo(request, "/cuenta?error=stripe");
    }
    return Response.redirect(session.url, 303);
  } catch (error) {
    console.error("[billing/checkout]", error);
    const code = error instanceof StripeConfigError ? "config" : error instanceof StripeApiError ? "stripe" : "stripe";
    return redirectTo(request, `/cuenta?error=${code}`);
  }
}
