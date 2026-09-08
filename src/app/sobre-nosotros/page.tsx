import { Navigation } from "@/components/sections/Navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { countPublishedArticles } from "@/lib/content/articles";
import { generateBreadcrumbSchema } from "@/lib/schemas";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  BookOpen,
  CheckCircle,
  FileCheck,
  Layers,
  ShieldCheck,
  Users,
} from "lucide-react";
import { SITE_BRAND_NAME, getAbsoluteUrl } from "@/lib/site-brand";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Sobre ${SITE_BRAND_NAME} | Revista de idiomas, hábitos e inteligencia artificial`,
  description:
    `Qué es ${SITE_BRAND_NAME}: un proyecto editorial independiente que publica artículos prácticos de idiomas, alimentación, entrenamiento e inteligencia artificial.`,
  alternates: {
    canonical: getAbsoluteUrl('/sobre-nosotros'),
  },
  openGraph: {
    title: `Sobre ${SITE_BRAND_NAME}`,
    description:
      "Proyecto editorial independiente: artículos de idiomas, alimentación, entrenamiento e inteligencia artificial.",
    type: "website",
    url: getAbsoluteUrl('/sobre-nosotros'),
  },
};

export default async function SobreNosotrosPage() {
  const totalArticles = await countPublishedArticles();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: getAbsoluteUrl('/') },
    { name: "Sobre nosotros", url: getAbsoluteUrl('/sobre-nosotros') },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navigation />
      <main className="min-h-screen bg-slate-50 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8" aria-label="breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-slate-600 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>›</li>
              <li className="font-semibold text-slate-600">Sobre nosotros</li>
            </ol>
          </nav>

          <header className="mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral-50 text-coral-600 text-sm font-bold mb-6 uppercase tracking-wider border border-coral-100">
              <Users className="w-4 h-4" />
              Proyecto editorial independiente
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-6">
              Sobre <span className="text-coral-600">{SITE_BRAND_NAME}</span>
            </h1>
            <p className="text-xl text-slate-700 leading-relaxed">
              Somos un proyecto editorial independiente. Publicamos artículos prácticos de
              <strong> idiomas</strong>, <strong>alimentación</strong>, <strong>entrenamiento</strong> e
              <strong> inteligencia artificial</strong>,
              y el archivo de guías para aprender inglés (gramática, viajes, trabajo, exámenes y cursos por nivel) en las URLs originales.
            </p>
          </header>

          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 lg:p-10 mb-8">
            <h2 className="font-display text-2xl font-black text-slate-900 mb-6">
              Qué publicamos
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              A día de hoy la revista publica <strong>{totalArticles} artículos</strong>: las temáticas
              de la web nueva y el archivo de inglés, indexado en el sitemap con sus URLs canónicas.
            </p>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-coral-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Idiomas</strong>: hábitos de estudio, vocabulario activo y un comienzo realista.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-coral-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Alimentación</strong>: organizar la semana y armar platos con criterio, sin dietas extremas.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-coral-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Entrenamiento</strong>: fuerza para principiantes y progresión sin lesionarte.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-coral-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Inteligencia artificial</strong>: prompts, comprobación y privacidad para una tarea concreta.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-coral-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Aprender inglés</strong>: gramática, viajes, trabajo, exámenes, métodos y cursos A1–C1 con las URLs originales.
                </span>
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 lg:p-10 mb-8">
            <h2 className="font-display text-2xl font-black text-slate-900 mb-6">
              Cómo se elabora cada artículo
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              El contenido no se publica &ldquo;a ojo&rdquo;. Cada guía sigue el mismo flujo editorial:
            </p>
            <ol className="space-y-5">
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-xl bg-coral-50 text-coral-600 font-black flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Selección por intención real</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Partimos de dudas concretas que los estudiantes hispanohablantes buscan en
                    Google y Bing, no de palabras clave genéricas. Si la duda no tiene una
                    respuesta clara que podamos aportar, no se escribe.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-xl bg-coral-50 text-coral-600 font-black flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Contraste con fuentes oficiales</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Cada regla gramatical, frase funcional o dato de examen se verifica contra al
                    menos una fuente oficial de referencia: <strong>Cambridge English</strong>,{" "}
                    <strong>British Council</strong>, <strong>Oxford Learner&apos;s Dictionaries</strong>,{" "}
                    <strong>Merriam-Webster</strong>, <strong>Macmillan Dictionary</strong>, el{" "}
                    <strong>Common European Framework of Reference (CEFR)</strong> y los documentos
                    públicos de las distintas certificaciones (IELTS, TOEFL, Aptis, Linguaskill,
                    EOI).
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-xl bg-coral-50 text-coral-600 font-black flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Adaptación al estudiante hispanohablante</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Los errores típicos del hispanohablante (false friends, interferencia de la
                    pasiva española, confusión de tiempos perfectos, problemas de /b/ vs /v/, /i/
                    vs /iː/, silent letters, etc.) se tratan explícitamente cuando son pertinentes
                    al tema del artículo.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-xl bg-coral-50 text-coral-600 font-black flex items-center justify-center shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Revisión cruzada</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Antes de publicar, el artículo se revisa contra ejemplos reales de corpus
                    público (COCA, BNC) y muestras de exámenes oficiales. Si hay contradicción con
                    una fuente primaria, se corrige o no se publica.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-xl bg-coral-50 text-coral-600 font-black flex items-center justify-center shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Actualización continua</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Cuando cambia el formato de un examen, los precios oficiales o una recomendación
                    clave, el artículo correspondiente se actualiza con la nueva fecha de revisión
                    (<code>updatedDate</code>) visible en el propio post.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <ShieldCheck className="w-10 h-10 text-coral-500 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Sin venta encubierta</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                No vendemos curso propio. Cuando comparamos plataformas (Preply, Lingoda, ABA,
                Babbel, etc.) lo hacemos sin relación comercial: el criterio es qué sirve al lector,
                no qué genera comisión.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <FileCheck className="w-10 h-10 text-coral-500 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Fuentes verificables</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Todo lo que afirmamos sobre un examen, un registro lingüístico o un dato de
                pronunciación se puede contrastar con la fuente oficial correspondiente, que
                enlazamos cuando es de acceso público.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <Layers className="w-10 h-10 text-coral-500 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Estructura CEFR</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Cada contenido se etiqueta por nivel (A1-C2) siguiendo los descriptores del Marco
                Común Europeo, para que sepas si un recurso es realista para tu momento.
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-br from-coral-50 to-peach-50 rounded-3xl border border-coral-100 p-8 lg:p-10 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <BookOpen className="w-8 h-8 text-coral-600 shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-2xl font-black text-slate-900 mb-3">
                  Por qué firmamos como equipo
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Muchos blogs atribuyen sus artículos a autores ficticios con fotos de stock.
                  Nosotros preferimos la firma colectiva <em>Equipo {SITE_BRAND_NAME}</em>: refleja que
                  el contenido es producto del trabajo editorial conjunto (redacción, verificación
                  y revisión) y no de un autor individual. Si en el futuro incorporamos
                  colaboradores con perfil público y credenciales verificables, aparecerán con su
                  nombre real y enlaces comprobables.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 lg:p-10 mb-12">
            <h2 className="font-display text-2xl font-black text-slate-900 mb-4">Contacto</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              ¿Has detectado un error, quieres proponer un tema o necesitas citarnos? Escríbenos
              desde la página de contacto y te responderemos.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-coral-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-coral-700 transition-all hover:scale-[1.02]"
            >
              Ir al formulario de contacto →
            </Link>
          </section>

          <section className="text-center">
            <h2 className="font-display text-2xl font-black text-slate-900 mb-6">
              Empieza a explorar el blog
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/idiomas"
                className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:border-coral-400 hover:text-coral-600 transition-colors"
              >
                Idiomas
              </Link>
              <Link
                href="/alimentacion"
                className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:border-coral-400 hover:text-coral-600 transition-colors"
              >
                Alimentación
              </Link>
              <Link
                href="/entrenamiento"
                className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:border-coral-400 hover:text-coral-600 transition-colors"
              >
                Entrenamiento
              </Link>
              <Link
                href="/inteligencia-artificial"
                className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:border-coral-400 hover:text-coral-600 transition-colors"
              >
                Inteligencia artificial
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
