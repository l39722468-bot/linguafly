import type { MetadataRoute } from "next";
import { getBlogArticles, getAllKeywords, slugify, normalizeCategory, getDuplicateArticleForHub, getHubContent } from "@/lib/blog";
import { authors } from "@/lib/authors";
import { phraseService } from "@/lib/phrases";
import { CAMARERO_A1_COURSE } from "@/lib/course/camarero-a1";
import { CAMARERO_A2_COURSE } from "@/lib/course/camarero-a2";
import { CAMARERO_B1_COURSE } from "@/lib/course/camarero-b1";
import { CAMARERO_B2_COURSE } from "@/lib/course/camarero-b2";
import { LOGISTICA_A1_COURSE } from "@/lib/course/logistica-a1";
import { LOGISTICA_A2_COURSE } from "@/lib/course/logistica-a2";
import { LOGISTICA_B1_COURSE } from "@/lib/course/logistica-b1";
import { LOGISTICA_B2_COURSE } from "@/lib/course/logistica-b2";
import { RECEPCIONISTA_A1_COURSE } from "@/lib/course/recepcionista-a1";
import { RECEPCIONISTA_A2_COURSE } from "@/lib/course/recepcionista-a2";
import { RECEPCIONISTA_B1_COURSE } from "@/lib/course/recepcionista-b1";
import { RECEPCIONISTA_B2_COURSE } from "@/lib/course/recepcionista-b2";
import { premiumCourseServerService } from "@/lib/services/premium-course-service.server";
import { VOCAB_SECTORS } from "@/lib/vocabulario/sectors";
import { INDEXABLE_COURSE_LANDING_PATHS } from "@/lib/course-indexing";

const baseUrl = "https://www.focus-on-english.com";

const SITE_LAUNCH_DATE = new Date("2024-09-01");
const LEGAL_DATE = new Date("2024-09-01");
const FRASES_DATE = new Date("2025-01-01");
const COURSE_DATE = new Date("2024-09-01");

type CourseUnit = { unitId?: string; id?: string | number };

function resolveUnitSlug(unit: CourseUnit): string | null {
  if (unit.unitId) return unit.unitId;
  if (typeof unit.id === "number") return `unit-${unit.id}`;
  if (typeof unit.id === "string") return unit.id;
  return null;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = getBlogArticles();
  const mostRecentArticleDate = articles.length > 0
    ? new Date(articles[0].date)
    : SITE_LAUNCH_DATE;

  const urls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: mostRecentArticleDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/aprender-ingles`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/frases-en-ingles`,
      lastModified: FRASES_DATE,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/vocabulario`,
      lastModified: mostRecentArticleDate,
      changeFrequency: "weekly",
      priority: 0.92,
    },
    {
      url: `${baseUrl}/podcasts`,
      lastModified: mostRecentArticleDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cursos-por-sector`,
      lastModified: COURSE_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ingles-para-viajar`,
      lastModified: mostRecentArticleDate,
      changeFrequency: "weekly",
      priority: 0.93,
    },
    {
      url: `${baseUrl}/aplicaciones-para-aprender-ingles`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/certificaciones-ingles-oficiales`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/herramientas/generador-firmas-email-ingles`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: mostRecentArticleDate,
      changeFrequency: "daily",
      priority: 0.98,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: mostRecentArticleDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...INDEXABLE_COURSE_LANDING_PATHS.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: mostRecentArticleDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];

  const categories = Array.from(new Set(articles.map(a => normalizeCategory(a.category))));
  urls.push(
    ...categories.map((category) => {
      const categoryArticles = articles.filter(a => normalizeCategory(a.category) === category);
      const latestDate = categoryArticles.length > 0
        ? new Date(categoryArticles[0].date)
        : SITE_LAUNCH_DATE;

      return {
        url: `${baseUrl}/blog/${category}`,
        lastModified: latestDate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    })
  );

  urls.push(
    ...articles.map((article) => ({
      url: `${baseUrl}/blog/${normalizeCategory(article.category)}/${article.slug}`,
      lastModified: new Date(article.updatedDate || article.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const keywords = getAllKeywords();
  urls.push(
    ...keywords
      .map((keyword) => {
        const keywordArticles = articles.filter(a =>
          a.keywords?.some(k => slugify(k) === slugify(keyword))
        );
        return { keyword, keywordArticles };
      })
      .filter(({ keyword, keywordArticles }) => {
        // Excluir hubs con artículo duplicado (mismo slug): el hub es noindex
        // con canonical al artículo, así que no debe entrar en el sitemap.
        const duplicate = getDuplicateArticleForHub(keyword);
        if (duplicate) return false;
        // Incluir si hay ≥3 artículos matching keyword (hub clásico) o
        // si existe archivo de hub propio con contenido indexable.
        if (keywordArticles.length >= 3) return true;
        return !!getHubContent(slugify(keyword));
      })
      .map(({ keyword, keywordArticles }) => {
        const latestDate = keywordArticles.length > 0
          ? new Date(keywordArticles[0].date)
          : mostRecentArticleDate;
        return {
          url: `${baseUrl}/blog/temas/${slugify(keyword)}`,
          lastModified: latestDate,
          changeFrequency: "weekly" as const,
          priority: 0.5,
        };
      })
  );

  urls.push(
    ...Object.keys(authors).map((slug) => {
      const authorArticles = articles.filter(
        a => a.authorData?.slug === slug
      );
      const latestDate = authorArticles.length > 0
        ? new Date(authorArticles[0].date)
        : SITE_LAUNCH_DATE;

      return {
        url: `${baseUrl}/blog/autor/${slug}`,
        lastModified: latestDate,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    })
  );

  const phraseCategories = await phraseService.getAllCategories();
  urls.push(
    ...phraseCategories.map((cat) => ({
      url: `${baseUrl}/frases-en-ingles/${cat.slug}`,
      lastModified: FRASES_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }))
  );

  urls.push(
    ...VOCAB_SECTORS.map((s) => ({
      url: `${baseUrl}/vocabulario/${s.slug}`,
      lastModified: mostRecentArticleDate,
      changeFrequency: "weekly" as const,
      priority: 0.88,
    }))
  );

  const [
    a1Course,
    a2Course,
    b1Course,
    b2Course,
    c1Course,
    c2Course,
  ] = await Promise.all([
    premiumCourseServerService.getA1UnitsWithMetadata(),
    premiumCourseServerService.getA2UnitsWithMetadata(),
    premiumCourseServerService.getB1UnitsWithMetadata(),
    premiumCourseServerService.getB2UnitsWithMetadata(),
    premiumCourseServerService.getC1UnitsWithMetadata(),
    premiumCourseServerService.getC2UnitsWithMetadata(),
  ]);

  const addCourseUrls = (
    coursePath: string,
    units: CourseUnit[],
    extras: string[] = []
  ) => {
    urls.push({
      url: `${baseUrl}${coursePath}`,
      lastModified: COURSE_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    });

    extras.forEach((extra) => {
      urls.push({
        url: `${baseUrl}${coursePath}/${extra}`,
        lastModified: COURSE_DATE,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    });

    units
      .map(resolveUnitSlug)
      .filter((slug): slug is string => Boolean(slug))
      .forEach((slug) => {
        urls.push({
          url: `${baseUrl}${coursePath}/${slug}`,
          lastModified: COURSE_DATE,
          changeFrequency: "monthly" as const,
          priority: 0.75,
        });
      });
  };

  const generalCourses = [
    {
      path: "/curso-a1",
      units: a1Course.units,
      extras: ["sesion-diaria", "practica-inteligente", "repaso", "tipografia", "test-final"],
    },
    { path: "/curso-a2", units: a2Course.units, extras: ["outline", "test-final"] },
    { path: "/curso-b1", units: b1Course.units, extras: ["outline", "test-final"] },
    { path: "/curso-b2", units: b2Course.units, extras: ["outline", "test-final"] },
    { path: "/curso-c1", units: c1Course.units, extras: ["test-final"] },
    { path: "/curso-c2", units: c2Course.units, extras: ["test-final"] },
  ];

  generalCourses.forEach((course) => {
    addCourseUrls(course.path, course.units, course.extras);
  });

  const professionalCourses = [
    { path: "/curso-camarero-a1", units: CAMARERO_A1_COURSE.units },
    { path: "/curso-camarero-a2", units: CAMARERO_A2_COURSE.units },
    { path: "/curso-camarero-b1", units: CAMARERO_B1_COURSE.units },
    { path: "/curso-camarero-b2", units: CAMARERO_B2_COURSE.units },
    { path: "/curso-logistica-a1", units: LOGISTICA_A1_COURSE.units },
    { path: "/curso-logistica-a2", units: LOGISTICA_A2_COURSE.units },
    { path: "/curso-logistica-b1", units: LOGISTICA_B1_COURSE.units },
    { path: "/curso-logistica-b2", units: LOGISTICA_B2_COURSE.units },
    { path: "/curso-recepcionista-a1", units: RECEPCIONISTA_A1_COURSE.units },
    { path: "/curso-recepcionista-a2", units: RECEPCIONISTA_A2_COURSE.units },
    { path: "/curso-recepcionista-b1", units: RECEPCIONISTA_B1_COURSE.units },
    { path: "/curso-recepcionista-b2", units: RECEPCIONISTA_B2_COURSE.units },
  ];

  professionalCourses.forEach((course) => {
    addCourseUrls(course.path, course.units);
  });

  return urls;
}
