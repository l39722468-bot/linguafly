import type { Metadata } from "next";
import Link from "next/link";

const title = "Oposiciones de Educación Primaria: temario y tests gratis";
const description =
  "Prepara las oposiciones de Educación Primaria con temario organizado, esquemas y tests gratuitos con respuestas explicadas. Consulta también las convocatorias por comunidades autónomas.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/oposiciones/maestros/educacion-primaria/" },
  openGraph: { title, description, type: "website" },
};

const resources = [
  {
    title: "Temario de Educación Primaria",
    description: "Índice de temas, explicaciones de estudio, esquemas y referencias.",
    href: "/oposiciones/maestros/educacion-primaria/temario/",
    label: "Consultar temario",
  },
  {
    title: "Tests gratuitos por tema",
    description: "Practica con preguntas originales y revisa la explicación de cada respuesta.",
    href: "/oposiciones/maestros/educacion-primaria/test/",
    label: "Practicar con tests",
  },
  {
    title: "Supuestos prácticos",
    description: "Recursos para conectar los conocimientos con situaciones educativas de aula.",
    href: "/oposiciones/maestros/educacion-primaria/supuestos-practicos/",
    label: "Ver supuestos",
  },
  {
    title: "Convocatorias por comunidad autónoma",
    description: "Localiza los portales oficiales y consulta requisitos, plazos y normativa aplicable.",
    href: "/oposiciones/maestros/educacion-primaria/comunidades/",
    label: "Elegir comunidad",
  },
];

const communities = [
  ["Andalucía", "andalucia"],
  ["Aragón", "aragon"],
  ["Principado de Asturias", "asturias"],
  ["Illes Balears", "illes-balears"],
  ["Canarias", "canarias"],
  ["Cantabria", "cantabria"],
  ["Castilla-La Mancha", "castilla-la-mancha"],
  ["Castilla y León", "castilla-y-leon"],
  ["Cataluña", "cataluna"],
  ["Comunitat Valenciana", "comunitat-valenciana"],
  ["Extremadura", "extremadura"],
  ["Galicia", "galicia"],
  ["Comunidad de Madrid", "comunidad-de-madrid"],
  ["Región de Murcia", "region-de-murcia"],
  ["Comunidad Foral de Navarra", "navarra"],
  ["País Vasco", "pais-vasco"],
  ["La Rioja", "la-rioja"],
  ["Ceuta", "ceuta"],
  ["Melilla", "melilla"],
];

export default function EducacionPrimariaOposicionesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-indigo-700">
            Linguafly · Recursos gratuitos
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Oposiciones de Educación Primaria: temario y tests gratis
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Organiza tu estudio del Cuerpo de Maestros con temas para repasar,
            esquemas y tests gratuitos con respuestas explicadas. Encuentra
            también fuentes oficiales para preparar la convocatoria de tu comunidad.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-xl bg-indigo-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-800" href="/oposiciones/maestros/educacion-primaria/temario/">
              Explorar el temario
            </Link>
            <Link className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:border-indigo-400" href="/oposiciones/maestros/educacion-primaria/test/">
              Hacer tests gratuitos
            </Link>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">
            Los materiales son recursos de apoyo al estudio. Comprueba siempre
            el temario, la normativa y los requisitos en la convocatoria oficial aplicable.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Empieza por el recurso que necesitas</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Estudia por bloques, practica con preguntas y utiliza las fuentes
            oficiales para mantener tu preparación alineada con cada convocatoria.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {resources.map((resource) => (
            <article key={resource.href} className="rounded-2xl border border-slate-200 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
              <h3 className="text-xl font-bold">{resource.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{resource.description}</p>
              <Link className="mt-5 inline-flex font-semibold text-indigo-700 hover:text-indigo-900" href={resource.href}>
                {resource.label} <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Consulta las oposiciones por comunidad autónoma</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Los procedimientos, los plazos y los requisitos pueden variar según
            la administración convocante. Utiliza estas páginas como punto de
            partida y confirma los detalles en los boletines y portales oficiales.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {communities.map(([name, slug]) => (
              <Link key={slug} className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-800 transition hover:border-indigo-300 hover:text-indigo-800" href={`/oposiciones/maestros/educacion-primaria/comunidades/${slug}/`}>
                {name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Fuentes oficiales para tu preparación</h2>
        <div className="mt-6 space-y-4 leading-7 text-slate-600">
          <p>
            <a className="font-semibold text-indigo-700 underline decoration-indigo-300 underline-offset-4" href="https://boe.es/buscar/doc.php?id=BOE-A-2007-5478" target="_blank" rel="noreferrer">
              Orden ECI/592/2007 (BOE)
            </a>
            {" "}— referencia para el temario de la especialidad de Educación Primaria. Verifica las disposiciones y modificaciones que afecten a la convocatoria concreta.
          </p>
          <p>
            <a className="font-semibold text-indigo-700 underline decoration-indigo-300 underline-offset-4" href="https://www.boe.es/buscar/act.php?id=BOE-A-2007-4372" target="_blank" rel="noreferrer">
              Real Decreto 276/2007 (BOE)
            </a>
            {" "}— marco reglamentario de ingreso y acceso a los cuerpos docentes; consulta la versión consolidada y la convocatoria aplicable.
          </p>
          <p>
            <a className="font-semibold text-indigo-700 underline decoration-indigo-300 underline-offset-4" href="https://www.educacionfpydeportes.gob.es/mc/redie-eurydice/sistemas-educativos/profesorado/acceso-cuerpo-maestros/legislacion-maestros.html" target="_blank" rel="noreferrer">
              Ministerio de Educación: legislación y acceso al Cuerpo de Maestros
            </a>
            {" "}— punto de partida para localizar normativa e información institucional.
          </p>
        </div>
      </section>
    </main>
  );
}
