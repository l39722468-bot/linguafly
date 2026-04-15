// Price ID de Stripe para la suscripción mensual única

export const STRIPE_PRICE_IDS: Record<string, string> = {
  'basic-monthly': process.env.STRIPE_PRICE_BASIC_MONTHLY || '',
};

/**
 * Obtiene el Price ID de Stripe para un plan
 */
export function getStripePriceId(planId: string): string | null {
  return STRIPE_PRICE_IDS[planId] || null;
}

export function areStripePricesConfigured(): boolean {
  return Object.values(STRIPE_PRICE_IDS).every((priceId) => priceId && priceId.length > 0);
}

export function getOrCreateStripePriceId(planId: string): string | null {
  const priceId = STRIPE_PRICE_IDS[planId];

  if (!priceId || priceId.length === 0) {
    console.warn(`⚠️ Stripe Price ID no configurado para el plan: ${planId}`);
    console.warn(`   Configura la variable de entorno: STRIPE_PRICE_${planId.toUpperCase().replace(/-/g, '_')}`);
    return null;
  }

  return priceId;
}
