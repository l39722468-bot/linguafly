import type { Metadata } from "next";
import { InteractiveUnitVideo } from "@/components/course/InteractiveUnitVideo";
import { getAbsoluteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }): Promise<Metadata> {
  const { unitId } = await params;
  const unitNumber = unitId.replace('unit-', '');

  const title = unitId === 'test-final'
    ? `Test final inglés A1 para Recepcionistas | ${SITE_BRAND_NAME}`
    : `Unidad ${unitNumber} del curso de inglés A1 para Recepcionistas | ${SITE_BRAND_NAME}`;

  const description = `Curso de inglés A1 para recepcionistas con Linguafly: frases de bienvenida, atención telefónica y gestión de reservas desde cero.`;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/curso-recepcionista-a1/${unitId}`),
    },
  };
}

export default async function CursoRecepcionistaA1UnitLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;
  return (
    <>
      {children}
      <InteractiveUnitVideo courseSlug="curso-recepcionista-a1" unitId={unitId} />
    </>
  );
}
