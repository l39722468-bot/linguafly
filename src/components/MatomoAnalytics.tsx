'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useMemo, useEffect, useState, useRef } from 'react';

const MATOMO_URL = 'https://linguaflyapp.matomo.cloud/';
const MATOMO_SITE_ID = '1';
const MATOMO_SCRIPT_SRC = 'https://cdn.matomo.cloud/linguaflyapp.matomo.cloud/matomo.js';

const excludedRoutes = ['/curso/ingles-a1', '/curso/ingles-b1', '/curso/ingles-c1', '/curso/ingles-c2', '/dashboard', '/profile', '/settings', '/leccion', '/certificados', '/practica'];

export default function MatomoAnalytics() {
  const pathname = usePathname();
  const [matomoReady, setMatomoReady] = useState(false);
  const isFirstRender = useRef(true);
  const previousUrl = useRef<string | null>(null);

  const shouldTrack = useMemo(() => {
    if (!pathname) return true;
    return !excludedRoutes.some((r) => pathname.startsWith(r));
  }, [pathname]);

  useEffect(() => {
    if (!shouldTrack) return;
    const loadAfterPageLoad = () => {
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => setMatomoReady(true), { timeout: 3000 });
      } else {
        setTimeout(() => setMatomoReady(true), 200);
      }
    };
    if (document.readyState === 'complete') loadAfterPageLoad();
    else window.addEventListener('load', loadAfterPageLoad, { once: true });
  }, [shouldTrack]);

  useEffect(() => {
    if (!matomoReady || !pathname || !window._paq) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousUrl.current = window.location.href;
      return;
    }
    if (!shouldTrack) return;

    const currentUrl = window.location.href;
    if (previousUrl.current) {
      window._paq.push(['setReferrerUrl', previousUrl.current]);
    }
    window._paq.push(['setCustomUrl', currentUrl]);
    window._paq.push(['setDocumentTitle', document.title]);
    window._paq.push(['trackPageView']);
    previousUrl.current = currentUrl;
  }, [pathname, matomoReady, shouldTrack]);

  if (!shouldTrack || !matomoReady) return null;

  return (
    <Script id="matomo-analytics" strategy="lazyOnload" data-cookieconsent="statistics">
      {`var _paq=window._paq=window._paq||[];_paq.push(['trackPageView']);_paq.push(['enableLinkTracking']);(function(){var u='${MATOMO_URL}';_paq.push(['setTrackerUrl',u+'matomo.php']);_paq.push(['setSiteId','${MATOMO_SITE_ID}']);var d=document,g=d.createElement('script'),s=d.getElementsByTagName('script')[0];g.async=true;g.src='${MATOMO_SCRIPT_SRC}';s.parentNode.insertBefore(g,s);})();`}
    </Script>
  );
}
