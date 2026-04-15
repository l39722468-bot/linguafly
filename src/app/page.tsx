import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Navigation } from "@/components/sections/Navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getBlogArticles } from "@/lib/blog";
import { HomeBelowFold } from "./HomeBelowFold";

const Footer = dynamic(() => import("@/components/sections/Footer").then((m) => ({ default: m.Footer })), {
  ssr: true,
  loading: () => <footer className="h-64 bg-slate-900" aria-hidden="true" />,
});

const CourseLaunchBanner = dynamic(() => import("@/components/CourseLaunchBanner").then((m) => ({ default: m.CourseLaunchBanner })), {
  loading: () => <div className="h-24 bg-gradient-to-r from-coral-50 to-peach-50" aria-hidden="true" />,
});

export const metadata: Metadata = {
  title: "Blog para Aprender Inglés: Guías, Frases y Consultas",
  description: "Blog de contenido de calidad para resolver dudas de inglés: gramática, vocabulario, frases útiles, métodos de estudio y recursos prácticos.",
  keywords: [
    "blog de inglés",
    "consultas de inglés",
    "gramática inglesa",
    "vocabulario inglés",
    "frases en inglés"
  ],
  alternates: {
    canonical: 'https://www.focus-on-english.com',
  },
};

export default function HomePage() {
  const latestArticles = getBlogArticles().slice(0, 3);
  
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero editorial */}
        <section className="hero-gradient relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Gradiente estático (blobs animados eliminados para reducir render ~1s) */}
          <div className="absolute inset-0 bg-gradient-to-br from-coral-100/20 via-transparent to-peach-100/20 pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-7xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-lg text-sm font-black">
                <span className="w-2 h-2 bg-[#FF6B6B] rounded-full animate-pulse"></span>
                <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">
                  Blog de consultas para aprender inglés
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-12">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
                Resuelve tus dudas de inglés<br />
                <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">
                  con guías claras y prácticas
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto mb-4 leading-relaxed font-semibold">
                Encuentra respuestas sobre <span className="font-black text-[#FF6B6B]">gramática</span>, <span className="font-black text-[#FF6B6B]">vocabulario</span>, frases reales y métodos de estudio.
              </p>
              
              <p className="text-lg text-gray-600 mb-10 font-semibold">
                Contenido editorial actualizado para consultas rápidas y aprendizaje diario.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  href="/blog"
                  className="cta-primary inline-flex items-center gap-2"
                >
                  📰 Explorar el Blog
                </Link>
                
                <Link
                  href="/frases-en-ingles"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-coral-700 font-black text-lg hover:shadow-lg hover:scale-105 transition-all border-2 border-coral-100"
                >
                  🗣️ Ver Frases por Tema
                </Link>
                
                <Link
                  href="#contenido"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 bg-white/10 text-white font-black text-lg hover:bg-white hover:text-coral-600 transition-all backdrop-blur-sm"
                >
                  Ver Contenido →
                </Link>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-lg">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span className="font-black text-gray-900">Guías prácticas</span>
                <span className="text-gray-600 font-semibold">para dudas reales</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-lg">
                <span className="text-2xl">🇪🇸</span>
                <span className="font-black text-gray-900">Enfoque claro en español</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-lg">
                <span className="text-2xl">📚</span>
                <span className="font-black text-gray-900">Gramática, frases y vocabulario</span>
              </div>
            </div>

            <p className="text-center mt-10">
              <Link
                href="/ingles-para-viajar"
                className="inline-flex items-center gap-2 text-base sm:text-lg font-black text-orange-800 bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 px-5 py-3 rounded-2xl transition-colors"
              >
                <span aria-hidden>✈️</span>
                ¿Vas a viajar? Hub: inglés práctico para aeropuerto, hotel y más
              </Link>
            </p>
          </div>
        </section>

        <Suspense fallback={null}>
          <CourseLaunchBanner />
          <HomeBelowFold latestArticles={latestArticles} />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
