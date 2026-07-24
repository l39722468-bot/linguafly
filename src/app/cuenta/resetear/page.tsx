'use client';

// ============================================
// PÁGINA: RESETEAR CONTRASEÑA (flujo Supabase Auth)
// ============================================

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-client';

const ALLOWED_SYMBOLS = `!@#$%^&*()_+-=[]{};':"|<>?,./\`~`;

function validatePasswordLocal(password: string, confirmPassword: string): string | null {
  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres.';
  }
  if (password.length > 72) {
    return 'La contraseña no puede superar 72 caracteres.';
  }
  if (/[^\x20-\x7E]/.test(password)) {
    return 'Usa solo letras, números y símbolos normales (sin acentos ni emojis). Ejemplo: MiClave2026!';
  }
  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden.';
  }
  return null;
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [sessionReady, setSessionReady] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function prepareRecoverySession() {
      setCheckingSession(true);
      setError('');

      try {
        const code = searchParams.get('code');
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            console.error('exchangeCodeForSession:', exchangeError.message);
          }
        }

        if (typeof window !== 'undefined' && window.location.hash.includes('access_token')) {
          const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
          const access_token = hash.get('access_token');
          const refresh_token = hash.get('refresh_token');
          const type = hash.get('type');

          if (access_token && refresh_token && (type === 'recovery' || !type)) {
            const { error: setErr } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });
            if (setErr) {
              console.error('setSession:', setErr.message);
            } else {
              window.history.replaceState({}, '', window.location.pathname);
            }
          }
        }

        const { data, error: userErr } = await supabase.auth.getUser();
        if (cancelled) return;

        if (userErr || !data.user) {
          setSessionReady(false);
          setError(
            'El enlace de recuperación no es válido o ha caducado. Solicita uno nuevo.'
          );
          return;
        }

        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token || null;
        if (!token) {
          setSessionReady(false);
          setError(
            'No se pudo abrir la sesión de recuperación. Solicita un enlace nuevo.'
          );
          return;
        }

        setAccessToken(token);
        setSessionReady(true);
      } catch (err: any) {
        if (!cancelled) {
          setSessionReady(false);
          setError(err?.message || 'No se pudo validar el enlace de recuperación.');
        }
      } finally {
        if (!cancelled) setCheckingSession(false);
      }
    }

    const { data: sub } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token || null;
        if (token) {
          setAccessToken(token);
          setSessionReady(true);
          setCheckingSession(false);
          setError('');
        }
      }
    });

    prepareRecoverySession();

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const localError = validatePasswordLocal(password, confirmPassword);
    if (localError) {
      setError(localError);
      return;
    }

    if (!accessToken) {
      setError('Sesión de recuperación no válida. Solicita un enlace nuevo.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Error al actualizar contraseña');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/cuenta/login?passwordReset=true');
      }, 2500);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar contraseña');
    } finally {
      setLoading(false);
    }
  };

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSymbol = [...ALLOWED_SYMBOLS].some((s) => password.includes(s));
  const hasLength = password.length >= 8;
  const matches = password.length > 0 && password === confirmPassword;

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-peach-50 py-12 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-600 mx-auto" />
          <p className="mt-4 text-gray-600">Validando enlace de recuperación…</p>
        </div>
      </div>
    );
  }

  if (!sessionReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-peach-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-3xl font-bold text-gray-900">Enlace inválido</h2>
            <p className="mt-4 text-gray-600">
              {error || 'El enlace de recuperación es inválido o ha caducado.'}
            </p>
          </div>
          <Link
            href="/cuenta/recuperar"
            className="w-full block text-center bg-coral-600 text-white py-3 px-4 rounded-lg hover:bg-coral-700 transition-colors font-medium"
          >
            Solicitar nuevo enlace
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-peach-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-gray-900">
              ¡Contraseña actualizada!
            </h2>
            <p className="mt-4 text-gray-600">
              Ya puedes iniciar sesión con tu nueva contraseña.
            </p>
          </div>
          <Link
            href="/cuenta/login"
            className="w-full block text-center bg-coral-600 text-white py-3 px-4 rounded-lg hover:bg-coral-700 transition-colors font-medium"
          >
            Ir al login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-peach-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="text-6xl mb-4">🔑</div>
          <h2 className="text-3xl font-bold text-gray-900">Nueva contraseña</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ejemplo válido: <code className="bg-gray-100 px-1 rounded">MiClave2026!</code>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Nueva contraseña
            </label>
            <input
              id="password"
              name="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              spellCheck={false}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="MiClave2026!"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirmar nueva contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              spellCheck={false}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Repite tu nueva contraseña"
              disabled={loading}
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-2 text-sm">Debe incluir:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className={hasLength ? 'text-emerald-600' : ''}>
                {hasLength ? '✓' : '○'} Mínimo 8 caracteres
              </li>
              <li className={hasLower ? 'text-emerald-600' : ''}>
                {hasLower ? '✓' : '○'} Una minúscula (a-z)
              </li>
              <li className={hasUpper ? 'text-emerald-600' : ''}>
                {hasUpper ? '✓' : '○'} Una mayúscula (A-Z)
              </li>
              <li className={hasDigit ? 'text-emerald-600' : ''}>
                {hasDigit ? '✓' : '○'} Un número (0-9)
              </li>
              <li className={hasSymbol ? 'text-emerald-600' : ''}>
                {hasSymbol ? '✓' : '○'} Un símbolo (! @ # $ %)
              </li>
              <li className={matches ? 'text-emerald-600' : ''}>
                {matches ? '✓' : '○'} Las dos coinciden
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading || !password || !confirmPassword}
            className="w-full bg-coral-600 text-white py-3 px-4 rounded-lg hover:bg-coral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Actualizando…' : 'Actualizar contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-peach-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-600 mx-auto" />
            <p className="mt-4 text-gray-600">Cargando...</p>
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
