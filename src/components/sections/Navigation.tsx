"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_BRAND_NAME } from "@/lib/site-brand";
import { HtmlLang } from "@/components/seo/HtmlLang";

const ENGLISH_CATEGORIES = [
  { label: "Gramática", href: "/blog/gramatica" },
  { label: "Viajes", href: "/blog/viajes" },
  { label: "Trabajo", href: "/blog/trabajo" },
  { label: "Exámenes", href: "/blog/examenes" },
  { label: "Métodos", href: "/blog/metodos" },
  { label: "Habilidades", href: "/blog/habilidades" },
  { label: "Vocabulario", href: "/blog/vocabulario" },
] as const;

const ENGLISH_LEVELS = [
  { label: "A1", href: "/curso-a1" },
  { label: "A2", href: "/curso-a2" },
  { label: "B1", href: "/curso-b1" },
  { label: "B2", href: "/curso-b2" },
  { label: "C1", href: "/curso-c1" },
  { label: "C2", href: "/curso-c2" },
] as const;

const linkClass = "text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-[9998] bg-white/95 backdrop-blur-lg border-b-2 border-[#FFE8D9] shadow-sm">
      <HtmlLang lang="es" />
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center min-h-16 py-1">
          <Link href="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center text-white font-black text-xl shadow-coral transform group-hover:scale-110 transition-transform">
              L
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">
              {SITE_BRAND_NAME}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-5">
            <Link href="/" className={linkClass}>Inicio</Link>
            <details className="relative group">
              <summary className={`${linkClass} cursor-pointer list-none`}>Idiomas</summary>
              <div className="absolute left-1/2 top-full z-10 mt-4 w-72 -translate-x-1/2 rounded-2xl border border-[#FFE8D9] bg-white p-4 shadow-xl">
                <Link href="/blog" className="mb-3 block font-black text-[#FF6B6B]">
                  Inglés
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  {ENGLISH_CATEGORIES.map((category) => (
                    <Link key={category.href} href={category.href} className={linkClass}>
                      {category.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <span className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">Niveles</span>
                  <div className="flex flex-wrap gap-2">
                    {ENGLISH_LEVELS.map((level) => (
                      <Link key={level.href} href={level.href} className="rounded-full bg-[#FFF4ED] px-3 py-1 text-xs font-black text-[#FF6B6B]">
                        {level.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </details>
            <Link href="/fitness" className={linkClass}>Fitness</Link>
            <Link href="/test-nivel" className="rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] px-4 py-2 text-xs font-black text-white hover:opacity-90">
              Test de nivel
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-lg p-2 hover:bg-slate-100 md:hidden"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-200 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link href="/" className={linkClass} onClick={closeMobileMenu}>Inicio</Link>
              <div>
                <span className="mb-2 block font-black text-[#FF6B6B]">Idiomas · Inglés</span>
                <div className="grid grid-cols-2 gap-3">
                  {ENGLISH_CATEGORIES.map((category) => (
                    <Link key={category.href} href={category.href} className={linkClass} onClick={closeMobileMenu}>
                      {category.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ENGLISH_LEVELS.map((level) => (
                    <Link key={level.href} href={level.href} className="rounded-full bg-[#FFF4ED] px-3 py-1 text-xs font-black text-[#FF6B6B]" onClick={closeMobileMenu}>
                      {level.label}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/fitness" className={linkClass} onClick={closeMobileMenu}>Fitness</Link>
              <Link href="/test-nivel" className={linkClass} onClick={closeMobileMenu}>Test de nivel</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
