import Link from "next/link";
import { SITE_BRAND_NAME } from "@/lib/site-brand";
import { ENGLISH_LEARNING_SECTIONS, SITE_VERTICALS } from "@/lib/site-catalog";

export function Footer() {
  return (
    <footer className="bg-slate-900 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-coral-500 to-peach-500 font-black text-white">L</div>
              <span className="text-xl font-black">{SITE_BRAND_NAME}</span>
            </div>
            <p className="max-w-sm text-sm text-slate-400">
              Revista de artículos prácticos sobre idiomas, alimentación y entrenamiento, más el archivo de guías para aprender inglés.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Temáticas</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {SITE_VERTICALS.map((vertical) => (
                <li key={vertical.slug}>
                  <Link href={vertical.href} className="transition-colors hover:text-white">
                    {vertical.name}
                  </Link>
                </li>
              ))}
              <li><Link href="/blog" className="transition-colors hover:text-white">Todos los artículos</Link></li>
            </ul>
            <h3 className="mb-4 mt-8 font-bold">Aprender inglés</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {ENGLISH_LEARNING_SECTIONS.slice(0, 6).map((section) => (
                <li key={section.slug}>
                  <Link href={section.href} className="transition-colors hover:text-white">
                    {section.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog/curso-a1" className="transition-colors hover:text-white">
                  Cursos A1–C1
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Sitio</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/sobre-nosotros" className="transition-colors hover:text-white">Sobre nosotros</Link></li>
              <li><Link href="/contacto" className="transition-colors hover:text-white">Contacto</Link></li>
              <li><Link href="/privacidad" className="transition-colors hover:text-white">Privacidad</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-400">
            © 2026 {SITE_BRAND_NAME}. Todos los derechos reservados. |{" "}
            <Link href="/privacidad" className="transition-colors hover:text-white">Privacidad</Link> |{" "}
            <Link href="/cookies" className="transition-colors hover:text-white">Cookies</Link> |{" "}
            <Link href="/terminos" className="transition-colors hover:text-white">Términos</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
