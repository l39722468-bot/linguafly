import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";
import { ChevronRight, Home, BookMarked } from "lucide-react";
import type { Metadata } from "next";
import { VOCAB_SECTORS } from "@/lib/vocabulario/sectors";

export const metadata: Metadata = {
  title: "Vocabulario en Inglés: Megaglosario por Temas | Focus English",
  description:
    "Más de 10.000 palabras en inglés con traducción al español, transcripción fonética (IPA) y audio. Organizado en 50 sectores temáticos.",
  alternates: {
    canonical: "https://www.focus-on-english.com/vocabulario",
  },
};

export default function VocabularioHubPage() {
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
            <span className="text-slate-900 font-bold dark:text-slate-100">Vocabulario</span>
          </nav>

          <header className="mb-14 bg-white rounded-[2.5rem] p-8 lg:p-14 border border-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-50 text-coral-600 font-bold text-sm mb-6 dark:bg-coral-950/50 dark:text-coral-300">
              <BookMarked className="w-4 h-4" />
              Megaglosario EN → ES
            </div>
            <h1 className="font-display text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Vocabulario en inglés <span className="text-coral-600">por sectores</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Cada lista incluye unas 200 palabras con traducción al español (Apertium), fonética en IPA
              aproximada (CMUdict) y audio generado con{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-200">
                Cloudflare Workers AI
              </strong>{" "}
              (Deepgram Aura 2 EN) a través del endpoint del sitio; si la API no está disponible, se usa la
              voz del navegador como respaldo.
            </p>
          </header>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">50 sectores temáticos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {VOCAB_SECTORS.map((s) => (
                <Link
                  key={s.slug}
                  href={`/vocabulario/${s.slug}`}
                  className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-coral-200 transition-all dark:bg-slate-900 dark:border-slate-800 dark:hover:border-coral-800"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" aria-hidden>
                      {s.icon}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-coral-600 transition-colors dark:text-white">
                        {s.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1 dark:text-slate-400">{s.description}</p>
                      <p className="text-xs font-semibold text-coral-600 mt-3">200 términos →</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
