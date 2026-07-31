"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getUser, signOut, onAuthStateChange } from "@/lib/auth-helpers";
import { SITE_BRAND_NAME } from "@/lib/site-brand";

const COURSE_LINKS = [
  { label: "A1", href: "/curso-a1" },
  { label: "A2", href: "/curso-a2" },
  { label: "B1", href: "/curso-b1" },
  { label: "B2", href: "/curso-b2" },
  { label: "C1", href: "/curso-c1" },
  { label: "C2", href: "/curso-c2" },
] as const;

export function Navigation() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const { user } = await getUser();
      setIsLoggedIn(!!user);
    }

    checkAuth();

    const { data: { subscription } } = onAuthStateChange((user) => {
      setIsLoggedIn(!!user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut();
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const spanishNavLinks = {
    phrases: "/frases-en-ingles",
    guides: "/aprender-ingles",
    grammar: "/blog/gramatica",
    vocabulary: "/vocabulario",
    podcasts: "/podcasts",
    professionalCourses: "/cursos-por-sector",
    exerciseMap: "/blog/ejercicios-relacionados",
  };
  const navLinks = { ...spanishNavLinks, blog: "/blog", levelTest: "/test-nivel" };

  return (
    <nav className="sticky top-0 z-[9998] bg-white/95 backdrop-blur-lg border-b-2 border-[#FFE8D9] shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center text-white font-black text-xl shadow-coral transform group-hover:scale-110 transition-transform">
              L
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">{SITE_BRAND_NAME}</span>
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
            <Link
              href={navLinks.levelTest}
              className="px-3 py-1.5 rounded-full border border-[#FF6B6B] bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-xs font-black text-white hover:opacity-90 transition-opacity"
            >
              Test de nivel
            </Link>
            <Link href={navLinks.blog} className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors">
              Blog
            </Link>
            <Link href={navLinks.exerciseMap} className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors">
              Artículos y ejercicios
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
            <Link href={navLinks.podcasts} className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors">
              Podcasts
            </Link>
            <Link href={navLinks.professionalCourses} className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors">
              Cursos por sector
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  href="/mi-panel"
                  className="ml-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:text-[#FF6B6B] border border-transparent hover:border-[#FF6B6B]/20 hover:bg-[#FF6B6B]/5 transition-all"
                >
                  Mi Panel
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            {isLoggedIn && (
              <Link
                href="/mi-panel"
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-xs font-black text-white"
              >
                Mi Panel
              </Link>
            )}
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
                href={navLinks.levelTest}
                className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-sm font-black text-white text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Test de nivel
              </Link>
              <Link 
                href={navLinks.blog} 
                className="text-sm font-bold text-coral-600 hover:text-coral-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                📰 Blog
              </Link>
              <Link 
                href={navLinks.exerciseMap} 
                className="text-sm font-bold text-slate-700 hover:text-coral-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Artículos y ejercicios
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
              <Link 
                href={navLinks.podcasts} 
                className="text-sm font-bold text-slate-700 hover:text-coral-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Podcasts
              </Link>
              <Link 
                href={navLinks.professionalCourses} 
                className="text-sm font-bold text-slate-700 hover:text-coral-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cursos por sector
              </Link>
              {isLoggedIn && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 inline-flex items-center justify-center px-4 py-3 rounded-xl border-2 border-red-200 bg-red-50 text-sm font-black text-red-600 text-center"
                >
                  Cerrar sesión
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
