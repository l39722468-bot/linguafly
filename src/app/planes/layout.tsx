import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isFreeAccessMode } from '@/lib/product-config';

export const metadata: Metadata = {
  title: 'Planes de Suscripción de Inglés: Elige tu Curso en Focus English',
  description: 'Compara nuestros planes de suscripción y elige el que mejor se adapte a tus necesidades. Cursos de inglés A1-C2, inglés para viajes y profesional.',
  keywords: [
    'planes focus english',
    'precios cursos inglés',
    'suscripción mensual inglés',
    'curso inglés barato',
    'inglés online precio',
    'plan premium inglés',
    'curso inglés 6.99',
    'curso inglés 14.99',
  ],
  alternates: {
    canonical: 'https://www.focus-on-english.com/planes',
  },
};

export default function PlanesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isFreeAccessMode()) {
    redirect('/aprender-ingles');
  }

  return children;
}
