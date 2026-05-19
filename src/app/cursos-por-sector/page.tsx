import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";

const baseUrl = "https://www.focus-on-english.com";

const PROFESSIONAL_COURSES = [
  {
    sector: "Camarero / Restaurante",
    links: [
      { label: "A1", href: "/curso-camarero-a1" },
      { label: "A2", href: "/curso-camarero-a2" },
      { label: "B1", href: "/curso-camarero-b1" },
      { label: "B2", href: "/curso-camarero-b2" },
    ],
  },
  {
    sector: "Logística",
    links: [
      { label: "A1", href: "/curso-logistica-a1" },
      { label: "A2", href: "/curso-logistica-a2" },
      { label: "B1", href: "/curso-logistica-b1" },
      { label: "B2", href: "/curso-logistica-b2" },
    ],
  },
  {
    sector: "Recepcionista",
    links: [
      { label: "A1", href: "/curso-recepcionista-a1" },
      { label: "A2", href: "/curso-recepcionista-a2" },
      { label: "B1", href: "/curso-recepcionista-b1" },
      { label: "B2", href: "/curso-recepcionista-b2" },
    ],
  },
];

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

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PROFESSIONAL_COURSES.map((group) => (
              <article
                key={group.sector}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-7"
              >
                <h2 className="font-display text-2xl font-black text-slate-900 mb-4">{group.sector}</h2>
                <div className="flex flex-wrap gap-2">
                  {group.links.map((course) => (
                    <Link
                      key={course.href}
                      href={course.href}
                      className="inline-flex items-center justify-center rounded-xl border border-coral-200 bg-coral-50 px-4 py-2 text-sm font-bold text-coral-700 hover:bg-coral-100 transition-colors"
                    >
                      {course.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
