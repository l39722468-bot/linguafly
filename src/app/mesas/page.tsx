import { Suspense } from "react";
import type { Metadata } from "next";
import { canonicalAlternates } from "@/lib/seo/canonical";
import MesasClient from "./MesasClient";

export const metadata: Metadata = {
  title: "Mesas de inglés: elige nivel y juega",
  description:
    "Elige tu nivel y tu nombre. Juega con otras personas de ese nivel o haz tú solo ocho ejercicios. Si nadie llega, puedes pasar a una partida individual.",
  alternates: canonicalAlternates("/mesas"),
};

export default function MesasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#161326]" />}>
      <MesasClient />
    </Suspense>
  );
}
