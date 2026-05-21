'use client';

import { useEffect } from 'react';

type CookiebotApi = {
  hasResponse?: boolean;
  show?: () => void;
};

declare global {
  interface Window {
    Cookiebot?: CookiebotApi;
  }
}

export default function CookiebotBannerVisibility() {
  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const maybeShowBanner = () => {
      if (cancelled) return;

      const cookiebot = window.Cookiebot;
      if (!cookiebot) {
        if (attempts < 20) {
          attempts += 1;
          window.setTimeout(maybeShowBanner, 500);
        }
        return;
      }

      if (!cookiebot.hasResponse) {
        cookiebot.show?.();
      }
    };

    const onConsentReady = () => {
      if (!window.Cookiebot?.hasResponse) {
        window.Cookiebot?.show?.();
      }
    };

    window.addEventListener('CookiebotOnConsentReady', onConsentReady);
    maybeShowBanner();

    return () => {
      cancelled = true;
      window.removeEventListener('CookiebotOnConsentReady', onConsentReady);
    };
  }, []);

  return null;
}
