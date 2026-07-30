import { shouldLoadCookiebot } from '@/lib/cookiebot-config';

export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-1198438843650445';

export const ADSENSE_SCRIPT_ID = 'adsense-sdk';

type CookiebotConsentApi = {
  consent?: {
    marketing?: boolean;
  };
  hasResponse?: boolean;
};

declare global {
  interface Window {
    Cookiebot?: CookiebotConsentApi;
  }
}

export function hasMarketingConsent(hostname?: string): boolean {
  if (typeof window === 'undefined') return false;

  const host = hostname ?? window.location.hostname;
  if (!shouldLoadCookiebot(host)) return true;

  return Boolean(window.Cookiebot?.consent?.marketing);
}

export function onMarketingConsentChange(
  callback: (hasConsent: boolean) => void
): () => void {
  const notify = () => callback(hasMarketingConsent());

  const handleConsentEvent = () => notify();

  window.addEventListener('CookiebotOnConsentReady', handleConsentEvent);
  window.addEventListener('CookiebotOnAccept', handleConsentEvent);
  window.addEventListener('CookiebotOnDecline', handleConsentEvent);

  let cancelled = false;
  let attempts = 0;
  let timer: number | undefined;

  const pollCookiebot = () => {
    if (cancelled) return;

    if (window.Cookiebot?.hasResponse) {
      notify();
      return;
    }

    if (attempts < 40) {
      attempts += 1;
      timer = window.setTimeout(pollCookiebot, 250);
    }
  };

  pollCookiebot();

  return () => {
    cancelled = true;
    window.removeEventListener('CookiebotOnConsentReady', handleConsentEvent);
    window.removeEventListener('CookiebotOnAccept', handleConsentEvent);
    window.removeEventListener('CookiebotOnDecline', handleConsentEvent);
    if (timer) window.clearTimeout(timer);
  };
}

export function runWithMarketingConsent(onConsent: () => void): () => void {
  let cleanupConsent: (() => void) | undefined;

  const start = () => {
    cleanupConsent = onMarketingConsentChange((granted) => {
      if (granted) onConsent();
    });

    if (hasMarketingConsent()) {
      onConsent();
    }
  };

  if (document.readyState === 'complete') {
    start();
  } else {
    window.addEventListener('load', start, { once: true });
  }

  return () => {
    window.removeEventListener('load', start);
    cleanupConsent?.();
  };
}

export function loadAdSenseScript(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(ADSENSE_SCRIPT_ID)) return;

  const script = document.createElement('script');
  script.id = ADSENSE_SCRIPT_ID;
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}
