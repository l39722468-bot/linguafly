import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase/client';

/**
 * Resuelve el UUID de Supabase Auth a partir del email.
 * Orden: public.users → user_profiles → Auth admin API → listUsers paginado.
 */
export async function findAuthUserIdByEmail(email: string): Promise<string | undefined> {
  if (!supabaseAdmin) return undefined;

  const normalized = email.toLowerCase().trim();
  if (!normalized) return undefined;

  const { data: userRow } = await supabaseAdmin
    .from('users')
    .select('id')
    .ilike('email', normalized)
    .maybeSingle();
  if (userRow?.id) return userRow.id;

  const { data: profileRow } = await supabaseAdmin
    .from('user_profiles')
    .select('user_id')
    .ilike('email', normalized)
    .maybeSingle();
  if (profileRow?.user_id) return profileRow.user_id;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    try {
      const res = await fetch(
        `${supabaseUrl}/auth/v1/admin/users?email=${encodeURIComponent(normalized)}`,
        {
          headers: {
            Authorization: `Bearer ${serviceKey}`,
            apikey: serviceKey,
          },
          cache: 'no-store',
        }
      );
      if (res.ok) {
        const json = await res.json();
        const users = Array.isArray(json?.users) ? json.users : Array.isArray(json) ? json : [];
        const match = users.find(
          (u: { email?: string; id?: string }) =>
            String(u?.email || '').toLowerCase() === normalized
        );
        if (match?.id) return match.id;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn('[find-auth-user] Auth admin email lookup error:', message);
    }
  }

  for (let page = 1; page <= 20; page++) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) break;
    const match = data?.users?.find((u) => u.email?.toLowerCase() === normalized);
    if (match?.id) return match.id;
    if (!data?.users?.length || data.users.length < 200) break;
  }

  return undefined;
}

/**
 * Resuelve el userId de Auth aunque el panel tenga un id de perfil desalineado.
 */
export async function resolveAuthUserId(
  userId: string,
  emailHint?: string | null
): Promise<{ userId: string; email: string | null } | null> {
  if (!supabaseAdmin) return null;

  const normalizedEmailHint = (emailHint ?? '').trim().toLowerCase() || null;

  // Priorizar email: el listado admin a veces envía user_profiles.id en lugar de auth id.
  if (normalizedEmailHint) {
    const byEmail = await findAuthUserIdByEmail(normalizedEmailHint);
    if (byEmail) {
      return { userId: byEmail, email: normalizedEmailHint };
    }
  }

  const { data: byId, error: byIdErr } = await supabaseAdmin.auth.admin.getUserById(userId);
  if (!byIdErr && byId?.user) {
    const email = byId.user.email?.trim().toLowerCase() ?? null;
    if (normalizedEmailHint && email && email !== normalizedEmailHint) {
      const correctId = await findAuthUserIdByEmail(normalizedEmailHint);
      if (correctId) return { userId: correctId, email: normalizedEmailHint };
    }
    return { userId: byId.user.id, email };
  }

  let email = normalizedEmailHint;
  if (!email) {
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('email')
      .eq('user_id', userId)
      .maybeSingle();
    email = profile?.email?.trim().toLowerCase() || null;

    if (!email) {
      const { data: profileById } = await supabaseAdmin
        .from('user_profiles')
        .select('email')
        .eq('id', userId)
        .maybeSingle();
      email = profileById?.email?.trim().toLowerCase() || null;
    }
  }

  if (!email) return null;

  const foundId = await findAuthUserIdByEmail(email);
  if (!foundId) return null;
  return { userId: foundId, email };
}

/**
 * Verifica login con reintentos (Auth puede tardar en propagar el cambio de contraseña).
 */
export async function verifyPasswordWithRetry(
  email: string,
  password: string,
  options?: { maxAttempts?: number; delayMs?: number }
): Promise<boolean> {
  const maxAttempts = options?.maxAttempts ?? 4;
  const delayMs = options?.delayMs ?? 400;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) return true;

  const client = createSupabaseJsClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (!error && data.session) {
      await client.auth.signOut().catch(() => undefined);
      return true;
    }

    if (attempt < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
    } else {
      console.error('[find-auth-user] verify login failed after retries:', error?.message);
    }
  }

  return false;
}
