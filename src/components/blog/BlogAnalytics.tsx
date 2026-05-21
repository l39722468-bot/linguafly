'use client';

import { useEffect, useRef } from 'react';
import { trackArticleView, trackScrollMilestone, trackTimeOnPage } from '@/lib/analytics';

interface BlogAnalyticsProps {
  slug: string;
  category: string;
  readingTimeMin: number;
}

/**
 * Client Component que enriquece GA4 con datos específicos del artículo:
 * - `article_view` al montar (slug, categoría, tiempo estimado de lectura)
 * - `scroll_milestone` en 25 / 50 / 75 / 100 % (cada hito se dispara solo una vez)
 * - `time_on_page` al desmontar / salir de la página
 *
 * No renderiza nada visible.
 */
export function BlogAnalytics({ slug, category, readingTimeMin }: BlogAnalyticsProps) {
  const startTimeRef = useRef<number>(Date.now());
  const firedMilestonesRef = useRef<Set<number>>(new Set());

  // Dispara article_view al cargar
  useEffect(() => {
    trackArticleView(slug, category, readingTimeMin);
  }, [slug, category, readingTimeMin]);

  // Scroll milestones
  useEffect(() => {
    const milestones = [25, 50, 75, 100] as const;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;

      const pct = Math.min(Math.round((scrolled / total) * 100), 100);

      for (const milestone of milestones) {
        if (pct >= milestone && !firedMilestonesRef.current.has(milestone)) {
          firedMilestonesRef.current.add(milestone);
          trackScrollMilestone(milestone, slug);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // check on mount in case article is short

    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  // Tiempo en página al salir
  useEffect(() => {
    const handleUnload = () => {
      const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (seconds > 3) {
        trackTimeOnPage(seconds, slug);
      }
    };

    window.addEventListener('pagehide', handleUnload);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') handleUnload();
    });

    return () => {
      handleUnload();
      window.removeEventListener('pagehide', handleUnload);
    };
  }, [slug]);

  return null;
}
