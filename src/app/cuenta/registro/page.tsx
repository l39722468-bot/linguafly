"use client";

// ============================================
// PÁGINA DE REGISTRO
// Ruta: /cuenta/registro
// Formulario de inscripción con selección de plan
// ============================================

import { Navigation } from "@/components/sections/Navigation";
import Link from "next/link";
import { useState, FormEvent, useEffect, useMemo } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { getAllPlans, formatPrice } from "@/lib/subscription-plans";
import { getUser } from "@/lib/auth-helpers";
import { supabase } from "@/lib/supabase-client";

// Inicializar Stripe de forma segura
const getStripe = async () => {
  if (typeof window === "undefined") return null;
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    console.warn("Stripe publishable key is missing. Stripe features will not work.");
    return null;
  }
  return await loadStripe(key);
};

// No inicializar globalmente para evitar errores prematuros
let stripePromise: Promise<any> | null = null;

export default function SignupPage() {
  const plans = useMemo(() => getAllPlans(), []);
  const [selectedPlan, setSelectedPlan] = useState<string>('basic-monthly');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentLevel: "",
    message: ""
  });

  // Detectar plan desde URL y pre-cargar datos de usuario si está logueado
  useEffect(() => {
    async function loadUserData() {
      const { user } = await getUser();
      if (user) {
        // Intentar obtener más datos del perfil de Supabase
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .maybeSingle();

        setFormData(prev => ({
          ...prev,
          email: user.email || prev.email,
          firstName: profile?.name || user.user_metadata?.full_name || user.user_metadata?.name || prev.firstName,
          phone: profile?.phone || prev.phone,
          currentLevel: (profile?.language_level || prev.currentLevel).toLowerCase(),
        }));
      }
    }

    const params = new URLSearchParams(window.location.search);
    const planParam = params.get('plan');
    if (planParam && plans.some((p) => p.id === planParam)) {
      setSelectedPlan(planParam);
    } else {
      setSelectedPlan('basic-monthly');
    }

    loadUserData();
  }, [plans]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Separar nombre completo
      const [firstName, ...lastNameParts] = (formData.firstName || "").split(" ");
      const lastName = lastNameParts.join(" ") || formData.lastName || "N/A";

      // 1. Guardar en HubSpot
      const hubspotResponse = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName || formData.firstName,
          lastName,
          email: formData.email,
          phone: formData.phone,
          courseInterest: selectedPlan,
          currentLevel: formData.currentLevel,
          message: formData.message
        }),
      });

      if (!hubspotResponse.ok) {
        const errorData = await hubspotResponse.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al guardar información');
      }

      // 2. Crear sesión de pago en Stripe (suscripción)
      const stripeResponse = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: selectedPlan,
          email: formData.email,
          firstName: firstName || formData.firstName,
          lastName,
          phone: formData.phone,
          currentLevel: formData.currentLevel,
        }),
      });

      const { sessionId, url, error } = await stripeResponse.json();

      if (error) {
        throw new Error(error);
      }

      // 3. Redirigir a Stripe Checkout
      if (url) {
        window.location.href = url;
      } else {
        if (!stripePromise) {
          stripePromise = getStripe();
        }
        const stripe = await stripePromise;
        if (!stripe) throw new Error("Stripe no pudo inicializarse.");
        
        const result = await (stripe as any).redirectToCheckout({ sessionId });
        
        if (result.error) {
          throw new Error(result.error.message);
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
      setSubmitStatus({
        type: "error",
        message: error.message || "Error al procesar tu inscripción. Por favor, inténtalo de nuevo."
      });
      setIsSubmitting(false);
    }
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-100 text-coral-700 text-sm font-bold mb-6">
              <span>🎓</span>
              <span>Inscripción y Pago</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
              Comienza Tu Suscripción
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Suscripción mensual a {formatPrice(plans[0]?.price ?? 99)}: completa tus datos y paga de forma segura para acceder a todo el contenido.
            </p>

            <div className="flex justify-center gap-4">
              <Link 
                href="/cuenta/login" 
                className="text-coral-600 font-bold hover:text-coral-700 underline decoration-2 underline-offset-4"
              >
                ¿Ya tienes cuenta? Iniciar sesión para alumnos
              </Link>
            </div>
          </div>
        </section>

        {/* Plan Selection */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 mb-4 text-center">
              1. Tu suscripción
            </h2>
            <p className="text-center text-slate-600 mb-12">
              Un único plan mensual · Sin permanencia · Cancela cuando quieras
            </p>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-xl mx-auto">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative text-left bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-xl ${
                    selectedPlan === plan.id
                      ? `${plan.color.border} shadow-xl ring-4 ring-coral-100`
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${plan.color.gradient} text-white font-black text-3xl mb-4`}
                  >
                    📚
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {plan.name}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-black text-slate-900">{formatPrice(plan.price)}</span>
                    <span className="text-slate-600 font-semibold">/ mes</span>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.slice(0, 5).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <svg className={`w-5 h-5 ${plan.color.text} flex-shrink-0 mt-0.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 5 && (
                      <li className="text-sm text-slate-500 pl-7">
                        +{plan.features.length - 5} características más
                      </li>
                    )}
                  </ul>
                  
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                    selectedPlan === plan.id
                      ? `${plan.color.bg} ${plan.color.text}`
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {selectedPlan === plan.id ? '✓ Seleccionado' : 'Seleccionar'}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/planes" className="text-coral-600 font-bold hover:underline">
                Ver condiciones y preguntas frecuentes →
              </Link>
            </div>
          </div>
        </section>

        {/* Form Section */}
        {selectedPlan && (
          <section className="py-16 bg-slate-50">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-slate-900 mb-2">
                    2. Completa Tus Datos
                  </h2>
                  <p className="text-slate-600">
                    Plan seleccionado: <strong>{selectedPlanData?.name}</strong> • <strong>{formatPrice(selectedPlanData?.price || 0)}/mes</strong>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitStatus.type && (
                    <div
                      className={`p-4 rounded-lg ${
                        submitStatus.type === "success"
                          ? "bg-amber-100 border border-amber-300 text-amber-800"
                          : "bg-red-100 border border-red-300 text-red-800"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent disabled:bg-gray-100"
                        placeholder="Juan Pérez"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent disabled:bg-gray-100"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent disabled:bg-gray-100"
                      placeholder="+34 600 000 000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      ¿Cuál es tu nivel actual de inglés?
                    </label>
                    <select
                      name="currentLevel"
                      value={formData.currentLevel}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">No lo sé</option>
                      <option value="a1">A1 - Principiante</option>
                      <option value="a2">A2 - Elemental</option>
                      <option value="b1">B1 - Intermedio</option>
                      <option value="b2">B2 - Intermedio Alto</option>
                      <option value="c1">C1 - Avanzado</option>
                      <option value="c2">C2 - Maestría</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Mensaje (Opcional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent disabled:bg-gray-100"
                      placeholder="Cuéntanos tus objetivos..."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      disabled={isSubmitting}
                      className="mt-1"
                      id="terms"
                    />
                    <label htmlFor="terms" className="text-sm text-slate-600">
                      Acepto los términos y condiciones y la política de privacidad. Consiento el tratamiento de mis datos.
                    </label>
                  </div>

                  <div className="bg-coral-50 border border-coral-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-coral-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-coral-900 mb-1">Suscripción Segura</p>
                        <p className="text-xs text-coral-700">Al hacer clic en &quot;Suscribirme&quot;, serás redirigido a Stripe, nuestra pasarela de pago segura. La suscripción se renovará automáticamente cada mes. Puedes cancelar en cualquier momento.</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-coral-500 to-peach-500 text-white py-4 rounded-lg font-bold text-lg hover:from-coral-600 hover:to-peach-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                      </>
                    ) : (
                      <>
                        🔒 Suscribirme Ahora ({formatPrice(selectedPlanData?.price || 0)}/mes)
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-500">
                    Sin permanencia • Cancela cuando quieras • Renovación automática mensual
                  </p>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* Trust Badges */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl mb-2">🔒</div>
                <p className="text-sm font-bold text-slate-700">Pago Seguro</p>
                <p className="text-xs text-slate-500">Stripe</p>
              </div>
              <div>
                <div className="text-3xl mb-2">💯</div>
                <p className="text-sm font-bold text-slate-700">Garantía</p>
                <p className="text-xs text-slate-500">14 días</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎓</div>
                <p className="text-sm font-bold text-slate-700">Certificado</p>
                <p className="text-xs text-slate-500">Oficial</p>
              </div>
              <div>
                <div className="text-3xl mb-2">⭐</div>
                <p className="text-sm font-bold text-slate-700">4.9/5</p>
                <p className="text-xs text-slate-500">+500 alumnos</p>
              </div>
            </div>
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
