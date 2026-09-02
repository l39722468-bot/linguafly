import type { Metadata } from "next";
import { assertCourseUnitAccess } from "@/lib/access/assert-course-unit-access";
import { getAbsoluteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }): Promise<Metadata> {
  const { unitId } = await params;
  const unitNumber = unitId.replace('unit-', '');

  const title = unitId === 'test-final'
    ? `Test final inglés C1 | ${SITE_BRAND_NAME}`
    : `Unidad ${unitNumber} del curso de inglés C1 | ${SITE_BRAND_NAME}`;

  const description = unitId === 'test-final'
    ? "Evaluación final del curso de inglés C1 de LinguaFly: gramática avanzada, vocabulario académico, lectura, escucha y expresión escrita para comprobar tu nivel."
    : `Aprende con la Unidad ${unitNumber} del curso de inglés C1 de LinguaFly. Gramática avanzada, vocabulario académico y comprensión de textos complejos.`;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/curso-c1/${unitId}`),
    },
  };
}

export default async function CursoC1UnitLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;
  await assertCourseUnitAccess(unitId, "/curso-c1");
  return children;
}
