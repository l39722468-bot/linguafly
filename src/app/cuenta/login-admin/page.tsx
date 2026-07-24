'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUser } from '@/lib/auth-helpers';

function SignInForm() {
  const [callbackUrl, setCallbackUrl] = useState('/admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const err = params.get('error');
    if (err === 'auth' || err === 'missing') setError('Email o contraseña incorrectos');
    else if (err === 'forbidden') {
      setError(
        'Tu sesión no tiene permisos de administrador (o el perfil no es legible). Cierra sesión e inicia de nuevo.'
      );
    } else if (err === 'server') setError('Error al iniciar sesión. Intenta nuevamente.');

    let next = params.get('next') || params.get('callbackUrl') || '/admin';
    if (next.startsWith('http')) {
      try {
        const u = new URL(next);
        next = u.pathname + u.search;
      } catch {
        next = '/admin';
      }
    }
    if (!next.startsWith('/admin')) next = '/admin';
    setCallbackUrl(next);
  }, []);

  useEffect(() => {
    async function checkUser() {
      const { user } = await getUser();
      if (user) {
        setIsAlreadyLoggedIn(true);
        setEmail(user.email || '');
      }
    }
    checkUser();
  }, []);

  const handleSubmit = () => {
    setError('');
    setLoading(true);
  };

  const handleLogout = async () => {
    const { supabase } = await import('@/lib/supabase-client');
    await supabase.auth.signOut();
    window.location.href = '/cuenta/login-admin';
  };

  const goAdmin = () => {
    // Navegación completa para que el middleware lea bien las cookies
    window.location.href = callbackUrl || '/admin';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-coral-600 flex items-center justify-center p-4">
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="flex justify-center mb-6">
            <Link href="/" className="group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-coral-500 flex items-center justify-center text-white text-3xl font-black shadow-lg group-hover:scale-105 transition-transform">
                A
              </div>
            </Link>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Acceso de Administradores</h1>
            <p className="text-slate-600">Gestiona alumnos y progreso desde el panel.</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
              ⚠️ {error}
            </div>
          )}

          {isAlreadyLoggedIn ? (
            <div className="space-y-4">
              <div className="text-center text-sm text-slate-600">
                Sesión activa como <span className="font-semibold">{email}</span>
              </div>
              <button
                type="button"
                onClick={goAdmin}
                className="w-full bg-gradient-to-r from-slate-900 to-coral-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                Ir al Panel Admin
              </button>
              <a
                href="/admin"
                className="w-full inline-flex items-center justify-center bg-white border-2 border-slate-200 text-slate-800 font-bold py-3 px-6 rounded-xl hover:bg-slate-50 transition-all"
              >
                Abrir /admin
              </a>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full bg-slate-100 text-slate-700 font-bold py-4 px-6 rounded-xl hover:bg-slate-200 transition-all"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <>
              <form
                action="/api/auth/login-admin"
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
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-coral-500 focus:ring-4 focus:ring-coral-100 outline-none transition-all text-slate-900 placeholder-slate-400"
                    placeholder="admin@tuempresa.com"
                    autoComplete="email"
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
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-coral-500 focus:ring-4 focus:ring-coral-100 outline-none transition-all text-slate-900"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-slate-900 to-coral-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? 'Verificando...' : 'Acceder al Panel'}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="text-slate-600 mb-2 text-sm">¿Eres alumno?</p>
                <Link
                  href="/cuenta/login"
                  className="inline-flex items-center justify-center font-semibold text-coral-600 hover:text-coral-700 transition-colors"
                >
                  Ir al login de alumno
                </Link>
              </div>
            </>
          )}

          <div className="text-center mt-6 text-white/80 text-sm">
            © 2026 Linguafly. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginAdminPage() {
  return <SignInForm />;
}
