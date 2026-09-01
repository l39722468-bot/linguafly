import { getArticlesByCategory } from "@/lib/blog";
import { SPANISH_COURSE_A1_HREF, SPANISH_COURSE_A1_UNIT1_HREF } from "@/lib/site-locales";

export function getSpanishCourseHomeArticles(limit = 3) {
  return getArticlesByCategory("curso-espanol-a1").slice(0, limit);
}

export const ENGLISH_HOME_LEVELS = [
  {
    level: "A1",
    title: "Breakthrough",
    href: SPANISH_COURSE_A1_HREF,
    status: "available" as const,
    desc: "Greetings, identity, present tense, and everyday transactions. Unit 1 is live.",
  },
  {
    level: "A2",
    title: "Waystage",
    href: "/en#levels",
    status: "soon" as const,
    desc: "Past tenses, commands, and everyday narration. Syllabus ready; articles next.",
  },
  {
    level: "B1",
    title: "Threshold",
    href: "/en#levels",
    status: "soon" as const,
    desc: "Connected past narration, opinions, and present subjunctive.",
  },
  {
    level: "B2",
    title: "Vantage",
    href: "/en#levels",
    status: "soon" as const,
    desc: "Argument, hypothesis, and register — aligned with DELE B2.",
  },
  {
    level: "C1",
    title: "Effective operational",
    href: "/en#levels",
    status: "soon" as const,
    desc: "Precise register, complex syntax, and demanding texts.",
  },
  {
    level: "C2",
    title: "Mastery",
    href: "/en#levels",
    status: "soon" as const,
    desc: "Style, nuance, and near-native control.",
  },
] as const;

export const ENGLISH_HOME_UNIT1 = SPANISH_COURSE_A1_UNIT1_HREF;
export const ENGLISH_HOME_A1_HUB = SPANISH_COURSE_A1_HREF;
