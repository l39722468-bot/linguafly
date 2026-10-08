import type { Metadata } from "next";
import { InteractiveUnitVideo } from "@/components/course/InteractiveUnitVideo";
import { getAbsoluteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }): Promise<Metadata> {
  const { unitId } = await params;
  const unitNumber = unitId.replace('unit-', '');

  const title = unitId === 'test-final'
    ? `Test final inglés A1 para Logística | ${SITE_BRAND_NAME}`
    : `Unidad ${unitNumber} del curso de inglés A1 para Logística | ${SITE_BRAND_NAME}`;

  const description = `Curso de inglés A1 para logística con Linguafly: vocabulario básico de almacén y mercancías para empezar a trabajar en el sector.`;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/curso-logistica-a1/${unitId}`),
    },
  };
}

export default async function CursoLogisticaA1UnitLayout({
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
      <InteractiveUnitVideo courseSlug="curso-logistica-a1" unitId={unitId} />
    </>
  );
}
