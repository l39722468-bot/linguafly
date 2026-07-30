'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { COOKIEBOT_ID, shouldLoadCookiebot } from '@/lib/cookiebot-config';

export default function CookieDeclaration() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(shouldLoadCookiebot(window.location.hostname));
  }, []);

  if (!enabled) {
    return (
      <p className="mb-6 text-sm text-slate-600">
        La declaración automática de cookies de Cookiebot solo está disponible en los
        dominios autorizados del gestor de consentimiento.
      </p>
    );
  }

  return (
    <Script
      id="CookieDeclaration"
      src={`https://consent.cookiebot.com/${COOKIEBOT_ID}/cd.js`}
      strategy="lazyOnload"
    />
  );
}
