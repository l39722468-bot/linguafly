import { Suspense } from 'react';
import { GlobalContentProvider } from '@/lib/course-engine/global-content-provider';
import { a1SesionDelDiaEnOracion } from '@/lib/copy/a1-sesion-del-dia';
import DailySessionClient from './DailySessionClient';
import { Metadata } from 'next';
import { getAbsoluteUrl, SITE_BRAND_NAME } from '@/lib/site-brand';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: `Sesión Diaria de Inglés A1 | ${SITE_BRAND_NAME}`,
  description: "Practica inglés cada día con la sesión diaria del curso A1 de Linguafly: ejercicios breves y variados para construir tu hábito de estudio.",
  alternates: {
    canonical: getAbsoluteUrl('/curso-a1/sesion-diaria'),
  },
};

export default async function SesionDiariaPage() {
  await GlobalContentProvider.getInstance().loadAllContent();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0c4a3e] px-4">
          <p className="text-sm font-bold text-emerald-100/80">
            Cargando {a1SesionDelDiaEnOracion()}…
          </p>
        </div>
      }
    >
      <DailySessionClient />
    </Suspense>
  );
}
