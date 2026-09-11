-- Fingerprint of the public article body so weekly / CI syncs can skip
-- unchanged rows. Dates stay out of the hash (see articleContentHash).

ALTER TABLE articles ADD COLUMN content_hash TEXT;

CREATE INDEX IF NOT EXISTS idx_articles_content_hash ON articles(content_hash);
