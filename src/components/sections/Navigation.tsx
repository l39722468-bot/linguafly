"use client";

import Link from "next/link";
import { useState } from "react";

const COURSE_LINKS = [
  { label: "A1", href: "/curso-a1" },
  { label: "A2", href: "/curso-a2" },
  { label: "B1", href: "/curso-b1" },
  { label: "B2", href: "/curso-b2" },
  { label: "C1", href: "/curso-c1" },
  { label: "C2", href: "/curso-c2" },
] as const;

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const spanishNavLinks = {
    phrases: "/frases-en-ingles",
    guides: "/aprender-ingles",
    grammar: "/blog/gramatica",
    vocabulary: "/vocabulario",
  };
  const navLinks = { ...spanishNavLinks, blog: "/blog" };

  return (
    <nav className="sticky top-0 z-[9998] bg-white/95 backdrop-blur-lg border-b-2 border-[#FFE8D9] shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center text-white font-black text-xl shadow-coral transform group-hover:scale-110 transition-transform">
              F
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">Focus English</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2">
              {COURSE_LINKS.map((course) => (
                <Link
                  key={course.label}
                  href={course.href}
                  className="px-3 py-1.5 rounded-full border border-[#FFD9C2] bg-[#FFF4ED] text-xs font-black text-[#FF6B6B] hover:bg-[#FFE8D9] transition-colors"
                >
                  {course.label}
                </Link>
              ))}
            </div>
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
              <div className="flex flex-wrap gap-2">
                {COURSE_LINKS.map((course) => (
                  <Link
                    key={course.label}
                    href={course.href}
                    className="px-3 py-1.5 rounded-full border border-[#FFD9C2] bg-[#FFF4ED] text-xs font-black text-[#FF6B6B] hover:bg-[#FFE8D9] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {course.label}
                  </Link>
                ))}
              </div>
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
