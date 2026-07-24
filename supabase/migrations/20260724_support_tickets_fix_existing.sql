-- Fix: actualiza support_tickets si ya existía con otro esquema
-- Ejecutar en Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS source TEXT;
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS user_id UUID;
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS subject TEXT;
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general';
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'open';
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS admin_reply TEXT;
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS replied_at TIMESTAMPTZ;
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS replied_by UUID;
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS hubspot_ticket_id TEXT;
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Esquemas antiguos a veces tenían user_id NOT NULL (rompe tickets guest y alumnos mal enlazados)
DO $$
BEGIN
  BEGIN
    ALTER TABLE public.support_tickets ALTER COLUMN user_id DROP NOT NULL;
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'DROP NOT NULL user_id: %', SQLERRM;
  END;
END $$;

-- Defaults / backfill mínimos para filas antiguas
UPDATE public.support_tickets SET source = 'guest' WHERE source IS NULL;
UPDATE public.support_tickets SET email = COALESCE(email, 'unknown@linguafly.app') WHERE email IS NULL;
UPDATE public.support_tickets SET subject = COALESCE(subject, 'Sin asunto') WHERE subject IS NULL;
UPDATE public.support_tickets SET message = COALESCE(message, '') WHERE message IS NULL;
UPDATE public.support_tickets SET category = COALESCE(category, 'general') WHERE category IS NULL;
UPDATE public.support_tickets SET status = COALESCE(status, 'open') WHERE status IS NULL;
UPDATE public.support_tickets SET created_at = COALESCE(created_at, NOW()) WHERE created_at IS NULL;
UPDATE public.support_tickets SET updated_at = COALESCE(updated_at, NOW()) WHERE updated_at IS NULL;

-- NOT NULL donde haga falta
ALTER TABLE public.support_tickets ALTER COLUMN source SET NOT NULL;
ALTER TABLE public.support_tickets ALTER COLUMN email SET NOT NULL;
ALTER TABLE public.support_tickets ALTER COLUMN subject SET NOT NULL;
ALTER TABLE public.support_tickets ALTER COLUMN message SET NOT NULL;
ALTER TABLE public.support_tickets ALTER COLUMN category SET NOT NULL;
ALTER TABLE public.support_tickets ALTER COLUMN status SET NOT NULL;
ALTER TABLE public.support_tickets ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.support_tickets ALTER COLUMN updated_at SET NOT NULL;

-- Constraints (idempotentes)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'support_tickets_source_check'
  ) THEN
    ALTER TABLE public.support_tickets
      ADD CONSTRAINT support_tickets_source_check
      CHECK (source IN ('guest', 'student'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'support_tickets_status_check'
  ) THEN
    ALTER TABLE public.support_tickets
      ADD CONSTRAINT support_tickets_status_check
      CHECK (status IN ('open', 'answered', 'closed'));
  END IF;

  -- FK user_id -> auth.users (si no existe)
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'support_tickets_user_id_fkey'
  ) THEN
    BEGIN
      ALTER TABLE public.support_tickets
        ADD CONSTRAINT support_tickets_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;
    EXCEPTION WHEN others THEN
      RAISE NOTICE 'FK user_id no aplicada: %', SQLERRM;
    END;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_support_tickets_source_status
  ON public.support_tickets (source, status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_support_tickets_email
  ON public.support_tickets (email);

CREATE INDEX IF NOT EXISTS idx_support_tickets_user
  ON public.support_tickets (user_id);

ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own support tickets" ON public.support_tickets;
CREATE POLICY "Users read own support tickets"
  ON public.support_tickets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR email = auth.jwt() ->> 'email');

DROP POLICY IF EXISTS "Service role full access support tickets" ON public.support_tickets;
CREATE POLICY "Service role full access support tickets"
  ON public.support_tickets
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Backfill desde contact_inquiries (solo si la tabla existe)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'contact_inquiries'
  ) THEN
    INSERT INTO public.support_tickets (
      source, email, first_name, last_name, phone, subject, message, category, status, created_at, updated_at
    )
    SELECT
      'guest',
      lower(trim(ci.email)),
      ci.first_name,
      ci.last_name,
      ci.phone,
      ci.subject,
      ci.message,
      'general',
      CASE WHEN COALESCE(ci.processed, false) THEN 'closed' ELSE 'open' END,
      COALESCE(ci.created_at, NOW()),
      COALESCE(ci.created_at, NOW())
    FROM public.contact_inquiries ci
    WHERE NOT EXISTS (
      SELECT 1 FROM public.support_tickets st
      WHERE st.source = 'guest'
        AND lower(st.email) = lower(trim(ci.email))
        AND st.subject = ci.subject
        AND st.message = ci.message
    );
  END IF;
END $$;

COMMENT ON TABLE public.support_tickets IS 'Tickets de soporte: guests (contacto) y alumnos autenticados';
