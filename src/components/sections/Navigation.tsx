"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
// SVG inline para reducir bundle (evitar lucide-react ~50kB en nav)
const SunIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>;
const MoonIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitar error de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-[9998] bg-white/95 backdrop-blur-lg border-b-2 border-[#FFE8D9] shadow-sm dark:bg-slate-950/95 dark:border-slate-800 transition-colors">
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
            <Link href="/blog" className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors dark:text-slate-200 dark:hover:text-[#FF6B6B]">
              Blog
            </Link>
            <Link href="/frases-en-ingles" className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors dark:text-slate-200 dark:hover:text-[#FF6B6B]">
              Frases
            </Link>
            <Link href="/aprender-ingles" className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors dark:text-slate-200 dark:hover:text-[#FF6B6B]">
              Guías
            </Link>
            <Link href="/blog/gramatica" className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors dark:text-slate-200 dark:hover:text-[#FF6B6B]">
              Gramática
            </Link>
            <Link href="/vocabulario" className="text-sm font-bold text-gray-700 hover:text-[#FF6B6B] transition-colors dark:text-slate-200 dark:hover:text-[#FF6B6B]">
              Vocabulario
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-[#FFE8D9] hover:text-[#FF6B6B] transition-all dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              aria-label="Cambiar tema"
            >
              {mounted && (theme === 'dark' ? <SunIcon /> : <MoonIcon />)}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              aria-label="Cambiar tema"
            >
              {mounted && (theme === 'dark' ? <SunIcon /> : <MoonIcon />)}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-200"
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
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col gap-4">
              <Link 
                href="/blog" 
                className="text-sm font-bold text-coral-600 hover:text-coral-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                📰 Blog
              </Link>
              <Link 
                href="/frases-en-ingles" 
                className="text-sm font-bold text-slate-700 hover:text-coral-600 transition-colors dark:text-slate-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Frases
              </Link>
              <Link 
                href="/aprender-ingles" 
                className="text-sm font-bold text-slate-700 hover:text-coral-600 transition-colors dark:text-slate-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Guías
              </Link>
              <Link 
                href="/blog/gramatica" 
                className="text-sm font-bold text-slate-700 hover:text-coral-600 transition-colors dark:text-slate-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gramática
              </Link>
              <Link 
                href="/vocabulario" 
                className="text-sm font-bold text-slate-700 hover:text-coral-600 transition-colors dark:text-slate-300"
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
