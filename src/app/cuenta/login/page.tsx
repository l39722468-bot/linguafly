'use client';

// ============================================
// PÁGINA DE ACCESO PARA ALUMNOS
// Ruta: /cuenta/login
// Cliente Supabase (restaurado: server action tenía problemas)
// ============================================

import { useState, useEffect } from 'react';
import { getUser } from '@/lib/auth-helpers';
import Link from 'next/link';
import { trackLogin } from '@/lib/analytics';

function SignInForm() {
  const [callbackUrl, setCallbackUrl] = useState('/curso-a1/outline');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const err = params.get('error');
    if (err === 'auth' || err === 'missing') setError('Email o contraseña incorrectos');
    else if (err === 'server') setError('Error al iniciar sesión. Intenta nuevamente.');
    let next = params.get('next') || params.get('callbackUrl') || '/curso-a1/outline';
    if (next.startsWith('http')) {
      try {
        const url = new URL(next);
        next = url.pathname + url.search;
      } catch {
        next = '/curso-a1/outline';
      }
    }
    setCallbackUrl(next);
  }, []);
  const [loading, setLoading] = useState(false);
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const { user } = await getUser();
      if (user) {
        setIsAlreadyLoggedIn(true);
        setEmail(user.email || '');
      }
      setAuthChecked(true);
    }
    checkUser();
  }, []);

  // Formulario POST a API route - funciona sin JS, evita problemas de cliente
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setError('');
    setLoading(true);
    trackLogin('email');
    // El form hace POST nativo a /api/auth/login
  };

  const handleLogout = async () => {
    const { supabase } = await import('@/lib/supabase-client');
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-500 via-peach-400 to-coral-600 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-coral-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-peach-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-melon-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <Link href="/" className="group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-coral-500 to-peach-500 flex items-center justify-center text-white text-3xl font-black shadow-lg group-hover:scale-105 transition-transform">
                F
              </div>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2">
              {isAlreadyLoggedIn ? 'Sesión Activa' : 'Bienvenido de Nuevo'}
            </h1>
            <p className="text-slate-600">
              {isAlreadyLoggedIn 
                ? `Has iniciado sesión como ${email}`
                : 'Accede a tus cursos de inglés'}
            </p>
          </div>

          {/* Already logged in view */}
          {!authChecked ? (
            <div className="flex justify-center py-8">
              <svg className="animate-spin h-8 w-8 text-coral-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : isAlreadyLoggedIn ? (
            <div className="space-y-4">
              <button
                onClick={() => window.location.replace(callbackUrl)}
                className="w-full bg-gradient-to-r from-coral-500 to-peach-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                Ir a mis Cursos
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-slate-100 text-slate-700 font-bold py-4 px-6 rounded-xl hover:bg-slate-200 transition-all"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <>
              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                  ⚠️ {error}
                </div>
              )}

              {/* Login Form - POST a API route (funciona sin JS) */}
              <form
                action="/api/auth/login"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="callbackUrl" value={callbackUrl} />
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-coral-500 focus:ring-4 focus:ring-coral-100 outline-none transition-all disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 placeholder-slate-400"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-2">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-coral-500 focus:ring-4 focus:ring-coral-100 outline-none transition-all disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-coral-600 border-slate-300 rounded focus:ring-2 focus:ring-coral-500"
                    />
                    <span className="ml-2 text-slate-600 group-hover:text-slate-900 transition-colors">
                      Recordarme
                    </span>
                  </label>

                  <Link
                    href="/cuenta/recuperar"
                    className="font-semibold text-coral-600 hover:text-coral-700 transition-colors underline underline-offset-2"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-coral-500 to-peach-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Iniciando sesión...
                    </span>
                  ) : (
                    'Iniciar sesión'
                  )}
                </button>

                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center">
                  <p className="text-sm text-amber-900 mb-2">
                    ¿Primera vez o no recuerdas la contraseña?
                  </p>
                  <Link
                    href="/cuenta/recuperar"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2.5 rounded-lg border-2 border-coral-300 bg-white text-coral-700 font-bold text-sm hover:bg-coral-50 transition-colors"
                  >
                    Recuperar / crear contraseña
                  </Link>
                </div>
              </form>
            </>
          )}

          {/* Divider */}
          {authChecked && !isAlreadyLoggedIn && (
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-sm font-semibold text-slate-500">
                ¿Primera vez aquí?
              </span>
            </div>
          </div>
          )}

          {/* Register Link */}
          {authChecked && !isAlreadyLoggedIn && (
          <div className="text-center">
            <p className="text-slate-600 mb-3">
              ¿Aún no tienes acceso a los cursos?
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-coral-600 font-bold hover:text-coral-700 transition-colors group"
            >
              <span>Volver al inicio</span>
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-white/80 text-sm">
          © 2026 Focus English. Todos los derechos reservados.
        </p>
      </div>

      {/* Add animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default function SignInPage() {
  return <SignInForm />;
}
