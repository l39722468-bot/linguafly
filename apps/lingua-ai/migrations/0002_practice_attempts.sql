-- Persist completed practice attempts for the signed-in LinguaFly AI user.
-- Apply only to lingua-ai-auth-db via Wrangler's app-specific migrations.
PRAGMA foreign_keys = ON;

CREATE TABLE practice_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 5),
  total_questions INTEGER NOT NULL DEFAULT 5 CHECK (total_questions = 5),
  cefr_level TEXT CHECK (
    cefr_level IS NULL OR cefr_level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')
  ),
  explanation_language TEXT NOT NULL DEFAULT 'es'
    CHECK (explanation_language IN ('es', 'ca', 'en', 'fr', 'pt', 'de', 'it')),
  completed_at INTEGER NOT NULL DEFAULT (CAST(strftime('%s', 'now') AS INTEGER) * 1000)
);

CREATE INDEX practice_attempts_user_completed_idx
  ON practice_attempts(user_id, completed_at DESC);
