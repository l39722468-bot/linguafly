'use client';

import { useEffect } from 'react';

const MONETAG_SCRIPT_ID = 'monetag-tag';
const MONETAG_SRC = 'https://quge5.com/88/tag.min.js';

export default function DeferredMonetagAd() {
  useEffect(() => {
    const loadAdScript = () => {
      if (document.getElementById(MONETAG_SCRIPT_ID)) return;

      const script = document.createElement('script');
      script.id = MONETAG_SCRIPT_ID;
      script.src = MONETAG_SRC;
      script.async = true;
      script.setAttribute('data-zone', '230407');
      script.setAttribute('data-cfasync', 'false');
      script.setAttribute('data-cookieconsent', 'marketing');
      document.head.appendChild(script);
    };

    if (document.readyState === 'complete') {
      loadAdScript();
      return;
    }

    window.addEventListener('load', loadAdScript, { once: true });
    return () => window.removeEventListener('load', loadAdScript);
  }, []);

  return null;
}
