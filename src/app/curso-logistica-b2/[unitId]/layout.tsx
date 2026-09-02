import type { Metadata } from "next";
import { getAbsoluteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }): Promise<Metadata> {
  const { unitId } = await params;
  const unitNumber = unitId.replace('unit-', '');

  const title = unitId === 'test-final'
    ? `Test final inglés B2 para Logística | ${SITE_BRAND_NAME}`
    : `Unidad ${unitNumber} del curso de inglés B2 para Logística | ${SITE_BRAND_NAME}`;

  const description = `Curso de inglés B2 para logística con LinguaFly: negociación con proveedores internacionales y gestión de incidencias en la cadena de suministro.`;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/curso-logistica-b2/${unitId}`),
    },
  };
}

export default function CursoLogisticaB2UnitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}