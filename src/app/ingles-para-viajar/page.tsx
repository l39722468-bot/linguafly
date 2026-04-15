import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Home, Plane, BookOpen, MessageCircle, Map, Sparkles, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/blog";
import { VOCAB_SECTORS } from "@/lib/vocabulario/sectors";

const baseUrl = "https://www.focus-on-english.com";

/** Sectores del megaglosario más alineados con viajeros (enlaces rápidos). */
const TRAVEL_VOCAB_SLUGS = new Set([
  "viajes-y-turismo",
  "alojamiento",
  "aeropuerto-y-vuelos",
  "restaurante-y-comida",
  "transporte-urbano",
  "compras-y-dinero",
  "direcciones-y-lugares",
  "tiempo-libre-y-ocio",
]);

export const metadata: Metadata = {
  title: "Inglés para viajar: guías, frases y vocabulario | Focus English",
  description:
    "Hub para viajeros que quieren aprender inglés práctico: aeropuerto, hotel, emergencias, frases útiles, artículos del blog y listas de vocabulario con audio.",
  alternates: {
    canonical: `${baseUrl}/ingles-para-viajar`,
  },
  keywords: [
    "inglés para viajar",
    "aprender inglés viajes",
    "frases inglés aeropuerto",
    "vocabulario inglés turismo",
    "inglés supervivencia viaje",
  ],
};

export default function InglesParaViajarHubPage() {
  const travelArticles = getArticlesByCategory("viajes").slice(0, 9);
  const travelVocabSectors = VOCAB_SECTORS.filter((s) => TRAVEL_VOCAB_SLUGS.has(s.slug));

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 pt-28 pb-20 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 mb-10 text-sm font-medium text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="flex items-center gap-1 hover:text-coral-600 transition-colors">
              <Home className="w-4 h-4" />
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            <Link href="/aprender-ingles" className="hover:text-coral-600 transition-colors">
              Aprender inglés
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            <span className="text-slate-900 font-bold dark:text-slate-100">Inglés para viajar</span>
          </nav>

          <header className="mb-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center bg-white rounded-[2.5rem] p-8 lg:p-14 border border-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-700 font-bold text-sm mb-6 dark:bg-orange-950/40 dark:text-orange-300">
                <Plane className="w-4 h-4" />
                Hub para viajeros
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                Inglés para <span className="text-coral-600">viajar</span> con confianza
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                Aeropuerto, hotel, transporte, restaurante y emergencias: aquí tienes la guía central, frases
                por situación, vocabulario con pronunciación y audio, y las últimas publicaciones del blog
                de viajes — todo en un solo lugar.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/blog/viajes/ingles-para-viajar"
                  className="inline-flex items-center gap-2 bg-coral-600 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-coral-700 transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  Leer la guía principal
                </Link>
                <Link
                  href="/test-nivel"
                  className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white px-6 py-3.5 rounded-2xl font-bold hover:border-coral-400 transition-colors"
                >
                  <GraduationCap className="w-5 h-5" />
                  Test de nivel
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border-4 border-white dark:border-slate-800">
              <Image
                src="https://images.pexels.com/photos/2007405/pexels-photo-2007405.jpeg"
                alt="Viajero con maleta en el aeropuerto"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </header>

          {/* Atajos */}
          <section className="mb-16">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-coral-600" />
              Recursos esenciales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/blog/viajes/ingles-para-viajar"
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-coral-200 transition-all dark:bg-slate-900 dark:border-slate-800"
              >
                <BookOpen className="w-10 h-10 text-coral-600 mb-4" />
                <h3 className="font-black text-lg text-slate-900 group-hover:text-coral-600 dark:text-white mb-2">
                  Guía: inglés para viajar
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Artículo pilar con situaciones reales, consejos y estructuras útiles antes de coger el vuelo.
                </p>
              </Link>
              <Link
                href="/frases-en-ingles"
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-coral-200 transition-all dark:bg-slate-900 dark:border-slate-800"
              >
                <MessageCircle className="w-10 h-10 text-coral-600 mb-4" />
                <h3 className="font-black text-lg text-slate-900 group-hover:text-coral-600 dark:text-white mb-2">
                  Frases en inglés
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Miles de frases con traducción y audio, organizadas por temas.
                </p>
              </Link>
              <Link
                href="/vocabulario/viajes-y-turismo"
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-coral-200 transition-all dark:bg-slate-900 dark:border-slate-800"
              >
                <Map className="w-10 h-10 text-coral-600 mb-4" />
                <h3 className="font-black text-lg text-slate-900 group-hover:text-coral-600 dark:text-white mb-2">
                  Vocabulario temático
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Listas de ~200 palabras por sector (viajes, hotel, aeropuerto…) con IPA y audio.
                </p>
              </Link>
            </div>
          </section>

          {/* Vocabulario viajes */}
          <section className="mb-16">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Vocabulario para tu viaje</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
              Accede directamente a los sectores del megaglosario más útiles en destino.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {travelVocabSectors.map((s) => (
                <Link
                  key={s.slug}
                  href={`/vocabulario/${s.slug}`}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-coral-200 hover:bg-coral-50/30 transition-colors dark:bg-slate-900 dark:border-slate-800 dark:hover:border-coral-800"
                >
                  <span className="text-xl" aria-hidden>
                    {s.icon}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-sm leading-snug">{s.title}</span>
                    <span className="block text-xs text-coral-600 font-semibold mt-1">200 términos</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/vocabulario"
              className="inline-flex items-center gap-1 mt-6 text-sm font-bold text-coral-600 hover:text-coral-700"
            >
              Ver los 50 sectores del megaglosario <ChevronRight className="w-4 h-4" />
            </Link>
          </section>

          {/* Blog */}
          <section className="mb-16">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Artículos del blog: viajes</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Guías y vocabulario publicados en la categoría «viajes».
                </p>
              </div>
              <Link
                href="/blog/viajes"
                className="inline-flex items-center gap-1 font-bold text-coral-600 hover:text-coral-700 text-sm"
              >
                Ver todos los artículos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            {travelArticles.length === 0 ? (
              <p className="text-slate-600 dark:text-slate-400">Pronto añadiremos más contenidos de viajes.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {travelArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/viajes/${a.slug}`}
                    className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-coral-200 transition-all dark:bg-slate-900 dark:border-slate-800"
                  >
                    <p className="text-xs font-semibold text-orange-600 mb-2">{a.readTime} lectura</p>
                    <h3 className="font-bold text-slate-900 group-hover:text-coral-600 dark:text-white leading-snug mb-2">
                      {a.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{a.excerpt}</p>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Enlaces útiles */}
          <section className="rounded-2xl bg-gradient-to-br from-orange-50 to-coral-50 border border-orange-100 p-8 lg:p-10 dark:from-slate-900 dark:to-slate-900 dark:border-slate-800">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4">También te puede interesar</h2>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li>
                <Link href="/blog/viajes/frases-ingles-emergencias-viajes" className="font-semibold text-coral-700 hover:underline">
                  Frases en inglés para emergencias en viajes
                </Link>
              </li>
              <li>
                <Link href="/blog/viajes/vocabulario-hotel-ingles" className="font-semibold text-coral-700 hover:underline">
                  Vocabulario de hotel en inglés
                </Link>
              </li>
              <li>
                <Link href="/blog/trabajo" className="font-semibold text-coral-700 hover:underline">
                  Inglés para el trabajo (viajes de negocios)
                </Link>
              </li>
              <li>
                <Link href="/certificaciones-ingles-oficiales" className="font-semibold text-coral-700 hover:underline">
                  Certificaciones oficiales de inglés
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
