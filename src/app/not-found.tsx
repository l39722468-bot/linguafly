import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada | Linguafly",
  description: "Lo sentimos, la página que buscas no existe o ha sido movida.",
};

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center pt-32 pb-20 px-4">
        <div className="max-w-3xl w-full text-center">
          {/* Animated background elements (mini version) */}
          <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-coral-500 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="relative z-10">
            <span className="text-9xl font-black text-coral-100 mb-8 block select-none">404</span>
            
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Oops! Te has salido de la ruta
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              La página que buscas no existe o ha sido movida. Pero no te preocupes, hay muchas formas de seguir mejorando tu inglés.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-4 bg-coral-600 text-white font-black rounded-xl hover:bg-coral-700 transition-all hover:scale-105 shadow-lg shadow-coral-100"
              >
                Volver al Inicio
              </Link>
              
              <Link
                href="/blog"
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-black rounded-xl border-2 border-slate-200 hover:border-coral-200 hover:text-coral-600 transition-all"
              >
                Explorar el Blog
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Link href="/blog/trabajo" className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <span className="text-3xl mb-3 block">💼</span>
                <h3 className="font-bold text-slate-900 group-hover:text-coral-600">Inglés Profesional</h3>
              </Link>
              
              <Link href="/blog/viajes" className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <span className="text-3xl mb-3 block">✈️</span>
                <h3 className="font-bold text-slate-900 group-hover:text-coral-600">Inglés para Viajar</h3>
              </Link>
              
              <Link href="/blog/examenes" className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <span className="text-3xl mb-3 block">📝</span>
                <h3 className="font-bold text-slate-900 group-hover:text-coral-600">Exámenes Oficiales</h3>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
