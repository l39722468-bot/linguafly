'use client';

import { useEffect } from 'react';
import { loadAdSenseScript, runWithMarketingConsent } from '@/lib/marketing-consent';

export default function ConsentGatedAdSense() {
  useEffect(() => runWithMarketingConsent(loadAdSenseScript), []);

  return null;
}
