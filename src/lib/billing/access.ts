import { getReaderSession } from "@/lib/billing/session-cookie";
import {
  customerIdOf,
  getCustomer,
  getSubscription,
  listCustomerSubscriptions,
  statusGrantsAccess,
  stripePriceId,
  subscriptionGrantsAccess,
  syncSubscriptionMetadata,
  StripeConfigError,
  type StripeSubscription,
} from "@/lib/billing/stripe";

/**
 * Active monthly subscription for STRIPE_PRICE_ID.
 * Stripe customer metadata is the tracked status (written by the webhook).
 * If that record is missing or stale, the live subscription list decides.
 * Any failure denies access.
 */
export async function readerHasPremiumAccess(): Promise<boolean> {
  try {
    const session = await getReaderSession();
    if (!session) return false;
    const priceId = stripePriceId();
    const customer = await getCustomer(session.customerId);
    const periodEnd = Number(customer.metadata?.current_period_end || "");
    const tracked =
      customer.metadata?.price_id === priceId &&
      statusGrantsAccess(
        customer.metadata?.subscription_status,
        Number.isFinite(periodEnd) ? periodEnd : null,
      );
    if (tracked) return true;

    const subscriptions = await listCustomerSubscriptions(session.customerId);
    const match = subscriptions.find((subscription) =>
      subscriptionGrantsAccess(subscription, priceId),
    );
    if (!match) return false;
    await syncSubscriptionMetadata(session.customerId, match).catch((error) => {
      console.error("[billing] no se pudo guardar el estado de la suscripción", error);
    });
    return true;
  } catch (error) {
    if (!(error instanceof StripeConfigError)) {
      console.error("[billing] no se ha podido comprobar la suscripción", error);
    }
    return false;
  }
}

export async function applySubscriptionEvent(
  type: string,
  object: Record<string, unknown>,
): Promise<void> {
  if (type === "checkout.session.completed") {
    if (object.mode !== "subscription") return;
    const customerId = customerIdOf(object.customer as string | { id: string } | null);
    const subscriptionId =
      typeof object.subscription === "string"
        ? object.subscription
        : customerIdOf(object.subscription as { id: string } | null);
    if (!customerId || !subscriptionId) return;
    const subscription = await getSubscription(subscriptionId);
    await syncSubscriptionMetadata(customerId, subscription);
    return;
  }

  if (
    type === "customer.subscription.created" ||
    type === "customer.subscription.updated" ||
    type === "customer.subscription.deleted"
  ) {
    const subscription = object as unknown as StripeSubscription;
    const customerId = customerIdOf(subscription.customer);
    if (!customerId) return;
    const tracked =
      type === "customer.subscription.deleted"
        ? { ...subscription, status: "canceled" }
        : subscription;
    await syncSubscriptionMetadata(customerId, tracked);
  }
}
