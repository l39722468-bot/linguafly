import type { Metadata } from "next";
import { getAbsoluteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }): Promise<Metadata> {
  const { unitId } = await params;
  const unitNumber = unitId.replace('unit-', '');

  const title = unitId === 'test-final'
    ? `Test final inglés A2 para Recepcionistas | ${SITE_BRAND_NAME}`
    : `Unidad ${unitNumber} del curso de inglés A2 para Recepcionistas | ${SITE_BRAND_NAME}`;

  const description = `Curso de inglés A2 para recepcionistas con LinguaFly: atiende llamadas, gestiona reservas y resuelve peticiones de huéspedes con más soltura.`;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/curso-recepcionista-a2/${unitId}`),
    },
  };
}

export default function CursoRecepcionistaA2UnitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}