import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getAbsoluteUrl, SITE_BRAND_NAME } from '@/lib/site-brand';

export const metadata: Metadata = {
  title: `Repaso de inglés A1 | ${SITE_BRAND_NAME}`,
  description: "Repasa de forma espaciada lo aprendido en el curso A1 de LinguaFly: consolidación de gramática y vocabulario con la sesión diaria.",
  alternates: {
    canonical: getAbsoluteUrl('/curso-a1/repaso'),
  },
};

export default function SRSRepasoPage() {
  redirect('/curso-a1/sesion-diaria');
}
