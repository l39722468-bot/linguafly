import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase/client';
import { ensureAdmin } from '@/lib/admin/ensure-admin';
import { generateTempPassword } from '@/lib/auth/temp-password';
import { sendAdminTempPasswordEmail, sendWelcomeEmail } from '@/lib/email-service';

type CreateStudentBody = {
  action: 'create';
  email: string;
  name?: string;
  languageLevel?: string;
  subscriptionStatus?: string;
  subscriptionPlan?: string;
};

type ResetPasswordBody = {
  action: 'reset-password';
  userId: string;
  email?: string;
};

type MovePositionBody = {
  action: 'move-position';
  userId: string;
  courseId: string;
  unitId: number;
  lessonKey?: string;
};

function mapSubscriptionPlanToAllowedValue(input: string): 'free' | 'basic' | 'premium' {
  const v = (input ?? '').trim().toLowerCase();
  if (!v) return 'free';
  if (v === 'free') return 'free';
  if (v.startsWith('basic')) return 'basic';
  if (v.startsWith('premium')) return 'premium';
  return 'free';
}

function normalizeSubscriptionStatus(input: string): 'active' | 'trialing' | 'inactive' {
  const v = (input ?? '').trim().toLowerCase();
  if (v === 'active') return 'active';
  if (v === 'trialing') return 'trialing';
  return 'inactive';
}

function normalizeCoursePath(courseId: string, unitId: number): string {
  const map: Record<string, string> = {
    'ingles-a1': '/curso-a1',
    'ingles-a2': '/curso-a2',
    'ingles-b1': '/curso-b1',
    'ingles-b2': '/curso-b2',
    'ingles-c1': '/curso-c1',
    'ingles-c2': '/curso-c2',
  };
  const base = map[courseId] ?? '/curso-a1';
  return `${base}/unit-${unitId}`;
}

async function findAuthUserIdByEmail(email: string): Promise<string | null> {
  if (!supabaseAdmin) return null;
  const normalized = email.trim().toLowerCase();

  // Preferir listado paginado frente a getUserByEmail (no siempre disponible / estable).
  let page = 1;
  const perPage = 200;
  while (page <= 10) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage });
    if (error) {
      console.error('[admin/students/manage] listUsers:', error.message);
      return null;
    }
    const match = (data.users ?? []).find((u) => u.email?.toLowerCase() === normalized);
    if (match) return match.id;
    if ((data.users ?? []).length < perPage) break;
    page += 1;
  }
  return null;
}

async function resolveAuthUserId(userId: string, emailHint?: string | null): Promise<{
  userId: string;
  email: string | null;
} | null> {
  if (!supabaseAdmin) return null;

  const { data: byId, error: byIdErr } = await supabaseAdmin.auth.admin.getUserById(userId);
  if (!byIdErr && byId?.user) {
    return { userId: byId.user.id, email: byId.user.email ?? null };
  }

  let email = (emailHint ?? '').trim().toLowerCase() || null;
  if (!email) {
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('email')
      .eq('user_id', userId)
      .maybeSingle();
    email = profile?.email?.trim().toLowerCase() || null;
  }

  if (!email) return null;

  const foundId = await findAuthUserIdByEmail(email);
  if (!foundId) return null;
  return { userId: foundId, email };
}

async function verifyPasswordWorks(email: string, password: string): Promise<boolean> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) return true; // no bloquear si faltan vars en entorno raro

  const client = createSupabaseJsClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error || !data.session) {
    console.error('[admin/students/manage] verify login failed:', error?.message);
    return false;
  }

  await client.auth.signOut().catch(() => undefined);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured' }, { status: 500 });
    }

    const adminCheck = await ensureAdmin();
    if (!adminCheck.ok) {
      return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
    }

    const body = (await request.json().catch(() => ({}))) as
      | CreateStudentBody
      | ResetPasswordBody
      | MovePositionBody;

    if (body.action === 'create') {
      const email = body.email?.trim().toLowerCase();
      const name = (body.name ?? '').trim();
      const languageLevel = (body.languageLevel ?? 'A1').toUpperCase();
      const subscriptionStatus = normalizeSubscriptionStatus(body.subscriptionStatus ?? 'inactive');
      const subscriptionPlan = mapSubscriptionPlanToAllowedValue(body.subscriptionPlan ?? 'free');

      if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
      }

      const tempPassword = generateTempPassword();
      const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: { full_name: name },
      });

      if (createErr || !created.user) {
        return NextResponse.json({ error: createErr?.message ?? 'Failed to create user' }, { status: 400 });
      }

      const userId = created.user.id;

      const rollbackAuthUser = async () => {
        try {
          await supabaseAdmin!.auth.admin.deleteUser(userId);
        } catch (e) {
          console.error('[admin/students/manage] rollback deleteUser failed', e);
        }
      };

      const usersRes = await supabaseAdmin.from('users').upsert({
        id: userId,
        email,
        name: name || email,
        password_hash: 'managed-by-supabase-auth',
        email_verified: new Date().toISOString(),
        language_level: languageLevel,
        course_goal: null,
        image: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      if (usersRes.error) {
        await rollbackAuthUser();
        return NextResponse.json({ error: `Failed saving users: ${usersRes.error.message}` }, { status: 400 });
      }

      const profileRes = await supabaseAdmin.from('user_profiles').upsert({
        user_id: userId,
        email,
        name: name || email,
        role: 'user',
        language_level: languageLevel,
        subscription_status: subscriptionStatus,
        subscription_plan: subscriptionPlan,
        subscription_start_date:
          subscriptionStatus === 'active' || subscriptionStatus === 'trialing'
            ? new Date().toISOString()
            : null,
      });
      if (profileRes.error) {
        await rollbackAuthUser();
        return NextResponse.json(
          { error: `Failed saving user_profiles: ${profileRes.error.message}` },
          { status: 400 }
        );
      }

      const statsRes = await supabaseAdmin.from('user_stats').upsert({ user_id: userId, level: 1 });
      if (statsRes.error) {
        return NextResponse.json({ error: `Failed saving user_stats: ${statsRes.error.message}` }, { status: 400 });
      }

      const xpRes = await supabaseAdmin
        .from('user_xp')
        .upsert({ user_id: userId, total_xp: 0, level: 1, xp_to_next_level: 100 });
      if (xpRes.error) {
        return NextResponse.json({ error: `Failed saving user_xp: ${xpRes.error.message}` }, { status: 400 });
      }

      const streakRes = await supabaseAdmin
        .from('user_streaks')
        .upsert({ user_id: userId, current_streak: 0, longest_streak: 0 });
      if (streakRes.error) {
        return NextResponse.json(
          { error: `Failed saving user_streaks: ${streakRes.error.message}` },
          { status: 400 }
        );
      }

      const loginOk = await verifyPasswordWorks(email, tempPassword);
      if (!loginOk) {
        return NextResponse.json(
          {
            error:
              'Usuario creado pero la contraseña no pasó la verificación de login. Revisa la política de Auth.',
            userId,
          },
          { status: 500 }
        );
      }

      const mailSent = await sendWelcomeEmail({
        email,
        name: name || 'Estudiante',
        planName: subscriptionPlan,
        tempPassword,
      });

      return NextResponse.json({ ok: true, userId, mailSent, tempPassword, loginVerified: true });
    }

    if (body.action === 'reset-password') {
      const requestedUserId = body.userId?.trim();
      const emailHint = typeof body.email === 'string' ? body.email.trim().toLowerCase() : null;
      if (!requestedUserId) {
        return NextResponse.json({ error: 'userId is required' }, { status: 400 });
      }

      const resolved = await resolveAuthUserId(requestedUserId, emailHint);
      if (!resolved?.userId) {
        return NextResponse.json(
          {
            error:
              'No se encontró el usuario en Supabase Auth. Comprueba que el alumno tenga cuenta de login.',
          },
          { status: 404 }
        );
      }

      const { data: profile } = await supabaseAdmin
        .from('user_profiles')
        .select('email,name,subscription_plan')
        .eq('user_id', resolved.userId)
        .maybeSingle();

      // Fallback: perfil con user_id desalineado pero mismo email
      let profileEmail = profile?.email ?? resolved.email;
      let profileName = profile?.name ?? 'Estudiante';
      let planName = profile?.subscription_plan ?? 'free';

      if (!profile && resolved.email) {
        const { data: byEmail } = await supabaseAdmin
          .from('user_profiles')
          .select('email,name,subscription_plan,user_id')
          .ilike('email', resolved.email)
          .limit(1)
          .maybeSingle();
        if (byEmail) {
          profileEmail = byEmail.email;
          profileName = byEmail.name ?? profileName;
          planName = byEmail.subscription_plan ?? planName;
        }
      }

      const email = (profileEmail || resolved.email || emailHint || '').trim().toLowerCase();
      if (!email) {
        return NextResponse.json(
          { error: 'El usuario no tiene email; no se puede resetear ni verificar la contraseña.' },
          { status: 400 }
        );
      }

      const tempPassword = generateTempPassword();
      const { error: updErr } = await supabaseAdmin.auth.admin.updateUserById(resolved.userId, {
        password: tempPassword,
        email_confirm: true,
      });
      if (updErr) {
        console.error('[admin/students/manage] updateUserById:', updErr.message);
        return NextResponse.json(
          {
            error: `No se pudo actualizar la contraseña en Auth: ${updErr.message}`,
          },
          { status: 400 }
        );
      }

      // Mantener coherencia con public.users si existe la fila.
      await supabaseAdmin
        .from('users')
        .update({
          password_hash: 'managed-by-supabase-auth',
          updated_at: new Date().toISOString(),
        })
        .eq('id', resolved.userId);

      const loginOk = await verifyPasswordWorks(email, tempPassword);
      if (!loginOk) {
        return NextResponse.json(
          {
            error:
              'Auth aceptó el cambio pero el login de prueba falló. Vuelve a intentar o revisa la política de contraseñas.',
            userId: resolved.userId,
            email,
            loginVerified: false,
          },
          { status: 500 }
        );
      }

      const mailSent = await sendAdminTempPasswordEmail({
        email,
        name: profileName || 'Estudiante',
        tempPassword,
      });

      return NextResponse.json({
        ok: true,
        userId: resolved.userId,
        email,
        mailSent,
        tempPassword,
        loginVerified: true,
        planName,
      });
    }

    if (body.action === 'move-position') {
      const userId = body.userId?.trim();
      const courseId = body.courseId?.trim();
      const unitId = Number(body.unitId);
      const lessonKey = (body.lessonKey ?? '').trim();

      if (!userId || !courseId || !Number.isFinite(unitId) || unitId <= 0) {
        return NextResponse.json({ error: 'userId, courseId and unitId are required' }, { status: 400 });
      }

      const lastSeenPath = normalizeCoursePath(courseId, unitId);

      await supabaseAdmin
        .from('user_profiles')
        .update({
          last_seen_path: lastSeenPath,
          last_seen_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      if (lessonKey) {
        await supabaseAdmin.from('user_lesson_progress').upsert(
          {
            user_id: userId,
            course_id: courseId,
            unit_id: unitId,
            lesson_key: lessonKey,
            status: 'in_progress',
            exercises_completed: 0,
            exercises_total: 0,
            attempts: 0,
            correct_count: 0,
            accuracy_percent: 0,
            started_at: new Date().toISOString(),
            last_activity_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,course_id,unit_id,lesson_key' }
        );
      }

      return NextResponse.json({ ok: true, userId, courseId, unitId, lessonKey: lessonKey || null });
    }

    return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
  } catch (error) {
    console.error('[admin/students/manage] error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
