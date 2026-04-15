import Link from "next/link";
export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-coral-500 to-peach-500 rounded-xl flex items-center justify-center font-black text-white">
                F
              </div>
              <span className="text-xl font-black">Focus English</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm">
              Blog de contenido de calidad para resolver consultas de inglés con explicaciones claras y ejemplos prácticos.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-base">Temas</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/blog/gramatica" className="hover:text-white transition-colors">Gramática</Link></li>
              <li><Link href="/blog/vocabulario" className="hover:text-white transition-colors">Vocabulario</Link></li>
              <li><Link href="/blog/habilidades" className="hover:text-white transition-colors">Habilidades</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-base">Blog</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/blog/gramatica" className="hover:text-white transition-colors">Gramática</Link></li>
              <li><Link href="/blog/vocabulario" className="hover:text-white transition-colors">Vocabulario</Link></li>
              <li><Link href="/blog/pronunciacion" className="hover:text-white transition-colors">Pronunciación</Link></li>
              <li><Link href="/blog/metodos" className="hover:text-white transition-colors">Métodos de Estudio</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-base">Recursos</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/frases-en-ingles" className="hover:text-white transition-colors font-semibold text-coral-400">Hub de Frases</Link></li>
              <li><Link href="/ingles-para-viajar" className="hover:text-white transition-colors font-semibold text-orange-300">Inglés para viajar</Link></li>
              <li><Link href="/vocabulario" className="hover:text-white transition-colors">Vocabulario (megaglosario)</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog Principal</Link></li>
              <li><Link href="/aprender-ingles" className="hover:text-white transition-colors">Aprender Inglés</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-400">
            © 2026 Focus English. Todos los derechos reservados. | <Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link> | <Link href="/terminos" className="hover:text-white transition-colors">Términos</Link> | Hecho con 💜 en España
          </p>
        </div>
      </div>
    </footer>
  );
}
