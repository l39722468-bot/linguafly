import Link from "next/link";
import Image from "next/image";

interface HomeBelowFoldProps {
  latestArticles: Array<{
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    image?: string;
    readTime?: string;
  }>;
}

export function HomeBelowFold({ latestArticles }: HomeBelowFoldProps) {
  return (
    <>
      <section id="contenido" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white" style={{ contentVisibility: 'auto' } as React.CSSProperties}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Explora por tipo de consulta</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Encuentra contenido según la duda que quieres resolver</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: "/blog/gramatica", title: "Gramática", desc: "Tiempos verbales, estructuras y reglas clave.", icon: "📚" },
              { href: "/blog/vocabulario", title: "Vocabulario", desc: "Palabras, expresiones y uso por contexto.", icon: "🗣️" },
              { href: "/frases-en-ingles", title: "Frases", desc: "Frases útiles por situaciones reales.", icon: "💬" },
              { href: "/blog/habilidades", title: "Habilidades", desc: "Speaking, listening, reading y writing.", icon: "🎧" },
              { href: "/blog/metodos", title: "Métodos", desc: "Estrategias para estudiar mejor.", icon: "🎯" },
              { href: "/blog/temas/ingles-para-trabajo", title: "Trabajo", desc: "Consultas de inglés profesional.", icon: "💼" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50" style={{ contentVisibility: 'auto' } as React.CSSProperties}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-2">Blog y Recursos</h2>
              <p className="text-lg text-slate-600">Últimas guías para tu aprendizaje del inglés</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/blog/trabajo" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-50 text-coral-800 text-sm font-bold hover:bg-coral-100 transition-colors">💼 Trabajo</Link>
                <Link href="/blog/viajes" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-800 text-sm font-bold hover:bg-orange-100 transition-colors">✈️ Viajes</Link>
                <Link href="/blog/examenes" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-800 text-sm font-bold hover:bg-amber-100 transition-colors">📝 Exámenes</Link>
                <Link href="/blog/metodos" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-50 text-coral-800 text-sm font-bold hover:bg-coral-100 transition-colors">🎯 Métodos</Link>
                <Link href="/blog/gramatica" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold hover:bg-blue-100 transition-colors">📚 Gramática</Link>
                <Link href="/blog/vocabulario" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-800 text-sm font-bold hover:bg-amber-100 transition-colors">🗣️ Vocabulario</Link>
              </div>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 text-coral-800 font-bold hover:text-coral-900 transition-colors">
              <span>Explorar todo el blog</span>
              <span>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.category}/${article.slug}`} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all group flex flex-col h-full">
                {article.image && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 33vw" quality={70} className="object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-coral-100 text-coral-800 text-[10px] font-bold uppercase tracking-wider">{article.category}</span>
                    <span className="text-xs text-slate-500">{article.readTime}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-2 group-hover:text-coral-600 transition-colors tracking-tight leading-tight">{article.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-1">{article.excerpt}</p>
                  <div className="flex items-center gap-2 text-coral-800 font-bold text-sm">
                    <span>Leer más</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center md:hidden">
            <Link href="/blog" className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-slate-900 hover:border-coral-600 hover:text-coral-600 transition-all">
              Ver todas las guías
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-coral-600 via-peach-600 to-melon-700 text-white" style={{ contentVisibility: 'auto' } as React.CSSProperties}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-black mb-6 tracking-tight">¿Qué quieres consultar hoy?</h2>
          <p className="text-xl text-coral-100 mb-10 max-w-2xl mx-auto">Accede al blog, filtra por tema y encuentra respuestas claras para aprender inglés.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog" className="bg-coral-800 text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-coral-900 transition-all border-2 border-white/20">📚 Explorar Blog</Link>
            <Link href="/frases-en-ingles" className="bg-white text-coral-700 px-10 py-5 rounded-xl font-black text-lg hover:shadow-2xl hover:scale-105 transition-all shadow-md">💬 Ver Frases por Categoría</Link>
          </div>
        </div>
      </section>
    </>
  );
}
