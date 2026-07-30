import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-coral-50 to-white pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-100 text-coral-700 font-bold text-sm mb-6">
            <span className="w-2 h-2 bg-coral-500 rounded-full animate-pulse"></span>
            🇪🇸 Cursos de inglés para España · Programas de 90 días
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
            Domina el Inglés por{" "}
            <span className="bg-gradient-to-r from-coral-600 to-peach-600 bg-clip-text text-transparent">
              Niveles (A1-C2)
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Cursos estructurados para estudiantes españoles. 
            Aprende inglés desde cero hasta la maestría con nuestro método adaptado al Marco Común Europeo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href="/test-nivel"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-coral-600 to-peach-600 text-white font-black text-lg hover:shadow-lg hover:scale-105 transition-all"
            >
              Hacer Test de Nivel Gratis
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link 
              href="/aprender-ingles"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-slate-200 bg-white text-slate-800 font-black text-lg hover:border-coral-200 hover:bg-coral-50 transition-all"
            >
              Ver todos los niveles
            </Link>
          </div>

          {/* Bloques de niveles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <Link 
              href="/curso-a1"
              className="group p-6 rounded-2xl border-2 border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-black text-lg mb-2">Principiante (A1-A2)</h3>
              <p className="text-sm text-slate-600">Construye una base sólida y comunícate en situaciones simples</p>
            </Link>

            <Link 
              href="/curso-b1"
              className="group p-6 rounded-2xl border-2 border-slate-200 bg-white hover:border-coral-300 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-coral-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-black text-lg mb-2">Intermedio (B1-B2)</h3>
              <p className="text-sm text-slate-600">Gana fluidez e independencia para expresarte con confianza</p>
            </Link>

            <Link 
              href="/curso-c1"
              className="group p-6 rounded-2xl border-2 border-slate-200 bg-white hover:border-purple-300 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">👑</span>
              </div>
              <h3 className="font-black text-lg mb-2">Avanzado (C1-C2)</h3>
              <p className="text-sm text-slate-600">Alcanza la maestría y precisión de un hablante experto</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
