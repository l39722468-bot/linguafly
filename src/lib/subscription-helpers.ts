// Helpers para verificación de suscripciones
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-01-28.clover' as any,
});

/**
 * Cache de suscripciones para evitar rate limiting de Stripe
 * En producción, considerar usar Redis o similar
 */
const subscriptionCache = new Map<string, { active: boolean; expiresAt: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

/**
 * Verifica si un usuario tiene una suscripción activa
 * @param userId - ID del usuario en Supabase
 * @returns true si tiene suscripción activa, false en caso contrario
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  // Revisar cache primero
  const cached = subscriptionCache.get(userId);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.active;
  }

  try {
    // Buscar cliente de Stripe por metadata de userId
    const customers = await stripe.customers.list({
      email: userId,
      limit: 1,
    });

    if (customers.data.length === 0) {
      // Usuario no encontrado en Stripe = sin suscripción
      cacheSubscriptionStatus(userId, false);
      return false;
    }

    const customer = customers.data[0];

    // Obtener suscripciones activas del cliente
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    });

    const hasActive = subscriptions.data.length > 0;
    
    // Cachear resultado
    cacheSubscriptionStatus(userId, hasActive);
    
    return hasActive;
  } catch (error) {
    console.error('Error verificando suscripción:', error);
    // En caso de error, permitir acceso (fail open para mejor UX)
    return true;
  }
}

/**
 * Cachea el estado de suscripción de un usuario
 */
function cacheSubscriptionStatus(userId: string, active: boolean): void {
  subscriptionCache.set(userId, {
    active,
    expiresAt: Date.now() + CACHE_DURATION,
  });
}

/**
 * Limpia el cache de suscripción para un usuario específico
 * Útil después de webhooks de Stripe
 */
export function clearSubscriptionCache(userId: string): void {
  subscriptionCache.delete(userId);
}

/**
 * Obtiene información detallada de la suscripción de un usuario
 */
export async function getUserSubscriptionDetails(userId: string): Promise<{
  active: boolean;
  planId?: string;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
} | null> {
  try {
    const customers = await stripe.customers.list({
      email: userId,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return null;
    }

    const customer = customers.data[0];
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return { active: false };
    }

    const subscription = subscriptions.data[0];
    
    return {
      active: true,
      planId: subscription.items.data[0]?.price.id,
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    };
  } catch (error) {
    console.error('Error obteniendo detalles de suscripción:', error);
    return null;
  }
}
