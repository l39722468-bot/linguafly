export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
  social?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export const authors: Record<string, Author> = {
  "focus-english-team": {
    slug: "focus-english-team",
    name: "Equipo Focus English",
    role: "Equipo editorial",
    bio: "Focus English es un proyecto editorial independiente centrado en resolver dudas de inglés a hispanohablantes. Cada artículo se basa en materiales oficiales de referencia (Cambridge English, British Council, Oxford Languages, EOI y marco común CEFR), se revisa contra fuentes cruzadas y se adapta al registro y los errores típicos del estudiante hispanohablante adulto. Publicamos bajo la firma del equipo por transparencia: el contenido es el producto del trabajo editorial conjunto, no de un autor individual.",
    image: "/icon.svg",
    expertise: [
      "Gramática inglesa",
      "Exámenes oficiales (Cambridge, IELTS, TOEFL, Aptis)",
      "Inglés profesional y para viajar",
      "Pronunciación y acentos",
    ],
  },
};

export function getAuthor(nameOrSlug: string): Author {
  const normalized = nameOrSlug.toLowerCase().replace(/\s+/g, "-");
  return authors[normalized] || authors["focus-english-team"];
}
