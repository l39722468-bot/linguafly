import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { MagazineArticleCard } from "@/components/magazine/MagazineArticleCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/schemas";
import {
  countEnglishArchiveByCategory,
  formatEsCount,
  listEnglishArchiveArticles,
  totalEnglishArchiveCount,
} from "@/lib/content/english-archive";
import { ENGLISH_HUB_ARTICLE_LIMIT } from "@/lib/content/pagination";
import { getArticlePath } from "@/lib/blog-paths";
import { getAbsoluteUrl, getSiteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";
import { getCategoryOgImagePath } from "@/lib/seo/og-images";
import {
  getEnglishLevelSections,
  getEnglishTopicSections,
  type EnglishLearningSection,
  type SiteVertical,
} from "@/lib/site-catalog";

function CatalogCard({
  section,
  count,
}: {
  section: EnglishLearningSection;
  count: number;
}) {
  return (
    <Link
      href={section.href}
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border ${section.tone.border} bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg`}
    >
      <div className={`h-1.5 bg-gradient-to-r ${section.tone.gradient}`} />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <span className="text-3xl" aria-hidden>
            {section.icon}
          </span>
          {count > 0 ? (
            <span className={`rounded-full px-3 py-1 text-xs font-black ${section.tone.badge}`}>
              {formatEsCount(count, "guía", "guías")}
            </span>
          ) : null}
        </div>
        <h3 className="font-display mb-2 text-xl font-black text-slate-900 group-hover:text-coral-700">
          {section.name}
        </h3>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">{section.description}</p>
        <span className={`text-sm font-black ${section.tone.text}`}>Ver {section.shortName} →</span>
      </div>
    </Link>
  );
}

export async function IdiomasHub({ vertical }: { vertical: SiteVertical }) {
  const levels = getEnglishLevelSections();
  const topics = getEnglishTopicSections();
  const [counts, listed] = await Promise.all([
    countEnglishArchiveByCategory(),
    listEnglishArchiveArticles({ page: 1, limit: ENGLISH_HUB_ARTICLE_LIMIT }),
  ]);
  const total = Math.max(listed.total, totalEnglishArchiveCount(counts));
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: getSiteUrl() },
    { name: vertical.name, url: getAbsoluteUrl(vertical.href) },
  ]);
  const collectionSchema = generateCollectionPageSchema({
    name: vertical.name,
    description: vertical.description,
    url: getAbsoluteUrl(vertical.href),
    image: getCategoryOgImagePath(vertical.slug),
    numberOfItems: total,
    articles: listed.articles.map((article) => ({
      title: article.title,
      url: getAbsoluteUrl(getArticlePath(article)),
      datePublished: article.date,
    })),
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <Navigation />
      <main className="min-h-screen bg-cream-100">
        <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className={`absolute inset-0 bg-gradient-to-br ${vertical.tone.gradient} opacity-90`} />
          <div className="relative mx-auto max-w-5xl text-white">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-white/80">
              {SITE_BRAND_NAME} · {vertical.name}
            </p>
            <h1 className="font-display mb-6 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
              {vertical.tagline}
            </h1>
            <p className="max-w-2xl text-lg font-medium text-white/90 sm:text-xl">
              {vertical.description}
              {total > 0 ? ` ${formatEsCount(total, "artículo publicado", "artículos publicados")}.` : ""}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#niveles"
                className="inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-900 hover:bg-cream-100"
              >
                Por nivel A1–C1
              </a>
              <a
                href="#tematicas"
                className="inline-flex rounded-2xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-black text-white hover:bg-white/20"
              >
                Por temática
              </a>
            </div>
          </div>
        </section>

        <section id="niveles" className="scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-black uppercase tracking-widest text-coral-600">Nivel de inglés</p>
            <h2 className="font-display mb-3 text-3xl font-black text-slate-900">Cursos A1 a C1</h2>
            <p className="mb-8 max-w-2xl text-slate-600">
              Guías por unidad de cada nivel del MCER. Entra al nivel y recorre gramática, vocabulario y ejercicios.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {levels.map((section) => (
                <CatalogCard
                  key={section.slug}
                  section={section}
                  count={counts[section.slug] ?? 0}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="tematicas" className="scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-black uppercase tracking-widest text-coral-600">Temáticas</p>
            <h2 className="font-display mb-3 text-3xl font-black text-slate-900">
              Gramática, viajes, trabajo y más
            </h2>
            <p className="mb-8 max-w-2xl text-slate-600">
              El archivo de inglés agrupado por uso: estudiar, viajar, trabajar, aprobar un examen o mejorar skills.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {topics.map((section) => (
                <CatalogCard
                  key={section.slug}
                  section={section}
                  count={counts[section.slug] ?? 0}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="recientes" className="scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-coral-600">Para leer ahora</p>
                <h2 className="font-display text-3xl font-black text-slate-900">Últimos artículos</h2>
              </div>
              <Link href="/blog" className="text-sm font-black text-coral-700 hover:text-coral-800">
                Ver el blog →
              </Link>
            </div>
            {listed.articles.length === 0 ? (
              <p className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-slate-500">
                Aún no hay artículos en el archivo de inglés.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {listed.articles.map((article) => (
                  <MagazineArticleCard
                    key={`${article.category}-${article.slug}`}
                    article={article}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
