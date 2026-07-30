'use client';

import { useEffect } from 'react';
import { runWithMarketingConsent } from '@/lib/marketing-consent';

const MONETAG_SCRIPT_ID = 'monetag-tag';
const MONETAG_SRC = 'https://quge5.com/88/tag.min.js';

function loadMonetagScript(): void {
  if (document.getElementById(MONETAG_SCRIPT_ID)) return;

  const script = document.createElement('script');
  script.id = MONETAG_SCRIPT_ID;
  script.src = MONETAG_SRC;
  script.async = true;
  script.setAttribute('data-zone', '230407');
  script.setAttribute('data-cfasync', 'false');
  document.head.appendChild(script);
}

export default function DeferredMonetagAd() {
  useEffect(() => runWithMarketingConsent(loadMonetagScript), []);

  return null;
}
