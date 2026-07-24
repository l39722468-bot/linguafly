import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { ensureAdmin } from '@/lib/admin/ensure-admin';

type StudentRow = {
  id: string;
  email: string;
  name: string;
  role: string;
  subscription_status: string;
  language_level: string;
};

function resolveProfileId(s: Record<string, unknown>): string | null {
  const userId = (s.user_id as string | null | undefined) || null;
  const id = (s.id as string | null | undefined) || null;
  // Preferir user_id (auth id). Algunos esquemas usan id = auth id.
  return userId || id || null;
}

function isAdminRole(role: unknown): boolean {
  return String(role ?? '').trim().toLowerCase() === 'admin';
}

async function listAllAuthUsers() {
  const users: Array<{
    id: string;
    email?: string | null;
    user_metadata?: Record<string, unknown>;
  }> = [];

  let page = 1;
  const perPage = 200;
  while (page <= 20) {
    const { data, error } = await supabaseAdmin!.auth.admin.listUsers({ page, perPage });
    if (error) {
      return { users, error };
    }
    const batch = data?.users ?? [];
    users.push(...batch);
    if (batch.length < perPage) break;
    page += 1;
  }

  return { users, error: null as null };
}

export async function GET() {
  try {
    const adminCheck = await ensureAdmin();
    if (!adminCheck.ok) {
      return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured' }, { status: 500 });
    }

    // Sin filtro .or en SQL: más compatible con esquemas variados.
    // Filtramos admin en memoria.
    let profiles: Record<string, unknown>[] | null = null;
    let error: { message: string } | null = null;

    {
      const res = await supabaseAdmin
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (res.error) {
        // created_at puede no existir
        const retry = await supabaseAdmin.from('user_profiles').select('*');
        profiles = (retry.data as Record<string, unknown>[] | null) ?? null;
        error = retry.error;
      } else {
        profiles = (res.data as Record<string, unknown>[] | null) ?? null;
      }
    }

    if (error) {
      console.error('[admin/students] Database error:', error);
      return NextResponse.json(
        { error: `Failed to fetch students: ${error.message}` },
        { status: 500 }
      );
    }

    const profileStudents: StudentRow[] = [];
    for (const s of profiles ?? []) {
      if (isAdminRole(s.role)) continue;
      const id = resolveProfileId(s);
      if (!id) continue;
      const email = String(s.email ?? '').trim().toLowerCase();
      profileStudents.push({
        id,
        email,
        name:
          String(s.name ?? s.full_name ?? s.email ?? 'Unknown') ||
          'Unknown',
        role: String(s.role ?? 'student'),
        subscription_status: String(s.subscription_status ?? 'inactive'),
        language_level: String(s.language_level ?? 'A1').toUpperCase(),
      });
    }

    const { users: authUsers, error: authUsersError } = await listAllAuthUsers();
    if (authUsersError) {
      console.error('[admin/students] Auth users error:', authUsersError);
      return NextResponse.json({
        students: profileStudents,
        warning: `Auth list parcial: ${authUsersError.message}`,
      });
    }

    const authIdByEmail = new Map<string, string>();
    for (const u of authUsers) {
      const email = (u.email ?? '').trim().toLowerCase();
      if (email) authIdByEmail.set(email, u.id);
    }

    const normalizedProfileStudents: StudentRow[] = profileStudents.map((s) => {
      const authId = s.email ? authIdByEmail.get(s.email) : undefined;
      return authId && authId !== s.id ? { ...s, id: authId } : s;
    });

    const byId = new Map<string, StudentRow>(normalizedProfileStudents.map((s) => [s.id, s]));
    const byEmail = new Map<string, StudentRow>();
    for (const s of normalizedProfileStudents) {
      if (s.email) byEmail.set(s.email, s);
    }

    for (const u of authUsers) {
      if (byId.has(u.id)) continue;
      const email = (u.email ?? '').trim().toLowerCase();
      if (!email) continue;
      if (email.includes('admin@') || email === 'admin@linguafly.app') continue;
      if (byEmail.has(email)) {
        // Ya hay perfil con ese email pero otro user_id: mantener el del perfil
        continue;
      }

      const row: StudentRow = {
        id: u.id,
        email,
        name: (u.user_metadata?.full_name as string | undefined) ?? email,
        role: 'student',
        subscription_status: 'inactive',
        language_level: 'A1',
      };
      byId.set(u.id, row);
      byEmail.set(email, row);
    }

    const merged = Array.from(byId.values()).sort((a, b) =>
      (a.email || '').localeCompare(b.email || '')
    );

    return NextResponse.json({
      students: merged,
      counts: { total: merged.length, fromProfiles: normalizedProfileStudents.length },
    });
  } catch (error) {
    console.error('[admin/students] API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
