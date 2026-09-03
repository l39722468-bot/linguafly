import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { phraseService } from "@/lib/phrases";
import { PhraseCard } from "@/components/seo/PhraseCard";
import { ChevronRight, Home, ArrowLeft, MessageCircle, Info, Sparkles } from "lucide-react";
import { Metadata } from "next";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await phraseService.getCategoryBySlug(slug);
  
  if (!category) return { title: "Frases en Inglés" };

  return {
    title: category.title,
    description: category.description,
    keywords: category.keywords,
    alternates: {
      canonical: `https://linguafly.app/frases-en-ingles/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const categories = await phraseService.getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

const MarkdownComponents = {
  h2: ({ ...props }: React.ComponentPropsWithoutRef<'h2'>) => <h2 className="font-display text-2xl font-black text-slate-900 mt-10 mb-6" {...props} />,
  p: ({ ...props }: React.ComponentPropsWithoutRef<'p'>) => <p className="text-slate-600 text-lg leading-relaxed mb-4" {...props} />,
  strong: ({ ...props }: React.ComponentPropsWithoutRef<'strong'>) => <strong className="font-bold text-slate-900" {...props} />,
};

export default async function PhraseCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await phraseService.getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const phrases = await phraseService.getPhrasesByCategory(slug);

  const recommendations: Record<string, { title: string, href: string, description: string }> = {
    viajes: {
      title: "Guía de Inglés para Viajar",
      href: "/blog/viajes/ingles-para-viajar",
      description: "Resuelve las situaciones más comunes de viaje con expresiones útiles y ejemplos reales."
    },
    gramatica: {
      title: "Guía de Inglés Desde Cero",
      href: "/blog/metodos/ingles-a1",
      description: "Refuerza las bases del inglés con una ruta de estudio clara y progresiva."
    },
    default: {
      title: "Explorar más guías del blog",
      href: "/blog",
      description: "Amplía vocabulario y expresiones con más contenido práctico por temas."
    }
  };

  const recommended = recommendations[slug] || recommendations.default;

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-slate-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-8 text-sm font-medium text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="flex items-center gap-1 hover:text-coral-600 transition-colors">
              <Home className="w-4 h-4" />
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            <Link href="/frases-en-ingles" className="hover:text-coral-600 transition-colors">
              Frases en Inglés
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            <span className="text-slate-900 font-bold truncate">{category.h1_title || category.title}</span>
          </nav>

          <Link href="/frases-en-ingles" className="inline-flex items-center gap-2 text-coral-600 font-bold mb-8 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Volver al Hub
          </Link>

          {/* Category Header */}
          <header className="mb-12">
            <h1 className="font-display text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
              {category.h1_title || category.title}
            </h1>
            <div className="max-w-3xl prose prose-slate prose-lg">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                {category.content_top || category.description}
              </ReactMarkdown>
            </div>
          </header>

          {/* Quick Info Box (Contextual based on category) */}
          <div className="mb-12 p-6 bg-white rounded-[2rem] border border-coral-100 flex flex-col md:flex-row items-center gap-6 shadow-sm">
            <div className="w-16 h-16 bg-coral-50 rounded-2xl flex items-center justify-center shrink-0">
              <Info className="w-8 h-8 text-coral-600" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Guía de Uso</h3>
              <p className="text-slate-500">
                Haz clic en el botón de reproducción para escuchar la pronunciación exacta. Puedes copiar las frases directamente para usarlas en tus mensajes o redes sociales.
              </p>
            </div>
          </div>

          {/* Phrases Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {phrases.map((phrase) => (
              <PhraseCard key={phrase.id} phrase={phrase} />
            ))}
          </section>

          {/* FAQs & Extra Content */}
          {(category.content_bottom || (category.faqs && category.faqs.length > 0)) && (
            <footer className="max-w-4xl mx-auto">
              {category.content_bottom && (
                <div className="prose prose-slate prose-lg mb-16">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                    {category.content_bottom}
                  </ReactMarkdown>
                </div>
              )}

              {category.faqs && category.faqs.length > 0 && (
                <div className="bg-white rounded-[2.5rem] p-8 lg:p-16 border border-slate-100 shadow-sm">
                  <h2 className="font-display text-3xl font-black text-slate-900 mb-10 flex items-center gap-3">
                    <MessageCircle className="w-8 h-8 text-coral-600" />
                    Preguntas Frecuentes
                  </h2>
                  <div className="space-y-8">
                    {category.faqs.map((faq, index) => (
                      <div key={index} className="group">
                        <h3 className="font-bold text-slate-900 text-xl mb-3 flex items-start gap-3">
                          <span className="text-coral-600">Q.</span>
                          {faq.question}
                        </h3>
                        <p className="text-slate-600 text-lg leading-relaxed pl-8 border-l-2 border-slate-100 group-hover:border-coral-200 transition-colors">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </footer>
          )}

          {/* Cross-linking Recommendation */}
          <section className="mt-20 bg-slate-900 rounded-[3rem] p-8 lg:p-16 text-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-coral-500/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -ml-32 -mb-32"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-coral-400 font-bold text-sm mb-8 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Continuar Aprendiendo
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight">
                ¿Quieres ir más allá de las frases?
              </h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                {recommended.description}
              </p>
              <Link 
                href={recommended.href} 
                className="inline-flex items-center gap-3 bg-coral-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-coral-700 transition-all hover:scale-105 shadow-2xl shadow-coral-900/40"
              >
                {recommended.title}
                <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* Dynamic SEO Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Inicio",
                  "item": "https://linguafly.app/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Frases en Inglés",
                  "item": "https://linguafly.app/frases-en-ingles"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": category.title,
                  "item": `https://linguafly.app/frases-en-ingles/${slug}`
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": `Lista de ${category.h1_title || category.title}`,
              "description": category.description,
              "itemListElement": phrases.map((phrase, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Thing",
                  "name": phrase.phrase_en,
                  "description": phrase.phrase_es
                }
              }))
            },
            ...(category.faqs && category.faqs.length > 0 ? [{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": category.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            }] : [])
          ])
        }}
      />
    </>
  );
}
