-- Magazine metadata on articles. D1 is the serving source of truth;
-- markdown is only an authoring/sync input.
-- SQLite allows one ADD COLUMN per ALTER TABLE.

ALTER TABLE articles ADD COLUMN excerpt TEXT;
ALTER TABLE articles ADD COLUMN author TEXT;
ALTER TABLE articles ADD COLUMN read_time TEXT;
ALTER TABLE articles ADD COLUMN faqs TEXT;
ALTER TABLE articles ADD COLUMN featured INTEGER NOT NULL DEFAULT 0;
ALTER TABLE articles ADD COLUMN image TEXT;
ALTER TABLE articles ADD COLUMN alt TEXT;
ALTER TABLE articles ADD COLUMN related_routes TEXT;
ALTER TABLE articles ADD COLUMN canonical TEXT;

CREATE INDEX IF NOT EXISTS idx_articles_category_published_created
  ON articles(category, is_published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_featured_published
  ON articles(featured, is_published);
CREATE INDEX IF NOT EXISTS idx_articles_author
  ON articles(author);
