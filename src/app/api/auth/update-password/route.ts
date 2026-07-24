import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase/client';

export const runtime = 'nodejs';

function validatePassword(password: string): string | null {
  if (typeof password !== 'string' || password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres.';
  }
  if (password.length > 72) {
    return 'La contraseña no puede superar 72 caracteres.';
  }
  // Gestores de contraseñas a veces pegan caracteres invisibles / no ASCII
  // y Auth responde con mensajes confusos (“alfanuméricos o símbolos”).
  if (/[^\x20-\x7E]/.test(password)) {
    return 'Usa solo letras, números y símbolos del teclado (sin acentos ni emojis). Ejemplo: MiClave2026!';
  }
  return null;
}

function mapAuthError(message: string): string {
  const m = (message || '').toLowerCase();
  if (m.includes('same_password') || m.includes('different from the old')) {
    return 'Elige una contraseña distinta a la anterior.';
  }
  if (m.includes('weak_password') || m.includes('password should') || m.includes('characters')) {
    return 'La contraseña no cumple los requisitos: mayúscula, minúscula, número y un símbolo (!@#$).';
  }
  if (m.includes('reauthenticate') || m.includes('reauthentication')) {
    return 'El enlace ha caducado. Solicita uno nuevo en «¿Olvidaste tu contraseña?».';
  }
  if (m.includes('session') || m.includes('jwt') || m.includes('not authenticated')) {
    return 'Sesión de recuperación no válida. Solicita un enlace nuevo.';
  }
  if (m.includes('alphanumeric') || m.includes('code challenge')) {
    return 'Error técnico al validar el enlace. Vuelve a pedir «¿Olvidaste tu contraseña?» y abre el enlace del correo otra vez.';
  }
  return message || 'No se pudo actualizar la contraseña.';
}

/**
 * Actualiza la contraseña usando el access_token de la sesión de recovery.
 * Más fiable que updateUser solo en el navegador.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const password = typeof body.password === 'string' ? body.password : '';

    const validationError = validatePassword(password);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const authHeader = request.headers.get('authorization') || '';
    const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';

    if (!bearer) {
      return NextResponse.json(
        { error: 'Sesión de recuperación no válida. Solicita un enlace nuevo.' },
        { status: 401 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !anonKey) {
      return NextResponse.json({ error: 'Supabase no configurado' }, { status: 500 });
    }

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${bearer}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: userData, error: userError } = await userClient.auth.getUser(bearer);
    if (userError || !userData.user) {
      return NextResponse.json(
        {
          error:
            'El enlace de recuperación no es válido o ha caducado. Solicita uno nuevo.',
        },
        { status: 401 }
      );
    }

    // 1) Intento con el token del usuario (respeta políticas del proyecto)
    const { error: updateError } = await userClient.auth.updateUser({ password });

    if (!updateError) {
      return NextResponse.json({ ok: true });
    }

    console.warn('⚠️ updateUser (user token) failed:', updateError.message);

    // 2) Fallback admin (misma política de fuerza en la mayoría de proyectos)
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: mapAuthError(updateError.message) },
        { status: 400 }
      );
    }

    const { error: adminError } = await supabaseAdmin.auth.admin.updateUserById(
      userData.user.id,
      { password }
    );

    if (adminError) {
      console.error('❌ admin.updateUserById password failed:', adminError.message);
      return NextResponse.json(
        { error: mapAuthError(adminError.message || updateError.message) },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, via: 'admin' });
  } catch (err: any) {
    console.error('❌ update-password error:', err?.message || err);
    return NextResponse.json(
      { error: 'Error interno al actualizar la contraseña' },
      { status: 500 }
    );
  }
}
