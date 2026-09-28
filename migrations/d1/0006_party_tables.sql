-- Mesas de partida. El estado vive en JSON para poder avanzar el turno
-- con un solo compare-and-swap por acción.

CREATE TABLE IF NOT EXISTS party_tables (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  level TEXT NOT NULL,
  phase TEXT NOT NULL,
  version INTEGER NOT NULL,
  state_json TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_party_tables_lobby
  ON party_tables (level, phase, updated_at);
