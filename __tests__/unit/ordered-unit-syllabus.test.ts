import fs from "fs";
import path from "path";
import { premiumCourseServerService } from "@/lib/services/premium-course-service.server";
import {
  B2_ORDERED_UNITS,
  C1_ORDERED_UNITS,
  unitNumberFromCourseFile,
} from "@/lib/course/ordered-unit-syllabus";
import { getTheoryPathForCourseUnit } from "@/lib/seo/article-paths";
import { groupUnitsIntoModules } from "@/lib/utils/module-grouping";

function titlesFromIndex(relativePath: string): Map<number, string> {
  const source = fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
  const found = source.matchAll(/\{\s*id:\s*(\d+)\s*,\s*title:\s*'((?:\\'|[^'])*)'/g);
  const titles = new Map<number, string>();
  for (const match of found) {
    titles.set(Number(match[1]), match[2].replace(/\\'/g, "'"));
  }
  return titles;
}

describe("B2 and C1 unit order", () => {
  it("reads the unit number from the filename, not the first digit", () => {
    expect(unitNumberFromCourseFile("unit10.json")).toBe(10);
    expect(unitNumberFromCourseFile("unit2.json")).toBe(2);
    expect(unitNumberFromCourseFile("b2-unit-10.json")).toBe(10);
  });

  it("keeps B2 titles on the same sequence as the course, units 1 to 60", () => {
    const titles = titlesFromIndex("src/lib/course/b2/index.ts");
    expect(B2_ORDERED_UNITS.map((unit) => unit.id)).toEqual(
      Array.from({ length: 60 }, (_, index) => index + 1),
    );
    for (const unit of B2_ORDERED_UNITS) {
      expect(unit.title).toBe(titles.get(unit.id));
    }
    expect(B2_ORDERED_UNITS[0]?.title).toBe("Repaso B1 → B2");
    expect(B2_ORDERED_UNITS[9]?.title).toBe("Repaso 6–9");
    expect(B2_ORDERED_UNITS.some((unit) => unit.id > 60)).toBe(false);
  });

  it("keeps C1 titles on the same sequence as the course, units 1 to 70", () => {
    const titles = titlesFromIndex("src/lib/course/c1/index.ts");
    expect(C1_ORDERED_UNITS.map((unit) => unit.id)).toEqual(
      Array.from({ length: 70 }, (_, index) => index + 1),
    );
    for (const unit of C1_ORDERED_UNITS) {
      expect(unit.title).toBe(titles.get(unit.id));
    }
    expect(C1_ORDERED_UNITS[0]?.title).toContain("Personal Identity");
    expect(C1_ORDERED_UNITS[10]?.title).toBe("Education and Learning");
    expect(C1_ORDERED_UNITS[69]?.title).toContain("Discourse Cohesion");
  });

  it("lists the B2 course like A1: unit 1, then 2, through 60, each with its lesson", async () => {
    const course = await premiumCourseServerService.getB2UnitsWithMetadata();
    expect(course.totalUnits).toBe(60);
    expect(course.units.map((unit) => unit.unitNumber)).toEqual(
      Array.from({ length: 60 }, (_, index) => index + 1),
    );
    expect(course.units[0]?.title).toBe("Repaso B1 → B2");
    expect(course.units[1]?.title).toBe("Future Tenses & Work");
    expect(course.units[9]?.title).not.toBe("Unit 10");
    expect(course.units.every((unit) => unit.exerciseCount > 0)).toBe(true);
    expect(course.totalDuration).toBe(
      course.units.reduce((sum, unit) => sum + unit.estimatedDuration, 0),
    );
    for (const unit of course.units) {
      expect(getTheoryPathForCourseUnit("b2", unit.unitNumber)).toMatch(
        new RegExp(`/blog/curso-b2/unidad-${unit.unitNumber}-`),
      );
    }
  });

  it("lists all 70 C1 lessons in order, grouped by the real modules", async () => {
    const course = await premiumCourseServerService.getC1UnitsWithMetadata();
    expect(course.totalUnits).toBe(70);
    expect(course.units[0]?.title).toContain("Personal Identity");
    expect(course.units[0]?.title).not.toBe("Advanced Emphasis and Focus");
    expect(course.units[10]?.unitNumber).toBe(11);
    expect(course.units[69]?.unitNumber).toBe(70);
    expect(course.units[0]?.exerciseCount).toBe(90);
    expect(course.units[10]?.exerciseCount).toBe(15);

    const modules = groupUnitsIntoModules(course.units, { courseId: "ingles-c1" });
    expect(modules[0]?.units.map((unit) => unit.unitNumber)).toEqual(
      Array.from({ length: 10 }, (_, index) => index + 1),
    );
    expect(modules[1]?.units[0]?.unitNumber).toBe(11);
    expect(modules[modules.length - 1]?.units.map((unit) => unit.unitNumber)).toEqual(
      Array.from({ length: 10 }, (_, index) => index + 61),
    );
    for (const unit of course.units) {
      expect(getTheoryPathForCourseUnit("c1", unit.unitNumber)).toMatch(
        new RegExp(`/blog/curso-c1/unidad-${unit.unitNumber}-`),
      );
    }
  });
});
