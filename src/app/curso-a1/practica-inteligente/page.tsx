import { GlobalContentProvider } from '@/lib/course-engine/global-content-provider';
import A1SmartPracticeClient from './SmartPracticeClient';
import { Metadata } from 'next';
import { getAbsoluteUrl, SITE_BRAND_NAME } from '@/lib/site-brand';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: `Práctica Inteligente de Inglés A1 | ${SITE_BRAND_NAME}`,
  description: "Refuerza tu nivel A1 con la práctica inteligente de LinguaFly: ejercicios adaptados a tu progreso y a los errores que más repites.",
  alternates: {
    canonical: getAbsoluteUrl('/curso-a1/practica-inteligente'),
  },
};

export default async function A1SmartPracticePage() {
  await GlobalContentProvider.getInstance().loadAllContent();
  return <A1SmartPracticeClient />;
}
