import type { Metadata } from "next";
import { SITE_BRAND_NAME } from "@/lib/site-brand";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Práctica de inglés ${id} | ${SITE_BRAND_NAME}`,
    description: "Lección de práctica interactiva de inglés.",
    robots: { index: false, follow: true },
  };
}

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
