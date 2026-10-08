import type { Metadata } from "next";
import { InteractiveUnitVideo } from "@/components/course/InteractiveUnitVideo";
import { getAbsoluteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }): Promise<Metadata> {
  const { unitId } = await params;
  const unitNumber = unitId.replace('unit-', '');

  const title = unitId === 'test-final'
    ? `Test final inglés B1 para Recepcionistas | ${SITE_BRAND_NAME}`
    : `Unidad ${unitNumber} del curso de inglés B1 para Recepcionistas | ${SITE_BRAND_NAME}`;

  const description = `Curso de inglés B1 para recepcionistas con Linguafly: conversación fluida con huéspedes, quejas y gestiones profesionales en el mostrador.`;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/curso-recepcionista-b1/${unitId}`),
    },
  };
}

export default async function CursoRecepcionistaB1UnitLayout({
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
      <InteractiveUnitVideo courseSlug="curso-recepcionista-b1" unitId={unitId} />
    </>
  );
}
