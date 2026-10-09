-- Blog premium flag. Existing rows stay free (0) until markdown sync.
-- Authoring: `premium: true` in the article frontmatter.

ALTER TABLE articles ADD COLUMN premium INTEGER NOT NULL DEFAULT 0;
