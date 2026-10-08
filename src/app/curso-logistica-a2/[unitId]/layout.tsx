import type { Metadata } from "next";
import { InteractiveUnitVideo } from "@/components/course/InteractiveUnitVideo";
import { getAbsoluteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }): Promise<Metadata> {
  const { unitId } = await params;
  const unitNumber = unitId.replace('unit-', '');

  const title = unitId === 'test-final'
    ? `Test final inglés A2 para Logística | ${SITE_BRAND_NAME}`
    : `Unidad ${unitNumber} del curso de inglés A2 para Logística | ${SITE_BRAND_NAME}`;

  const description = `Curso de inglés A2 para logística con Linguafly: comunicación básica en almacén, inventario y coordinación de envíos con confianza.`;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/curso-logistica-a2/${unitId}`),
    },
  };
}

export default async function CursoLogisticaA2UnitLayout({
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
      <InteractiveUnitVideo courseSlug="curso-logistica-a2" unitId={unitId} />
    </>
  );
}
