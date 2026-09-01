import {
  isSpanishCourseCategory,
  localeFromPathname,
} from "@/lib/site-locales";

describe("localeFromPathname", () => {
  it("treats the Spanish home and the rest of the site as ES", () => {
    expect(localeFromPathname("/")).toBe("es");
    expect(localeFromPathname("/blog")).toBe("es");
    expect(localeFromPathname("/blog/curso-a1")).toBe("es");
    expect(localeFromPathname(null)).toBe("es");
  });

  it("treats /en as the English home", () => {
    expect(localeFromPathname("/en")).toBe("en");
    expect(localeFromPathname("/en/")).toBe("en");
  });

  it("treats Spanish-course blog paths as the English surface", () => {
    expect(localeFromPathname("/blog/curso-espanol-a1")).toBe("en");
    expect(localeFromPathname("/blog/curso-espanol-a1/unidad-1-greetings-names-ser")).toBe(
      "en"
    );
  });
});

describe("isSpanishCourseCategory", () => {
  it("matches curso-espanol categories only", () => {
    expect(isSpanishCourseCategory("curso-espanol-a1")).toBe(true);
    expect(isSpanishCourseCategory("curso-a1")).toBe(false);
    expect(isSpanishCourseCategory("gramatica")).toBe(false);
  });
});
