import { z } from 'zod';
import phrasesData from '@/content/phrases/seo-phrases.json';

export const PhraseCategorySchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string().nullable().transform(val => val || ''),
  h1_title: z.string().nullable().transform(val => val || ''),
  content_top: z.string().nullable().transform(val => val || ''),
  content_bottom: z.string().nullable().transform(val => val || ''),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).nullable().default([]),
  keywords: z.array(z.string()).nullable().default([]),
});

export const PhraseSchema = z.object({
  id: z.string(),
  phrase_en: z.string(),
  phrase_es: z.string(),
  category_slug: z.string(),
  tags: z.array(z.string()).nullable().default([]),
  audio_url: z.string().nullable(),
  difficulty_level: z.string().nullable(),
  usage_context: z.string().nullable(),
  order_index: z.number(),
});

export type PhraseCategory = z.infer<typeof PhraseCategorySchema>;
export type Phrase = z.infer<typeof PhraseSchema>;

const CATEGORIES: PhraseCategory[] = phrasesData.categories.map((cat) =>
  PhraseCategorySchema.parse(cat)
);
const PHRASES: Phrase[] = phrasesData.phrases.map((phrase) =>
  PhraseSchema.parse(phrase)
);

export const phraseService = {
  async getAllCategories(): Promise<PhraseCategory[]> {
    return CATEGORIES;
  },

  async getCategoryBySlug(slug: string): Promise<PhraseCategory | null> {
    return CATEGORIES.find((c) => c.slug === slug) ?? null;
  },

  async getPhrasesByCategory(slug: string): Promise<Phrase[]> {
    return PHRASES
      .filter((p) => p.category_slug === slug)
      .sort((a, b) => a.order_index - b.order_index);
  },
};
