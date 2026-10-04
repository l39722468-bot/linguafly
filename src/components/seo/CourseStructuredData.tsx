import { JsonLd } from "@/components/seo/JsonLd";
import { generateCourseSchema } from "@/lib/schemas";
import { getAbsoluteUrl } from "@/lib/site-brand";
import type { CEFRLevel } from "@/lib/seo/blog-course-recommendations";

interface CourseStructuredDataProps {
  level: CEFRLevel;
  description: string;
  durationMinutes: number;
}

export function CourseStructuredData({
  level,
  description,
  durationMinutes,
}: CourseStructuredDataProps) {
  const route = `/curso-${level.toLowerCase()}`;
  const durationHours = Math.max(1, Math.round(durationMinutes / 60));

  return (
    <JsonLd
      data={generateCourseSchema({
        name: `Curso de inglés ${level}`,
        description,
        level: `${level} del Marco Común Europeo (CEFR)`,
        goal: `inglés general de nivel ${level}`,
        price: "0",
        url: getAbsoluteUrl(route),
        courseWorkload: `PT${durationHours}H`,
      })}
    />
  );
}
