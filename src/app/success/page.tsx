"use client";

import { Navigation } from "@/components/sections/Navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

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

      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8 max-w-xl mx-auto">
        <h2 className="text-lg font-bold text-amber-900 mb-3">
          ¿Qué sigue ahora?
        </h2>
        <ul className="text-left space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="text-amber-600 mt-1">📧</span>
            <div>
              <p>Te hemos enviado un <strong>email con tu contraseña temporal</strong> para acceder.</p>
              <p className="text-xs text-slate-500 mt-1">Si no lo recibes en 5 minutos, revisa tu carpeta de <strong>spam</strong>.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-amber-600 mt-1">🎓</span>
            <span>El siguiente paso obligatorio es completar tu <strong>test de nivel</strong>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-amber-600 mt-1">📚</span>
            <span>Prepara tus materiales y ¡prepárate para empezar tu aprendizaje!</span>
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
          href="/onboarding"
          className="inline-flex items-center justify-center bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-700 transition-colors"
        >
          Empezar test de nivel
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-white text-amber-600 border-2 border-amber-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-50 transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>

      <div className="mt-12 p-6 bg-coral-50 rounded-xl border border-coral-200 max-w-xl mx-auto">
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">¿Tienes preguntas?</strong> Nuestro equipo está disponible para ayudarte en cualquier momento.
        </p>
        <p className="text-sm text-coral-600 font-bold mt-2">
          📞 Contacto: info@focusenglish.com
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
            © 2026 Focus English. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
