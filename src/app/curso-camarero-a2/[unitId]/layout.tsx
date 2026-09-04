import type { Metadata } from "next";
import { getAbsoluteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }): Promise<Metadata> {
  const { unitId } = await params;
  const unitNumber = unitId.replace('unit-', '');

  const title = unitId === 'test-final'
    ? `Test final inglés A2 para Camareros | ${SITE_BRAND_NAME}`
    : `Unidad ${unitNumber} del curso de inglés A2 para Camareros | ${SITE_BRAND_NAME}`;

  const description = `Curso de inglés A2 para camareros con Linguafly: más vocabulario de hostelería y confianza para recomendar platos y gestionar pedidos.`;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/curso-camarero-a2/${unitId}`),
    },
  };
}

export default function CursoCamareroA2UnitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}