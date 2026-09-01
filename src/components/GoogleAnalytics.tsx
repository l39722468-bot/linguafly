'use client';

import { usePathname } from 'next/navigation';
import { useMemo, useEffect, useRef } from 'react';
import { getGaTrackingId, pageview } from '@/lib/analytics';

const excludedRoutes = ['/curso/ingles-a1', '/curso/ingles-b1', '/curso/ingles-c1', '/curso/ingles-c2', '/dashboard', '/profile', '/settings', '/leccion', '/certificados', '/practica'];

/**
 * gtag.js va en el <head> (GoogleTag, snippet nativo). Aquí solo se evitan page_view duplicados
 * en navegación SPA de App Router.
 */
export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = getGaTrackingId();
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  const shouldTrack = useMemo(() => {
    if (!pathname) return true;
    return !excludedRoutes.some((r) => pathname.startsWith(r));
  }, [pathname]);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !pathname) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!shouldTrack || typeof window.gtag !== 'function') return;

    pageview(pathname);
  }, [pathname, GA_MEASUREMENT_ID, shouldTrack]);

  return null;
}
