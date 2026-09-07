/**
 * API Client for Linguafly Articles
 * Use this to interact with the D1 database API
 */

interface ArticleResponse {
  id?: number;
  slug: string;
  title: string;
  description?: string;
  content: string;
  category: string;
  level?: string;
  views?: number;
  likes?: number;
  created_at?: string;
  updated_at?: string;
}

interface ListResponse {
  articles: ArticleResponse[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export class LinguaflyArticlesClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string = 'https://linguafly.dev', apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  /**
   * Get a single article by slug
   */
  async getArticle(slug: string): Promise<ArticleResponse> {
    const response = await fetch(`${this.baseUrl}/api/articles/${slug}`);
    if (!response.ok) throw new Error(`Failed to fetch article: ${response.statusText}`);
    return response.json();
  }

  /**
   * List articles with pagination
   */
  async listArticles(page: number = 1, limit: number = 20): Promise<ListResponse> {
    const url = new URL(`${this.baseUrl}/api/articles`);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('limit', Math.min(limit, 100).toString());

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`Failed to list articles: ${response.statusText}`);
    return response.json();
  }

  /**
   * Search articles by category and level
   */
  async searchArticles(
    category?: string,
    level?: string,
    limit: number = 50
  ): Promise<ArticleResponse[]> {
    const url = new URL(`${this.baseUrl}/api/articles/search`);
    if (category) url.searchParams.set('category', category);
    if (level) url.searchParams.set('level', level);
    url.searchParams.set('limit', Math.min(limit, 100).toString());

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`Failed to search articles: ${response.statusText}`);
    const data = (await response.json()) as { articles: ArticleResponse[] };
    return data.articles;
  }

  /**
   * Get total article count
   */
  async getCount(): Promise<number> {
    const response = await fetch(`${this.baseUrl}/api/articles/count`);
    if (!response.ok) throw new Error(`Failed to get count: ${response.statusText}`);
    const data = (await response.json()) as { count: number };
    return data.count;
  }

  /**
   * Like an article
   */
  async likeArticle(articleId: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/api/articles/${articleId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error(`Failed to like article: ${response.statusText}`);
    const data = (await response.json()) as { success: boolean };
    return data.success;
  }

  /**
   * Import articles in batch (admin)
   */
  async importBatch(
    articles: ArticleResponse[],
    batchNumber: number = 1
  ): Promise<any> {
    if (!this.apiKey) throw new Error('API key required for batch import');

    const response = await fetch(`${this.baseUrl}/api/articles/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey
      },
      body: JSON.stringify({ articles, batchNumber })
    });

    if (!response.ok) {
      throw new Error(`Failed to import batch: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get health status
   */
  async getHealth(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/health`);
    if (!response.ok) throw new Error(`Service unhealthy: ${response.statusText}`);
    return response.json();
  }

  /**
   * Get metrics
   */
  async getMetrics(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/metrics`);
    if (!response.ok) throw new Error(`Failed to get metrics: ${response.statusText}`);
    return response.json();
  }
}

// Example usage
if (typeof window === 'undefined') {
  // Node.js example
  (async () => {
    const client = new LinguaflyArticlesClient(
      'https://linguafly.dev',
      process.env.ARTICLES_API_KEY
    );

    try {
      // Get single article
      const article = await client.getArticle('english-business-email');
      console.log('Article:', article);

      // List articles
      const list = await client.listArticles(1, 10);
      console.log('Articles:', list);

      // Search
      const results = await client.searchArticles('business', 'B1');
      console.log('Search results:', results);

      // Get count
      const count = await client.getCount();
      console.log('Total articles:', count);
    } catch (error) {
      console.error('Error:', error);
    }
  })();
}

export default LinguaflyArticlesClient;
