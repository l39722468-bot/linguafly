-- Progreso unificado alumno ↔ admin
-- Asegura schema moderno de user_lesson_progress + user_exercise_events
-- (compatible con escrituras de /api/progress/record y /api/a1/record-exercise)

CREATE TABLE IF NOT EXISTS public.user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT,
  unit_id INTEGER,
  lesson_key TEXT,
  status TEXT DEFAULT 'in_progress',
  exercises_completed INTEGER DEFAULT 0,
  exercises_total INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  accuracy_percent NUMERIC(6,2) DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Columnas por si la tabla existía con schema antiguo (lesson_id)
ALTER TABLE public.user_lesson_progress ADD COLUMN IF NOT EXISTS course_id TEXT;
ALTER TABLE public.user_lesson_progress ADD COLUMN IF NOT EXISTS unit_id INTEGER;
ALTER TABLE public.user_lesson_progress ADD COLUMN IF NOT EXISTS lesson_key TEXT;
ALTER TABLE public.user_lesson_progress ADD COLUMN IF NOT EXISTS exercises_completed INTEGER DEFAULT 0;
ALTER TABLE public.user_lesson_progress ADD COLUMN IF NOT EXISTS exercises_total INTEGER DEFAULT 0;
ALTER TABLE public.user_lesson_progress ADD COLUMN IF NOT EXISTS attempts INTEGER DEFAULT 0;
ALTER TABLE public.user_lesson_progress ADD COLUMN IF NOT EXISTS correct_count INTEGER DEFAULT 0;
ALTER TABLE public.user_lesson_progress ADD COLUMN IF NOT EXISTS accuracy_percent NUMERIC(6,2) DEFAULT 0;
ALTER TABLE public.user_lesson_progress ADD COLUMN IF NOT EXISTS time_spent_seconds INTEGER DEFAULT 0;
ALTER TABLE public.user_lesson_progress ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.user_lesson_progress ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;
ALTER TABLE public.user_lesson_progress ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.user_lesson_progress ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.user_lesson_progress ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

CREATE UNIQUE INDEX IF NOT EXISTS user_lesson_progress_user_course_unit_lesson_uidx
  ON public.user_lesson_progress (user_id, course_id, unit_id, lesson_key);

CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_user_course
  ON public.user_lesson_progress (user_id, course_id);

CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_user_unit
  ON public.user_lesson_progress (user_id, unit_id);

CREATE TABLE IF NOT EXISTS public.user_exercise_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  unit_id INTEGER NOT NULL,
  lesson_key TEXT NOT NULL,
  exercise_id TEXT NOT NULL,
  exercise_type TEXT,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  time_spent_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_exercise_events_user_course
  ON public.user_exercise_events (user_id, course_id, unit_id);

ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_exercise_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own lesson progress" ON public.user_lesson_progress;
CREATE POLICY "Users manage own lesson progress"
  ON public.user_lesson_progress
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own exercise events" ON public.user_exercise_events;
CREATE POLICY "Users manage own exercise events"
  ON public.user_exercise_events
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Mejorar agregación A1: marcar completed cuando hay suficiente actividad
CREATE OR REPLACE FUNCTION update_a1_progress_on_exercise()
RETURNS TRIGGER AS $$
DECLARE
  total_exercises INTEGER;
  correct_exercises INTEGER;
  accuracy DECIMAL(5,2);
  new_status TEXT;
BEGIN
  SELECT COUNT(*) INTO total_exercises
  FROM a1_exercise_results
  WHERE user_id = NEW.user_id AND unit_id = NEW.unit_id;

  SELECT COUNT(*) INTO correct_exercises
  FROM a1_exercise_results
  WHERE user_id = NEW.user_id AND unit_id = NEW.unit_id AND is_correct = true;

  accuracy := CASE
    WHEN total_exercises > 0 THEN ROUND((correct_exercises::DECIMAL / total_exercises) * 100, 2)
    ELSE 0
  END;

  -- Heurística: completed si hay >= 12 intentos (aprox. una lección completa) o 100% con total conocido
  new_status := CASE
    WHEN total_exercises >= 12 THEN 'completed'
    ELSE 'in_progress'
  END;

  INSERT INTO a1_progress (
    user_id, unit_id, exercises_completed, exercises_total,
    accuracy_percentage, last_activity, status, completed_at
  )
  VALUES (
    NEW.user_id, NEW.unit_id, correct_exercises, total_exercises,
    accuracy, NOW(), new_status,
    CASE WHEN new_status = 'completed' THEN NOW() ELSE NULL END
  )
  ON CONFLICT (user_id, unit_id) DO UPDATE SET
    exercises_completed = EXCLUDED.exercises_completed,
    exercises_total = EXCLUDED.exercises_total,
    accuracy_percentage = EXCLUDED.accuracy_percentage,
    last_activity = NOW(),
    status = CASE
      WHEN a1_progress.status = 'completed' THEN 'completed'
      ELSE EXCLUDED.status
    END,
    completed_at = CASE
      WHEN a1_progress.status = 'completed' THEN a1_progress.completed_at
      WHEN EXCLUDED.status = 'completed' THEN NOW()
      ELSE a1_progress.completed_at
    END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
