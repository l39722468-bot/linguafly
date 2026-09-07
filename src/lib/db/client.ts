export interface CloudflareEnv {
  DB: D1Database;
  CACHE: KVNamespace;
  SEARCH_INDEX: KVNamespace;
  ARTICLES_BUCKET: R2Bucket;
  ANALYTICS: AnalyticsEngineDataset;
}

export class DatabaseClient {
  constructor(private env: CloudflareEnv) {}

  // Get single article
  async getArticle(slug: string) {
    const cached = await this.env.CACHE.get(`article:${slug}`);
    if (cached) return JSON.parse(cached);

    const result = await this.env.DB.prepare(
      'SELECT * FROM articles WHERE slug = ? AND is_published = 1'
    )
      .bind(slug)
      .first();

    if (result) {
      await this.env.CACHE.put(`article:${slug}`, JSON.stringify(result), {
        expirationTtl: 86400 // 24 hours
      });
    }

    return result;
  }

  // List articles with pagination
  async listArticles(page: number = 1, limit: number = 20) {
    const offset = (page - 1) * limit;
    
    const cacheKey = `articles:page:${page}:limit:${limit}`;
    const cached = await this.env.CACHE.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const articles = await this.env.DB.prepare(
      'SELECT id, slug, title, description, category, level, created_at FROM articles WHERE is_published = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?'
    )
      .bind(limit, offset)
      .all();

    const count = await this.env.DB.prepare(
      'SELECT COUNT(*) as total FROM articles WHERE is_published = 1'
    )
      .first() as { total: number };

    const result = {
      articles: articles.results || [],
      total: count.total,
      page,
      limit,
      pages: Math.ceil(count.total / limit)
    };

    await this.env.CACHE.put(cacheKey, JSON.stringify(result), {
      expirationTtl: 3600 // 1 hour
    });

    return result;
  }

  // Search articles by category and level
  async searchArticles(category?: string, level?: string, limit: number = 50) {
    let query = 'SELECT id, slug, title, category, level FROM articles WHERE is_published = 1';
    const bindings: (string | number)[] = [];

    if (category) {
      query += ' AND category = ?';
      bindings.push(category);
    }

    if (level) {
      query += ' AND level = ?';
      bindings.push(level);
    }

    query += ' ORDER BY created_at DESC LIMIT ?';
    bindings.push(limit);

    const result = await this.env.DB.prepare(query).bind(...bindings).all();
    return result.results || [];
  }

  // Batch insert articles (for bulk import)
  async insertArticlesBatch(articles: Array<any>, batchNumber: number) {
    const logResult = await this.env.DB.prepare(
      'INSERT INTO import_logs (batch_number, status, imported_count) VALUES (?, ?, ?)'
    )
      .bind(batchNumber, 'processing', articles.length)
      .run();

    try {
      for (const article of articles) {
        await this.env.DB.prepare(
          'INSERT INTO articles (slug, title, description, content, category, level) VALUES (?, ?, ?, ?, ?, ?)'
        )
          .bind(
            article.slug,
            article.title,
            article.description,
            article.content,
            article.category,
            article.level
          )
          .run();

        // Insert tags if provided
        if (article.tags?.length) {
          for (const tag of article.tags) {
            const articleId = await this.env.DB.prepare(
              'SELECT id FROM articles WHERE slug = ?'
            ).bind(article.slug).first() as { id: number };

            await this.env.DB.prepare(
              'INSERT INTO article_tags (article_id, tag) VALUES (?, ?)'
            )
              .bind(articleId.id, tag)
              .run();
          }
        }
      }

      // Update import log
      await this.env.DB.prepare(
        'UPDATE import_logs SET status = ?, completed_at = CURRENT_TIMESTAMP WHERE batch_number = ?'
      )
        .bind('completed', batchNumber)
        .run();

      return { success: true, batchNumber, count: articles.length };
    } catch (error) {
      await this.env.DB.prepare(
        'UPDATE import_logs SET status = ?, error_count = ? WHERE batch_number = ?'
      )
        .bind('failed', articles.length, batchNumber)
        .run();

      throw error;
    }
  }

  // Get article count
  async getArticleCount(): Promise<number> {
    const result = await this.env.DB.prepare(
      'SELECT COUNT(*) as count FROM articles WHERE is_published = 1'
    ).first() as { count: number };

    return result.count;
  }

  // Increment views and likes
  async incrementMetrics(articleId: number, type: 'views' | 'likes') {
    const column = type === 'views' ? 'views' : 'likes';
    
    await this.env.DB.prepare(
      `UPDATE articles SET ${column} = ${column} + 1 WHERE id = ?`
    )
      .bind(articleId)
      .run();

    // Clear article cache
    const article = await this.env.DB.prepare(
      'SELECT slug FROM articles WHERE id = ?'
    ).bind(articleId).first() as { slug: string };

    if (article) {
      await this.env.CACHE.delete(`article:${article.slug}`);
    }
  }
}