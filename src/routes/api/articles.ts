import { Router } from 'itty-router';
import { DatabaseClient, CloudflareEnv } from '../../lib/db/client';

export const articlesRouter = Router();

/**
 * Standalone Worker router for the article API. The same handlers exist as
 * Next.js routes under src/app/api/articles/* for the OpenNext deployment;
 * keep both in sync.
 */

// GET /api/articles/count
// NOTE: registered before '/articles/:slug' so "count" is not read as a slug.
articlesRouter.get('/articles/count', async (req, env: CloudflareEnv, ctx: ExecutionContext) => {
  try {
    const db = new DatabaseClient(env, ctx);
    const count = await db.getArticleCount();

    return new Response(JSON.stringify({ count }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error getting article count:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// GET /api/articles/search?category=tech&level=A1
// NOTE: registered before '/articles/:slug' so "search" is not read as a slug.
articlesRouter.get('/articles/search', async (req, env: CloudflareEnv, ctx: ExecutionContext) => {
  try {
    const db = new DatabaseClient(env, ctx);
    const category = req.query.category as string | undefined;
    const level = req.query.level as string | undefined;
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);

    const articles = await db.searchArticles(category, level, limit);

    return new Response(JSON.stringify({ articles }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error searching articles:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// GET /api/articles/:slug
articlesRouter.get('/articles/:slug', async (req, env: CloudflareEnv, ctx: ExecutionContext) => {
  try {
    const db = new DatabaseClient(env, ctx);
    const article = await db.getArticle(req.params.slug);

    if (!article) {
      return new Response(JSON.stringify({ error: 'Article not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Increment views
    await db.incrementMetrics(article.id, 'views');

    // Log analytics (non-blocking)
    if (env.ANALYTICS) {
      const analyticsWrite = env.ANALYTICS.writeDataPoint({
        indexes: [req.params.slug],
        blobs: ['article_view'],
        doubles: [1]
      });
      if (ctx) {
        ctx.waitUntil(Promise.resolve(analyticsWrite));
      } else {
        await analyticsWrite;
      }
    }

    return new Response(JSON.stringify(article), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// GET /api/articles?page=1&limit=20
articlesRouter.get('/articles', async (req, env: CloudflareEnv, ctx: ExecutionContext) => {
  try {
    const db = new DatabaseClient(env, ctx);
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);

    const result = await db.listArticles(page, limit);

    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800'
      }
    });
  } catch (error) {
    console.error('Error listing articles:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// POST /api/articles/batch - Admin endpoint
articlesRouter.post('/articles/batch', async (req, env: CloudflareEnv, ctx: ExecutionContext) => {
  try {
    // Validate API key
    const apiKey = req.headers.get('x-api-key');
    if (!env.ARTICLES_API_KEY || apiKey !== env.ARTICLES_API_KEY) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = new DatabaseClient(env, ctx);
    const body = await req.json();
    const { articles, batchNumber } = body;

    if (!Array.isArray(articles) || !articles.length) {
      return new Response(JSON.stringify({ error: 'Invalid articles array' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await db.insertArticlesBatch(articles, batchNumber || 1);

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error inserting articles batch:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// POST /api/articles/:id/like
articlesRouter.post('/articles/:id/like', async (req, env: CloudflareEnv, ctx: ExecutionContext) => {
  try {
    const db = new DatabaseClient(env, ctx);
    const articleId = parseInt(req.params.id);

    if (!Number.isInteger(articleId) || articleId <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid article id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await db.incrementMetrics(articleId, 'likes');

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error liking article:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
