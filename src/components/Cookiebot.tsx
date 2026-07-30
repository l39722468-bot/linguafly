'use client';

import { useEffect } from 'react';
import { COOKIEBOT_ID, shouldLoadCookiebot } from '@/lib/cookiebot-config';

export default function Cookiebot() {
  useEffect(() => {
    if (!shouldLoadCookiebot(window.location.hostname)) return;
    if (document.getElementById('Cookiebot')) return;

    const script = document.createElement('script');
    script.id = 'Cookiebot';
    script.src = 'https://consent.cookiebot.com/uc.js';
    script.setAttribute('data-cbid', COOKIEBOT_ID);
    // Manual evita que Cookiebot bloquee los scripts internos de Next.js (RSC bootstrap).
    script.setAttribute('data-blockingmode', 'manual');
    script.type = 'text/javascript';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return null;
}
