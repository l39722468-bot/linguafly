"use client";

import { Navigation } from "@/components/sections/Navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [provisionStatus, setProvisionStatus] = useState<
    'idle' | 'loading' | 'ok' | 'error'
  >('idle');
  const [provisionMessage, setProvisionMessage] = useState('');

  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;
    setProvisionStatus('loading');

    (async () => {
      try {
        const res = await fetch('/api/stripe/complete-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;

        if (!res.ok || !data.ok) {
          setProvisionStatus('error');
          setProvisionMessage(
            data.error ||
              'No pudimos crear tu acceso automáticamente. Usa «¿Olvidaste tu contraseña?» o contacta soporte.'
          );
          return;
        }

        setProvisionStatus('ok');
        if (data.mailSent) {
          setProvisionMessage(
            'Cuenta lista. Revisa tu email: te hemos enviado el acceso (también spam).'
          );
        } else if (data.created === false) {
          setProvisionMessage(
            'Tu cuenta ya estaba activa. Entra con Iniciar sesión o recupera tu contraseña.'
          );
        } else {
          setProvisionMessage('Cuenta lista. Ya puedes iniciar sesión.');
        }
      } catch {
        if (!cancelled) {
          setProvisionStatus('error');
          setProvisionMessage(
            'Error de red al activar tu cuenta. Prueba «¿Olvidaste tu contraseña?» en unos minutos.'
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-500 mb-6">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
        ¡Pago Exitoso!
      </h1>
      
      <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
        Tu inscripción ha sido procesada correctamente. ¡Bienvenido a Linguafly!
      </p>

      {sessionId && (
        <div
          className={`mb-8 max-w-xl mx-auto rounded-xl border-2 px-4 py-3 text-sm ${
            provisionStatus === 'error'
              ? 'border-red-200 bg-red-50 text-red-800'
              : provisionStatus === 'ok'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                : 'border-slate-200 bg-slate-50 text-slate-700'
          }`}
        >
          {provisionStatus === 'loading' && 'Activando tu cuenta…'}
          {provisionStatus === 'ok' && provisionMessage}
          {provisionStatus === 'error' && provisionMessage}
          {provisionStatus === 'idle' && 'Preparando acceso…'}
        </div>
      )}

      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8 max-w-xl mx-auto">
        <h2 className="text-lg font-bold text-amber-900 mb-3">
          ¿Qué sigue ahora?
        </h2>
        <ul className="text-left space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="text-amber-600 mt-1">1.</span>
            <div>
              <p>
                Pulsa <strong>Iniciar sesión</strong> (arriba a la derecha) con el email del pago.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Si no tienes contraseña, usa <strong>¿Olvidaste tu contraseña?</strong>
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-amber-600 mt-1">2.</span>
            <span>Revisa el email de bienvenida (también spam).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-amber-600 mt-1">3.</span>
            <span>Completa el <strong>test de nivel</strong> cuando entres.</span>
          </li>
        </ul>
      </div>

      {sessionId && (
        <p className="text-sm text-slate-500 mb-6">
          ID de transacción: <code className="bg-slate-100 px-2 py-1 rounded">{sessionId}</code>
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/cuenta/login"
          className="inline-flex items-center justify-center bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-700 transition-colors"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/cuenta/recuperar"
          className="inline-flex items-center justify-center bg-white text-amber-600 border-2 border-amber-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-50 transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <div className="mt-12 p-6 bg-coral-50 rounded-xl border border-coral-200 max-w-xl mx-auto">
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">¿Tienes preguntas?</strong> Nuestro equipo está disponible para ayudarte.
        </p>
        <p className="text-sm text-coral-600 font-bold mt-2">
          ✉️ Contacto: hola@linguafly.app
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <section className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-4 text-slate-600">Cargando...</p>
              </div>
            }>
              <SuccessContent />
            </Suspense>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-400">
            © 2026 Linguafly. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
