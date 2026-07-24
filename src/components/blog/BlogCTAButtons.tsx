'use client';

import Link from 'next/link';
import { trackCTAClick } from '@/lib/analytics';

interface BlogCTAButtonsProps {
  /** Identifica en qué bloque del artículo viven los botones ('intro' | 'footer'). */
  location: 'intro' | 'footer';
}

/**
 * Botones CTA del blog con tracking de clics a GA4.
 * Sustituye los <Link> estáticos del Server Component de los artículos del blog.
 */
export function BlogCTAButtons({ location }: BlogCTAButtonsProps) {
  if (location === 'intro') {
    return (
      <div className="flex flex-wrap gap-3">
        <Link
          href="/curso-a1/unit-1"
          onClick={() => trackCTAClick('Empezar unidad 1 gratis', `blog_cta_${location}`)}
          className="inline-flex items-center justify-center rounded-xl bg-coral-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-coral-700 transition-colors"
        >
          Empezar unidad 1 gratis
        </Link>
        <Link
          href="/podcasts"
          onClick={() => trackCTAClick('Explorar podcasts', `blog_cta_${location}`)}
          className="inline-flex items-center justify-center rounded-xl border border-coral-200 bg-white px-5 py-2.5 text-sm font-bold text-coral-700 hover:bg-coral-50 transition-colors"
        >
          Explorar podcasts
        </Link>
        <Link
          href="/cursos-por-sector"
          onClick={() => trackCTAClick('Cursos por sector', `blog_cta_${location}`)}
          className="inline-flex items-center justify-center rounded-xl border border-coral-200 bg-white px-5 py-2.5 text-sm font-bold text-coral-700 hover:bg-coral-50 transition-colors"
        >
          Cursos por sector
        </Link>
      </div>
    );
  }

  // footer
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link
        href="/curso-a1/unit-1"
        onClick={() => trackCTAClick('Empezar unidad 1 gratis', `blog_cta_${location}`)}
        className="inline-flex items-center justify-center bg-coral-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-coral-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Empezar unidad 1 gratis
      </Link>
      <Link
        href="/podcasts"
        onClick={() => trackCTAClick('Escuchar podcasts', `blog_cta_${location}`)}
        className="inline-flex items-center justify-center bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold hover:border-coral-200 hover:bg-coral-50/30 transition-all"
      >
        Escuchar podcasts
      </Link>
      <Link
        href="/cursos-por-sector"
        onClick={() => trackCTAClick('Ver cursos por sector', `blog_cta_${location}`)}
        className="inline-flex items-center justify-center bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold hover:border-coral-200 hover:bg-coral-50/30 transition-all"
      >
        Ver cursos por sector
      </Link>
    </div>
  );
}
