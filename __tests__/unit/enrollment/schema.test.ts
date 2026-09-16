/**
 * @jest-environment node
 */
import { getEnrollableCourse, isEnrollableCourseId } from "@/lib/enrollment/catalog";
import { parseEnrollmentRequest } from "@/lib/enrollment/schema";

describe("enrollment catalog and payload", () => {
  it("accepts the CEFR and sector course ids", () => {
    expect(isEnrollableCourseId("ingles-a1")).toBe(true);
    expect(isEnrollableCourseId("recepcionista-b2")).toBe(true);
    expect(isEnrollableCourseId("ingles-z9")).toBe(false);
    expect(getEnrollableCourse("ingles-b1")?.blogHref).toBe("/blog/curso-b1");
  });

  it("normalizes email and rejects missing privacy consent", () => {
    const parsed = parseEnrollmentRequest({
      firstName: " Ana ",
      lastName: "López",
      email: "Ana@Linguafly.APP",
      courseId: "ingles-a1",
      privacyConsent: true,
    });
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.value.email).toBe("ana@linguafly.app");
      expect(parsed.value.firstName).toBe("Ana");
      expect(parsed.value.course.id).toBe("ingles-a1");
      expect(parsed.honeypot).toBe(false);
    }

    const denied = parseEnrollmentRequest({
      firstName: "Ana",
      email: "ana@linguafly.app",
      courseId: "ingles-a1",
      privacyConsent: false,
    });
    expect(denied.ok).toBe(false);
  });

  it("rejects unknown courses and flags honeypots without failing validation", () => {
    const unknown = parseEnrollmentRequest({
      firstName: "Ana",
      email: "ana@linguafly.app",
      courseId: "curso-inventado",
      privacyConsent: true,
    });
    expect(unknown.ok).toBe(false);

    const bot = parseEnrollmentRequest({
      firstName: "Ana",
      email: "ana@linguafly.app",
      courseId: "ingles-a2",
      privacyConsent: true,
      website: "https://spam.example",
    });
    expect(bot.ok).toBe(true);
    if (bot.ok) expect(bot.honeypot).toBe(true);
  });
});
