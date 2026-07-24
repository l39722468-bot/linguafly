import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export type AdminCheck =
  | { ok: true; userId: string; email: string | null }
  | { ok: false; status: 401 | 403 | 500; message: string };

<<<<<<< HEAD
=======
/**
 * Valida sesión + role=admin usando service role (evita falsos Forbidden por RLS).
 */
>>>>>>> b0b82b713 (fix(progress): sincronizar progreso alumno con panel admin)
export async function ensureAdmin(): Promise<AdminCheck> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, status: 401, message: 'Unauthorized' };
  }

  if (!supabaseAdmin) {
    return { ok: false, status: 500, message: 'SUPABASE_SERVICE_ROLE_KEY not configured' };
  }

  const { data: profile } = await supabaseAdmin
    .from('user_profiles')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle();

  let role = profile?.role ?? null;

  if (role !== 'admin' && user.email) {
    const { data: byEmail } = await supabaseAdmin
      .from('user_profiles')
      .select('role')
      .ilike('email', user.email)
      .limit(5);
<<<<<<< HEAD
    if ((byEmail || []).some((r) => r.role === 'admin')) role = 'admin';
=======

    if ((byEmail || []).some((r) => r.role === 'admin')) {
      role = 'admin';
    }
>>>>>>> b0b82b713 (fix(progress): sincronizar progreso alumno con panel admin)
  }

  if (role !== 'admin' && user.email?.toLowerCase() === 'admin@linguafly.app') {
    role = 'admin';
  }

  if (role !== 'admin') {
    return { ok: false, status: 403, message: 'Forbidden' };
  }

  return { ok: true, userId: user.id, email: user.email ?? null };
}
