"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_BRAND_NAME } from "@/lib/site-brand";
import { SITE_VERTICALS } from "@/lib/site-catalog";
import { HtmlLang } from "@/components/seo/HtmlLang";

const linkClass = "text-sm font-bold text-slate-700 hover:text-coral-600 transition-colors";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-[9998] border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-lg">
      <HtmlLang lang="es" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between py-1">
          <Link href="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-coral-500 to-peach-500 text-xl font-black text-white shadow-coral transition-transform group-hover:scale-110">
              L
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-coral-600 to-peach-600 bg-clip-text text-transparent">
              {SITE_BRAND_NAME}
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="/" className={linkClass}>Inicio</Link>
            {SITE_VERTICALS.map((vertical) => (
              <Link key={vertical.slug} href={vertical.href} className={linkClass}>
                {vertical.name}
              </Link>
            ))}
            <Link href="/blog" className="rounded-full bg-gradient-to-r from-coral-500 to-peach-500 px-4 py-2 text-xs font-black text-white hover:opacity-90">
              Artículos
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
              {SITE_VERTICALS.map((vertical) => (
                <Link key={vertical.slug} href={vertical.href} className={linkClass} onClick={closeMobileMenu}>
                  {vertical.icon} {vertical.name}
                </Link>
              ))}
              <Link href="/blog" className={linkClass} onClick={closeMobileMenu}>Artículos</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
