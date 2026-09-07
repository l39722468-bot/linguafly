import { Router, json } from 'itty-router';
import { articlesRouter } from './routes/api/articles';
import { rateLimit } from './middleware/rateLimit';
import { CloudflareEnv, DatabaseClient } from './lib/db/client';

const router = Router<Request, [CloudflareEnv, ExecutionContext]>();

// Health check
router.get('/health', () => {
  return json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Mount the articles router. The articles router is registered without a path
 * prefix so that '/api/articles/count' and '/api/articles/search' resolve to
 * their static routes instead of being captured by '/articles/:slug'.
 * Rate limiting is applied to every '/api/articles/*' request; when the
 * request passes, the articles router handles it.
 */
router.all('/api/articles/*', async (req, env: CloudflareEnv, ctx: ExecutionContext) => {
  const rateLimitResponse = await rateLimit(req, env, {
    maxRequests: 10000,
    windowMs: 60 * 1000 // 10k requests per minute
  });

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  return articlesRouter.handle(req, env, ctx);
});

// Health metrics endpoint
router.get('/metrics', async (req, env: CloudflareEnv, ctx: ExecutionContext) => {
  try {
    const db = new DatabaseClient(env, ctx);
    const count = await db.getArticleCount();

    return json({
      articles_total: count,
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
  fetch: (request: Request, env: CloudflareEnv, ctx: ExecutionContext) =>
    router.handle(request, env, ctx),
  scheduled: async (event: unknown, env: CloudflareEnv, ctx: ExecutionContext) => {
    // Scheduled cleanup of old cache entries
    console.log('Running scheduled cleanup...');
  }
};