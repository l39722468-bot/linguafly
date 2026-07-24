-- Sistema de tickets unificado (guest + alumno) para panel admin
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL CHECK (source IN ('guest', 'student')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'answered', 'closed')),
  admin_reply TEXT,
  replied_at TIMESTAMPTZ,
  replied_by UUID,
  hubspot_ticket_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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
  USING (auth.uid() = user_id OR auth.uid() IS NOT NULL AND email = auth.jwt() ->> 'email');

DROP POLICY IF EXISTS "Service role full access support tickets" ON public.support_tickets;
CREATE POLICY "Service role full access support tickets"
  ON public.support_tickets
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Backfill desde contact_inquiries (guest) si existen
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
  CASE WHEN ci.processed THEN 'closed' ELSE 'open' END,
  ci.created_at,
  ci.created_at
FROM public.contact_inquiries ci
WHERE NOT EXISTS (
  SELECT 1 FROM public.support_tickets st
  WHERE st.source = 'guest'
    AND lower(st.email) = lower(trim(ci.email))
    AND st.subject = ci.subject
    AND st.message = ci.message
    AND st.created_at = ci.created_at
);

COMMENT ON TABLE public.support_tickets IS 'Tickets de soporte: guests (contacto) y alumnos autenticados';
