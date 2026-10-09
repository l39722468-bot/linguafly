export class StripeConfigError extends Error {}

export class StripeApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export type StripeCustomer = {
  id: string;
  email: string | null;
  metadata: Record<string, string>;
};

export type StripeSubscription = {
  id: string;
  status: string;
  customer: string | { id: string };
  current_period_end?: number | null;
  items?: { data?: { price?: { id?: string } | null }[] };
};

export type StripeCheckoutSession = {
  id: string;
  url: string | null;
  mode: string | null;
  status: string | null;
  customer: string | { id: string } | null;
  subscription: string | { id: string } | null;
};

export type StripePrice = {
  id: string;
  unit_amount: number | null;
  currency: string;
  recurring?: { interval?: string | null } | null;
};

export type StripeEvent = {
  id: string;
  type: string;
  data: { object: Record<string, unknown> };
};

const API = "https://api.stripe.com/v1";

export function stripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new StripeConfigError("Falta STRIPE_SECRET_KEY");
  return key;
}

export function stripePriceId(): string {
  const price = process.env.STRIPE_PRICE_ID?.trim();
  if (!price) throw new StripeConfigError("Falta STRIPE_PRICE_ID");
  return price;
}

export function stripeWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!secret) throw new StripeConfigError("Falta STRIPE_WEBHOOK_SECRET");
  return secret;
}

export function customerIdOf(
  customer: string | { id: string } | null | undefined,
): string | null {
  if (!customer) return null;
  return typeof customer === "string" ? customer : customer.id;
}

async function stripeFetch<T>(path: string, init?: { method?: string; body?: URLSearchParams }): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${stripeSecretKey()}`,
      ...(init?.body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: init?.body,
  });
  const payload = (await response.json()) as T & { error?: { message?: string } };
  if (!response.ok) {
    throw new StripeApiError(payload.error?.message || "Stripe ha rechazado la petición", response.status);
  }
  return payload;
}

export async function listCustomersByEmail(email: string): Promise<StripeCustomer[]> {
  const params = new URLSearchParams({ email, limit: "10" });
  const result = await stripeFetch<{ data: StripeCustomer[] }>(`/v1/customers?${params.toString()}`);
  return result.data ?? [];
}

export async function createReaderCustomer(input: {
  email: string;
  passwordHash: string;
  passwordSalt: string;
}): Promise<StripeCustomer> {
  const body = new URLSearchParams({
    email: input.email,
    "metadata[app]": "linguafly-blog",
    "metadata[password_hash]": input.passwordHash,
    "metadata[password_salt]": input.passwordSalt,
    "metadata[subscription_status]": "none",
  });
  return stripeFetch<StripeCustomer>("/v1/customers", { method: "POST", body });
}

export async function updateCustomerMetadata(
  customerId: string,
  metadata: Record<string, string>,
): Promise<StripeCustomer> {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(metadata)) {
    body.set(`metadata[${key}]`, value);
  }
  return stripeFetch<StripeCustomer>(`/v1/customers/${encodeURIComponent(customerId)}`, {
    method: "POST",
    body,
  });
}

export async function getCustomer(customerId: string): Promise<StripeCustomer> {
  return stripeFetch<StripeCustomer>(`/v1/customers/${encodeURIComponent(customerId)}`);
}

export async function getSubscription(subscriptionId: string): Promise<StripeSubscription> {
  return stripeFetch<StripeSubscription>(`/v1/subscriptions/${encodeURIComponent(subscriptionId)}`);
}

export async function listCustomerSubscriptions(customerId: string): Promise<StripeSubscription[]> {
  const params = new URLSearchParams({ customer: customerId, status: "all", limit: "10" });
  const result = await stripeFetch<{ data: StripeSubscription[] }>(
    `/v1/subscriptions?${params.toString()}`,
  );
  return result.data ?? [];
}

export async function getPrice(priceId: string): Promise<StripePrice> {
  return stripeFetch<StripePrice>(`/v1/prices/${encodeURIComponent(priceId)}`);
}

export async function createCheckoutSession(input: {
  customerId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<StripeCheckoutSession> {
  const body = new URLSearchParams({
    mode: "subscription",
    customer: input.customerId,
    "line_items[0][price]": input.priceId,
    "line_items[0][quantity]": "1",
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    client_reference_id: input.customerId,
    allow_promotion_codes: "true",
  });
  return stripeFetch<StripeCheckoutSession>("/v1/checkout/sessions", { method: "POST", body });
}

export async function createPortalSession(input: {
  customerId: string;
  returnUrl: string;
}): Promise<{ url: string }> {
  const body = new URLSearchParams({
    customer: input.customerId,
    return_url: input.returnUrl,
  });
  return stripeFetch<{ url: string }>("/v1/billing_portal/sessions", { method: "POST", body });
}

export async function getCheckoutSession(sessionId: string): Promise<StripeCheckoutSession> {
  return stripeFetch<StripeCheckoutSession>(
    `/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
  );
}

const ACTIVE_STATUSES = new Set(["active", "trialing"]);

export function statusGrantsAccess(
  status: string | null | undefined,
  periodEndSeconds?: number | null,
  nowMs = Date.now(),
): boolean {
  if (!status || !ACTIVE_STATUSES.has(status)) return false;
  if (periodEndSeconds && periodEndSeconds > 0 && periodEndSeconds * 1000 < nowMs) return false;
  return true;
}

export function subscriptionMatchesPrice(
  subscription: StripeSubscription,
  priceId: string,
): boolean {
  if (!priceId) return false;
  return (subscription.items?.data ?? []).some((item) => {
    const price = item.price as { id?: string } | string | null | undefined;
    if (!price) return false;
    return (typeof price === "string" ? price : price.id) === priceId;
  });
}

export function subscriptionGrantsAccess(
  subscription: StripeSubscription,
  priceId: string,
  nowMs = Date.now(),
): boolean {
  return (
    subscriptionMatchesPrice(subscription, priceId) &&
    statusGrantsAccess(subscription.status, subscription.current_period_end, nowMs)
  );
}

export async function syncSubscriptionMetadata(
  customerId: string,
  subscription: StripeSubscription,
): Promise<void> {
  const priceId = stripePriceId();
  const matchesPrice = subscriptionMatchesPrice(subscription, priceId);
  if (!matchesPrice) {
    if (subscription.status !== "canceled") return;
    const customer = await getCustomer(customerId);
    if (customer.metadata?.subscription_id !== subscription.id) return;
  }
  const status = subscription.status === "canceled" ? "canceled" : subscription.status;
  await updateCustomerMetadata(customerId, {
    subscription_status: status,
    subscription_id: subscription.id,
    price_id: priceId,
    current_period_end: subscription.current_period_end
      ? String(subscription.current_period_end)
      : "",
  });
}

let priceLabelCache: { id: string; label: string; at: number } | null = null;

export async function monthlyPriceLabel(): Promise<string | null> {
  try {
    const priceId = stripePriceId();
    if (
      priceLabelCache &&
      priceLabelCache.id === priceId &&
      Date.now() - priceLabelCache.at < 5 * 60 * 1000
    ) {
      return priceLabelCache.label;
    }
    const price = await getPrice(priceId);
    const label = formatPriceLabel(price);
    priceLabelCache = { id: priceId, label, at: Date.now() };
    return label;
  } catch {
    return null;
  }
}

export function formatPriceLabel(price: StripePrice): string {
  if (price.unit_amount == null) return "Suscripción mensual";
  const amount = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: price.currency.toUpperCase(),
  }).format(price.unit_amount / 100);
  const interval = price.recurring?.interval;
  const period = interval === "year" ? "año" : interval === "month" ? "mes" : "periodo";
  return `${amount} / ${period}`;
}
