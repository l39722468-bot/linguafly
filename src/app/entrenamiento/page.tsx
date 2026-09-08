import type { Metadata } from "next";
import { VerticalHub } from "@/components/magazine/VerticalHub";
import { getVertical } from "@/lib/site-catalog";
import { SITE_BRAND_NAME, getAbsoluteUrl } from "@/lib/site-brand";

const vertical = getVertical("entrenamiento")!;

export const metadata: Metadata = {
  title: `Entrenamiento: fuerza y progreso sostenible | ${SITE_BRAND_NAME}`,
  description: vertical.description,
  alternates: { canonical: getAbsoluteUrl(vertical.href) },
};

export default function EntrenamientoPage() {
  return <VerticalHub vertical={vertical} />;
}
