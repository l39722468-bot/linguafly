import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/sections/Navigation";
import { worksheetLevels, worksheetTopics } from "@/data/worksheet-library";

type PageProps = { params: Promise<{ slug: string }> };

function getTopic(slug: string) {
  return worksheetTopics.find((topic) => Boolean(topic && topic.slug === slug && topic.status === "published"));
}

export function generateStaticParams() {
  return worksheetTopics
    .filter((topic) => Boolean(topic && topic.status === "published"))
    .map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return { title: "Tema no encontrado | LinguaFly", robots: { index: false, follow: true } };

  const title = `Ejercicios de inglés ${topic.title} en PDF (${topic.level}) | LinguaFly`;
  const description = `Practica ${topic.title} con ejercicios de inglés de nivel ${topic.level}, objetivos de aprendizaje y fichas PDF descargables con soluciones.`;
  const url = `https://linguafly.app/ejercicios-ingles-pdf/tema/${topic.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
  };
}

export default async function WorksheetTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const level = worksheetLevels.find((item) => item.level === topic.level);
  const relatedTopics = worksheetTopics
    .filter((item) => Boolean(item && item.status === "published" && item.level === topic.level && item.slug !== topic.slug))
    .slice(0, 6);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 pb-20 pt-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
            <Link href="/" className="hover:text-coral-600">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/ejercicios-ingles-pdf" className="hover:text-coral-600">Ejercicios de inglés en PDF</Link>
            <span className="mx-2">/</span>
            <span aria-current="page">{topic.title}</span>
          </nav>

          <header className="rounded-3xl bg-white p-7 shadow-sm sm:p-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-coral-600">
              Inglés {topic.level} · {level?.name ?? topic.level}
            </p>
            <h1 className="mb-5 text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
              Ejercicios de inglés de {topic.title} en PDF
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-700">{topic.description}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-700">{topic.level} · {level?.name ?? "Nivel MCER"}</span>
              <span className="rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-700">{topic.pdfCount} fichas descargables</span>
              <span className="rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-700">20 preguntas por ficha</span>
            </div>
          </header>

          <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm sm:p-10" aria-labelledby="learn-title">
            <h2 id="learn-title" className="mb-4 text-2xl font-black text-slate-900">
              Qué vas a practicar
            </h2>
            <p className="mb-5 leading-relaxed text-slate-700">
              Esta colección está pensada para estudiantes de nivel {topic.level}. Trabaja cada objetivo poco a poco y consulta las respuestas después de completar los ejercicios para identificar qué necesitas repasar.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {topic.learningGoals.map((goal) => (
                <li key={goal} className="rounded-xl bg-slate-50 p-4 text-slate-700">
                  <span className="mr-2 font-bold text-coral-600" aria-hidden="true">✓</span>{goal}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm sm:p-10" aria-labelledby="study-guide-title">
            <h2 id="study-guide-title" className="mb-4 text-2xl font-black text-slate-900">
              Guía de estudio: cómo dominar {topic.title}
            </h2>
            <p className="mb-5 leading-relaxed text-slate-700">
              Para avanzar con {topic.title}, no intentes memorizar todas las respuestas de golpe. Empieza por reconocer el patrón, practica con frases completas y después comprueba si puedes aplicar lo aprendido sin mirar los ejemplos. Las metas de esta página sirven como lista de control para organizar tu repaso.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {topic.learningGoals.map((goal, index) => (
                <article key={goal} className="rounded-2xl border border-slate-200 p-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-coral-600">Paso {index + 1}</p>
                  <h3 className="mb-2 font-bold text-slate-900">{goal}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Practica este objetivo con varios ejemplos. Después, intenta explicar por qué tu respuesta es correcta y crea una frase propia para comprobar que entiendes el uso, no solo la solución.
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-slate-50 p-5">
              <h3 className="mb-2 font-bold text-slate-900">Señales de que estás progresando</h3>
              <ul className="list-inside list-disc space-y-2 leading-relaxed text-slate-700">
                <li>Identificas el objetivo del ejercicio antes de responder.</li>
                <li>Detectas y corriges tus errores sin consultar inmediatamente el solucionario.</li>
                <li>Puedes usar lo practicado en una frase nueva, no solo repetir la del PDF.</li>
              </ul>
            </div>
          </section>

          <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm sm:p-10" aria-labelledby="downloads-title">
            <h2 id="downloads-title" className="mb-3 text-2xl font-black text-slate-900">
              Descargar ejercicios de {topic.title}
            </h2>
            <p className="mb-6 leading-relaxed text-slate-700">
              Elige una ficha para abrir la descarga en PDF. Cada documento incluye instrucciones, 20 preguntas y una sección de respuestas para corregir tu trabajo.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: topic.pdfCount }, (_, index) => {
                const number = String(index + 1).padStart(2, "0");
                return (
                  <Link
                    key={number}
                    href={`/ejercicios-ingles-pdf/${topic.slug}-${number}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-4 font-bold text-slate-800 transition hover:border-coral-300 hover:bg-coral-50 hover:text-coral-700"
                  >
                    <span>Ficha PDF {number}</span>
                    <span aria-hidden="true">↓</span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm sm:p-10" aria-labelledby="practice-plan-title">
            <h2 id="practice-plan-title" className="mb-4 text-2xl font-black text-slate-900">
              Plan de práctica recomendado
            </h2>
            <p className="mb-5 leading-relaxed text-slate-700">
              Reserva una sesión corta para cada ficha de {topic.title}. La regularidad suele ser más útil que intentar completar todas las hojas en una sola tarde.
            </p>
            <ol className="grid gap-4 sm:grid-cols-3">
              <li className="rounded-2xl bg-slate-50 p-5">
                <h3 className="mb-2 font-bold text-slate-900">1. Practica</h3>
                <p className="text-sm leading-relaxed text-slate-700">Completa las 20 preguntas antes de abrir las respuestas. Marca las dudas para revisarlas después.</p>
              </li>
              <li className="rounded-2xl bg-slate-50 p-5">
                <h3 className="mb-2 font-bold text-slate-900">2. Corrige</h3>
                <p className="text-sm leading-relaxed text-slate-700">Compara tu trabajo con el solucionario y clasifica los errores: regla, vocabulario o lectura de la pregunta.</p>
              </li>
              <li className="rounded-2xl bg-slate-50 p-5">
                <h3 className="mb-2 font-bold text-slate-900">3. Repite</h3>
                <p className="text-sm leading-relaxed text-slate-700">Vuelve a intentar las preguntas que fallaste al día siguiente y escribe algunos ejemplos propios.</p>
              </li>
            </ol>
          </section>

          <section className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <h2 className="mb-4 text-xl font-black text-slate-900">Tipos de actividad</h2>
              <ul className="space-y-2 text-slate-700">
                {topic.exerciseTypes.map((type) => <li key={type}>• {type}</li>)}
              </ul>
            </div>
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <h2 className="mb-4 text-xl font-black text-slate-900">Cómo estudiar con estas fichas</h2>
              <ol className="list-inside list-decimal space-y-2 text-slate-700">
                <li>Lee las instrucciones y completa la ficha sin mirar las respuestas.</li>
                <li>Comprueba tus respuestas con el solucionario.</li>
                <li>Anota los errores y vuelve a practicar los puntos difíciles.</li>
              </ol>
            </div>
          </section>

          <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm sm:p-10" aria-labelledby="faq-title">
            <h2 id="faq-title" className="mb-5 text-2xl font-black text-slate-900">
              Preguntas frecuentes sobre los ejercicios de {topic.title}
            </h2>
            <div className="space-y-5">
              <article>
                <h3 className="mb-2 font-bold text-slate-900">¿Para qué nivel son estas fichas?</h3>
                <p className="leading-relaxed text-slate-700">Esta colección está clasificada como {topic.level} ({level?.name ?? "nivel MCER"}). Úsala como orientación y empieza por una ficha de prueba: si las instrucciones y los objetivos te resultan demasiado difíciles o demasiado fáciles, repasa los temas previos o avanza a otro nivel.</p>
              </article>
              <article>
                <h3 className="mb-2 font-bold text-slate-900">¿Las fichas PDF incluyen respuestas?</h3>
                <p className="leading-relaxed text-slate-700">Sí. Cada ficha incluye una sección de respuestas para que puedas corregir el ejercicio después de intentarlo. Para aprovecharla mejor, termina primero las preguntas sin consultar el solucionario.</p>
              </article>
              <article>
                <h3 className="mb-2 font-bold text-slate-900">¿Cómo debería elegir la siguiente ficha?</h3>
                <p className="leading-relaxed text-slate-700">Elige otra ficha de {topic.title} si todavía cometes errores en los mismos objetivos. Cuando puedas explicar tus respuestas y crear ejemplos propios, continúa con otro tema de nivel {topic.level} de la lista recomendada.</p>
              </article>
              <article>
                <h3 className="mb-2 font-bold text-slate-900">¿Qué tipos de ejercicios encontraré?</h3>
                <p className="leading-relaxed text-slate-700">Las actividades de esta colección incluyen: {topic.exerciseTypes.join(", ")}. Consulta las instrucciones de cada PDF, ya que la tarea concreta puede variar de una ficha a otra.</p>
              </article>
            </div>
          </section>

          {relatedTopics.length > 0 && (
            <section className="mt-8 rounded-3xl bg-slate-900 p-7 text-white sm:p-10" aria-labelledby="related-title">
              <h2 id="related-title" className="mb-5 text-2xl font-black">Más ejercicios de inglés de nivel {topic.level}</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {relatedTopics.map((related) => (
                  <li key={related.slug}>
                    <Link
                      href={`/ejercicios-ingles-pdf/tema/${related.slug}`}
                      className="block rounded-xl bg-white/10 p-4 font-semibold transition hover:bg-white/20"
                    >
                      {related.title}<span className="ml-2" aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/ejercicios-ingles-pdf" className="mt-6 inline-block font-bold text-white underline underline-offset-4">
                Ver todos los niveles y temas
              </Link>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
