import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const TutorIAClient = dynamic(() => import('./TutorIAClient'));

export const metadata: Metadata = {
  title: 'Tutor IA de Inglés | Practica Speaking con Avatar',
  description: 'Practica inglés hablando con un tutor de IA con avatar animado. Powered by Cloudflare AI.',
};

export default async function TutorIAPage() {
  return <TutorIAClient />;
}
