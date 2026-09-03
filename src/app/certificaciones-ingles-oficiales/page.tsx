import { Navigation } from "@/components/sections/Navigation";
import Link from "next/link";
import Image from "next/image";
import { getSEOPageBySlug } from "@/lib/seo";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from "next";
import { ChevronRight, Home, GraduationCap, Globe, Award, CheckCircle2, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Certificaciones de Inglés Oficiales 2026: Guía Maestra Completa",
  description: "¿Qué examen de inglés es mejor para ti? Comparamos B2 First, IELTS y TOEFL. Descubre cuál necesitas para trabajar o estudiar en el extranjero.",
  keywords: ["certificaciones ingles oficiales", "b2 first vs ielts", "toefl vs ielts", "examenes ingles oficiales"],
  alternates: {
    canonical: 'https://linguafly.app/certificaciones-ingles-oficiales',
  },
};

export default function SEOCertificationsPage() {
  const page = getSEOPageBySlug("certificaciones-ingles");

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
    table: ({ ...props }: React.ComponentPropsWithoutRef<'table'>) => (
      <div className="overflow-x-auto my-8 border border-slate-100 rounded-2xl shadow-sm">
        <table className="min-w-full divide-y divide-slate-100 bg-white" {...props} />
      </div>
    ),
    thead: ({ ...props }: React.ComponentPropsWithoutRef<'thead'>) => <thead className="bg-slate-50" {...props} />,
    tbody: ({ ...props }: React.ComponentPropsWithoutRef<'tbody'>) => <tbody className="divide-y divide-slate-100" {...props} />,
    tr: ({ ...props }: React.ComponentPropsWithoutRef<'tr'>) => <tr className="hover:bg-slate-50/50 transition-colors" {...props} />,
    th: ({ ...props }: React.ComponentPropsWithoutRef<'th'>) => <th className="py-4 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider" {...props} />,
    td: ({ ...props }: React.ComponentPropsWithoutRef<'td'>) => <td className="py-4 px-4 text-slate-700" {...props} />,
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
            <Link href="/aprender-ingles" className="hover:text-coral-600 transition-colors">Aprender Inglés</Link>
            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            <span className="text-slate-900 font-bold">Certificaciones Oficiales</span>
          </nav>

          {/* Hero Section */}
          <header className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-sm mb-6 uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  Guía de Certificación 2026
                </div>
                <h1 className="font-display text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                  Consigue tu <span className="text-coral-600">Certificado Oficial</span> de Inglés
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Comparamos los exámenes más reconocidos del mundo para que elijas el que impulsará tu carrera o tus estudios internacionales.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Válido para Visados
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Reconocimiento Global
                  </div>
                </div>
              </div>
              <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-100 border-8 border-white">
                <Image 
                  src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg"
                  alt="Certificaciones de inglés oficiales"
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
                  <h2 className="text-3xl font-black text-slate-900 mb-8">Preguntas sobre Exámenes</h2>
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
                {/* Exam Prep Promo */}
                <div className="bg-gradient-to-br from-[#1A237E] to-[#283593] rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-200 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
                  <Star className="w-12 h-12 text-coral-400 mb-6" />
                  <h3 className="text-3xl font-black mb-6 leading-tight">¿Te preparas para un examen?</h3>
                  <p className="text-blue-50 mb-8 text-lg font-medium opacity-90">Nuestra plataforma incluye simulacros y ejercicios específicos para B2 First, C1 Advanced e IELTS.</p>
                  <Link 
                    href="/aprender-ingles"
                    className="block w-full text-center bg-coral-500 text-white px-8 py-5 rounded-2xl font-black text-xl hover:bg-coral-600 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-coral-900/20"
                  >
                    Empezar Ahora
                  </Link>
                </div>

                {/* Related Blog Article (Nuevo artículo creado) */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                  <h4 className="text-xl font-black text-slate-900 mb-6">Guías de Estudio</h4>
                  <Link href="/blog/examenes/preparar-b1-cambridge-por-cuenta-propia" className="group block p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-coral-200 transition-all">
                    <p className="text-base font-bold text-slate-900 group-hover:text-coral-600 transition-colors mb-2">Preparar B1 por libre</p>
                    <p className="text-sm text-slate-500 line-clamp-2 italic">Aprende cómo aprobar el PET de Cambridge sin ir a una academia.</p>
                  </Link>
                </div>

                {/* Related Routes */}
                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                  <h4 className="text-xl font-black text-slate-900 mb-6">Recursos Útiles</h4>
                  <div className="space-y-4">
                    <Link href="/blog/metodos/ingles-b2" className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 hover:border-coral-200 hover:shadow-md transition-all group">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-coral-500" />
                        <span className="font-bold text-slate-700 group-hover:text-slate-900">Curso B2 Online</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-coral-500" />
                    </Link>
                    <Link href="/aplicaciones-para-aprender-ingles" className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 hover:border-coral-200 hover:shadow-md transition-all group">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-coral-500" />
                        <span className="font-bold text-slate-700 group-hover:text-slate-900">Mejores Apps 2026</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-coral-500" />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Structured Data: FAQPage */}
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
      
      {/* Structured Data: Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://linguafly.app"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Aprender Inglés",
                "item": "https://linguafly.app/aprender-ingles"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Certificaciones Oficiales",
                "item": "https://linguafly.app/certificaciones-ingles-oficiales"
              }
            ]
          })
        }}
      />
    </>
  );
}
