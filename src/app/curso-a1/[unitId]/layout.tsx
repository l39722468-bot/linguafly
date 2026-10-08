import type { Metadata } from "next";
import { assertCourseUnitAccess } from "@/lib/access/assert-course-unit-access";
import { getAbsoluteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }): Promise<Metadata> {
  const { unitId } = await params;
  const unitNumber = unitId.replace('unit-', '');

  const title = unitId === 'test-final'
    ? `Test final inglés A1 | ${SITE_BRAND_NAME}`
    : `Unidad ${unitNumber} del curso de inglés A1 | ${SITE_BRAND_NAME}`;

  const description = unitId === 'test-final'
    ? "Evaluación final del curso de inglés A1 de Linguafly: 28 preguntas de gramática, vocabulario, lectura, escucha y escritura para comprobar tu nivel."
    : `Aprende con la Unidad ${unitNumber} del curso de inglés A1 de Linguafly. Ejercicios interactivos de gramática básica, vocabulario y práctica paso a paso.`;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/curso-a1/${unitId}`),
    },
  };
}

export default async function CursoA1UnitLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;
  await assertCourseUnitAccess(unitId, "/curso-a1");
  return children;
}
