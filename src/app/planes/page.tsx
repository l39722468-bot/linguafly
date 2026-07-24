'use client';

import { Navigation } from "@/components/sections/Navigation";
import { getAllPlans, formatPrice } from "@/lib/subscription-plans";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PlanesPage() {
  const plans = getAllPlans();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [showPremiumRequired, setShowPremiumRequired] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('reason') === 'premium_required') {
      setShowPremiumRequired(true);
    }
  }, []);

  const handleSubscribe = (planId: string) => {
    setIsLoading(planId);
    window.location.href = `/cuenta/registro?plan=${planId}`;
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-coral-50 via-peach-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showPremiumRequired && (
            <div className="max-w-4xl mx-auto mb-10 p-6 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <span className="text-4xl">🔒</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-amber-900">Suscripción requerida</h3>
                <p className="text-amber-700">
                  La unidad 1 de cada curso es gratis. Activa la suscripción de 5,99 €/mes para desbloquear el resto.
                </p>
              </div>
            </div>
          )}

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-100 text-coral-700 text-sm font-bold mb-4">
              <span>💎</span>
              <span>Suscripción mensual</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-slate-900 mb-6">
              Unidad 1 gratis, todo el curso desde 5,99 €
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              {plans[0] ? formatPrice(plans[0].price) : formatPrice(599)} al mes · Cancela cuando quieras · Sin permanencia
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-slate-600 flex-wrap">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Sin permanencia</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cancela cuando quieras</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Niveles A1–C2</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-lg mx-auto mb-16">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl border-2 ${plan.color.border} overflow-hidden transition-all hover:shadow-2xl`}
              >
                <div className="p-8">
                  <div className="mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${plan.color.gradient} text-white font-black text-2xl mb-4`}
                    >
                      📚
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-2">{plan.name}</h2>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-black text-slate-900">{formatPrice(plan.price)}</span>
                      <span className="text-slate-600 font-semibold">/ mes</span>
                    </div>
                    <p className="text-sm text-coral-600 font-bold">
                      Desbloquea todas las unidades A1–C2 tras la unidad 1 gratuita
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                      Incluido en tu suscripción
                    </h3>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg
                            className={`w-5 h-5 ${plan.color.text} flex-shrink-0 mt-0.5`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isLoading === plan.id}
                    className="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all bg-gradient-to-r from-coral-600 to-peach-600 text-white hover:from-coral-700 hover:to-peach-700 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading === plan.id ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Procesando...
                      </span>
                    ) : (
                      `Comenzar con ${plan.name}`
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-500 mt-4">Cancela en cualquier momento · Sin compromisos</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 text-center mb-8">Preguntas frecuentes</h2>
            <div className="space-y-4">
              <details className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
                <summary className="font-bold text-slate-900 cursor-pointer">¿Qué incluye la suscripción?</summary>
                <p className="mt-4 text-slate-600">
                  La unidad 1 de cada curso es gratis. Con la suscripción desbloqueas el resto de unidades A1–C2, material y ejercicios. Puedes cancelar cuando quieras.
                </p>
              </details>

              <details className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
                <summary className="font-bold text-slate-900 cursor-pointer">¿Puedo probar sin pagar?</summary>
                <p className="mt-4 text-slate-600">
                  Sí. Puedes hacer la unidad 1 de cada nivel (A1–C2) sin suscripción. A partir de la unidad 2 necesitas el plan mensual.
                </p>
              </details>

              <details className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
                <summary className="font-bold text-slate-900 cursor-pointer">¿Qué pasa si cancelo?</summary>
                <p className="mt-4 text-slate-600">
                  Puedes cancelar sin penalización. Mantienes el acceso hasta el final del periodo pagado; después no se renueva el cobro.
                </p>
              </details>

              <details className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
                <summary className="font-bold text-slate-900 cursor-pointer">¿Hay permanencia o pago anual?</summary>
                <p className="mt-4 text-slate-600">
                  No. Solo existe la suscripción mensual al precio indicado. Sin opción anual ni planes distintos.
                </p>
              </details>

              <details className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
                <summary className="font-bold text-slate-900 cursor-pointer">¿Hay certificado al completar niveles?</summary>
                <p className="mt-4 text-slate-600">
                  Sí, al completar cada nivel puedes obtener certificado según el flujo del curso.
                </p>
              </details>
            </div>
          </div>

          <div className="text-center mt-16 bg-gradient-to-r from-coral-600 to-peach-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-black mb-4">¿Tienes dudas?</h2>
            <p className="text-lg mb-6 opacity-90">El equipo de Focus English puede orientarte antes de suscribirte.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center bg-white text-coral-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors"
              >
                💬 Contacto
              </Link>
              <Link
                href="/test-nivel"
                className="inline-flex items-center justify-center bg-coral-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-coral-900 transition-colors"
              >
                🎯 Test de nivel gratis
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-400">© 2026 Focus English. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}
