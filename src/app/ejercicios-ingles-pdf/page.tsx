import Link from "next/link";
import type { Metadata } from "next";
import { Navigation } from "@/components/sections/Navigation";
import { worksheetLevels, worksheetTopics } from "@/data/worksheet-library";

export const metadata: Metadata = {
  title: "Ejercicios de inglés en PDF por nivel A1–C2 | LinguaFly",
  description: "Banco de ejercicios de inglés en PDF organizado por nivel MCER, desde A1 hasta C2. Encuentra fichas de gramática con objetivos claros y soluciones.",
  alternates: { canonical: "https://linguafly.app/ejercicios-ingles-pdf" },
  openGraph: {
    title: "Ejercicios de inglés en PDF por nivel A1–C2",
    description: "Fichas de inglés clasificadas por nivel y tema, con progresión didáctica y soluciones.",
    url: "https://linguafly.app/ejercicios-ingles-pdf",
    type: "website",
  },
};

export default function EnglishPdfLibraryPage() {
  const topicsByLevel = worksheetLevels.map((level) => ({
    ...level,
    topics: worksheetTopics.filter((topic) => topic.level === level.level),
  }));

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
            <Link href="/" className="hover:text-coral-600">Inicio</Link>
            <span className="mx-2">/</span>
            <span aria-current="page">Ejercicios de inglés en PDF</span>
          </nav>

          <header className="rounded-3xl bg-white p-7 shadow-sm sm:p-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-coral-600">Biblioteca de fichas · MCER</p>
            <h1 className="mb-5 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">Ejercicios de inglés en PDF por nivel y temática</h1>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-700">
              Encuentra ejercicios organizados desde A1 (principiante) hasta C2 (dominio). La prioridad es que puedas resolver cada ficha con los conocimientos propios de tu nivel, sin encontrarte estructuras avanzadas antes de tiempo.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4"><strong className="block text-slate-900">Nivel explícito</strong><span className="text-sm text-slate-600">Cada ficha indica para quién está diseñada.</span></div>
              <div className="rounded-2xl bg-slate-50 p-4"><strong className="block text-slate-900">Progresión didáctica</strong><span className="text-sm text-slate-600">De ejercicios guiados a producción libre.</span></div>
              <div className="rounded-2xl bg-slate-50 p-4"><strong className="block text-slate-900">Soluciones revisadas</strong><span className="text-sm text-slate-600">Respuestas separadas para autocorregirte.</span></div>
            </div>
          </header>

          <section className="mt-12" aria-labelledby="levels-title">
            <h2 id="levels-title" className="mb-5 text-2xl font-black text-slate-900">Elige tu nivel de inglés</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topicsByLevel.map((level) => (
                <article key={level.level} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-extrabold text-slate-900">{level.level} · {level.name}</h3>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{level.topics.length} temas</span>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-slate-600">{level.description}</p>
                  {level.topics.length > 0 ? (
                    <ul className="space-y-3">
                      {level.topics.map((topic) => (
                        <li key={topic.slug} className="border-t border-slate-100 pt-3">
                          <h4 className="font-bold text-slate-900"><Link href={`/ejercicios-ingles-pdf/tema/${topic.slug}`} className="hover:text-coral-700 hover:underline">{topic.title}</Link></h4>
                          <p className="mt-1 text-sm text-slate-600">{topic.description}</p>
                          <p className="mt-2 text-xs font-semibold text-slate-500">{topic.pdfCount} PDF descargables · 20 ejercicios por ficha</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {Array.from({ length: topic.pdfCount }, (_, index) => {
                              const pdfSlug = topic.slug;
                              const pdfNumber = String(index + 1).padStart(2, "0");
                              return <Link key={pdfSlug + pdfNumber} href={`/ejercicios-ingles-pdf/${pdfSlug}-${pdfNumber}`} className="inline-flex items-center rounded-lg bg-coral-50 px-3 py-2 text-xs font-bold text-coral-700 hover:bg-coral-100">PDF {pdfNumber} <span aria-hidden="true" className="ml-1">↓</span></Link>;
                            })}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-500">Estamos preparando materiales para este nivel. Publicaremos fichas cuando estén revisadas.</p>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-3xl bg-slate-900 p-7 text-white sm:p-10" aria-labelledby="method-title">
            <h2 id="method-title" className="mb-4 text-2xl font-black">Cómo clasificamos los ejercicios</h2>
            <p className="mb-5 max-w-3xl leading-relaxed text-slate-200">El nivel no depende únicamente del nombre del tema. Revisamos vocabulario, estructuras previas, longitud de las instrucciones y autonomía que exige cada actividad. Por eso una introducción al pasado puede ser A1 avanzado, mientras que la práctica completa del Past Simple se trabaja en A2.</p>
            <ol className="grid gap-3 sm:grid-cols-2">
              <li className="rounded-xl bg-white/10 p-4">1. Objetivo gramatical concreto</li>
              <li className="rounded-xl bg-white/10 p-4">2. Vocabulario adecuado al nivel</li>
              <li className="rounded-xl bg-white/10 p-4">3. Dificultad progresiva y ejemplos</li>
              <li className="rounded-xl bg-white/10 p-4">4. Soluciones verificadas antes de publicar</li>
            </ol>
          </section>
        </div>
      </main>
    </>
  );
}
