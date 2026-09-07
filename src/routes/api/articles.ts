import { Router } from 'itty-router';
import { DatabaseClient, CloudflareEnv } from '../../lib/db/client';

export const articlesRouter = Router();

// GET /api/articles/:slug
articlesRouter.get('/articles/:slug', async (req, env: CloudflareEnv) => {
  try {
    const db = new DatabaseClient(env);
    const article = await db.getArticle(req.params.slug);

    if (!article) {
      return new Response(JSON.stringify({ error: 'Article not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Increment views
    await db.incrementMetrics(article.id, 'views');

    // Log analytics
    await env.ANALYTICS.writeDataPoint({
      indexes: [req.params.slug],
      blobs: ['article_view'],
      doubles: [1]
    });

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
articlesRouter.get('/articles', async (req, env: CloudflareEnv) => {
  try {
    const db = new DatabaseClient(env);
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

// GET /api/articles/search?category=tech&level=A1
articlesRouter.get('/articles/search', async (req, env: CloudflareEnv) => {
  try {
    const db = new DatabaseClient(env);
    const category = req.query.category as string;
    const level = req.query.level as string;

    const articles = await db.searchArticles(category, level);

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

// GET /api/articles/count
articlesRouter.get('/articles/count', async (req, env: CloudflareEnv) => {
  try {
    const db = new DatabaseClient(env);
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

// POST /api/articles/batch - Admin endpoint
articlesRouter.post('/articles/batch', async (req, env: CloudflareEnv) => {
  try {
    // Validate API key
    const apiKey = req.headers.get('x-api-key');
    if (apiKey !== env.ARTICLES_API_KEY) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = new DatabaseClient(env);
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
articlesRouter.post('/articles/:id/like', async (req, env: CloudflareEnv) => {
  try {
    const db = new DatabaseClient(env);
    const articleId = parseInt(req.params.id);

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