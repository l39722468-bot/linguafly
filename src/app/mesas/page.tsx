import { Suspense } from "react";
import type { Metadata } from "next";
import { canonicalAlternates } from "@/lib/seo/canonical";
import MesasClient from "./MesasClient";

export const metadata: Metadata = {
  title: "Mesas de inglés: elige nivel y juega",
  description:
    "Elige tu nivel, escribe tu nombre y juega tú solo ocho ejercicios. Al terminar puedes volver a la web o al inicio del juego.",
  alternates: canonicalAlternates("/mesas"),
};

export default function MesasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#161326]" />}>
      <MesasClient />
    </Suspense>
  );
}
