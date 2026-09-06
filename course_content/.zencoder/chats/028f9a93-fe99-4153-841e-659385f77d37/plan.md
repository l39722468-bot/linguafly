# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements
### [x] Step: Technical Specification
### [x] Step: Planning

### Implementation Tasks

- [x] **Task 1: Fix Canonical Tags**
  - Search and replace `https://focusonenglish.ai/` with `https://www.focus-on-english.com/` in all markdown files in `src/content/blog/`.
  - Verification: Done. Only one instance found and fixed in `vocabulario-b1-ingles-trabajo.md`.

- [x] **Task 2: Fix Broken Internal Links**
  - Identify all `(/blog/...)` links in markdown files.
  - Verify they use the correct category.
  - Fixes:
    - `guia-maestra-reported-speech.md`: Fixed link to `reported-speech-cambridge-exams`.
    - `reported-speech-cambridge-exams.md`: Fixed link to `guia-maestra-reported-speech`.
    - `vocabulario-b1-ingles-trabajo.md`: Fixed links to `cursos-online-ingles-b1`.
    - `guia-b2-first-fce.md`: Fixed broken link `trucos-writing-b2-first` -> `cambridge-b2-first-guia`.
  - Verification: Done.

- [x] **Task 3: Update Metadata for Missing Articles**
  - Modify `src/app/blog/[category]/[slug]/page.tsx` to handle `!article` in `generateMetadata` by returning `robots: 'noindex'`.
  - Added similar logic to `src/app/blog/[category]/page.tsx`.
  - Verification: Done.

- [x] **Task 4: Final Sitemap Verification**
  - Run `npm run build` and ensure no errors.
  - Verify `src/app/sitemap.ts` logic.
  - Verification: Sitemap logic uses normalized categories from actual articles, ensuring consistency with page canonicals.
