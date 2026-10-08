import {
  getArticleUnitVideo,
  getCourseUnitVideo,
  getInteractiveUnitVideo,
  unitNumberFromUnitId,
} from "@/lib/course/unit-videos";
import {
  isValidYoutubeId,
  isoDurationToSeconds,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
} from "@/lib/video/youtube";
import { generateVideoSchema } from "@/lib/schemas";
import { serializeSitemapXml } from "@/lib/content/sitemap";

const registry = {
  "curso-a1": {
    10: { youtubeId: "dQw4w9WgXcQ", uploadDate: "2026-10-08", duration: "PT12M30S" },
    11: { youtubeId: "not-a-real-id", uploadDate: "2026-10-08" },
  },
  "curso-camarero-a1": {
    3: { youtubeId: "abcdefghijk", uploadDate: "2026-10-08" },
  },
};

describe("course unit videos", () => {
  it("parses interactive unit ids", () => {
    expect(unitNumberFromUnitId("unit-10")).toBe(10);
    expect(unitNumberFromUnitId("7")).toBe(7);
    expect(unitNumberFromUnitId("test-final")).toBeNull();
  });

  it("ignores entries with malformed YouTube ids", () => {
    expect(isValidYoutubeId("dQw4w9WgXcQ")).toBe(true);
    expect(getCourseUnitVideo("curso-a1", 10, registry)?.youtubeId).toBe("dQw4w9WgXcQ");
    expect(getCourseUnitVideo("curso-a1", 11, registry)).toBeNull();
    expect(getCourseUnitVideo("curso-a1", 99, registry)).toBeNull();
  });

  it("resolves interactive units for general and sector courses", () => {
    expect(getInteractiveUnitVideo("curso-a1", "unit-10", registry)?.youtubeId).toBe("dQw4w9WgXcQ");
    expect(getInteractiveUnitVideo("curso-camarero-a1", "unit-3", registry)?.youtubeId).toBe("abcdefghijk");
    expect(getInteractiveUnitVideo("curso-a1", "test-final", registry)).toBeNull();
  });

  it("attaches the video to the theory article but not the workbook", () => {
    expect(
      getArticleUnitVideo("curso-a1", "unidad-10-rutinas-diarias-hora", registry)?.youtubeId,
    ).toBe("dQw4w9WgXcQ");
    expect(
      getArticleUnitVideo("curso-a1", "unidad-10-rutinas-hora-ejercicios-soluciones", registry),
    ).toBeNull();
    expect(getArticleUnitVideo("gramatica", "unidad-10-rutinas-diarias-hora", registry)).toBeNull();
  });

  it("converts ISO 8601 durations to seconds", () => {
    expect(isoDurationToSeconds("PT12M30S")).toBe(750);
    expect(isoDurationToSeconds("PT1H")).toBe(3600);
    expect(isoDurationToSeconds("PT")).toBeUndefined();
    expect(isoDurationToSeconds("12:30")).toBeUndefined();
    expect(isoDurationToSeconds(undefined)).toBeUndefined();
  });

  it("builds a VideoObject schema", () => {
    const schema = generateVideoSchema({
      name: "Rutinas diarias en inglés",
      description: "Clase de la unidad 10",
      thumbnailUrl: youtubeThumbnailUrl("dQw4w9WgXcQ"),
      uploadDate: "2026-10-08",
      duration: "PT12M30S",
      embedUrl: youtubeEmbedUrl("dQw4w9WgXcQ"),
      watchUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    });
    expect(schema).toMatchObject({
      "@type": "VideoObject",
      thumbnailUrl: ["https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"],
      uploadDate: "2026-10-08",
      duration: "PT12M30S",
      embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1",
    });
  });

  it("emits sitemap video tags", () => {
    const xml = serializeSitemapXml([
      {
        url: "https://linguafly.app/blog/curso-a1/unidad-10-rutinas-diarias-hora",
        videos: [
          {
            title: "Rutinas & hora",
            description: "Clase A1",
            thumbnail_loc: youtubeThumbnailUrl("dQw4w9WgXcQ"),
            player_loc: youtubeEmbedUrl("dQw4w9WgXcQ"),
            duration: 750,
            publication_date: "2026-10-08",
          },
        ],
      },
    ]);
    expect(xml).toContain('xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"');
    expect(xml).toContain("<video:title>Rutinas &amp; hora</video:title>");
    expect(xml).toContain("<video:duration>750</video:duration>");
    expect(xml).toContain(
      "<video:player_loc>https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&amp;modestbranding=1</video:player_loc>",
    );
  });
});
