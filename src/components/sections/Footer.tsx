import Link from "next/link";
import { SITE_BRAND_NAME } from "@/lib/site-brand";
import { HOME_PATHS } from "@/lib/site-locales";

export function Footer({ locale = "es" }: { locale?: "es" | "en" }) {
  const isEn = locale === "en";

  return (
    <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-coral-500 to-peach-500 rounded-xl flex items-center justify-center font-black text-white">
                L
              </div>
              <span className="text-xl font-black">{SITE_BRAND_NAME}</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm">
              {isEn
                ? "A Spanish course for English-speaking adults: theory guides and answered workbooks, aligned with DELE / Instituto Cervantes PCIC."
                : "Blog de contenido de calidad para resolver consultas de inglés con explicaciones claras y ejemplos prácticos."}
            </p>
            <p className="mt-4 text-sm text-slate-300">
              <Link href={HOME_PATHS.es} hrefLang="es" className="hover:text-white font-semibold">
                ES — Aprender inglés
              </Link>
              <span className="mx-2 text-slate-600">·</span>
              <Link href={HOME_PATHS.en} hrefLang="en" className="hover:text-white font-semibold">
                EN — Learn Spanish
              </Link>
            </p>
          </div>

          {isEn ? (
            <>
              <div>
                <h3 className="font-bold mb-4 text-base">Course</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link href="/blog/curso-espanol-a1" className="hover:text-white transition-colors">Spanish A1</Link></li>
                  <li><Link href="/blog/curso-espanol-a1/unidad-1-greetings-names-ser" className="hover:text-white transition-colors">Unit 1 theory</Link></li>
                  <li><Link href="/blog/curso-espanol-a1/unidad-1-greetings-names-ser-ejercicios-soluciones" className="hover:text-white transition-colors">Unit 1 workbook</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-4 text-base">Levels</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link href="/en#levels" className="hover:text-white transition-colors">A1–C2 overview</Link></li>
                  <li><Link href={HOME_PATHS.es} hrefLang="es" className="hover:text-white transition-colors">Spanish home (learn English)</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-4 text-base">Site</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link href="/sobre-nosotros" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/contacto" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
            </>
          ) : (
            <>
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
                  <li><Link href="/sobre-nosotros" className="hover:text-white transition-colors">Sobre nosotros</Link></li>
                  <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
                </ul>
              </div>
            </>
          )}
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-400">
            © 2026 {SITE_BRAND_NAME}. {isEn ? "All rights reserved." : "Todos los derechos reservados."} | <Link href="/privacidad" className="hover:text-white transition-colors">{isEn ? "Privacy" : "Privacidad"}</Link> | <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link> | <Link href="/terminos" className="hover:text-white transition-colors">{isEn ? "Terms" : "Términos"}</Link> | {isEn ? "Made with 💜 in Spain" : "Hecho con 💜 en España"}
          </p>
        </div>
      </div>
    </footer>
  );
}
