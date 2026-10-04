import React from 'react';
import type { Metadata } from 'next';
import { SITE_BRAND_NAME } from '@/lib/site-brand';

export const metadata: Metadata = {
  title: `Misiones de inglés | ${SITE_BRAND_NAME}`,
  description: 'Misiones interactivas para practicar inglés con retos cortos.',
  robots: { index: false, follow: true },
};
import { GlobalContentProvider } from '@/lib/course-engine/global-content-provider';
import MisionesClient from './MisionesClient';
import { Navigation } from '@/components/sections/Navigation';
import { MissionProvider } from '@/context/MissionContext';

export const dynamic = 'force-dynamic';

export default async function MisionesPage() {
  await GlobalContentProvider.getInstance().loadAllContent();

  return (
    <MissionProvider>
      <Navigation />
      <div className="min-h-screen bg-slate-900">
        <MisionesClient userId="guest" />
      </div>
    </MissionProvider>
  );
}
