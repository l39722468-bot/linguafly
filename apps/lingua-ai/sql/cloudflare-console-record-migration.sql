-- Ejecutar SOLO DESPUÉS de aplicar con éxito cloudflare-console-schema.sql
-- y verificar que existen user, session, account, verification y profiles.
-- Esto avisa a Wrangler de que 0001_better_auth_and_profiles.sql ya está aplicado.

CREATE TABLE IF NOT EXISTS "d1_migrations" (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO "d1_migrations" (name)
VALUES ('0001_better_auth_and_profiles.sql')
ON CONFLICT(name) DO NOTHING;
