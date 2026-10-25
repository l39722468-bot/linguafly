import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Temario de oposiciones de Educación Primaria gratis",
  description: "Consulta el índice del temario de Educación Primaria para las oposiciones al Cuerpo de Maestros y accede a los temas desarrollados y tests gratuitos.",
  alternates: { canonical: "/oposiciones/maestros/educacion-primaria/temario/" },
};

const topics = [
  "Características básicas del desarrollo psicoevolutivo de los niños y niñas de los seis a los doce años. Aspectos cognitivos, motrices, afectivos y sociales. Implicaciones en el desarrollo del proceso educativo y de enseñanza-aprendizaje.",
  "La concreción de los currículos en el marco del proyecto educativo del centro. Programación docente para dar respuesta a las distintas necesidades del alumnado: principios pedagógicos que deben tenerse en cuenta, estrategias para su elaboración en el ciclo, curso y aula. Coordinación docente.",
  "La tutoría en la Educación Primaria. Apoyo y orientación en el proceso de aprendizaje. Colaboración con las familias. Funciones del tutor en relación con el equipo docente y otros profesionales. El plan de acción tutorial. Propuestas de acción tutorial.",
  "La atención a la diversidad del alumnado. Principios y estrategias. Medidas organizativas, curriculares y didácticas. Alumnado con necesidad específica de apoyo educativo. Medidas educativas específicas.",
  "La evaluación de los procesos de aprendizaje del alumnado de Educación Primaria. Características, estrategias, técnicas e instrumentos de evaluación. Promoción y planes específicos de refuerzo.",
  "Las tecnologías de la información y la comunicación. Intervención educativa para su uso y aplicación en las diferentes áreas de conocimiento.",
  "El área de Conocimiento del medio natural, social y cultural en la Educación Primaria: enfoque, características y propuestas de intervención educativa. Contribución del área al desarrollo de las competencias básicas. Objetivos, contenidos y criterios de evaluación: aspectos más relevantes. Relación con otras áreas del currículo.",
  "Construcción de la noción de tiempo histórico en la Educación Primaria. Ámbitos de estudio de procesos y hechos históricos. El aprendizaje de las grandes etapas históricas de la humanidad. Utilización de documentos: orales, escritos y restos materiales. Intervención educativa.",
  "El entorno y su conservación. Relaciones entre los elementos de los ecosistemas, factores de deterioro y regeneración. Capacidad de los seres humanos para actuar sobre la naturaleza. Intervención educativa.",
  "El aprendizaje de los fenómenos físicos y los cambios químicos. Planificación y realización de experiencias para el estudio de propiedades, características y comportamiento de la materia y la energía.",
  "El área de Educación para la ciudadanía y los derechos humanos en la Educación Primaria: enfoque, características y propuestas de intervención educativa. Contribución del área al desarrollo de las competencias básicas. Objetivos, contenidos y criterios de evaluación: aspectos más relevantes. Relación con otras áreas del currículo.",
  "El área de Educación Artística en la Educación Primaria como área integrada: enfoque, características y propuestas de intervención educativa. Contribución del área al desarrollo de las competencias básicas. Objetivos, contenidos y criterios de evaluación: aspectos más relevantes. Relación con otras áreas del currículo.",
  "Los diferentes lenguajes y técnicas artísticas. Intervención educativa en la elaboración de composiciones plásticas e imágenes: planificación, diseño y organización del proceso; selección y utilización de materiales y técnicas.",
  "El área de Lengua Castellana y Literatura en la Educación Primaria: enfoque, características y propuestas de intervención educativa. Contribución del área al desarrollo de las competencias básicas. Objetivos, contenidos y criterios de evaluación: aspectos más relevantes. Desarrollo de la competencia comunicativa en otras áreas del currículo.",
  "La intervención educativa en la reflexión sistemática sobre el lenguaje en la Educación Primaria en relación con las condiciones de uso: el contexto comunicativo, los ámbitos de uso y el texto. La adquisición de la lectura y la escritura.",
  "La educación literaria en el contexto escolar. Manifestaciones literarias más importantes aplicadas a la Educación Primaria. Técnicas y estrategias de utilización de la literatura infantil y juvenil. La biblioteca escolar y la biblioteca de aula como recursos didácticos en la educación literaria.",
  "Proceso de adquisición y desarrollo del lenguaje en la Educación Primaria: comprensión y expresión oral, elementos no lingüísticos que acompañan a la comunicación oral. Estrategias de intervención educativa.",
  "Desarrollo y características del proceso lector en la Educación Primaria. Técnicas y estrategias de comprensión lectora en diferentes situaciones de comunicación y con diferentes tipos de textos. La lectura: planes de fomento y estrategias de intervención educativa.",
  "Desarrollo de la expresión escrita en la Educación Primaria. Métodos y estrategias de aprendizaje. Composición de diferentes textos escritos. Utilización de las tecnologías de la información y la comunicación. Estrategias de intervención educativa.",
  "El área de Matemáticas en la Educación Primaria: enfoque, características y propuestas de intervención educativa. Contribución al desarrollo de las competencias básicas. Objetivos, contenidos y criterios de evaluación: aspectos más relevantes. Relación con otras áreas del currículo.",
  "Resolución de problemas. Diferentes clases y métodos de resolución. Planificación, gestión de los recursos, representación, interpretación y valoración de los resultados. Estrategias de intervención educativa.",
  "El aprendizaje de los números y el cálculo numérico. Números naturales, enteros, fraccionarios y decimales. Sistemas de numeración. Relación entre los números. Operaciones de cálculo y procedimientos del mismo (cálculo escrito, mental, estimación y calculadora). Intervención educativa.",
  "Las magnitudes y su medida. Unidades e instrumentos de medida. Estimación y aproximación en las mediciones. Recursos didácticos e intervención educativa.",
  "Evolución de la percepción espacial en la Educación Primaria. Elementos, formas y relaciones geométricas en el entorno: clasificación y representación. Intervención educativa.",
  "Recogida, organización y representación de la información. Tablas de datos. Tipos de gráficos. Aplicaciones en las distintas áreas y en la interpretación de datos. Utilización de las tecnologías de la información y la comunicación para el tratamiento de datos.",
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
          <div className="mt-5 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <h2 className="font-bold">Adaptaciones que debes comprobar en la convocatoria de 2026</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li><strong>Tema 7:</strong> algunas convocatorias concretan el área en Ciencias Naturales y Ciencias Sociales (por ejemplo, Aragón y Murcia).</li>
              <li><strong>Tema 11:</strong> la denominación y el enfoque varían según la administración; Aragón indica Educación en valores sociales y cívicos, y Murcia pide tener en cuenta transversalmente el currículo vigente.</li>
              <li><strong>Tema 12:</strong> Murcia interpreta la referencia a Educación Artística como Educación Plástica y Visual.</li>
            </ul>
            <p className="mt-2">En Asturias se difundió una circular informativa ministerial sobre el temario de Primaria para el procedimiento 2025-2026. En Castilla-La Mancha, la convocatoria exige emplear el currículo autonómico vigente en el curso 2025/2026. Estas precisiones no sustituyen la lectura de las bases y correcciones de cada administración. La lista de abajo reproduce el temario base del BOE; las denominaciones adaptadas deben estudiarse conforme a la convocatoria correspondiente.</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a className="font-semibold underline underline-offset-4" href="https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?BASE=BOLE&CMD=VERDOC&DOCN=007958673&SEC=BUSQUEDA_AVANZADA" target="_blank" rel="noreferrer">Corrección oficial de Aragón ↗</a>
              <a className="font-semibold underline underline-offset-4" href="https://sede.carm.es/web/pagina?IDCONTENIDO=843&IDTIPO=240" target="_blank" rel="noreferrer">Convocatoria oficial de Murcia ↗</a>
              <a className="font-semibold underline underline-offset-4" href="https://www.educastur.es/-/procedimiento-selectivo-25-26-nota-informativa?redirect=%2F" target="_blank" rel="noreferrer">Nota oficial de Asturias ↗</a>
              <a className="font-semibold underline underline-offset-4" href="https://educacion.castillalamancha.es/profesorado/oposiciones/notas-informativas-oposicion-maestros-2026" target="_blank" rel="noreferrer">Nota oficial de Castilla-La Mancha ↗</a>
            </div>
          </div>
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
