-- Campos necesarios para persistir el test de nivel y evitar repetirlo.

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS language_level TEXT
    CHECK (language_level IS NULL OR language_level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2'));

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS learning_goals TEXT[] NOT NULL DEFAULT '{}';

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS placement_completed_at TIMESTAMPTZ;

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS last_seen_path TEXT;

CREATE INDEX IF NOT EXISTS idx_user_profiles_language_level
  ON public.user_profiles (language_level);

CREATE INDEX IF NOT EXISTS idx_user_profiles_placement_completed_at
  ON public.user_profiles (placement_completed_at);
