-- Store validated answers for each question in a completed attempt.
-- Apply only to the D1 database for LinguaFly AI (lingua-ai-auth-db).
PRAGMA foreign_keys = ON;

CREATE TABLE practice_question_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  attempt_id INTEGER NOT NULL REFERENCES practice_attempts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  skill TEXT NOT NULL,
  selected_index INTEGER NOT NULL CHECK (selected_index BETWEEN 0 AND 2),
  correct_index INTEGER NOT NULL CHECK (correct_index BETWEEN 0 AND 2),
  is_correct INTEGER NOT NULL CHECK (is_correct IN (0, 1)),
  created_at INTEGER NOT NULL DEFAULT (CAST(strftime('%s', 'now') AS INTEGER) * 1000),
  UNIQUE(attempt_id, question_id)
);

CREATE INDEX practice_question_results_user_skill_idx
  ON practice_question_results(user_id, skill, is_correct);
