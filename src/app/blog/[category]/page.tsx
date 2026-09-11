import { Suspense } from "react";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { BlogSearchExplorer } from "@/components/blog/BlogSearchExplorer";
import { ArticlePagination } from "@/components/magazine/ArticlePagination";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { normalizeCategory } from "@/lib/blog-paths";
import { listPublishedArticles } from "@/lib/content/articles";
import { ARTICLES_PER_PAGE, parsePageParam } from "@/lib/content/pagination";
import { optimizeSEOTitle } from "@/utils/seo-utils";
import { generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/schemas";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAbsoluteUrl, getSiteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";
import { llmMarkdownUrl, languageAlternates } from "@/lib/seo/canonical";
import { getPublicCategoryLabel, isPublicArticleCategory } from "@/lib/site-catalog";
import { getArticleOgImagePath, getCategoryOgImagePath, ogImageMeta } from "@/lib/seo/og-images";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const categoryMetadata: Record<string, { name: string, description: string, icon: string, color: string }> = {
  idiomas: {
    name: "Idiomas: hábitos, vocabulario y estudio realista",
    description: "Guías para aprender idiomas con método: hábitos, vocabulario activo y un plan que se pueda mantener.",
    icon: "🗣️",
    color: "from-coral-500 to-peach-500"
  },
  alimentacion: {
    name: "Alimentación: comidas reales y planificación sencilla",
    description: "Cómo organizar la semana, entender el plato y comer mejor sin dietas extremas.",
    icon: "🥗",
    color: "from-emerald-500 to-lime-500"
  },
  entrenamiento: {
    name: "Entrenamiento: fuerza, constancia y progreso",
    description: "Rutinas y principios para entrenar en casa o en el gimnasio sin lesionarte.",
    icon: "💪",
    color: "from-sky-500 to-indigo-500"
  },
  "inteligencia-artificial": {
    name: "Inteligencia artificial: prompts y criterio práctico",
    description: "Cómo usar un chatbot en el trabajo, el estudio y la casa: prompts, comprobación y privacidad.",
    icon: "✨",
    color: "from-violet-500 to-indigo-500"
  },
  fitness: {
    name: "Entrenamiento físico: rutinas, fuerza y movilidad",
    description: "Guías prácticas para entrenar en casa o en el gimnasio, mejorar tu fuerza, movilidad y resistencia con planes sostenibles.",
    icon: "💪",
    color: "from-orange-600 to-rose-700"
  },
  trabajo: {
    name: "Inglés para el Trabajo y Negocios: Guías Profesionales",
    description: "Domina el vocabulario profesional, prepara entrevistas internacionales y redacta emails efectivos para tu carrera global.",
    icon: "💼",
    color: "from-coral-600 to-peach-600"
  },
  viajes: {
    name: "Inglés para Viajar y Turismo: Guía de Supervivencia",
    description: "Todo lo que necesitas para moverte con confianza por el mundo: desde el aeropuerto hasta emergencias médicas.",
    icon: "✈️",
    color: "from-coral-600 to-peach-600"
  },
  examenes: {
    name: "Preparación de Exámenes Oficiales de Inglés: Guía",
    description: "Estrategias y recursos específicos para aprobar el Cambridge, TOEFL o IELTS con la mejor nota.",
    icon: "📝",
    color: "from-amber-600 to-amber-600"
  },
  metodos: {
    name: "Métodos de Aprendizaje de Inglés: Técnicas Efectivas",
    description: "Técnicas y estrategias efectivas basadas en la ciencia para aprender inglés más rápido.",
    icon: "🎯",
    color: "from-amber-600 to-orange-600"
  },
  seo: {
    name: "Cursos y Guías de Inglés por Niveles: Formación Completa",
    description: "Aprende con nuestras guías completas por niveles y cursos especializados para profesionales y viajeros.",
    icon: "🎓",
    color: "from-blue-600 to-indigo-600"
  },
  gramatica: {
    name: "Gramática Inglesa: Guía Completa de Tiempos y Reglas",
    description: "Domina las estructuras, tiempos verbales y reglas gramaticales con nuestras guías simplificadas.",
    icon: "📚",
    color: "from-indigo-600 to-blue-700"
  },
  vocabulario: {
    name: "Vocabulario y Expresiones en Inglés: Guía Temática",
    description: "Amplía tu léxico con listas de palabras, phrasal verbs y expresiones idiomáticas para cada situación.",
    icon: "🔤",
    color: "from-emerald-600 to-teal-700"
  },
  habilidades: {
    name: "Habilidades Lingüísticas: Speaking, Listening y Más",
    description: "Mejora tu Speaking, Listening, Reading y Writing con técnicas y ejercicios prácticos.",
    icon: "🗣️",
    color: "from-violet-600 to-purple-700"
  },
  "curso-a1": {
    name: "Curso de Inglés A1: Guías por Unidad",
    description: "Artículos explicativos del curso A1: gramática, vocabulario y práctica unidad a unidad, con ejemplos y ejercicios.",
    icon: "📗",
    color: "from-emerald-600 to-teal-700"
  },
  "curso-a2": {
    name: "Curso de Inglés A2: Guías por Unidad",
    description: "Artículos explicativos del curso A2: Past Simple, Present Perfect, comparativos, preposiciones y más, unidad a unidad.",
    icon: "📘",
    color: "from-sky-600 to-indigo-700"
  },
  "curso-b1": {
    name: "Curso de Inglés B1: Guías por Unidad",
    description: "Artículos explicativos del curso B1: Present Perfect Continuous, Past Perfect, condicionales, pasiva y más, unidad a unidad.",
    icon: "📙",
    color: "from-amber-600 to-orange-700"
  },
  "curso-b2": {
    name: "Curso de Inglés B2: Guías por Unidad",
    description: "Artículos explicativos del curso B2 (Cambridge FCE): futuros avanzados, gerundios, wish, conditionals mixtos y más, unidad a unidad.",
    icon: "📕",
    color: "from-rose-600 to-red-700"
  },
  "curso-c1": {
    name: "Curso de Inglés C1: Guías por Unidad",
    description: "Artículos explicativos del curso C1: gramática avanzada, vocabulario preciso y práctica unidad a unidad.",
    icon: "📓",
    color: "from-slate-600 to-slate-800"
  },
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category: rawCategory } = await params;
  const { page: pageRaw } = await searchParams;
  const category = normalizeCategory(decodeURIComponent(rawCategory));
  const page = parsePageParam(pageRaw);
    
  if (!isPublicArticleCategory(category)) {
    notFound();
  }

  const meta = categoryMetadata[category] || {
    name: category.charAt(0).toUpperCase() + category.slice(1),
    description: `Artículos y guías sobre ${category}.`,
    icon: "📄",
    color: "from-slate-600 to-slate-800",
  };

  // Pagination is Disallow in robots.txt (crawl budget). Canonical stays on page 1.
  const canonicalPath = `/blog/${category}`;
  const canonical = getAbsoluteUrl(canonicalPath);
  const og = ogImageMeta(meta.name, getCategoryOgImagePath(category));
  const title = `${optimizeSEOTitle(meta.name)} | Blog ${SITE_BRAND_NAME}`;

  return {
    title,
    description: meta.description,
    keywords: [
      getPublicCategoryLabel(category).name.toLowerCase(),
      "artículos",
      "guías prácticas",
    ],
    alternates: {
      canonical,
      languages: languageAlternates(canonical),
      types:
        page > 1
          ? undefined
          : { "text/markdown": llmMarkdownUrl(`/blog/${category}`) },
    },
    openGraph: {
      title,
      description: meta.description,
      type: "website",
      locale: "es_ES",
      url: canonical,
      siteName: SITE_BRAND_NAME,
      images: og.images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: meta.description,
      images: og.twitterImages,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category: rawCategory } = await params;
  const { page: pageRaw } = await searchParams;
  
  // Normalize category to handle accents (e.g., gramática -> gramatica)
  const category = normalizeCategory(decodeURIComponent(rawCategory));
  const page = parsePageParam(pageRaw);

  if (!isPublicArticleCategory(category)) {
    notFound();
  }

  const { articles, total, pages } = await listPublishedArticles({
    category,
    page,
    limit: ARTICLES_PER_PAGE,
  });
  const meta = categoryMetadata[category] || {
    name: category.charAt(0).toUpperCase() + category.slice(1),
    description: `Artículos y guías sobre ${category}.`,
    icon: "📄",
    color: "from-slate-600 to-slate-800"
  };

  const canonicalPath = `/blog/${category}`;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: getSiteUrl() },
    { name: "Blog", url: getAbsoluteUrl("/blog") },
    { name: meta.name, url: getAbsoluteUrl(`/blog/${category}`) },
  ]);
  const collectionSchema = generateCollectionPageSchema({
    name: meta.name,
    description: meta.description,
    url: getAbsoluteUrl(canonicalPath),
    image: getCategoryOgImagePath(category),
    numberOfItems: total,
    articles: articles.map((article) => ({
      title: article.title,
      url: getAbsoluteUrl(`/blog/${normalizeCategory(article.category)}/${article.slug}`),
      datePublished: article.date,
    })),
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <Navigation />
      <main className="min-h-screen bg-slate-50">
        {/* Header Hero */}
        <section className={`relative pt-32 pb-20 overflow-hidden`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${meta.color} opacity-95`}></div>
          
          {/* Animated Background Blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <nav className="mb-12" aria-label="breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-white/70">
                <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
                <li>›</li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li>›</li>
                <li className="font-semibold text-white">{meta.name}</li>
              </ol>
            </nav>
            
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="text-8xl bg-white/20 p-8 rounded-[2rem] backdrop-blur-md shadow-2xl border border-white/20 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                {meta.icon}
              </div>
              <div className="text-center lg:text-left flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6 border border-white/30 backdrop-blur-sm">
                  <span>📚 Guía de Especialidad</span>
                </div>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-none">
                  {meta.name}
                </h1>
                <p className="text-xl sm:text-2xl text-white/90 max-w-3xl leading-relaxed font-medium">
                  {meta.description}
                </p>
                <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                    <span className="text-coral-300">✓</span> {total} Guías Prácticas
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                    <span className="text-coral-300">✓</span> Actualizado 2026
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <div className="max-w-7xl mx-auto">
            <Suspense
              fallback={
                <div className="mb-10 rounded-3xl border border-slate-200/80 bg-white p-8 text-center text-slate-500">
                  Cargando buscador…
                </div>
              }
            >
              <BlogSearchExplorer
                categories={[]}
                articleCount={total}
                forcedCategory={category}
                forcedCategoryLabel={
                  meta.name.split(":")[0]?.trim() || meta.name
                }
              />
            </Suspense>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {articles.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-xl text-slate-500">Aún no hay artículos en esta categoría. ¡Vuelve pronto!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <Link 
                    key={article.slug}
                    href={`/blog/${article.category}/${article.slug}`}
                    className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={getArticleOgImagePath(article)}
                        alt={article.alt || article.title}
                        fill
                        quality={70}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <span>📅 {new Date(article.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                        <span>•</span>
                        <span>⏱️ {article.readTime}</span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover:text-coral-600 transition-colors leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-coral-600 font-bold text-sm">
                        <span>Leer guía completa</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            
            <div className="mt-16 text-center">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-slate-600 font-bold hover:text-coral-600 transition-colors"
              >
                <span>← Volver a todas las categorías</span>
              </Link>
            </div>
            <ArticlePagination page={page} pages={pages} hrefBase={`/blog/${category}`} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
