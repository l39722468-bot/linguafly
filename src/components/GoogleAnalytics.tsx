'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useMemo, useEffect, useState, useRef } from 'react';
import { getContentGroup, pageview } from '@/lib/analytics';

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

  // Navegaciones SPA: un page_view por ruta (el config ya registra la primera).
  // En la propiedad GA4 nueva, desactivar "cambios de página según el historial"
  // en Medición mejorada para no duplicar este evento.
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !gaLoaded || !pathname) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!shouldTrack) return;

    pageview(pathname);
  }, [pathname, gaLoaded, GA_MEASUREMENT_ID, shouldTrack]);

  if (!GA_MEASUREMENT_ID || !shouldTrack || !gaLoaded) return null;

  const contentGroup = getContentGroup(pathname ?? '/');

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{send_page_view:true,page_title:document.title,page_location:window.location.href,page_path:window.location.pathname,content_group:'${contentGroup}',anonymize_ip:true,cookie_flags:'SameSite=None;Secure'});`}
      </Script>
    </>
  );
}
