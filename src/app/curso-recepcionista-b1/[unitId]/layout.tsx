import type { Metadata } from "next";
import { getAbsoluteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }): Promise<Metadata> {
  const { unitId } = await params;
  const unitNumber = unitId.replace('unit-', '');

  const title = unitId === 'test-final'
    ? `Test final inglés B1 para Recepcionistas | ${SITE_BRAND_NAME}`
    : `Unidad ${unitNumber} del curso de inglés B1 para Recepcionistas | ${SITE_BRAND_NAME}`;

  const description = `Curso de inglés B1 para recepcionistas con LinguaFly: conversación fluida con huéspedes, quejas y gestiones profesionales en el mostrador.`;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/curso-recepcionista-b1/${unitId}`),
    },
  };
}

export default function CursoRecepcionistaB1UnitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}