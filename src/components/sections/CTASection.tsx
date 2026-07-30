import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-coral-600 via-peach-600 to-pink-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          ¿Listo Para Empezar?
        </h2>
        <p className="text-xl text-coral-100 mb-10 max-w-2xl mx-auto">
          Descubre tu nivel actual con nuestro test gratuito y recibe recomendaciones personalizadas. 
          Un método flexible diseñado para adaptarse a tu ritmo de vida.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/test-nivel"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-coral-600 font-black text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Hacer Test de Nivel Gratis
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          
          <Link 
            href="/aprender-ingles"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white font-black text-lg hover:bg-white hover:text-coral-600 transition-all"
          >
            Explorar niveles
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 text-white">
          <div>
            <div className="text-4xl font-black mb-2">90</div>
            <div className="text-coral-200">Días de Programa</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-2">18</div>
            <div className="text-coral-200">Niveles A1 a C2</div>
          </div>
        </div>
      </div>
    </section>
  );
}
