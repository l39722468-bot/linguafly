# Implementation Plan: Phrases Section Improvements

## Phase 1: Requirements & Design
- [x] Review existing codebase for phrases section navigation and architecture
- [x] Identify missing links and navigation improvements for SEO/Domain Authority
- [x] Create PRD for Phrases section improvements
- [x] Create Technical Specification

## Phase 2: Implementation

### 1. Add Phrases Hub to Learn English Pillar Pages
- [x] Modify `src/app/aprender-ingles/page.tsx` to include "Frases en Inglés" in the pillar topics grid.
- [x] Ensure consistent styling and iconography.
- [x] Verification: Check that the card appears and links to `/frases-en-ingles`.

### 2. Update Global Navigation
- [x] Add "Frases" link to `src/components/sections/Navigation.tsx` (Desktop).
- [x] Add "Frases" link to `src/components/sections/Navigation.tsx` (Mobile).
- [x] Verification: Check navigation visibility and link functionality on both desktop and mobile.

### 3. Improve Internal Linking in Phrase Category Pages
- [x] Modify `src/app/frases-en-ingles/[slug]/page.tsx` to add a "Recommended Course" section.
- [x] Verification: Check that relevant courses are linked at the bottom of category pages.

## Phase 3: Final Review & Testing
- [x] Run `npm run lint` to ensure no errors (Verified modified files).
- [x] Final manual review of all "Frases" related navigation.
- [x] Fixed production 404 by adding `force-dynamic` and updating seed script.
- [x] Refactored `phraseService` to use `createServerClient` for server-side fetching.
- [x] Ensure database migrations are applied to production.
- [x] Seed production data using `scripts/seed-seo-content.mjs`.
- [x] Push changes and verify deployment.
- [x] Remove "Practicar con IA" button from category pages (UX cleanup).
- [x] Expand content to ~100 phrases per category for SEO (Current: 100).
- [x] Update `plan.md` with completion.
