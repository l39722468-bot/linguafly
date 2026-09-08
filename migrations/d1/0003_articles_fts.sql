-- Full-text search for published articles. Standalone FTS5 table (not
-- content=) so upserts can delete+insert by slug without rebuilding.
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
