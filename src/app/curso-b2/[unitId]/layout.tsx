import type { Metadata } from "next";
import { assertCourseUnitAccess } from "@/lib/access/assert-course-unit-access";
import { getAbsoluteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }): Promise<Metadata> {
  const { unitId } = await params;
  const unitNumber = unitId.replace('unit-', '');

  const specificDescriptions: Record<string, string> = {
    "unit-72": "Practica con la Unidad 72 del curso de inglés B2 en Linguafly. Contenidos avanzados de gramática, comprensión lectora y expresiones idiomáticas.",
  };

  const description = specificDescriptions[unitId]
    || `Practica con la Unidad ${unitNumber} del curso de inglés B2 en Linguafly. Contenidos avanzados de gramática, comprensión lectora y expresiones idiomáticas.`;

  const title = unitId === 'test-final'
    ? `Test final inglés B2 | ${SITE_BRAND_NAME}`
    : `Unidad ${unitNumber} del curso de inglés B2 | ${SITE_BRAND_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/curso-b2/${unitId}`),
    },
  };
}

export default async function CursoB2UnitLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;
  await assertCourseUnitAccess(unitId, "/curso-b2");
  return children;
}
