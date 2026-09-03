import { Navigation } from "@/components/sections/Navigation";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSEOPageBySlug } from "@/lib/seo";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from "next";
import { BreadcrumbSchema } from "@/app/schema";
import { ChevronRight, Home, Smartphone, GraduationCap, Briefcase, Plane, Sparkles, Star, MessageCircle, BookOpen } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const page = getSEOPageBySlug("hub");
  
  if (!page) return { title: "Aprender Inglés" };

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: page.canonical || 'https://linguafly.app/aprender-ingles',
    },
  };
}

export default function SEOHubPage() {
  const page = getSEOPageBySlug("hub");

  if (!page) {
    notFound();
  }

  const MarkdownComponents = {
    h1: ({ ...props }: React.ComponentPropsWithoutRef<'h1'>) => <h1 className="font-display text-4xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight" {...props} />,
    h2: ({ ...props }: React.ComponentPropsWithoutRef<'h2'>) => <h2 className="font-display text-3xl font-black text-slate-900 mt-12 mb-6 border-b border-slate-100 pb-4" {...props} />,
    h3: ({ ...props }: React.ComponentPropsWithoutRef<'h3'>) => <h3 className="font-display text-2xl font-bold text-slate-900 mt-8 mb-4" {...props} />,
    p: ({ ...props }: React.ComponentPropsWithoutRef<'p'>) => <p className="text-slate-700 text-lg leading-relaxed mb-6" {...props} />,
    ul: ({ ...props }: React.ComponentPropsWithoutRef<'ul'>) => <ul className="list-disc ml-6 mb-6 space-y-3 text-slate-700 text-lg" {...props} />,
    li: ({ ...props }: React.ComponentPropsWithoutRef<'li'>) => <li className="pl-2" {...props} />,
    strong: ({ ...props }: React.ComponentPropsWithoutRef<'strong'>) => <strong className="font-bold text-slate-900" {...props} />,
    a: ({ ...props }: React.ComponentPropsWithoutRef<'a'>) => <a className="text-coral-600 font-bold hover:underline" {...props} />,
  };

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-slate-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-12 text-sm font-medium text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="flex items-center gap-1 hover:text-coral-600 transition-colors">
              <Home className="w-4 h-4" />
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            <span className="text-slate-900 font-bold">Aprender Inglés</span>
          </nav>

          {/* Hero Section */}
          <header className="mb-16 bg-white rounded-[3rem] p-8 lg:p-16 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-coral-50/30 to-transparent pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-50 text-coral-600 font-bold text-sm mb-6 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  Hub de Recursos Gratuitos
                </div>
                <h1 className="font-display text-4xl lg:text-7xl font-black text-slate-900 mb-8 leading-tight">
                  Guía Maestra para <span className="text-coral-600 text-shadow-sm">Aprender Inglés</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
                  Todo lo que necesitas para mejorar tu inglés con recursos editoriales: guías, frases, vocabulario y estrategias prácticas.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/blog" className="bg-coral-600 text-white px-8 py-5 rounded-2xl font-black text-lg hover:bg-coral-700 transition-all hover:scale-105 shadow-xl shadow-coral-200">
                    Explorar Blog
                  </Link>
                  <Link href="/frases-en-ingles" className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-5 rounded-2xl font-black text-lg hover:border-coral-600 hover:text-coral-600 transition-all">
                    Ver Frases
                  </Link>
                </div>
              </div>
              <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-3">
                <Image 
                  src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg"
                  alt="Aprender inglés con Focus English"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </header>

          {/* Pillar Topics Grid */}
          <section className="mb-20">
            <h2 className="text-3xl font-black text-slate-900 mb-10 text-center lg:text-left">Explora por Categoría</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/niveles-ingles-a1-c2" className="group bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-coral-200 hover:shadow-xl hover:shadow-coral-50 transition-all">
                <div className="w-14 h-14 bg-coral-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-8 h-8 text-coral-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">Niveles A1-C2</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">Guía completa de lo que necesitas saber en cada nivel CEFR.</p>
                <span className="text-coral-600 font-bold text-sm inline-flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                  Ver currículo <ChevronRight className="w-4 h-4" />
                </span>
              </Link>

              <Link href="/aplicaciones-para-aprender-ingles" className="group bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">Mejores Aplicaciones</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">Análisis honesto de las apps que funcionan en 2026.</p>
                <span className="text-blue-600 font-bold text-sm inline-flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                  Ver guía completa <ChevronRight className="w-4 h-4" />
                </span>
              </Link>

              <Link href="/frases-en-ingles" className="group bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-50 transition-all">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">Frases en Inglés</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">Guía maestra de frases útiles categorizadas por temática.</p>
                <span className="text-purple-600 font-bold text-sm inline-flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                  Ver frases <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </div>

            {/* Blog por categoría: enlaces a pilares para SEO y autoridad */}
            <div className="mt-12 pt-12 border-t border-slate-200">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-coral-600" />
                Blog: guías por objetivo
              </h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/blog/trabajo" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-coral-50 text-coral-700 text-sm font-bold hover:bg-coral-100 transition-colors">
                  <Briefcase className="w-4 h-4" />
                  Inglés para el trabajo
                </Link>
                <Link href="/ingles-para-viajar" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 text-orange-700 text-sm font-bold hover:bg-orange-100 transition-colors border-2 border-orange-200">
                  <Plane className="w-4 h-4" />
                  Hub: inglés para viajar
                </Link>
                <Link href="/blog/viajes" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50/80 text-orange-800 text-sm font-bold hover:bg-orange-100 transition-colors">
                  <Plane className="w-4 h-4" />
                  Blog categoría viajes
                </Link>
                <Link href="/blog/examenes" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 text-amber-700 text-sm font-bold hover:bg-amber-100 transition-colors">
                  <GraduationCap className="w-4 h-4" />
                  Preparación exámenes
                </Link>
                <Link href="/blog/metodos" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-colors">
                  Métodos de estudio
                </Link>
                <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-slate-200 text-slate-700 text-sm font-bold hover:border-coral-300 hover:text-coral-600 transition-colors">
                  Ver todo el blog <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          <div className="max-w-4xl mx-auto">
            <article className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 lg:p-16 overflow-hidden">
              <div className="prose prose-slate prose-lg max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={MarkdownComponents}
                >
                  {page.content}
                </ReactMarkdown>
              </div>

              {/* FAQs Section */}
              {page.faqs && page.faqs.length > 0 && (
                <div className="mt-16 border-t border-slate-100 pt-16">
                  <h2 className="font-display text-3xl font-black text-slate-900 mb-10">Preguntas Frecuentes</h2>
                  <div className="space-y-8">
                    {page.faqs.map((faq, index) => (
                      <div key={index} className="group">
                        <h3 className="font-bold text-slate-900 text-xl mb-3 flex items-start gap-3">
                          <span className="text-coral-600">Q.</span>
                          {faq.question}
                        </h3>
                        <p className="text-slate-600 text-lg leading-relaxed pl-8 border-l-2 border-slate-100 group-hover:border-coral-200 transition-colors">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      </main>

      {/* Final CTA Footer */}
      <section className="bg-slate-900 py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Star className="w-12 h-12 text-coral-500 mx-auto mb-8" />
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">¿Qué tema quieres reforzar hoy?</h2>
          <p className="text-slate-400 text-xl mb-12">Accede a guías claras y artículos prácticos para resolver dudas reales de inglés.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog" className="bg-coral-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-coral-700 transition-all hover:scale-105 shadow-2xl shadow-coral-900/40">
              Ir al Blog
            </Link>
            <Link href="/frases-en-ingles" className="bg-transparent border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all">
              Ver Frases
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <BreadcrumbSchema 
        items={[
          { name: "Inicio", url: "/" },
          { name: "Aprender Inglés", url: "/aprender-ingles" }
        ]}
      />
      {page.faqs && page.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": page.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      )}
    </>
  );
}
