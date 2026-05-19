import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";

const baseUrl = "https://www.focus-on-english.com";

export const metadata: Metadata = {
  title: "Cursos de inglés por sector profesional | Focus English",
  description:
    "Explora cursos de inglés especializados por sector profesional: camarero, logística y recepcionista, con itinerarios por nivel.",
  alternates: {
    canonical: `${baseUrl}/cursos-por-sector`,
  },
  keywords: [
    "inglés por sector profesional",
    "curso inglés camarero",
    "curso inglés logística",
    "curso inglés recepcionista",
    "inglés profesional",
  ],
};

export default function CursosPorSectorPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 lg:p-12 mb-10">
            <p className="inline-flex rounded-full bg-coral-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-coral-700 mb-5">
              Inglés para sectores profesionales
            </p>
            <h1 className="font-display text-4xl lg:text-5xl font-black text-slate-900 mb-5">
              Cursos especializados por sector profesional
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mb-6">
              Elige tu sector y avanza con un plan de inglés aplicado a situaciones reales de trabajo.
              Estos cursos se complementan con nuestros cursos gratis generales y con la sección de podcasts.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/curso-a1"
                className="inline-flex items-center justify-center rounded-xl bg-coral-600 px-6 py-3 font-bold text-white hover:bg-coral-700 transition-colors"
              >
                Ver cursos gratis A1-C2
              </Link>
              <Link
                href="/podcasts"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 hover:border-coral-200 hover:bg-coral-50/30 transition-colors"
              >
                Ver podcasts
              </Link>
            </div>
          </header>

          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10 lg:p-14 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-coral-50 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-coral-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.653-4.655m5.8-1.521 3.03-2.496c.14-.468.382-.89.766-1.208M6.75 3A1.5 1.5 0 0 1 8.25 4.5V6a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 6V4.5A1.5 1.5 0 0 1 4.5 3H6.75ZM12 3a1.5 1.5 0 0 1 1.5 1.5V6A1.5 1.5 0 0 1 12 7.5h-2.25A1.5 1.5 0 0 1 8.25 6V4.5A1.5 1.5 0 0 1 9.75 3H12Z" />
              </svg>
            </div>
            <h2 className="font-display text-3xl font-black text-slate-900 mb-4">
              Estamos preparando los cursos
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8">
              Estamos trabajando en los cursos especializados por sector profesional. Próximamente estarán disponibles para camarero, logística, recepcionista y más sectores.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/curso-a1"
                className="inline-flex items-center justify-center rounded-xl bg-coral-600 px-6 py-3 font-bold text-white hover:bg-coral-700 transition-colors"
              >
                Ver cursos gratis A1–C2 disponibles ahora
              </Link>
              <Link
                href="/podcasts"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 hover:border-coral-200 hover:bg-coral-50/30 transition-colors"
              >
                Ver podcasts
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
