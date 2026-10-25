import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Oposiciones de Primaria por comunidad autónoma | Linguafly",
  description: "Accede a los portales institucionales para comprobar convocatorias, correcciones, currículo y requisitos de las oposiciones de Educación Primaria.",
  alternates: { canonical: "/oposiciones/maestros/educacion-primaria/comunidades/" },
};

const communities = [
  ["Andalucía", "andalucia"], ["Aragón", "aragon"], ["Principado de Asturias", "asturias"],
  ["Illes Balears", "illes-balears"], ["Canarias", "canarias"], ["Cantabria", "cantabria"],
  ["Castilla-La Mancha", "castilla-la-mancha"], ["Castilla y León", "castilla-y-leon"],
  ["Cataluña", "cataluna"], ["Comunitat Valenciana", "comunitat-valenciana"], ["Extremadura", "extremadura"],
  ["Galicia", "galicia"], ["Comunidad de Madrid", "comunidad-de-madrid"], ["Región de Murcia", "region-de-murcia"],
  ["Comunidad Foral de Navarra", "navarra"], ["País Vasco", "pais-vasco"], ["La Rioja", "la-rioja"],
  ["Ceuta", "ceuta"], ["Melilla", "melilla"],
];

export default function ComunidadesPrimariaPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-indigo-50/70">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Oposiciones de Primaria por comunidad autónoma</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Selecciona tu administración y comprueba siempre la convocatoria, las correcciones y las instrucciones oficiales más recientes.</p>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map(([name, slug]) => (
            <li key={slug}>
              <Link className="block rounded-xl border border-slate-200 p-4 font-semibold text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50" href={`/oposiciones/maestros/educacion-primaria/comunidades/${slug}/`}>{name} →</Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm leading-6 text-slate-500">La existencia de esta página no implica que haya un proceso abierto. Las fechas, plazas y requisitos dependen de cada convocatoria oficial.</p>
      </div>
    </main>
  );
}
