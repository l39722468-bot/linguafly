import type { Metadata } from "next";
import { assertCourseUnitAccess } from "@/lib/access/assert-course-unit-access";
import { getAbsoluteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }): Promise<Metadata> {
  const { unitId } = await params;
  const unitNumber = unitId.replace('unit-', '');

  const title = unitId === 'test-final'
    ? `Test final inglés C2 | ${SITE_BRAND_NAME}`
    : `Unidad ${unitNumber} del curso de inglés C2 | ${SITE_BRAND_NAME}`;

  const description = unitId === 'test-final'
    ? "Evaluación final del curso de inglés C2 de Linguafly: precisión lingüística, matices de estilo, interpretación y dominio casi nativo para comprobar tu nivel."
    : `Aprende con la Unidad ${unitNumber} del curso de inglés C2 de Linguafly. Precisión, matices de estilo y comprensión de textos y expresiones de nivel Proficiency.`;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/curso-c2/${unitId}`),
    },
  };
}

export default async function CursoC2UnitLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;
  await assertCourseUnitAccess(unitId, "/curso-c2");
  return children;
}
