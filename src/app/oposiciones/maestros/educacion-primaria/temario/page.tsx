import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Temario de oposiciones de Educación Primaria gratis",
  description: "Consulta el índice del temario de Educación Primaria para las oposiciones al Cuerpo de Maestros y accede a los temas desarrollados y tests gratuitos.",
  alternates: { canonical: "/oposiciones/maestros/educacion-primaria/temario/" },
};

const topics = [
  "Características básicas del desarrollo psicoevolutivo de los niños y niñas de seis a doce años. Aspectos cognitivos, motrices, afectivos y sociales.",
  "La concreción de los currículos en el marco del proyecto educativo del centro. Programación docente para dar respuesta a la diversidad del alumnado.",
  "La tutoría en la Educación Primaria. Apoyo y orientación en el proceso de aprendizaje. Colaboración con las familias.",
  "La atención a la diversidad del alumnado. Principios y estrategias. Medidas organizativas, curriculares y didácticas.",
  "La evaluación de los procesos de aprendizaje del alumnado de Educación Primaria. Características, estrategias, técnicas e instrumentos.",
  "Las tecnologías de la información y la comunicación. Intervención educativa para su uso responsable.",
  "El área de Ciencias de la Naturaleza en Educación Primaria: enfoque, características y propuestas de intervención educativa.",
  "Construcción de la noción de tiempo histórico en Educación Primaria. Ámbitos de estudio y propuestas didácticas.",
  "El entorno y su conservación. Relaciones entre los elementos de los ecosistemas y actuaciones educativas.",
  "El aprendizaje de los fenómenos físicos y los cambios químicos. Experiencias y procedimientos de trabajo.",
  "El área de Educación para la Ciudadanía y los Derechos Humanos y su contribución a las competencias básicas.",
  "El área de Educación Artística en Educación Primaria como área integrada. Desarrollo de la percepción y la expresión.",
  "Los lenguajes y técnicas artísticas. Intervención educativa en la elaboración de composiciones plásticas.",
  "El área de Lengua Castellana y Literatura en Educación Primaria: enfoque, características y propuestas de intervención.",
  "La intervención educativa en la reflexión sistemática sobre el lenguaje en Educación Primaria.",
  "La educación literaria en el contexto escolar. Manifestaciones literarias más importantes aplicadas a la Educación Primaria.",
  "Proceso de adquisición y desarrollo del lenguaje en la Educación Primaria: comprensión y expresión oral.",
  "Desarrollo y características del proceso lector en la Educación Primaria. Técnicas y estrategias de comprensión lectora.",
  "Desarrollo de la expresión escrita en Educación Primaria. Métodos y estrategias de aprendizaje.",
  "El área de Matemáticas en Educación Primaria: enfoque, características y propuestas de intervención educativa.",
  "Resolución de problemas. Diferentes clases y métodos de resolución. Estrategias de intervención educativa.",
  "El aprendizaje de los números y el cálculo numérico. Sistemas de numeración y operaciones.",
  "Las magnitudes y su medida. Unidades e instrumentos de medida.",
  "Evolución de la percepción espacial en la Educación Primaria. Elementos, formas y relaciones geométricas.",
  "Recogida, organización y representación de la información. Tablas y gráficos. Aplicaciones en otras áreas.",
];

const blocks = [
  { title: "Desarrollo, organización y evaluación", range: "Temas 1–6", start: 1, end: 6 },
  { title: "Ciencias y conocimiento del entorno", range: "Temas 7–10", start: 7, end: 10 },
  { title: "Ciudadanía y Educación Artística", range: "Temas 11–13", start: 11, end: 13 },
  { title: "Lengua y literatura", range: "Temas 14–19", start: 14, end: 19 },
  { title: "Matemáticas", range: "Temas 20–25", start: 20, end: 25 },
];

export default function TemarioPrimariaPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-indigo-50/70">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
          <nav aria-label="Migas de pan" className="mb-5 text-sm text-slate-500">
            <Link href="/oposiciones/maestros/educacion-primaria/" className="underline underline-offset-4">Oposiciones de Educación Primaria</Link>
            <span className="mx-2">/</span><span>Temario</span>
          </nav>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Temario de oposiciones de Educación Primaria</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Organiza el estudio de los 25 temas de referencia de la especialidad.
            El índice sirve para orientarte; antes de preparar una convocatoria,
            confirma el temario y su normativa aplicable en la publicación oficial.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
            Referencia inicial: Orden ECI/592/2007. La convocatoria concreta y sus posibles
            modificaciones prevalecen para determinar los requisitos aplicables.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[230px_1fr]">
        <aside>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Bloques del temario</h2>
          <ul className="mt-4 space-y-3">
            {blocks.map((block) => (
              <li key={block.range} className="rounded-xl border border-slate-200 p-3">
                <a href={`#bloque-${block.start}`} className="font-semibold text-indigo-700 hover:text-indigo-900">{block.title}</a>
                <p className="mt-1 text-sm text-slate-500">{block.range}</p>
              </li>
            ))}
          </ul>
          <Link className="mt-6 inline-block font-semibold text-indigo-700 underline underline-offset-4" href="/oposiciones/maestros/educacion-primaria/test/">Ir a los tests gratuitos</Link>
        </aside>
        <section>
          {blocks.map((block) => (
            <div id={`bloque-${block.start}`} key={block.range} className="mb-10 scroll-mt-8">
              <h2 className="mb-4 border-b border-slate-200 pb-3 text-2xl font-bold">{block.title} <span className="text-base font-medium text-slate-500">({block.range.toLowerCase()})</span></h2>
              <ol start={block.start} className="space-y-4">
                {topics.slice(block.start - 1, block.end).map((topic, index) => {
                  const number = block.start + index;
                  const href = `/oposiciones/maestros/educacion-primaria/temario/tema-${String(number).padStart(2, "0")}/`;
                  return (
                    <li key={number} className="rounded-xl border border-slate-200 p-4">
                      <div className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 font-bold text-indigo-800">{number}</span>
                        <div>
                          <h3 className="font-semibold leading-7">{topic}</h3>
                          {number === 1 ? (
                            <Link className="mt-2 inline-flex font-semibold text-indigo-700 hover:text-indigo-900" href={href}>Ver tema desarrollado y test →</Link>
                          ) : (
                            <p className="mt-2 text-sm text-slate-500">Contenido en preparación.</p>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="text-lg font-bold">Consulta la referencia oficial</h2>
            <p className="mt-2 leading-7 text-slate-600">Verifica el listado y la normativa en el Boletín Oficial del Estado y en la convocatoria de tu administración.</p>
            <a className="mt-3 inline-block font-semibold text-indigo-700 underline underline-offset-4" href="https://boe.es/buscar/doc.php?id=BOE-A-2007-5478" target="_blank" rel="noreferrer">Orden ECI/592/2007 en el BOE ↗</a>
          </div>
        </section>
      </div>
    </main>
  );
}
