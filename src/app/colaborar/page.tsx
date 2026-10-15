import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { CONTACT_EMAIL, SITE_BRAND_NAME, getAbsoluteUrl } from "@/lib/site-brand";
import { canonicalAlternates } from "@/lib/seo/canonical";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/schemas";
import { ArrowRight, BookOpen, CheckCircle, Mail, Megaphone, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Colaboraciones y patrocinios para marcas educativas",
  description:
    "Colabora con Linguafly mediante contenidos patrocinados, reseñas editoriales y campañas para marcas de idiomas, educación y tecnología lingüística.",
  alternates: canonicalAlternates("/colaborar"),
  openGraph: {
    title: "Colabora con Linguafly",
    description:
      "Oportunidades de colaboración para empresas de idiomas, educación y tecnología lingüística.",
    type: "website",
    url: getAbsoluteUrl("/colaborar"),
  },
};

const services = [
  {
    icon: BookOpen,
    title: "Contenidos patrocinados",
    description:
      "Artículos originales relacionados con el aprendizaje de idiomas, con identificación clara de la colaboración comercial y revisión editorial.",
  },
  {
    icon: Sparkles,
    title: "Presentación de herramientas",
    description:
      "Contenido sobre aplicaciones, recursos y tecnología lingüística. Las pruebas y valoraciones se basan en la experiencia y la información que realmente podamos verificar.",
  },
  {
    icon: Megaphone,
    title: "Patrocinio de recursos",
    description:
      "Colaboraciones alrededor de guías, materiales de estudio y temas concretos alineados con los intereses de los lectores.",
  },
];

export default function ColaborarPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Inicio", url: getAbsoluteUrl("/") },
    { name: "Colaborar", url: getAbsoluteUrl("/colaborar") },
  ]);

  const subject = encodeURIComponent("Propuesta de colaboración con Linguafly");
  const body = encodeURIComponent(
    "Hola,\n\nMe gustaría hablar sobre una posible colaboración con Linguafly.\n\nEmpresa:\nWeb o producto:\nObjetivo de la colaboración:\nPresupuesto orientativo:\n\nGracias."
  );

  return (
    <>
      <JsonLd data={breadcrumb} />
      <Navigation />
      <main className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-orange-300">
              Colaboraciones para marcas
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Conecta tu marca con personas que quieren aprender idiomas.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">
              Linguafly publica guías y recursos educativos para estudiantes hispanohablantes.
              Colaboramos con empresas de idiomas, educación y tecnología lingüística mediante
              propuestas relevantes para los lectores.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-orange-300"
              >
                Proponer una colaboración <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/sobre-nosotros"
                className="inline-flex items-center rounded-xl border border-white/25 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Conocer el proyecto
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black text-slate-900">Formas de colaborar</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Cada propuesta se adapta al producto, al tema y a la utilidad para la audiencia.
              No vendemos posiciones en buscadores ni garantizamos tráfico, ventas o resultados SEO.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {services.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex rounded-xl bg-orange-50 p-3 text-orange-700">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Un enfoque editorial claro</h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Colaboraciones alineadas con el aprendizaje de idiomas y la utilidad para el lector.",
                  "Identificación transparente de los contenidos patrocinados.",
                  'Enlaces comerciales etiquetados adecuadamente, por ejemplo con rel="sponsored" cuando corresponda.',
                  "Sin promesas de posiciones en Google, autoridad SEO o resultados que no podamos demostrar.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-slate-700">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rounded-2xl bg-slate-50 p-7">
              <h2 className="text-2xl font-black text-slate-900">Solicita una propuesta</h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                Cuéntanos qué producto o servicio quieres dar a conocer, a qué público te diriges
                y qué objetivo buscas. Revisaremos si encaja con la línea editorial de Linguafly
                y te responderemos con las opciones que podamos ofrecer.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`}
                className="mt-6 inline-flex items-center gap-2 font-bold text-orange-700 hover:text-orange-800"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">
            Las condiciones, el alcance, los plazos y el precio se acuerdan por escrito antes de
            iniciar cada colaboración. La publicación está sujeta a revisión editorial.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
