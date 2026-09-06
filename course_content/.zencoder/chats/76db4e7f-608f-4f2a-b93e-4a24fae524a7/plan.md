# Implementation Plan - SEO & Authority Enhancements

## Phase 1: Author System & EEAT
- [x] **Task 1: Define Author Data**
  - Create `src/lib/authors.ts` with at least 2 detailed profiles (e.g., "Lidia" and "Focus English Team").
  - Update `src/lib/blog.ts` to support author lookup by slug/name.
- [x] **Task 2: Author Profile Pages**
  - Implement `src/app/blog/autor/[slug]/page.tsx`.
  - Add "Author Bio" section at the bottom of `src/app/blog/[category]/[slug]/page.tsx`.
- [x] **Task 3: SEO Schema Enhancement**
  - Update `src/lib/schemas.ts` to include `Person` schema for authors in articles.
  - Update `src/app/sitemap.ts` to include author routes.

## Phase 2: Conversion & UI
- [x] **Task 4: Conversion Widget**
  - Create `src/components/blog/CourseConversionCard.tsx` with Tailwind styling and clear CTA.
  - Integrate it into the blog article template.
- [x] **Task 5: Topic Cluster Visibility**
  - Enhance `src/components/blog/TopicClusterLinks.tsx` or similar to be more prominent.
  - Ensure "Aprender Inglés" hub is linked from all major articles.

## Phase 3: Final Verification
- [x] **Task 6: SEO Audit & Linting**
  - Verify meta titles and descriptions across key pages.
  - Run `npm run lint` and fix any issues.
  - Final visual verification with the browser.
