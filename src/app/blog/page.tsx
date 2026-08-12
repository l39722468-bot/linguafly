import { Suspense } from "react";
import { Navigation } from "@/components/sections/Navigation";
import { CourseLaunchBanner } from "@/components/CourseLaunchBanner";
import { BlogSearchExplorer } from "@/components/blog/BlogSearchExplorer";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getBlogArticles } from "@/lib/blog";
import { generateBreadcrumbSchema } from "@/lib/schemas";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAbsoluteUrl, getSiteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";

/** Estática: en Cloudflare Workers no hay fs; el contenido viene del JSON de cf:build. */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Blog de Inglés 2026: Guías Trabajo, Viajes y Exámenes | ${SITE_BRAND_NAME}`,
  description: "Guías prácticas de inglés para el trabajo, viajes y exámenes oficiales (Cambridge, IELTS, TOEFL). Métodos de estudio, gramática y vocabulario. Contenido actualizado por expertos.",
  keywords: [
    "blog inglés",
    "aprender inglés",
    "inglés profesional",
    "inglés para viajar",
    "inglés para el trabajo",
    "preparación exámenes oficiales",
    "gramática inglés",
    "métodos aprender inglés",
  ],
  alternates: {
    canonical: getAbsoluteUrl('/blog'),
  },
};

export default function BlogPage() {
  const articles = getBlogArticles();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: getSiteUrl() },
    { name: "Blog", url: getAbsoluteUrl("/blog") },
  ]);
  
  // Logic for featured article
  const featuredArticle = articles.find(a => a.featured) || articles[0];
  
  // Logic for dynamic categories
  const categoryMetadata: Record<string, { name: string, description: string, icon: string, color: string }> = {
    trabajo: {
      name: "Inglés para el Trabajo y Negocios: Guías Profesionales",
      description: "Guías y consejos para el inglés profesional y empresarial",
      icon: "💼",
      color: "from-coral-600 to-peach-600"
    },
    viajes: {
      name: "Inglés para Viajar y Turismo: Guía de Supervivencia",
      description: "Inglés práctico para tus aventuras internacionales",
      icon: "✈️",
      color: "from-coral-600 to-peach-600"
    },
    examenes: {
      name: "Preparación de Exámenes Oficiales de Inglés: Guía",
      description: "Estrategias y recursos para aprobar exámenes oficiales",
      icon: "📝",
      color: "from-amber-600 to-amber-600"
    },
    metodos: {
      name: "Métodos de Aprendizaje de Inglés: Técnicas Efectivas",
      description: "Técnicas y estrategias efectivas para aprender inglés",
      icon: "🎯",
      color: "from-amber-600 to-orange-600"
    },
    seo: {
      name: "Consultas Frecuentes de Inglés: Guías por Nivel y Contexto",
      description: "Resuelve dudas habituales con guías por nivel, ejemplos y recomendaciones prácticas.",
      icon: "🎓",
      color: "from-blue-600 to-indigo-600"
    },
    "material-estudio": {
      name: "Material de Estudio",
      description: "Guías completas y recursos estructurados para aprender inglés",
      icon: "📚",
      color: "from-blue-600 to-indigo-600"
    },
    gramatica: {
      name: "Gramática Inglesa: Guía Completa de Tiempos y Reglas",
      description: "Domina las estructuras y reglas gramaticales con nuestras guías simplificadas.",
      icon: "📚",
      color: "from-indigo-600 to-blue-700"
    },
    vocabulario: {
      name: "Vocabulario y Expresiones en Inglés: Guía Temática",
      description: "Amplía tu léxico con listas de palabras y expresiones idiomáticas.",
      icon: "🔤",
      color: "from-emerald-600 to-teal-700"
    },
    habilidades: {
      name: "Habilidades Lingüísticas: Speaking, Listening y Más",
      description: "Mejora tu Speaking, Listening, Reading y Writing con técnicas prácticas.",
      icon: "🗣️",
      color: "from-violet-600 to-purple-700"
    },
    "curso-a1": {
      name: "Curso A1: Guías por Unidad",
      description: "Artículos explicativos del curso A1, unidad a unidad.",
      icon: "📗",
      color: "from-emerald-600 to-teal-700"
    },
    "curso-a2": {
      name: "Curso A2: Guías por Unidad",
      description: "Artículos explicativos del curso A2, unidad a unidad.",
      icon: "📘",
      color: "from-sky-600 to-indigo-700"
    },
    "curso-b1": {
      name: "Curso B1: Guías por Unidad",
      description: "Artículos explicativos del curso B1, unidad a unidad.",
      icon: "📙",
      color: "from-amber-600 to-orange-700"
    }
  };

  const categoryFilterLabels: Record<string, string> = {
    trabajo: "Trabajo y negocios",
    viajes: "Viajes",
    examenes: "Exámenes",
    metodos: "Métodos de aprendizaje",
    seo: "Consultas por nivel",
    "material-estudio": "Material de estudio",
    gramatica: "Gramática",
    vocabulario: "Vocabulario",
    habilidades: "Habilidades (speaking, listening…)",
    "curso-a1": "Curso A1",
    "curso-a2": "Curso A2",
    "curso-b1": "Curso B1",
  };

  const searchCategoryOptions = Array.from(
    new Set(articles.map((a) => a.category.toLowerCase()))
  )
    .sort()
    .map((slug) => ({
      slug,
      label:
        categoryFilterLabels[slug] ||
        categoryMetadata[slug]?.name?.split(":")[0]?.trim() ||
        slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
    }));

  const categories = Array.from(new Set(articles.map(a => a.category))).map(rawCatSlug => {
    const catSlug = rawCatSlug.toLowerCase();
    const meta = categoryMetadata[catSlug] || {
      name: catSlug.charAt(0).toUpperCase() + catSlug.slice(1),
      description: `Artículos sobre ${catSlug}`,
      icon: "📄",
      color: "from-slate-600 to-slate-800"
    };
    
    return {
      ...meta,
      slug: catSlug,
      articles: articles.filter(a => a.category === catSlug).slice(0, 3) // Show latest 3 per category
    };
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navigation />
      <CourseLaunchBanner />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        
        {/* Featured Guide - Hero Section */}
        {featuredArticle && (
          <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-coral-50 via-peach-50 to-melon-50">
              <div className="absolute top-20 right-20 w-72 h-72 bg-coral-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute bottom-20 left-20 w-72 h-72 bg-peach-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-coral-500 to-peach-500 text-white text-sm font-bold shadow-lg">
                  <span className="animate-pulse">⭐</span>
                  <span>ARTÍCULO DESTACADO</span>
                  <span className="animate-pulse">⭐</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-coral-100 text-coral-800 text-xs font-bold uppercase tracking-wide">
                        {featuredArticle.category}
                      </span>
                      <span className="text-slate-500 text-sm">
                        📅 {new Date(featuredArticle.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>

                    <h1 className="font-display text-3xl lg:text-4xl font-black text-slate-900 mb-4 leading-tight tracking-tight">
                      {featuredArticle.title}
                    </h1>

                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="flex gap-6 mb-8 pb-8 border-b border-slate-200">
                      <div>
                        <div className="text-2xl font-black text-amber-700">{featuredArticle.readTime}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide">Lectura</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-coral-700">{featuredArticle.author}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide">Autor</div>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredArticle.category}/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-coral-500 to-peach-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                      <span>Leer Artículo</span>
                      <span className="text-xl">→</span>
                    </Link>
                  </div>

                  <div className="bg-gradient-to-br from-coral-500 via-peach-500 to-melon-500 relative overflow-hidden min-h-[300px] lg:min-h-full">
                    {featuredArticle.image ? (
                      <>
                        <Image
                          src={featuredArticle.image}
                          alt={featuredArticle.alt || featuredArticle.title}
                          fill
                          quality={70}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover mix-blend-overlay opacity-60"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      </>
                    ) : null}
                    <div className="relative z-10 p-8 lg:p-12 flex flex-col items-center justify-center h-full text-center text-white">
                      <div className="text-6xl mb-6 drop-shadow-lg">📚</div>
                      <div className="font-display text-2xl font-black mb-4 drop-shadow-md">Contenido de Calidad</div>
                      <div className="text-white/90 mb-8 max-w-xs mx-auto drop-shadow-sm font-medium">
                        Aprende con los mejores recursos gratuitos de Linguafly
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="px-4 sm:px-6 lg:px-8 pt-4 pb-0">
          <div className="max-w-7xl mx-auto">
            <Suspense
              fallback={
                <div className="mb-14 rounded-3xl border border-slate-200/80 bg-white p-8 text-center text-slate-500">
                  Cargando buscador…
                </div>
              }
            >
              <BlogSearchExplorer
                categories={searchCategoryOptions}
                articleCount={articles.length}
              />
            </Suspense>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                Explora por Categorías
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Encuentra el contenido perfecto según tu objetivo de aprendizaje
              </p>
            </div>
            
            {articles.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-xl text-slate-500">Próximamente publicaremos nuevos artículos...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
                  <div key={category.slug} className="flex flex-col">
                    <div className={`p-6 rounded-t-3xl bg-gradient-to-br ${category.color} text-white`}>
                      <div className="text-4xl mb-4">{category.icon}</div>
                      <h3 className="text-2xl font-black mb-2">{category.name}</h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    
                    <div className="flex-1 bg-white border-x-2 border-b-2 border-slate-100 rounded-b-3xl p-6 shadow-sm">
                      <div className="space-y-6">
                        {category.articles.map((article) => (
                          <Link 
                            key={article.slug}
                            href={`/blog/${article.category}/${article.slug}`}
                            className="group block"
                          >
                            {article.image && (
                              <div className="relative h-40 w-full mb-4 rounded-xl overflow-hidden shadow-sm">
                                <Image
                                  src={article.image}
                                  alt={article.alt || article.title}
                                  fill
                                  quality={70}
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            )}
                            <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                              <span>📅 {new Date(article.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                              <span>•</span>
                              <span>⏱️ {article.readTime}</span>
                            </div>
                            <h4 className="font-bold text-slate-900 group-hover:text-coral-600 transition-colors leading-snug mb-2">
                              {article.title}
                            </h4>
                            <p className="text-sm text-slate-600 line-clamp-2">
                              {article.excerpt}
                            </p>
                          </Link>
                        ))}
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-slate-100">
                        <Link 
                          href={`/blog/${category.slug}`} 
                          className="text-sm font-bold text-coral-600 hover:text-coral-700 transition-colors flex items-center gap-2"
                        >
                          <span>Ver todos los artículos de {category.name}</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
