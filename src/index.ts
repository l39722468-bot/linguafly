import { Router, json } from 'itty-router';
import { articlesRouter } from './routes/api/articles';
import { rateLimit } from './middleware/rateLimit';
import { CloudflareEnv } from './lib/db/client';

const router = Router<Request, any>();

// Health check
router.get('/health', () => {
  return json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
router.all('/api/*', async (req, env: CloudflareEnv) => {
  // Apply rate limiting
  const rateLimitResponse = await rateLimit(req, env, {
    maxRequests: 10000,
    windowMs: 60 * 1000 // 10k requests per minute
  });

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  // Continue with routing
  return undefined;
});

// Mount articles router
router.all('/api/articles/*', articlesRouter.handle);

// Health metrics endpoint
router.get('/metrics', async (req, env: CloudflareEnv) => {
  try {
    const count = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM articles'
    ).first() as { count: number };

    return json({
      articles_total: count.count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
});

// 404 handler
router.all('*', () => {
  return json({ error: 'Not found' }, { status: 404 });
});

export default {
  fetch: router.handle,
  scheduled: async (event: any, env: CloudflareEnv, ctx: any) => {
    // Scheduled cleanup of old cache entries
    console.log('Running scheduled cleanup...');
  }
};