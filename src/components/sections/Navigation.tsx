"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SITE_BRAND_NAME } from "@/lib/site-brand";
import { HomeLanguageSwitcher } from "@/components/sections/HomeLanguageSwitcher";
import { HtmlLang } from "@/components/seo/HtmlLang";
import {
  HOME_PATHS,
  SPANISH_COURSE_A1_HREF,
  SPANISH_COURSE_A1_UNIT1_HREF,
  localeFromPathname,
} from "@/lib/site-locales";

const ENGLISH_COURSE_LINKS = [
  { label: "A1", href: "/curso-a1" },
  { label: "A2", href: "/curso-a2" },
  { label: "B1", href: "/curso-b1" },
  { label: "B2", href: "/curso-b2" },
  { label: "C1", href: "/curso-c1" },
  { label: "C2", href: "/curso-c2" },
] as const;

const SPANISH_COURSE_LINKS = [
  { label: "A1", href: SPANISH_COURSE_A1_HREF },
  { label: "A2", href: "/en#levels" },
  { label: "B1", href: "/en#levels" },
  { label: "B2", href: "/en#levels" },
  { label: "C1", href: "/en#levels" },
  { label: "C2", href: "/en#levels" },
] as const;

const EXERCISE_MAP_LINK_CLASSES =
  "inline-flex w-[5.75rem] shrink-0 items-center justify-center text-center text-[11px] font-bold leading-[1.25] text-gray-700 hover:text-[#FF6B6B] transition-colors xl:w-[6.25rem] xl:text-xs";

function ExerciseMapLinkLabel({ multiline = false }: { multiline?: boolean }) {
  if (multiline) {
    return (
      <>
        Cuadro de ejercicios
        <br />
        relacionados
      </>
    );
  }

  return <>Cuadro de ejercicios relacionados</>;
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const isEnglishHome = locale === "en";
  const courseLinks = isEnglishHome ? SPANISH_COURSE_LINKS : ENGLISH_COURSE_LINKS;
  const logoHref = isEnglishHome ? HOME_PATHS.en : HOME_PATHS.es;

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
      <HtmlLang lang={isEnglishHome ? "en" : "es"} />
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center min-h-16 py-1">
          <Link href={logoHref} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center text-white font-black text-xl shadow-coral transform group-hover:scale-110 transition-transform">
              L
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">{SITE_BRAND_NAME}</span>
          </Link>

          <div className="hidden md:flex items-center gap-3 xl:gap-4">
            <HomeLanguageSwitcher />
            <div className="hidden lg:flex items-center gap-2">
              {courseLinks.map((course) => (
                <Link
                  key={course.label}
                  href={course.href}
                  className="px-3 py-1.5 rounded-full border border-[#FFD9C2] bg-[#FFF4ED] text-xs font-black text-[#FF6B6B] hover:bg-[#FFE8D9] transition-colors"
                >
                  {course.label}
                </Link>
              ))}
            </div>
            {isEnglishHome ? (
              <>
                <Link
                  href={SPANISH_COURSE_A1_UNIT1_HREF}
                  className="px-3 py-1.5 rounded-full border border-teal-600 bg-teal-700 text-xs font-black text-white hover:bg-teal-800 transition-colors"
                >
                  Start A1
                </Link>
                <Link href={SPANISH_COURSE_A1_HREF} className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors">
                  Spanish A1 blog
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={navLinks.levelTest}
                  className="px-3 py-1.5 rounded-full border border-[#FF6B6B] bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-xs font-black text-white hover:opacity-90 transition-opacity"
                >
                  Test de nivel
                </Link>
                <Link href={navLinks.blog} className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors">
                  Blog
                </Link>
                <Link href={navLinks.exerciseMap} className={EXERCISE_MAP_LINK_CLASSES}>
                  <ExerciseMapLinkLabel multiline />
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
              </>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <HomeLanguageSwitcher compact />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100"
              aria-label={mobileMenuOpen ? (isEnglishHome ? "Close menu" : "Cerrar menú") : (isEnglishHome ? "Open menu" : "Abrir menú")}
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

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {courseLinks.map((course) => (
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
              {isEnglishHome ? (
                <>
                  <Link
                    href={SPANISH_COURSE_A1_UNIT1_HREF}
                    className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-teal-700 text-sm font-black text-white text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start A1 Unit 1
                  </Link>
                  <Link
                    href={SPANISH_COURSE_A1_HREF}
                    className="text-sm font-bold text-coral-600 hover:text-coral-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Spanish A1 blog
                  </Link>
                </>
              ) : (
                <>
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
                    <ExerciseMapLinkLabel />
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
