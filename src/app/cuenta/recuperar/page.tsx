'use client';

// ============================================
// PÁGINA: SOLICITAR RECUPERACIÓN DE CONTRASEÑA
// ============================================

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchParams.get('error') === 'link_invalid') {
      setError('El enlace de recuperación no es válido o ha caducado. Solicita uno nuevo.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar solicitud');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error al enviar email de recuperación');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-white to-coral-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-gray-900">
              ¡Email Enviado!
            </h2>
            <p className="mt-4 text-gray-600">
              Si el email existe en nuestro sistema, recibirás instrucciones para recuperar tu contraseña.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Revisa tu bandeja de entrada y carpeta de spam.
            </p>
          </div>

          <div className="bg-coral-50 border border-coral-200 rounded-lg p-4">
            <h3 className="font-semibold text-coral-900 mb-2">
              ⏰ Importante:
            </h3>
            <ul className="text-sm text-coral-800 space-y-1">
              <li>• El enlace expirará en <strong>1 hora</strong></li>
              <li>• Solo puedes usarlo <strong>una vez</strong></li>
              <li>• Si no recibes el email, revisa spam</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link
              href="/cuenta/login"
              className="w-full block text-center bg-coral-600 text-white py-3 px-4 rounded-lg hover:bg-coral-700 transition-colors font-medium"
            >
              Volver al login
            </Link>
            <button
              onClick={() => {
                setSuccess(false);
                setEmail('');
              }}
              className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
            >
              ¿No recibiste el email? Reenviar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-white to-coral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-3xl font-bold text-gray-900">
            ¿Olvidaste tu contraseña?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            No te preocupes, te enviaremos instrucciones para recuperarla
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email de tu cuenta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
              placeholder="tu@email.com"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-coral-600 text-white py-3 px-4 rounded-lg hover:bg-coral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Enviando…' : 'Enviar enlace de recuperación'}
          </button>
        </form>

        <div className="text-center">
          <Link
            href="/cuenta/login"
            className="text-sm font-medium text-coral-600 hover:text-coral-500"
          >
            ← Volver al login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-600" />
        </div>
      }
    >
      <ForgotPasswordForm />
    </Suspense>
  );
}
