import { SITE_BRAND_NAME } from './site-brand';

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

const LINGUAFLY_TEAM: Author = {
  slug: 'linguafly-team',
  name: `Equipo ${SITE_BRAND_NAME}`,
  role: 'Equipo editorial',
  bio: `${SITE_BRAND_NAME} es un proyecto editorial independiente centrado en resolver dudas de inglés a hispanohablantes. Cada artículo se basa en materiales oficiales de referencia (Cambridge English, British Council, Oxford Languages, EOI y marco común CEFR), se revisa contra fuentes cruzadas y se adapta al registro y los errores típicos del estudiante hispanohablante adulto. Publicamos bajo la firma del equipo por transparencia: el contenido es el producto del trabajo editorial conjunto, no de un autor individual.`,
  image: '/icon.svg',
  expertise: [
    'Gramática inglesa',
    'Exámenes oficiales (Cambridge, IELTS, TOEFL, Aptis)',
    'Inglés profesional y para viajar',
    'Pronunciación y acentos',
  ],
};

export const authors: Record<string, Author> = {
  'linguafly-team': LINGUAFLY_TEAM,
};

export function getAuthor(nameOrSlug: string): Author {
  const normalized = nameOrSlug.toLowerCase().replace(/\s+/g, '-');
  if (normalized === 'focus-english-team' || normalized === 'focus-english' || normalized === 'linguafly') {
    return LINGUAFLY_TEAM;
  }
  return authors[normalized] || LINGUAFLY_TEAM;
}
