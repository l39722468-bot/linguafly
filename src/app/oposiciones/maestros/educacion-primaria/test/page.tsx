import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tests gratis de oposiciones de Educación Primaria",
  description: "Practica para las oposiciones de Primaria con tests originales por tema y explicaciones de las respuestas. Acceso gratuito y sin registro.",
  alternates: { canonical: "/oposiciones/maestros/educacion-primaria/test/" },
};

export default function TestsPrimariaPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-indigo-50/70">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
          <nav aria-label="Migas de pan" className="mb-5 text-sm text-slate-500">
            <Link href="/oposiciones/maestros/educacion-primaria/" className="underline underline-offset-4">Oposiciones de Primaria</Link><span className="mx-2">/</span><span>Tests gratuitos</span>
          </nav>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-indigo-700">Practica sin registro</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Tests gratuitos de oposiciones de Educación Primaria</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Refuerza el estudio del temario con preguntas originales, corrección automática y explicaciones. Empieza por el primer tema y vuelve a practicar los conceptos que necesites consolidar.</p>
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <article className="rounded-2xl border border-indigo-200 p-6 sm:p-8">
          <span className="text-sm font-bold text-indigo-700">TEST DISPONIBLE</span>
          <h2 className="mt-2 text-2xl font-bold">Tema 1. Desarrollo psicoevolutivo de 6 a 12 años</h2>
          <p className="mt-3 leading-7 text-slate-600">20 preguntas sobre desarrollo cognitivo, motriz, afectivo y social, así como sus implicaciones en la enseñanza y el aprendizaje.</p>
          <Link href="/oposiciones/maestros/educacion-primaria/test/tema-01/" className="mt-5 inline-flex rounded-xl bg-indigo-700 px-5 py-3 font-semibold text-white hover:bg-indigo-800">Empezar test gratuito →</Link>
        </article>
        <div className="mt-8 rounded-2xl bg-slate-50 p-6">
          <h2 className="text-xl font-bold">Más tests en preparación</h2>
          <p className="mt-2 leading-7 text-slate-600">Ampliaremos el catálogo a medida que los temas estén revisados y publicados. No se mostrarán como disponibles pruebas que todavía no se pueden realizar.</p>
          <Link href="/oposiciones/maestros/educacion-primaria/temario/" className="mt-4 inline-block font-semibold text-indigo-700 underline underline-offset-4">Consultar índice del temario</Link>
        </div>
      </section>
    </main>
  );
}
