"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isPtBr = pathname?.startsWith("/pt-br") ?? false;
  const pathParts = pathname?.split("/").filter(Boolean) ?? [];
  const extractedBlogSlug = pathParts[0] === "blog" && pathParts.length >= 3
    ? pathParts[pathParts.length - 1]
    : null;

  const languageLinks = isPtBr
    ? {
        es: pathname === "/pt-br/blog" || pathname?.startsWith("/pt-br/blog/")
          ? "/blog"
          : pathname?.replace(/^\/pt-br/, "") || "/",
        pt: pathname || "/pt-br",
      }
    : {
        es: pathname || "/",
        pt: pathname === "/blog"
          ? "/pt-br/blog"
          : extractedBlogSlug
            ? `/pt-br/blog/${extractedBlogSlug}`
            : "/pt-br",
      };
  const spanishNavLinks = {
    phrases: "/frases-en-ingles",
    guides: "/aprender-ingles",
    grammar: "/blog/gramatica",
    vocabulary: "/vocabulario",
  };
  const navLinks = isPtBr
    ? { ...spanishNavLinks, blog: "/pt-br/blog" }
    : { ...spanishNavLinks, blog: "/blog" };

  return (
    <nav className="sticky top-0 z-[9998] bg-white/95 backdrop-blur-lg border-b-2 border-[#FFE8D9] shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={isPtBr ? "/pt-br" : "/"} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center text-white font-black text-xl shadow-coral transform group-hover:scale-110 transition-transform">
              F
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">Focus English</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href={navLinks.blog} className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors">
              Blog
            </Link>
            <Link href={navLinks.phrases} className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors">
              Frases
            </Link>
            <Link href={navLinks.guides} className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors">
              Guías
            </Link>
            <Link href={navLinks.grammar} className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors">
              Gramática
            </Link>
            <Link href={navLinks.vocabulary} className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors">
              Vocabulario
            </Link>
            <div className="flex items-center rounded-full border border-slate-200 bg-white p-1">
              <Link
                href={languageLinks.es}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${!isPtBr ? "bg-coral-100 text-coral-700" : "text-slate-600 hover:text-coral-600"}`}
              >
                ES
              </Link>
              <Link
                href={languageLinks.pt}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${isPtBr ? "bg-coral-100 text-coral-700" : "text-slate-600 hover:text-coral-600"}`}
              >
                PT
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-4">
              <Link 
                href={navLinks.blog} 
                className="text-sm font-bold text-coral-600 hover:text-coral-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                📰 Blog
              </Link>
              <Link 
                href={navLinks.phrases} 
                className="text-sm font-bold text-slate-700 hover:text-coral-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Frases
              </Link>
              <Link 
                href={navLinks.guides} 
                className="text-sm font-bold text-slate-700 hover:text-coral-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Guías
              </Link>
              <Link 
                href={navLinks.grammar} 
                className="text-sm font-bold text-slate-700 hover:text-coral-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gramática
              </Link>
              <Link 
                href={navLinks.vocabulary} 
                className="text-sm font-bold text-slate-700 hover:text-coral-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Vocabulario
              </Link>
              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-500 mb-2">Idioma</p>
                <div className="flex gap-2">
                  <Link
                    href={languageLinks.es}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${!isPtBr ? "bg-coral-100 text-coral-700" : "bg-slate-100 text-slate-700"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Español
                  </Link>
                  <Link
                    href={languageLinks.pt}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${isPtBr ? "bg-coral-100 text-coral-700" : "bg-slate-100 text-slate-700"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Português
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
