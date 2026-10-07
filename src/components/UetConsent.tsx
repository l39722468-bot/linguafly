'use client';

import { useEffect } from 'react';
import { runWithMarketingConsent } from '@/lib/marketing-consent';

/**
 * Etiqueta de Microsoft Advertising (UET / Bing).
 *
 * Se registra solo cuando el sistema de consentimiento de la web
 * (`runWithMarketingConsent`: Cookiebot, InMobi/TCF o el fallback por host)
 * confirma consentimiento de marketing, igual que hace ConsentGatedAdSense.
 *
 * El consentimiento por defecto se declara en <head> con 'ad_storage':'denied'
 * (ver UetConsentDefault): aqui solo se concede cuando procede.
 */
export const UET_TAG_ID = '187279170';
const UET_SCRIPT_ID = 'uet-bing-tag';
const UET_SRC = `https://bat.bing.net/bat.js?ti=${UET_TAG_ID}&q=uetq`;

type UetQueue = unknown[] & {
  push: (...args: unknown[]) => number;
};

declare global {
  interface Window {
    uetq?: UetQueue;
  }
}

function grantUetConsent(): void {
  window.uetq = window.uetq || ([] as unknown as UetQueue);
  window.uetq.push('consent', 'update', { ad_storage: 'granted' });
}

function loadUetTag(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(UET_SCRIPT_ID)) return;

  const script = document.createElement('script');
  script.id = UET_SCRIPT_ID;
  script.async = true;
  script.src = UET_SRC;
  script.onload = () => {
    grantUetConsent();
    window.uetq?.push('pageLoad');
  };

  const first = document.getElementsByTagName('script')[0];
  first?.parentNode?.insertBefore(script, first);
}

export default function UetConsent() {
  useEffect(() => runWithMarketingConsent(loadUetTag), []);

  return null;
}
