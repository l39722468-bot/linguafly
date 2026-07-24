import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { ensureAdmin } from '@/lib/admin/ensure-admin';

export async function GET() {
  try {
    const adminCheck = await ensureAdmin();
    if (!adminCheck.ok) {
      return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured' }, { status: 500 });
    }

    const { data: students, error } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .or('role.is.null,role.neq.admin')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
    }

    const profileStudents = (students ?? []).map((s: Record<string, unknown>) => ({
      id: s.user_id as string,
      email: s.email as string,
      name: (s.name as string) ?? (s.full_name as string) ?? (s.email as string) ?? 'Unknown',
      role: (s.role as string) ?? 'student',
      subscription_status: (s.subscription_status as string) ?? 'inactive',
      language_level: (s.language_level as string) ?? 'A1',
    }));

    const { data: authUsersData, error: authUsersError } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (authUsersError) {
      console.error('Auth users error:', authUsersError);
      return NextResponse.json({ students: profileStudents });
    }

    const profileByUserId = new Map(profileStudents.map((s) => [s.id, s]));
    const merged = [...profileStudents];

    for (const u of authUsersData.users ?? []) {
      if (profileByUserId.has(u.id)) continue;
      const email = u.email ?? null;
      if (email && email.toLowerCase().includes('admin')) continue;

      merged.push({
        id: u.id,
        email: email as string,
        name: (u.user_metadata?.full_name as string | undefined) ?? email ?? 'Unknown',
        role: 'student',
        subscription_status: 'inactive',
        language_level: 'A1',
      });
    }

    return NextResponse.json({ students: merged });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
