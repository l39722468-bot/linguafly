import { localeFromPathname } from "@/lib/site-locales";

describe("localeFromPathname", () => {
  it("treats every route as part of the unified Spanish site", () => {
    expect(localeFromPathname("/")).toBe("es");
    expect(localeFromPathname("/blog")).toBe("es");
    expect(localeFromPathname("/fitness")).toBe("es");
    expect(localeFromPathname(null)).toBe("es");
  });
});
