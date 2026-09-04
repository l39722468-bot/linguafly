import { Navigation } from "@/components/sections/Navigation";
import Link from "next/link";
import Image from "next/image";
import { getSEOPageBySlug } from "@/lib/seo";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from "next";
import { SEOComparisonTable } from "@/components/sections/SEOComparisonTable";
import { ChevronRight, Home, Star, Zap, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Mejores Aplicaciones para Aprender Inglés 2026: Guía Comparativa",
  description: "Ranking actualizado de las mejores aplicaciones para aprender inglés este año. Comparativa honesta de apps gratis, con IA y para trabajar. ¡Elige la tuya!",
  keywords: ["aplicaciones para aprender ingles", "mejores apps ingles gratis", "apps para aprender ingles 2026", "aprender ingles rapido app"],
  alternates: {
    canonical: 'https://linguafly.app/aplicaciones-para-aprender-ingles',
  },
};

export default function SEOAppsPage() {
  const page = getSEOPageBySlug("aplicaciones-ingles");

  if (!page) {
    return <div>Content not found</div>;
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
    table: () => <SEOComparisonTable />, // Replace markdown table with our custom component
  };

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-12 text-sm font-medium text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="flex items-center gap-1 hover:text-coral-600 transition-colors">
              <Home className="w-4 h-4" />
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            <span className="text-slate-900 font-bold">Aplicaciones para Aprender Inglés</span>
          </nav>

          {/* Hero Section */}
          <header className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-50 text-coral-600 font-bold text-sm mb-6 uppercase tracking-wider">
                  <Star className="w-4 h-4 fill-coral-600" />
                  Guía Experta 2026
                </div>
                <h1 className="font-display text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                  Las 10 Mejores <span className="text-coral-600">Aplicaciones</span> para Aprender Inglés
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Analizamos las herramientas que realmente funcionan para conseguir fluidez. Desde la gamificación hasta el poder de la Inteligencia Artificial.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Actualizado hoy
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> +50 Apps testeadas
                  </div>
                </div>
              </div>
              <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl shadow-coral-100 border-8 border-white">
                <Image 
                  src="https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg"
                  alt="Mejores aplicaciones para aprender inglés"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Main Content */}
            <article className="lg:col-span-8">
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
                <section className="mt-16 pt-16 border-t border-slate-100">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">Preguntas Frecuentes sobre Apps de Inglés</h2>
                  <div className="grid gap-6">
                    {page.faqs.map((faq, index) => (
                      <div key={index} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-md transition-shadow">
                        <h4 className="text-xl font-black text-slate-900 mb-4">{faq.question}</h4>
                        <p className="text-slate-600 text-lg leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Sidebar / CTA */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                {/* Promo Card */}
                <div className="bg-gradient-to-br from-coral-600 to-peach-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-coral-200 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
                  <Zap className="w-12 h-12 text-white/30 mb-6" />
                  <h3 className="text-3xl font-black mb-6 leading-tight">¿Cansado de &quot;jugar&quot; a aprender?</h3>
                  <p className="text-coral-50 mb-8 text-lg font-medium opacity-90">Únete a Linguafly y consigue fluidez real en 90 días con nuestro sistema guiado por IA.</p>
                  <Link 
                    href="/aprender-ingles"
                    className="block w-full text-center bg-white text-coral-600 px-8 py-5 rounded-2xl font-black text-xl hover:shadow-xl transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Prueba Gratis Ahora
                  </Link>
                  <p className="mt-6 text-center text-xs text-coral-100 font-bold uppercase tracking-widest">
                    Oferta Especial: 7 días acceso total
                  </p>
                </div>

                {/* Related Blog Articles (Nuevos artículos creados) */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                  <h4 className="text-xl font-black text-slate-900 mb-6">Lecturas Recomendadas</h4>
                  <div className="space-y-6">
                    <Link href="/blog/metodos/apps-ingles-gratuitas-vs-pago" className="group block">
                      <p className="text-base font-bold text-slate-900 group-hover:text-coral-600 transition-colors mb-1">Gratis vs. Pago: ¿Cuál elegir?</p>
                      <p className="text-sm text-slate-500 line-clamp-2 italic">Descubre si vale la pena invertir en tu fluidez en 2025.</p>
                    </Link>
                    <hr className="border-slate-50" />
                    <Link href="/blog/trabajo/vocabulario-negocios-ingles-esencial" className="group block">
                      <p className="text-base font-bold text-slate-900 group-hover:text-coral-600 transition-colors mb-1">Vocabulario de Negocios</p>
                      <p className="text-sm text-slate-500 line-clamp-2 italic">50 términos que impulsarán tu carrera profesional.</p>
                    </Link>
                    <hr className="border-slate-50" />
                    <Link href="/blog/examenes/preparar-b1-cambridge-por-cuenta-propia" className="group block">
                      <p className="text-base font-bold text-slate-900 group-hover:text-coral-600 transition-colors mb-1">Aprobar el B1 Solo</p>
                      <p className="text-sm text-slate-500 line-clamp-2 italic">Guía paso a paso para certificar tu nivel sin academia.</p>
                    </Link>
                  </div>
                </div>

                {/* Related Routes */}
                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                  <h4 className="text-xl font-black text-slate-900 mb-6">Cursos Destacados</h4>
                  <div className="space-y-4">
                    <Link href="/blog/trabajo/ingles-para-trabajo" className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 hover:border-coral-200 hover:shadow-md transition-all group">
                      <span className="font-bold text-slate-700 group-hover:text-slate-900">Inglés para Negocios</span>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-coral-500" />
                    </Link>
                    <Link href="/blog/viajes/ingles-para-viajar" className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 hover:border-coral-200 hover:shadow-md transition-all group">
                      <span className="font-bold text-slate-700 group-hover:text-slate-900">Inglés para Viajes</span>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-coral-500" />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Linguafly",
            "operatingSystem": "Web, iOS, Android",
            "applicationCategory": "EducationalApplication",
            "offers": {
              "@type": "Offer",
              "price": "6.99",
              "priceCurrency": "EUR"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "2500"
            }
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": page.faqs?.map(faq => ({
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
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Linguafly",
                "url": "https://linguafly.app"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Duolingo"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Babbel"
              }
            ]
          })
        }}
      />
    </>
  );
}
