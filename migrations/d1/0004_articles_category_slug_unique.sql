-- Unique key becomes (category, slug) so the same unit slug can exist
-- in curso-a1 and curso-a2 (and B1/B2) without colliding. Public URLs
-- stay /blog/{category}/{slug}.

PRAGMA foreign_keys = OFF;

CREATE TABLE articles_v2 (
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

INSERT INTO articles_v2 (
    id, slug, title, description, content, category, level,
    created_at, updated_at, views, likes, is_published,
    excerpt, author, read_time, faqs, featured, image, alt,
    related_routes, canonical
)
SELECT
    id, slug, title, description, content, category, level,
    created_at, updated_at, views, likes, is_published,
    excerpt, author, read_time, faqs, featured, image, alt,
    related_routes, canonical
FROM articles;

DROP TABLE articles;
ALTER TABLE articles_v2 RENAME TO articles;

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

PRAGMA foreign_keys = ON;
