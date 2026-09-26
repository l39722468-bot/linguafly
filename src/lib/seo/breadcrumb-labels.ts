import { getPublicCategoryLabel } from "@/lib/site-catalog";

/** Visible breadcrumb names aligned with the hub the reader is in. */
const SECTION_LABELS: Record<string, string> = {
  gramatica: "Gramática inglesa",
  examenes: "Exámenes oficiales",
  trabajo: "Inglés para trabajar",
  viajes: "Inglés para viajar",
  metodos: "Métodos para aprender inglés",
  habilidades: "Speaking y skills",
  actualidad: "Actualidad",
  "curso-a1": "Curso de inglés A1",
  "curso-a2": "Curso de inglés A2",
  "curso-b1": "Curso de inglés B1",
  "curso-b2": "Curso de inglés B2",
  "curso-c1": "Curso de inglés C1",
  "curso-c2": "Curso de inglés C2",
};

export function breadcrumbSectionName(category: string): string {
  const key = category.toLowerCase();
  return SECTION_LABELS[key] || getPublicCategoryLabel(key).name;
}
