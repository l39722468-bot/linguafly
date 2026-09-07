/**
 * Rate limiting middleware para proteger contra abuso
 * Usa Durable Objects para seguimiento distribuido de límites
 */

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number; // en milisegundos
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 1000,
  windowMs: 60 * 1000 // 1 minuto
};

export async function rateLimit(req: Request, env: any, config: Partial<RateLimitConfig> = {}) {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  // Obtener IP del cliente
  const ip = req.headers.get('cf-connecting-ip') || 'unknown';
  const key = `ratelimit:${ip}`;

  try {
    // Obtener contador actual
    const count = parseInt(await env.CACHE.get(key) || '0');

    if (count >= mergedConfig.maxRequests) {
      return new Response(
        JSON.stringify({
          error: 'Too many requests',
          retryAfter: mergedConfig.windowMs / 1000
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(mergedConfig.windowMs / 1000)
          }
        }
      );
    }

    // Incrementar contador
    await env.CACHE.put(
      key,
      String(count + 1),
      { expirationTtl: mergedConfig.windowMs / 1000 }
    );

    // Continuar con la solicitud
    return null;
  } catch (error) {
    console.error('Rate limit error:', error);
    // En caso de error, permitir la solicitud (fail open)
    return null;
  }
}

export function createRateLimitMiddleware(config?: Partial<RateLimitConfig>) {
  return async (req: Request, env: any) => {
    return rateLimit(req, env, config);
  };
}