import type { Metadata } from "next";
import { getAbsoluteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }): Promise<Metadata> {
  const { unitId } = await params;
  const unitNumber = unitId.replace('unit-', '');

  const title = unitId === 'test-final'
    ? `Test final inglés B2 para Recepcionistas | ${SITE_BRAND_NAME}`
    : `Unidad ${unitNumber} del curso de inglés B2 para Recepcionistas | ${SITE_BRAND_NAME}`;

  const description = `Curso de inglés B2 para recepcionistas con LinguaFly: resuelve reclamaciones complejas y ofrece una atención profesional de calidad en hoteles.`;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/curso-recepcionista-b2/${unitId}`),
    },
  };
}

export default function CursoRecepcionistaB2UnitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}