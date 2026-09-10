import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { MagazineArticleCard } from "@/components/magazine/MagazineArticleCard";
import Link from "next/link";
import type { Metadata } from "next";
import { listPublishedArticles } from "@/lib/content/articles";
import { HOME_ARTICLE_LIMIT } from "@/lib/content/pagination";
import { SITE_BRAND_NAME } from "@/lib/site-brand";
import { ENGLISH_LEARNING_SECTIONS, SITE_DESCRIPTION, SITE_SERP_TITLE, SITE_VERTICALS } from "@/lib/site-catalog";
import { llmMarkdownAlternates } from "@/lib/seo/canonical";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: SITE_SERP_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "artículos de idiomas",
    "alimentación",
    "entrenamiento",
    "inteligencia artificial",
    "aprender inglés",
    SITE_BRAND_NAME,
  ],
  alternates: llmMarkdownAlternates("/"),
};

export default async function HomePage() {
  const { articles } = await listPublishedArticles({
    page: 1,
    limit: HOME_ARTICLE_LIMIT,
  });
  const featured = articles.find((article) => article.featured) || articles[0];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-cream-100">
        <section className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-br from-coral-50 via-cream-100 to-sky-50" />
          <div className="relative mx-auto max-w-6xl text-center">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-black text-coral-700 shadow-sm">
              Nueva revista + archivo de inglés
            </p>
            <h1 className="font-display mb-6 text-4xl font-black leading-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Idiomas, alimentación,
              <br />
              <span className="bg-gradient-to-r from-coral-600 to-peach-500 bg-clip-text text-transparent">
                entrenamiento e IA
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg font-medium text-slate-600 sm:text-xl">
              Artículos de idiomas, alimentación, entrenamiento e inteligencia artificial, y el archivo de guías para aprender inglés en las mismas URLs de siempre.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/blog"
                className="inline-flex rounded-2xl bg-gradient-to-r from-coral-500 to-peach-500 px-8 py-4 text-lg font-black text-white shadow-coral hover:opacity-95"
              >
                Ver artículos
              </Link>
              <Link
                href="#tematicas"
                className="inline-flex rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-lg font-black text-slate-800 hover:border-coral-200"
              >
                Elegir temática
              </Link>
            </div>
          </div>
        </section>

        <section id="tematicas" className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
            {SITE_VERTICALS.map((vertical) => (
              <Link
                key={vertical.slug}
                href={vertical.href}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`h-2 bg-gradient-to-r ${vertical.tone.gradient}`} />
                <div className="p-8">
                  <div className="mb-4 text-4xl">{vertical.icon}</div>
                  <h2 className="font-display mb-2 text-2xl font-black text-slate-900">{vertical.name}</h2>
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">{vertical.description}</p>
                  <span className={`text-sm font-black ${vertical.tone.text}`}>Entrar →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-black uppercase tracking-widest text-coral-600">Aprender inglés</p>
            <h2 className="font-display mb-3 text-3xl font-black text-slate-900">Archivo de guías</h2>
            <p className="mb-6 max-w-2xl text-slate-600">
              Gramática, viajes, trabajo, exámenes y cursos por nivel. Cada artículo conserva su URL canónica /blog/categoría/slug.
            </p>
            <div className="flex flex-wrap gap-2">
              {ENGLISH_LEARNING_SECTIONS.map((section) => (
                <Link
                  key={section.slug}
                  href={section.href}
                  className={`rounded-full px-3 py-1.5 text-sm font-bold ${section.tone.badge}`}
                >
                  {section.icon} {section.shortName}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {featured && (
          <section className="px-4 pb-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-widest text-coral-600">Para leer ahora</p>
                  <h2 className="font-display text-3xl font-black text-slate-900">Últimos artículos</h2>
                </div>
                <Link href="/blog" className="text-sm font-black text-coral-700 hover:text-coral-800">
                  Ver todos →
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.slice(0, 6).map((article) => (
                  <MagazineArticleCard key={`${article.category}-${article.slug}`} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
