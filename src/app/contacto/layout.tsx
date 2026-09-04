import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacta con Linguafly | Atención al Estudiante',
  description: '¿Tienes dudas? Nuestro equipo está aquí para ayudarte. Contacta con Linguafly por email, teléfono o WhatsApp para resolver tus dudas sobre cursos y planes.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
