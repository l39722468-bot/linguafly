-- Canonical D1 schema AFTER wrangler migrations (0001–0004).
-- Do not apply this file to an existing database (ALTER vs CREATE).
-- Use: wrangler d1 migrations apply linguafly_db --remote
--
-- D1 is the serving source of truth for article HTML. Markdown under
-- src/content/blog is an authoring input synced via scripts/sync-articles-to-d1.ts.

CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    level TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT 1,
    excerpt TEXT,
    author TEXT,
    read_time TEXT,
    faqs TEXT,
    featured INTEGER NOT NULL DEFAULT 0,
    image TEXT,
    alt TEXT,
    related_routes TEXT,
    canonical TEXT,
    UNIQUE(category, slug)
);

CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_level ON articles(level);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category_published_created
  ON articles(category, is_published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_featured_published
  ON articles(featured, is_published);
CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author);

CREATE TABLE IF NOT EXISTS article_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER NOT NULL,
    tag TEXT NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_tags_article_id ON article_tags(article_id);
CREATE INDEX IF NOT EXISTS idx_tags_tag ON article_tags(tag);

CREATE VIRTUAL TABLE IF NOT EXISTS articles_fts USING fts5(
  slug UNINDEXED,
  title,
  excerpt,
  description,
  keywords,
  category UNINDEXED,
  content,
  tokenize = 'unicode61 remove_diacritics 2'
);

CREATE TABLE IF NOT EXISTS search_cache (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query_hash TEXT NOT NULL UNIQUE,
    results TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_search_cache_created ON search_cache(created_at);

CREATE TABLE IF NOT EXISTS article_analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER NOT NULL,
    views_today INTEGER DEFAULT 0,
    likes_today INTEGER DEFAULT 0,
    date DATE NOT NULL UNIQUE,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_analytics_article_date ON article_analytics(article_id, date);

CREATE TABLE IF NOT EXISTS import_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_number INTEGER,
    status TEXT,
    imported_count INTEGER,
    error_count INTEGER,
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME
);

CREATE INDEX IF NOT EXISTS idx_import_logs_status ON import_logs(status);
