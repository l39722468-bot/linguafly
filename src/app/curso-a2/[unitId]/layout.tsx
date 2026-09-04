import type { Metadata } from "next";
import { assertCourseUnitAccess } from "@/lib/access/assert-course-unit-access";
import { getAbsoluteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }): Promise<Metadata> {
  const { unitId } = await params;
  const unitNumber = unitId.replace('unit-', '');

  const specificDescriptions: Record<string, string> = {
    "unit-14": "Accede a la Unidad 14 del curso de inglés A2 en Linguafly. Ejercicios interactivos, explicaciones gramaticales y práctica de listening paso a paso.",
    "unit-22": "Aprende con la Unidad 22 del curso de inglés A2 de Linguafly. Actividades dinámicas de gramática, vocabulario útil y ejercicios auditivos prácticos.",
  };

  const description = specificDescriptions[unitId]
    || `Practica con la Unidad ${unitNumber} del curso de inglés A2 en Linguafly. Ejercicios interactivos de gramática, vocabulario y comprensión.`;

  const title = unitId === 'test-final'
    ? `Test final inglés A2 | ${SITE_BRAND_NAME}`
    : `Unidad ${unitNumber} del curso de inglés A2 | ${SITE_BRAND_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/curso-a2/${unitId}`),
    },
  };
}

export default async function CursoA2UnitLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;
  await assertCourseUnitAccess(unitId, "/curso-a2");
  return children;
}
