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
  bio: `${SITE_BRAND_NAME} es un proyecto editorial independiente. Publicamos artículos prácticos de idiomas, alimentación, entrenamiento e inteligencia artificial. El contenido sale firmado por el equipo: es trabajo editorial conjunto, no de un autor individual.`,
  image: '/icon.svg',
  expertise: [
    'Idiomas y hábitos de estudio',
    'Alimentación cotidiana',
    'Entrenamiento de fuerza y progresión',
    'Uso práctico de inteligencia artificial',
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
