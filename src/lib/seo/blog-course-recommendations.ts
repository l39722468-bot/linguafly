export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

const CEFR_LEVELS: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
const LEVEL_PATTERN = /\b(A1|A2|B1|B2|C1|C2)\b/i;

export function detectBlogCourseLevel(input: {
  category?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
}): CEFRLevel | null {
  const categoryLevel = input.category?.match(/^curso-(a1|a2|b1|b2|c1|c2)$/i)?.[1];
  if (categoryLevel) return categoryLevel.toUpperCase() as CEFRLevel;

  for (const text of [input.slug, input.title, input.excerpt, input.content]) {
    const level = text?.match(LEVEL_PATTERN)?.[1];
    if (level) return level.toUpperCase() as CEFRLevel;
  }

  return null;
}

export function getRelatedCourseLevels(level: CEFRLevel | null): CEFRLevel[] {
  if (!level) return ["A1", "B1", "C1"];
  const index = CEFR_LEVELS.indexOf(level);
  return CEFR_LEVELS.slice(Math.max(0, index - 1), Math.min(CEFR_LEVELS.length, index + 2));
}
