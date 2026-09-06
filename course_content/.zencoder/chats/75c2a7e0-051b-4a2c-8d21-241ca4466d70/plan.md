# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. [x] Review existing codebase to understand current architecture and patterns
2. [x] Analyze the feature definition and identify unclear aspects
3. [x] Create PRD
4. [x] Ask the user for clarifications on aspects that significantly impact scope or user experience
5. [x] Make reasonable decisions for minor details based on context and conventions
6. [x] If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/75c2a7e0-051b-4a2c-8d21-241ca4466d70/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/75c2a7e0-051b-4a2c-8d21-241ca4466d70/requirements.md`.

1. [x] Review existing codebase architecture and identify reusable components
2. [x] Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/75c2a7e0-051b-4a2c-8d21-241ca4466d70/spec.md` with:

- [x] Technical context (language, dependencies)
- [x] Implementation approach referencing existing code patterns
- [x] Source code structure changes
- [x] Data model / API / interface changes
- [x] Delivery phases (incremental, testable milestones)
- [x] Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/75c2a7e0-051b-4a2c-8d21-241ca4466d70/spec.md`.

1. [x] Break down the work into concrete tasks
2. [x] Each task should reference relevant contracts and include verification steps
3. [x] Replace the Implementation step below with the planned tasks

### [x] Step: Implementation

1. [x] **Audit Blog Content**: Scan all markdown files in `src/content/blog/**/*.md` to extract all featured image URLs and alt text.
2. [x] **Verify Image Accessibility**: Use `WebFetch` or manual checks to ensure all extracted Unsplash URLs are still active and accessible.
3. [x] **Standardize Frontmatter**: Add missing `alt` fields to all 25 blog posts in `src/content/blog/` to ensure SEO and accessibility.
4. [x] **UI Component Review**: Inspect `src/app/blog/[category]/[slug]/page.tsx` to confirm `priority` loading is enabled and styling (`rounded-2xl`, `shadow-lg`, `aspect-video`) is correctly applied to the featured image.
5. [x] **Final Quality Check**: Run `npm run lint` and `npm run build` to ensure no technical regressions.
6. [x] **Troubleshoot Runtime Error**: Resolved `Cannot find module` error by clearing `.next` cache and rebuilding.
7. [x] **Full Blog Standardization**: Updated `src/app/blog/page.tsx` and `src/app/blog/[category]/page.tsx` to use `next/image` and the new `alt` frontmatter fields.
9. [x] **Comprehensive Unsplash Removal**: Migrated all remaining Unsplash references in `src/app/layout.tsx`, `src/app/planes/metadata.ts`, and `src/lib/a1-visual-exercises.ts` to Pexels and updated `next.config.js` to remove the Unsplash domain.
10. [x] **Visual Consistency Audit**: Verified that all blog images rendering as gray boxes were replaced with unique, high-quality Pexels assets with distinct IDs.
