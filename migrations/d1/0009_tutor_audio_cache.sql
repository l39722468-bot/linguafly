-- Cached TTS audio is keyed by a hash of text, speaker and model version.
-- Store short prepared/generic segments only; personal text is filtered in application code.
CREATE TABLE IF NOT EXISTS tutor_audio_cache (
  cache_key TEXT PRIMARY KEY,
  audio_base64 TEXT NOT NULL,
  audio_length INTEGER NOT NULL CHECK (audio_length > 0),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tutor_audio_cache_created
  ON tutor_audio_cache (created_at);
