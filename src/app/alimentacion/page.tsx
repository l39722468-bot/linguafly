import type { Metadata } from "next";
import { VerticalHub } from "@/components/magazine/VerticalHub";
import { getVertical } from "@/lib/site-catalog";
import { SITE_BRAND_NAME, getAbsoluteUrl } from "@/lib/site-brand";

const vertical = getVertical("alimentacion")!;

export const metadata: Metadata = {
  title: `Alimentación: comidas reales y hábitos sostenibles | ${SITE_BRAND_NAME}`,
  description: vertical.description,
  alternates: { canonical: getAbsoluteUrl(vertical.href) },
};

export default function AlimentacionPage() {
  return <VerticalHub vertical={vertical} />;
}
