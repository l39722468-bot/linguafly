import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { ensureAdmin } from '@/lib/admin/ensure-admin';
import { generateTempPassword } from '@/lib/auth/temp-password';
import { resolveAuthUserId, verifyPasswordWithRetry } from '@/lib/auth/find-auth-user';
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

      const loginOk = await verifyPasswordWithRetry(email, tempPassword);
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

      const loginOk = await verifyPasswordWithRetry(email, tempPassword);
      const mailSent = await sendAdminTempPasswordEmail({
        email,
        name: profileName || 'Estudiante',
        tempPassword,
      });

      if (!loginOk) {
        console.warn(
          '[admin/students/manage] password updated but login verification pending',
          resolved.userId,
          email
        );
      }

      return NextResponse.json({
        ok: true,
        userId: resolved.userId,
        email,
        mailSent,
        tempPassword,
        loginVerified: loginOk,
        warning: loginOk
          ? undefined
          : 'Contraseña actualizada en Auth. Si el alumno no puede entrar de inmediato, espera unos segundos e inténtalo de nuevo.',
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
