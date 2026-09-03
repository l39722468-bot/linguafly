import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";
import { phraseService } from "@/lib/phrases";
import { ChevronRight, Home, Sparkles, Heart, Instagram, Plane, Zap, BookOpen, Star, type LucideIcon } from "lucide-react";
import { Metadata } from "next";
import { SITE_BRAND_NAME } from "@/lib/site-brand";

export const metadata: Metadata = {
  title: `Frases en inglés: guía por categorías | ${SITE_BRAND_NAME}`,
  description: "Descubre frases en inglés útiles para viajes, amor, Instagram y conversaciones diarias. Incluyen traducción, contexto y audio para mejorar tu fluidez.",
  keywords: ["frases en ingles", "frases en ingles cortas", "frases para instagram ingles", "frases de amor en ingles"],
  alternates: {
    canonical: 'https://linguafly.app/frases-en-ingles',
  },
};

const iconMap: Record<string, LucideIcon> = {
  amor: Heart,
  instagram: Instagram,
  viajes: Plane,
  motivacion: Zap,
  gramatica: BookOpen,
};

const colorMap: Record<string, string> = {
  amor: "bg-pink-50 text-pink-600 border-pink-100 hover:border-pink-200 hover:shadow-pink-50",
  instagram: "bg-purple-50 text-purple-600 border-purple-100 hover:border-purple-200 hover:shadow-purple-50",
  viajes: "bg-blue-50 text-blue-600 border-blue-100 hover:border-blue-200 hover:shadow-blue-50",
  motivacion: "bg-amber-50 text-amber-600 border-amber-100 hover:border-amber-200 hover:shadow-amber-50",
  gramatica: "bg-emerald-50 text-emerald-600 border-emerald-100 hover:border-emerald-200 hover:shadow-emerald-50",
};

export default async function PhrasesHubPage() {
  const categories = await phraseService.getAllCategories();

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
            <Link href="/aprender-ingles" className="hover:text-coral-600 transition-colors">
              Aprender Inglés
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            <span className="text-slate-900 font-bold">Frases en Inglés</span>
          </nav>

          {/* Hero Section */}
          <header className="mb-16 bg-white rounded-[3rem] p-8 lg:p-16 border border-slate-100 shadow-sm relative overflow-hidden text-center lg:text-left">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-coral-50/20 to-transparent pointer-events-none"></div>
            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-50 text-coral-600 font-bold text-sm mb-6 uppercase tracking-wider mx-auto lg:mx-0">
                <Sparkles className="w-4 h-4" />
                Diccionario de Frases Útiles
              </div>
              <h1 className="font-display text-4xl lg:text-7xl font-black text-slate-900 mb-8 leading-tight">
                Las Mejores <span className="text-coral-600">Frases en Inglés</span> para toda Ocasión
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-10">
                Ya sea para tus redes sociales, un viaje de negocios o para conquistar a alguien, hemos recopilado y traducido las frases más impactantes para que hables con confianza.
              </p>
            </div>
          </header>

          {/* Categories Grid */}
          <section className="mb-20">
            <h2 className="text-3xl font-black text-slate-900 mb-10 text-center lg:text-left flex items-center gap-3 justify-center lg:justify-start">
              Explora por Temática
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => {
                const Icon = iconMap[category.slug] || Star;
                const colors = colorMap[category.slug] || "bg-slate-50 text-slate-600 border-slate-100";
                
                return (
                  <Link 
                    key={category.slug} 
                    href={`/frases-en-ingles/${category.slug}`}
                    className={`group bg-white p-8 rounded-[2.5rem] border transition-all hover:shadow-xl ${colors.split(' ').slice(2).join(' ')}`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${colors.split(' ').slice(0, 2).join(' ')}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{category.h1_title || category.title}</h3>
                    <p className="text-slate-500 text-lg leading-relaxed mb-6 line-clamp-2">
                      {category.description}
                    </p>
                    <span className="text-coral-600 font-bold text-sm inline-flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                      Ver todas las frases <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* SEO Content Section */}
          <section className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 lg:p-16 border border-slate-100 shadow-sm">
            <div className="prose prose-slate prose-lg max-w-none">
              <h2 className="font-display text-3xl font-black text-slate-900 mb-6">¿Por qué aprender frases hechas en inglés?</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Dominar frases completas en lugar de palabras sueltas es el "hack" más rápido para sonar como un nativo. En **Focus English**, no solo te damos la traducción literal, sino el contexto cultural necesario para que sepas exactamente cuándo y cómo usar cada expresión.
              </p>
              <ul className="list-disc ml-6 mb-8 space-y-3 text-slate-600">
                <li><strong>Fluidez inmediata</strong>: Al memorizar frases, no tienes que pensar en la gramática sobre la marcha.</li>
                <li><strong>Pronunciación natural</strong>: Escucha el audio de cada frase para captar la entonación real.</li>
                <li><strong>Contexto real</strong>: Frases filtradas por situaciones cotidianas y profesionales.</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
