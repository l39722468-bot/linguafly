import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import {
  findAuthUserIdByEmail,
} from '@/lib/stripe/provision-subscriber';

export const runtime = 'nodejs';

const ADMIN_EMAIL = 'admin@linguafly.app';
const ADMIN_PASSWORD = 'LinguaflyAdmin2026!';
const ADMIN_NAME = 'Administrador Linguafly';

/**
 * Bootstrap de administrador (protegido por ADMIN_SECRET).
 * POST con header: x-admin-secret: <ADMIN_SECRET o focus-english-admin-2026>
 */
export async function POST(request: NextRequest) {
  try {
    const expected = process.env.ADMIN_SECRET || 'focus-english-admin-2026';
    const provided =
      request.headers.get('x-admin-secret') ||
      request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
      '';

    if (!provided || provided !== expected) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'SUPABASE_SERVICE_ROLE_KEY ausente' },
        { status: 500 }
      );
    }

    const nowIso = new Date().toISOString();
    let userId = await findAuthUserIdByEmail(ADMIN_EMAIL);
    let created = false;

    if (!userId) {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,
        user_metadata: { full_name: ADMIN_NAME, role: 'admin' },
      });

      if (error || !data.user?.id) {
        // Si ya existía, recuperar id y actualizar password
        const msg = (error?.message || '').toLowerCase();
        if (msg.includes('already') || msg.includes('registered') || msg.includes('exists')) {
          userId = await findAuthUserIdByEmail(ADMIN_EMAIL);
        } else {
          return NextResponse.json(
            { error: error?.message || 'No se pudo crear el admin en Auth' },
            { status: 500 }
          );
        }
      } else {
        userId = data.user.id;
        created = true;
      }
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'No se pudo resolver el userId del admin' },
        { status: 500 }
      );
    }

    // Asegurar contraseña conocida
    const { error: pwdErr } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: ADMIN_NAME, role: 'admin' },
    });
    if (pwdErr) {
      return NextResponse.json(
        { error: `No se pudo fijar la contraseña: ${pwdErr.message}` },
        { status: 500 }
      );
    }

    await supabaseAdmin.from('users').upsert({
      id: userId,
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      password_hash: 'managed-by-supabase-auth',
      email_verified: nowIso,
      image: null,
      updated_at: nowIso,
    });

    const profileRes = await supabaseAdmin.from('user_profiles').upsert(
      {
        user_id: userId,
        email: ADMIN_EMAIL,
        name: ADMIN_NAME,
        role: 'admin',
        subscription_status: 'active',
        subscription_plan: 'premium',
        subscription_start_date: nowIso,
      },
      { onConflict: 'user_id' }
    );

    if (profileRes.error) {
      // Fallback update por email
      const upd = await supabaseAdmin
        .from('user_profiles')
        .update({
          role: 'admin',
          subscription_status: 'active',
          subscription_plan: 'premium',
          name: ADMIN_NAME,
        })
        .eq('user_id', userId);

      if (upd.error) {
        return NextResponse.json(
          {
            error: `Auth OK pero falló user_profiles: ${profileRes.error.message}`,
            userId,
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      ok: true,
      created,
      userId,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      loginUrl: 'https://linguafly.app/cuenta/login-admin',
      role: 'admin',
    });
  } catch (err: any) {
    console.error('[bootstrap-admin]', err);
    return NextResponse.json(
      { error: err?.message || 'Error interno' },
      { status: 500 }
    );
  }
}
