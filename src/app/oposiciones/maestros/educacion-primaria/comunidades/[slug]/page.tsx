import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const communities: Record<string, { name: string; portal: string; portalLabel: string }> = {
  andalucia: { name: "Andalucía", portal: "https://www.juntadeandalucia.es/educacion/portales/web/ced", portalLabel: "Consejería de Desarrollo Educativo y Formación Profesional" },
  aragon: { name: "Aragón", portal: "https://educa.aragon.es/", portalLabel: "Educaragón" },
  asturias: { name: "Principado de Asturias", portal: "https://www.educastur.es/", portalLabel: "Educastur" },
  "illes-balears": { name: "Illes Balears", portal: "https://www.caib.es/", portalLabel: "Govern de les Illes Balears" },
  canarias: { name: "Canarias", portal: "https://www.gobiernodecanarias.org/educacion/", portalLabel: "Consejería de Educación" },
  cantabria: { name: "Cantabria", portal: "https://www.educantabria.es/", portalLabel: "Educantabria" },
  "castilla-la-mancha": { name: "Castilla-La Mancha", portal: "https://educacion.castillalamancha.es/", portalLabel: "Portal de Educación" },
  "castilla-y-leon": { name: "Castilla y León", portal: "https://www.educa.jcyl.es/", portalLabel: "Educacyl" },
  cataluna: { name: "Cataluña", portal: "https://educacio.gencat.cat/", portalLabel: "Departament d'Educació i Formació Professional" },
  "comunitat-valenciana": { name: "Comunitat Valenciana", portal: "https://ceice.gva.es/", portalLabel: "Conselleria d'Educació" },
  extremadura: { name: "Extremadura", portal: "https://www.educarex.es/", portalLabel: "Educarex" },
  galicia: { name: "Galicia", portal: "https://www.edu.xunta.gal/oposicions/PaxinaInicio.do", portalLabel: "Portal oficial de oposicións" },
  "comunidad-de-madrid": { name: "Comunidad de Madrid", portal: "https://www.comunidad.madrid/servicios/educacion", portalLabel: "Portal de Educación" },
  "region-de-murcia": { name: "Región de Murcia", portal: "https://www.carm.es/web/pagina?IDCONTENIDO=1&IDTIPO=140", portalLabel: "Comunidad Autónoma de la Región de Murcia" },
  navarra: { name: "Comunidad Foral de Navarra", portal: "https://www.navarra.es/es/educacion", portalLabel: "Departamento de Educación" },
  "pais-vasco": { name: "País Vasco", portal: "https://www.euskadi.eus/gobierno-vasco/departamento-educacion/", portalLabel: "Departamento de Educación" },
  "la-rioja": { name: "La Rioja", portal: "https://www.larioja.org/educarioja", portalLabel: "Educarioja" },
  ceuta: { name: "Ceuta", portal: "https://www.educacionfpydeportes.gob.es/contenidos/ba/ceuta-melilla/ceuta.html", portalLabel: "Ministerio de Educación — Ceuta" },
  melilla: { name: "Melilla", portal: "https://www.educacionfpydeportes.gob.es/contenidos/ba/ceuta-melilla/melilla.html", portalLabel: "Ministerio de Educación — Melilla" },
};

export function generateStaticParams() {
  return Object.keys(communities).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const community = communities[slug];
  if (!community) return { title: "Comunidad no encontrada | Oposiciones de Primaria" };
  return {
    title: `Oposiciones de Primaria en ${community.name} | Linguafly`,
    description: `Consulta las fuentes oficiales para preparar las oposiciones de Educación Primaria en ${community.name}. Verifica convocatoria, correcciones, temario y currículo vigente.`,
    alternates: { canonical: `/oposiciones/maestros/educacion-primaria/comunidades/${slug}/` },
  };
}

export default async function ComunidadPrimariaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const community = communities[slug];
  if (!community) notFound();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-indigo-50/70">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
          <nav aria-label="Migas de pan" className="mb-5 text-sm text-slate-500">
            <Link href="/oposiciones/maestros/educacion-primaria/" className="underline underline-offset-4">Oposiciones de Educación Primaria</Link>
            <span className="mx-2">/</span><Link href="/oposiciones/maestros/educacion-primaria/comunidades/" className="underline underline-offset-4">Comunidades</Link>
          </nav>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Oposiciones de Educación Primaria en {community.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Usa esta página como punto de partida y confirma siempre los detalles en la convocatoria oficial y sus correcciones. Las plazas, plazos, requisitos, currículo aplicable y criterios de calificación pueden cambiar entre procedimientos.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <section className="rounded-2xl border border-slate-200 p-6">
          <h2 className="text-2xl font-bold">Fuente institucional</h2>
          <p className="mt-3 leading-7 text-slate-600">Consulta el portal de la administración educativa y busca la convocatoria de ingreso al Cuerpo de Maestros, especialidad Educación Primaria, junto con las correcciones y notas informativas posteriores.</p>
          <a className="mt-4 inline-flex font-semibold text-indigo-700 underline underline-offset-4" href={community.portal} target="_blank" rel="noreferrer">{community.portalLabel} ↗</a>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Qué debes comprobar</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
            <li>Convocatoria vigente, número de plazas, turnos y plazo de solicitud.</li>
            <li>Correcciones, resoluciones posteriores e instrucciones publicadas por los tribunales.</li>
            <li>Temario exigible y cualquier aclaración sobre los epígrafes.</li>
            <li>Currículo autonómico vigente y normativa que deba fundamentar la programación o el supuesto práctico.</li>
            <li>Formato de las pruebas, rúbricas y criterios de calificación oficiales.</li>
          </ul>
        </section>
        <section className="mt-8 rounded-2xl bg-slate-50 p-5">
          <h2 className="text-xl font-bold">Recursos de Linguafly</h2>
          <div className="mt-3 flex flex-wrap gap-4">
            <Link className="font-semibold text-indigo-700 underline underline-offset-4" href="/oposiciones/maestros/educacion-primaria/temario/">Temario base de 25 temas</Link>
            <Link className="font-semibold text-indigo-700 underline underline-offset-4" href="/oposiciones/maestros/educacion-primaria/test/">Tests gratuitos</Link>
            <Link className="font-semibold text-indigo-700 underline underline-offset-4" href="/oposiciones/maestros/educacion-primaria/supuestos-practicos/">Supuestos prácticos</Link>
            <a className="font-semibold text-indigo-700 underline underline-offset-4" href="https://boe.es/buscar/doc.php?id=BOE-A-2007-5478" target="_blank" rel="noreferrer">Orden ECI/592/2007 en el BOE ↗</a>
          </div>
        </section>
        <p className="mt-8 text-sm leading-6 text-slate-500">Esta página es una guía informativa y no sustituye la publicación oficial. No presupone que exista una convocatoria abierta en este momento.</p>
      </div>
    </main>
  );
}
