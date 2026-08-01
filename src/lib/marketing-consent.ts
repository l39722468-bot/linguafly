import { shouldLoadCookiebot } from '@/lib/cookiebot-config';
import { shouldLoadInMobiCmp } from '@/lib/inmobi-cmp-config';

export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-1198438843650445';

export const ADSENSE_SCRIPT_ID = 'adsense-sdk';

export const TCF_CONSENT_CHANGE_EVENT = 'LinguaflyTcfConsentChange';

type CookiebotConsentApi = {
  consent?: {
    marketing?: boolean;
  };
  hasResponse?: boolean;
};

type TcfPurposeConsents = Record<string, boolean>;

type TcfData = {
  gdprApplies?: boolean;
  eventStatus?: string;
  purpose?: {
    consents?: TcfPurposeConsents;
  };
};

declare global {
  interface Window {
    Cookiebot?: CookiebotConsentApi;
    __tcfapi?: (
      command: string,
      version: number,
      callback: (tcData: TcfData, success: boolean) => void,
      parameter?: unknown,
    ) => void;
  }
}

let tcfMarketingGranted: boolean | null = null;
let tcfListenerInitialized = false;

export function evaluateTcfMarketingConsent(tcData: TcfData): boolean {
  if (tcData.gdprApplies === false) return true;

  const consents = tcData.purpose?.consents ?? {};
  return Boolean(consents['1'] && consents['2']);
}

function notifyTcfConsentChange(granted: boolean): void {
  tcfMarketingGranted = granted;
  window.dispatchEvent(
    new CustomEvent(TCF_CONSENT_CHANGE_EVENT, { detail: { granted } }),
  );
}

function initTcfConsentListener(): void {
  if (tcfListenerInitialized || typeof window === 'undefined') return;
  tcfListenerInitialized = true;

  const attach = () => {
    if (typeof window.__tcfapi !== 'function') return false;

    window.__tcfapi('addEventListener', 2, (tcData, success) => {
      if (!success) return;
      if (
        tcData.eventStatus === 'tcloaded' ||
        tcData.eventStatus === 'useractioncomplete'
      ) {
        notifyTcfConsentChange(evaluateTcfMarketingConsent(tcData));
      }
    });

    window.__tcfapi('getTCData', 2, (tcData, success) => {
      if (!success) return;
      notifyTcfConsentChange(evaluateTcfMarketingConsent(tcData));
    });

    return true;
  };

  if (attach()) return;

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (attach() || attempts >= 40) {
      window.clearInterval(timer);
    }
  }, 250);
}

export function hasMarketingConsent(hostname?: string): boolean {
  if (typeof window === 'undefined') return false;

  const host = hostname ?? window.location.hostname;

  if (shouldLoadInMobiCmp(host)) {
    initTcfConsentListener();
    return tcfMarketingGranted === true;
  }

  if (!shouldLoadCookiebot(host)) return true;

  return Boolean(window.Cookiebot?.consent?.marketing);
}

export function onMarketingConsentChange(
  callback: (hasConsent: boolean) => void,
): () => void {
  const notify = () => callback(hasMarketingConsent());

  const handleConsentEvent = () => notify();
  const handleTcfConsentEvent = (event: Event) => {
    const granted = (event as CustomEvent<{ granted: boolean }>).detail?.granted;
    callback(Boolean(granted));
  };

  window.addEventListener('CookiebotOnConsentReady', handleConsentEvent);
  window.addEventListener('CookiebotOnAccept', handleConsentEvent);
  window.addEventListener('CookiebotOnDecline', handleConsentEvent);
  window.addEventListener(TCF_CONSENT_CHANGE_EVENT, handleTcfConsentEvent);

  let cancelled = false;
  let attempts = 0;
  let timer: number | undefined;

  const pollConsent = () => {
    if (cancelled) return;

    if (shouldLoadInMobiCmp(window.location.hostname)) {
      initTcfConsentListener();
      if (tcfMarketingGranted !== null) {
        notify();
        return;
      }
    } else if (window.Cookiebot?.hasResponse) {
      notify();
      return;
    }

    if (attempts < 40) {
      attempts += 1;
      timer = window.setTimeout(pollConsent, 250);
    }
  };

  pollConsent();

  return () => {
    cancelled = true;
    window.removeEventListener('CookiebotOnConsentReady', handleConsentEvent);
    window.removeEventListener('CookiebotOnAccept', handleConsentEvent);
    window.removeEventListener('CookiebotOnDecline', handleConsentEvent);
    window.removeEventListener(TCF_CONSENT_CHANGE_EVENT, handleTcfConsentEvent);
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
