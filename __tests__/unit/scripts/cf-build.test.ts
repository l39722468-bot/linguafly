/**
 * @jest-environment node
 */
import fs from "node:fs";
import path from "node:path";
import {
  prune,
  restore,
  EXCLUDED_APP_DIRS,
  SWAPPED_FILES,
} from "../../../scripts/cf-build.mjs";

const ROOT = path.join(__dirname, "..", "..", "..");

describe("scripts/cf-build.mjs (article-only Cloudflare build prep)", () => {
  afterEach(() => {
    // Always restore, even if an assertion fails mid-test, so the repo tree
    // is never left pruned for subsequent tests or the developer's checkout.
    restore();
  });

  it("moves every excluded non-article route out of src/app and restores it", () => {
    const samplePaths = ["curso-a1", "vocabulario", path.join("api", "course")];
    for (const relDir of samplePaths) {
      expect(EXCLUDED_APP_DIRS).toContain(relDir);
      expect(fs.existsSync(path.join(ROOT, "src", "app", relDir))).toBe(true);
    }

    prune();

    for (const relDir of samplePaths) {
      expect(fs.existsSync(path.join(ROOT, "src", "app", relDir))).toBe(false);
    }

    restore();

    for (const relDir of samplePaths) {
      expect(fs.existsSync(path.join(ROOT, "src", "app", relDir))).toBe(true);
    }
  });

  it("swaps sitemap.ts and BlogExerciseMapBanner.tsx for article-only versions and restores them", () => {
    const originals = SWAPPED_FILES.map(({ swapped }) =>
      fs.readFileSync(path.join(ROOT, swapped), "utf-8")
    );

    prune();

    SWAPPED_FILES.forEach(({ swapped, cf }, i) => {
      const swappedContent = fs.readFileSync(path.join(ROOT, swapped), "utf-8");
      const cfContent = fs.readFileSync(path.join(ROOT, cf), "utf-8");
      expect(swappedContent).toBe(cfContent);
      expect(swappedContent).not.toBe(originals[i]);
    });

    restore();

    SWAPPED_FILES.forEach(({ swapped }, i) => {
      expect(fs.readFileSync(path.join(ROOT, swapped), "utf-8")).toBe(originals[i]);
    });
  });

  it("does not leave a .cf-excluded backup directory behind after restore", () => {
    prune();
    restore();
    expect(fs.existsSync(path.join(ROOT, ".cf-excluded"))).toBe(false);
  });
});
