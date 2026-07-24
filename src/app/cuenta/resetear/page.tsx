'use client';

// ============================================
// PÁGINA: RESETEAR CONTRASEÑA (flujo Supabase Auth)
// El email de recuperación llega con ?code= (vía /auth/callback)
// o con #access_token&type=recovery en la URL.
// ============================================

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-client';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [sessionReady, setSessionReady] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function prepareRecoverySession() {
      setCheckingSession(true);
      setError('');

      try {
        // 1) PKCE: ?code=... (si no pasó por /auth/callback)
        const code = searchParams.get('code');
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            console.error('exchangeCodeForSession:', exchangeError.message);
          }
        }

        // 2) Hash implícito: #access_token=...&type=recovery
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
              // Limpia el hash de la barra de dirección
              window.history.replaceState({}, '', window.location.pathname);
            }
          }
        }

        const { data } = await supabase.auth.getSession();
        if (cancelled) return;

        if (data.session) {
          setSessionReady(true);
        } else {
          setSessionReady(false);
          setError(
            'El enlace de recuperación no es válido o ha caducado. Solicita uno nuevo.'
          );
        }
      } catch (err: any) {
        if (!cancelled) {
          setSessionReady(false);
          setError(err?.message || 'No se pudo validar el enlace de recuperación.');
        }
      } finally {
        if (!cancelled) setCheckingSession(false);
      }
    }

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setSessionReady(true);
        setCheckingSession(false);
        setError('');
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

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        throw new Error(updateError.message || 'Error al actualizar contraseña');
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
              {error ||
                'El enlace de recuperación es inválido o ha caducado.'}
            </p>
          </div>
          <Link
            href="/cuenta/recuperar"
            className="w-full block text-center bg-coral-600 text-white py-3 px-4 rounded-lg hover:bg-coral-700 transition-colors font-medium"
          >
            Solicitar nuevo enlace
          </Link>
          <Link
            href="/cuenta/login"
            className="w-full block text-center text-sm text-gray-600 hover:text-gray-900"
          >
            Volver al login
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
            <p className="mt-2 text-sm text-gray-500">Redirigiendo al login…</p>
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
            Elige una contraseña nueva para tu cuenta de Linguafly
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Nueva contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Mínimo 8 caracteres"
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
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Repite tu nueva contraseña"
              disabled={loading}
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <ul className="text-xs text-gray-600 space-y-1">
              <li className={password.length >= 8 ? 'text-amber-600' : ''}>
                {password.length >= 8 ? '✓' : '○'} Mínimo 8 caracteres
              </li>
              <li
                className={
                  password === confirmPassword && password ? 'text-amber-600' : ''
                }
              >
                {password === confirmPassword && password ? '✓' : '○'} Las
                contraseñas coinciden
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
