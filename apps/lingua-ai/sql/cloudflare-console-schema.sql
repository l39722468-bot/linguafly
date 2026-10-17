-- LinguaFly AI: esquema para aplicar desde D1 > Console en Cloudflare.
-- SOLO ejecutar en la nueva base lingua-ai-auth-db.
-- Este archivo es idempotente: CREATE IF NOT EXISTS permite volver a intentar
-- si la consola se interrumpe a mitad de la ejecución. No incluye el registro
-- de migración; ejecútalo por separado después de verificar todas las tablas.

CREATE TABLE IF NOT EXISTS "user" (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  emailVerified INTEGER NOT NULL DEFAULT 0,
  image TEXT,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "session" (
  id TEXT PRIMARY KEY NOT NULL,
  expiresAt INTEGER NOT NULL,
  token TEXT NOT NULL UNIQUE,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  ipAddress TEXT,
  userAgent TEXT,
  userId TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS session_userId_idx ON "session"(userId);

CREATE TABLE IF NOT EXISTS "account" (
  id TEXT PRIMARY KEY NOT NULL,
  accountId TEXT NOT NULL,
  providerId TEXT NOT NULL,
  userId TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  accessToken TEXT,
  refreshToken TEXT,
  idToken TEXT,
  accessTokenExpiresAt INTEGER,
  refreshTokenExpiresAt INTEGER,
  scope TEXT,
  password TEXT,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS account_userId_idx ON "account"(userId);

CREATE TABLE IF NOT EXISTS "verification" (
  id TEXT PRIMARY KEY NOT NULL,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  expiresAt INTEGER NOT NULL,
  createdAt INTEGER,
  updatedAt INTEGER
);
CREATE INDEX IF NOT EXISTS verification_identifier_idx ON "verification"(identifier);

CREATE TABLE IF NOT EXISTS "profiles" (
  user_id TEXT PRIMARY KEY NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL DEFAULT (CAST(strftime('%s', 'now') AS INTEGER) * 1000),
  updated_at INTEGER NOT NULL DEFAULT (CAST(strftime('%s', 'now') AS INTEGER) * 1000),
  cefr_level TEXT CHECK (cefr_level IS NULL OR cefr_level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  explanation_language TEXT NOT NULL DEFAULT 'es'
    CHECK (length(explanation_language) BETWEEN 2 AND 12),
  learning_goal TEXT CHECK (learning_goal IS NULL OR length(learning_goal) <= 200)
);

CREATE TRIGGER IF NOT EXISTS profiles_set_updated_at
AFTER UPDATE ON profiles
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE profiles
  SET updated_at = max(CAST(strftime('%s', 'now') AS INTEGER) * 1000, OLD.updated_at + 1)
  WHERE user_id = NEW.user_id;
END;
