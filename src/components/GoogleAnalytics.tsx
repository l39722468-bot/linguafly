'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useMemo, useEffect, useState, useRef } from 'react';
import { getContentGroup } from '@/lib/analytics';

const excludedRoutes = ['/curso/ingles-a1', '/curso/ingles-b1', '/curso/ingles-c1', '/curso/ingles-c2', '/dashboard', '/profile', '/settings', '/leccion', '/certificados', '/practica'];

export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();
  const [gaLoaded, setGaLoaded] = useState(false);
  const isFirstRender = useRef(true);

  const shouldTrack = useMemo(() => {
    if (!pathname) return true;
    return !excludedRoutes.some((r) => pathname.startsWith(r));
  }, [pathname]);

  // Carga diferida del script GA tras el evento load
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !shouldTrack) return;
    const loadAfterPageLoad = () => {
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => setGaLoaded(true), { timeout: 3000 });
      } else {
        setTimeout(() => setGaLoaded(true), 200);
      }
    };
    if (document.readyState === 'complete') loadAfterPageLoad();
    else window.addEventListener('load', loadAfterPageLoad, { once: true });
  }, [GA_MEASUREMENT_ID, shouldTrack]);

  // Rastreo de navegaciones SPA: dispara page_view en cada cambio de ruta
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !gaLoaded || !pathname) return;
    // Omitir la primera carga: el gtag('config') ya lo registra al inicializar
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!shouldTrack) return;

    const contentGroup = getContentGroup(pathname);
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
      content_group: contentGroup,
    });
  }, [pathname, gaLoaded, GA_MEASUREMENT_ID, shouldTrack]);

  if (!GA_MEASUREMENT_ID || !shouldTrack || !gaLoaded) return null;

  const contentGroup = getContentGroup(pathname ?? '/');

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
        data-cookieconsent="statistics"
      />
      <Script id="google-analytics" strategy="lazyOnload" data-cookieconsent="statistics">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{page_title:document.title,page_location:window.location.href,page_path:window.location.pathname,content_group:'${contentGroup}',anonymize_ip:true,cookie_flags:'SameSite=None;Secure'});`}
      </Script>
    </>
  );
}
