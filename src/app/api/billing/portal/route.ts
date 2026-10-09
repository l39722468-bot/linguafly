import { getReaderSession } from "@/lib/billing/session-cookie";
import { redirectTo, requestOrigin } from "@/lib/billing/http";
import { createPortalSession, StripeApiError, StripeConfigError } from "@/lib/billing/stripe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const reader = await getReaderSession();
  if (!reader) return redirectTo(request, "/cuenta/entrar");

  try {
    const portal = await createPortalSession({
      customerId: reader.customerId,
      returnUrl: new URL("/cuenta", requestOrigin(request)).toString(),
    });
    if (!portal.url) return redirectTo(request, "/cuenta?error=portal");
    return Response.redirect(portal.url, 303);
  } catch (error) {
    console.error("[billing/portal]", error);
    const code = error instanceof StripeConfigError ? "config" : error instanceof StripeApiError ? "portal" : "portal";
    return redirectTo(request, `/cuenta?error=${code}`);
  }
}
