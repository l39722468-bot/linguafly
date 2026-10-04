import { generateCourseSchema, generateFAQSchema } from "@/lib/schemas";
import {
  detectBlogCourseLevel,
  getRelatedCourseLevels,
} from "@/lib/seo/blog-course-recommendations";
import { getVoiceSearchSummary } from "@/lib/seo/voice-search-optimizer";

describe("blog SEO optimizations", () => {
  it("generates FAQPage data from non-empty questions and answers", () => {
    expect(
      generateFAQSchema([
        { question: "**¿Qué significa actually?**", answer: "<p>En realidad.</p>" },
        { question: " ", answer: "Sin pregunta" },
      ]),
    ).toMatchObject({
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué significa actually?",
          acceptedAnswer: { text: "En realidad." },
        },
      ],
    });
    expect(generateFAQSchema([{ question: " ", answer: " " }])).toBeNull();
  });

  it("generates truthful CEFR course data with the supplied duration and price", () => {
    const schema = generateCourseSchema({
      name: "Curso de inglés B2",
      description: "Curso de preparación de inglés de nivel B2.",
      level: "B2 del CEFR",
      goal: "inglés general B2",
      price: "0",
      url: "https://linguafly.app/curso-b2",
      courseWorkload: "PT8H",
    });

    expect(schema).toMatchObject({
      "@type": "Course",
      name: "Curso de inglés B2",
      educationalLevel: "B2 del CEFR",
      provider: { name: "Linguafly" },
      offers: { price: "0", url: "https://linguafly.app/curso-b2" },
      hasCourseInstance: {
        courseWorkload: "PT8H",
        isAccessibleForFree: true,
      },
    });
    expect(schema).not.toHaveProperty("aggregateRating");
    expect(schema).not.toHaveProperty("review");
  });

  it("prefers the article's course category and detects levels in its title", () => {
    expect(
      detectBlogCourseLevel({
        category: "curso-b2",
        title: "Phrasal verbs A1",
      }),
    ).toBe("B2");
    expect(detectBlogCourseLevel({ title: "Phrasal verbs B2 explicados" })).toBe("B2");
    expect(detectBlogCourseLevel({ title: "Gramática inglesa sin nivel indicado" })).toBeNull();
  });

  it("recommends neighboring CEFR courses and keeps edge levels valid", () => {
    expect(getRelatedCourseLevels("B2")).toEqual(["B1", "B2", "C1"]);
    expect(getRelatedCourseLevels("A1")).toEqual(["A1", "A2"]);
    expect(getRelatedCourseLevels(null)).toEqual(["A1", "B1", "C1"]);
  });

  it("prepares a direct answer summary of 40 to 60 words for voice search", () => {
    const answer =
      "En inglés, la edad se expresa con el verbo to be, no con have, porque no se describe algo que posees. Di I'm 25 o I'm 25 years old. La misma diferencia aparece en otras expresiones: se dice I'm cold para tener frío y I'm hungry para tener hambre.";
    const summary = getVoiceSearchSummary([
      { question: "¿Por qué está mal decir I have 25 years?", answer },
    ]);

    expect(summary?.question).toBe("¿Por qué está mal decir I have 25 years?");
    expect(summary?.answer.split(/\s+/).length).toBeGreaterThanOrEqual(40);
    expect(summary?.answer.split(/\s+/).length).toBeLessThanOrEqual(60);
    expect(
      getVoiceSearchSummary([
        { question: "¿Pregunta?", answer: "Una respuesta demasiado corta." },
      ]),
    ).toBeNull();
  });
});
