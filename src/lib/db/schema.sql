-- Canonical D1 schema AFTER wrangler migrations (0001–0006).
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
    content_hash TEXT,
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
CREATE INDEX IF NOT EXISTS idx_articles_content_hash ON articles(content_hash);

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

CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL DEFAULT '',
    phone TEXT,
    current_level TEXT NOT NULL DEFAULT 'unknown',
    marketing_consent INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_created_at ON students(created_at);

CREATE TABLE IF NOT EXISTS course_enrollments (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    email TEXT NOT NULL,
    course_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'confirmed',
    source TEXT NOT NULL DEFAULT 'web',
    idempotency_key TEXT UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(email, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_email ON course_enrollments(email);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON course_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_created_at ON course_enrollments(created_at);

CREATE TABLE IF NOT EXISTS enrollment_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    enrollment_id TEXT,
    email TEXT NOT NULL,
    course_id TEXT,
    event_type TEXT NOT NULL,
    payload TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_enrollment_events_email ON enrollment_events(email, created_at);
CREATE INDEX IF NOT EXISTS idx_enrollment_events_type ON enrollment_events(event_type, created_at);

CREATE TABLE IF NOT EXISTS enrollment_outbox (
    id TEXT PRIMARY KEY,
    enrollment_id TEXT NOT NULL,
    destination TEXT NOT NULL,
    payload TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    attempts INTEGER NOT NULL DEFAULT 0,
    last_error TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    sent_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_outbox_status ON enrollment_outbox(status, created_at);

CREATE TABLE IF NOT EXISTS enrollment_rate_limits (
    key TEXT PRIMARY KEY,
    window_start TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0
);
