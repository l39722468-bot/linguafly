// Suscripción mensual única — Focus English

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number; // Precio en centavos (€)
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  limitations?: string[];
  popular?: boolean;
  color: {
    border: string;
    bg: string;
    text: string;
    gradient: string;
  };
}

export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {
  'basic-monthly': {
    id: 'basic-monthly',
    name: 'Suscripción mensual',
    price: 599, // €5,99
    currency: 'eur',
    interval: 'month',
    popular: true,
    features: [
      'Unidad 1 de cada curso gratis; acceso completo A1–C2 con la suscripción',
      'Material didáctico y ejercicios interactivos',
      'Seguimiento de progreso',
      'Cancela cuando quieras',
    ],
    limitations: [],
    color: {
      border: 'border-coral-200',
      bg: 'bg-coral-50',
      text: 'text-coral-600',
      gradient: 'from-coral-600 to-peach-600',
    },
  },
};

// Precios anteriores (para referencia o migración)
export const LEGACY_COURSE_PRICES: Record<string, number> = {
  'A1': 29900, // €299.00
  'A2': 34900, // €349.00
  'B1': 39900, // €399.00
  'B2': 44900, // €449.00
  'C1': 49900, // €499.00
  'C2': 54900, // €549.00
};

export function formatPrice(priceInCents: number, currency: string = 'EUR'): string {
  const price = priceInCents / 100;
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
  }).format(price);
}

export function getPlanById(planId: string): SubscriptionPlan | null {
  return SUBSCRIPTION_PLANS[planId] || null;
}

export function getAllPlans(): SubscriptionPlan[] {
  return Object.values(SUBSCRIPTION_PLANS);
}
