import { uniqueSearchQueries, visibleSearchPhrases } from "@/lib/seo/search-queries";

describe("uniqueSearchQueries", () => {
  it("adds or / versus / v variants for comparison titles", () => {
    const queries = uniqueSearchQueries({
      title: "Present Perfect vs Past Simple: Diferencias y Uso",
      keywords: [
        "Present Perfect vs Past Simple: Diferencias y Uso",
        "ejercicios de inglés gratis",
        "difference between present perfect and past simple",
      ],
    }).map((query) => query.toLowerCase());
    expect(queries).toContain("present perfect or past simple");
    expect(queries).toContain("present perfect versus past simple");
    expect(queries).toContain("present perfect v past simple");
    expect(queries).toContain("difference between present perfect and past simple");
    expect(queries).not.toContain("ejercicios de inglés gratis");
  });

  it("adds for and since variants from since o for titles", () => {
    const queries = uniqueSearchQueries({
      title: "¿Since o For? Cómo Usarlos con el Present Perfect",
      keywords: ["for since cuando usar"],
    }).map((query) => query.toLowerCase());
    expect(queries).toEqual(
      expect.arrayContaining(["since or for", "for and since", "since for"]),
    );
  });

  it("adds unaccented inglés variants that people actually type", () => {
    const queries = uniqueSearchQueries({
      title: "Condicionales en Inglés",
      keywords: ["tipos de condicionales en inglés con ejemplos"],
    }).map((query) => query.toLowerCase());
    expect(queries).toContain("tipos de condicionales en inglés con ejemplos");
    expect(queries).toContain("tipos de condicionales en ingles con ejemplos");
  });

  it("does not turn Spanish subtitles into fake English queries", () => {
    const queries = uniqueSearchQueries({
      title: "Will vs Going To: Diferencias y Ejemplos",
      keywords: ["will going to diferencia ingles"],
    }).map((query) => query.toLowerCase());
    expect(queries).toContain("will or going to");
    expect(queries).not.toContain("diferencias or ejemplos");
    expect(queries).not.toContain("diferencias and ejemplos");
  });

  it("keeps when/while even if they sit after a colon in the title", () => {
    const queries = uniqueSearchQueries({
      title: "Past Simple + Past Continuous: When y While Explicados (A2)",
      keywords: ["when while inglés", "when and while exercises"],
    }).map((query) => query.toLowerCase());
    expect(queries).toEqual(
      expect.arrayContaining(["when and while", "when while", "when and while exercises"]),
    );
  });

  it("visibleSearchPhrases keeps every article keyword on the page", () => {
    const keywords = [
      "The Weather A2: Vocabulario, Pronóstico y Predicciones",
      "sunny rainy cloudy",
      "it's going to rain",
      "inglés A2 unidad 44",
      "weather forecast English",
      "temperature Celsius",
      "what's the weather like",
      "sunny cloudy windy",
      "weather forecast English A2",
      "ejercicios de inglés gratis",
    ];
    const phrases = visibleSearchPhrases({
      title: "The Weather A2: Vocabulario, Pronóstico y Predicciones",
      keywords,
    });
    const lowered = phrases.map((item) => item.toLowerCase());
    expect(lowered).toContain("what's the weather like");
    expect(lowered).toContain("weather forecast english a2");
    expect(lowered).toContain("the weather a2: vocabulario, pronóstico y predicciones");
    expect(lowered).not.toContain("ejercicios de inglés gratis");
  });
});
