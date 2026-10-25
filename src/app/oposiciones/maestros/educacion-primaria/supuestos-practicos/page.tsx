import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Supuestos prácticos de Educación Primaria | Linguafly",
  description:
    "Guía gratuita para preparar supuestos prácticos de oposiciones de Educación Primaria: análisis del contexto, planificación didáctica, inclusión y evaluación.",
  alternates: {
    canonical: "/oposiciones/maestros/educacion-primaria/supuestos-practicos/",
  },
};

const steps = [
  {
    title: "1. Analiza el contexto",
    body: "Identifica el curso y ciclo, las características del grupo, el entorno del centro, los recursos disponibles y las necesidades específicas de apoyo educativo. Separa los datos del supuesto de las hipótesis que tengas que justificar.",
  },
  {
    title: "2. Define el reto y los objetivos",
    body: "Formula qué aprendizaje o problema educativo abordarás. Relaciona los objetivos con las competencias específicas, los criterios de evaluación y los saberes básicos del currículo autonómico vigente.",
  },
  {
    title: "3. Diseña una intervención viable",
    body: "Secuencia actividades, agrupamientos, tiempos, materiales y papel docente. Incluye metodologías coherentes con el reto y explica por qué son adecuadas para ese grupo concreto.",
  },
  {
    title: "4. Planifica la inclusión",
    body: "Prevé apoyos y diferentes vías de acceso, participación y expresión. Evita soluciones genéricas: conecta cada medida con las barreras o necesidades descritas en el supuesto.",
  },
  {
    title: "5. Evalúa y ajusta",
    body: "Vincula los criterios de evaluación con evidencias observables e instrumentos adecuados. Explica cómo ofrecerás retroalimentación y qué harás si el alumnado necesita más apoyo o mayor profundización.",
  },
];

export default function SupuestosPracticosPrimariaPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-indigo-50/70">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
          <nav aria-label="Migas de pan" className="mb-5 text-sm text-slate-500">
            <Link href="/oposiciones/maestros/educacion-primaria/" className="underline underline-offset-4">
              Oposiciones de Educación Primaria
            </Link>
            <span className="mx-2">/</span>
            <span>Supuestos prácticos</span>
          </nav>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Supuestos prácticos de Educación Primaria
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Una estructura de trabajo para resolver casos de aula con coherencia
            pedagógica, atención a la diversidad y evaluación alineada con el currículo.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">
            Esta guía es orientativa, no un modelo oficial de examen. Adapta la respuesta
            a las instrucciones, criterios de calificación y normativa de la convocatoria
            de tu comunidad autónoma.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <section aria-labelledby="estructura">
          <h2 id="estructura" className="text-2xl font-bold tracking-tight">
            Cómo estructurar la resolución
          </h2>
          <ol className="mt-6 space-y-4">
            {steps.map((step) => (
              <li key={step.title} className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5" aria-labelledby="checklist">
          <h2 id="checklist" className="text-xl font-bold">Lista de comprobación antes de entregar</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li>¿He respondido a todas las tareas que pide el enunciado?</li>
            <li>¿Las decisiones metodológicas responden al contexto y no son una lista genérica?</li>
            <li>¿He conectado currículo, actividades, criterios de evaluación y evidencias?</li>
            <li>¿He concretado medidas inclusivas, recursos, tiempos y coordinación cuando procede?</li>
            <li>¿He citado la normativa autonómica vigente y respetado el formato exigido en la convocatoria?</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Continúa preparando el temario</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link className="font-semibold text-indigo-700 underline underline-offset-4" href="/oposiciones/maestros/educacion-primaria/temario/">
              Consultar los 25 temas de referencia
            </Link>
            <Link className="font-semibold text-indigo-700 underline underline-offset-4" href="/oposiciones/maestros/educacion-primaria/test/">
              Practicar con tests gratuitos
            </Link>
            <a className="font-semibold text-indigo-700 underline underline-offset-4" href="https://boe.es/buscar/doc.php?id=BOE-A-2007-5478" target="_blank" rel="noreferrer">
              Consultar el temario base en el BOE ↗
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
