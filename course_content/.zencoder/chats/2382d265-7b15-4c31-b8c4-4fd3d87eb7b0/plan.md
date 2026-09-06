# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/2382d265-7b15-4c31-b8c4-4fd3d87eb7b0/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/2382d265-7b15-4c31-b8c4-4fd3d87eb7b0/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/2382d265-7b15-4c31-b8c4-4fd3d87eb7b0/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/2382d265-7b15-4c31-b8c4-4fd3d87eb7b0/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

### [x] Step: Implementation

1. **[x] Task 1: Content Creation**
   - Create `src/content/seo-pages/aplicaciones-ingles.md` with high-quality copy, keyword optimization, and app reviews.
   - *Verification*: Manual review of SEO keyword density and readability.

2. **[x] Task 2: Pillar Page Implementation**
   - Create `src/app/aplicaciones-para-aprender-ingles/page.tsx`.
   - Implement metadata, breadcrumbs, and layout.
   - *Verification*: Access `/aplicaciones-para-aprender-ingles` and verify layout.

3. **[x] Task 3: Structured Data & SEO Optimization**
   - Add `SoftwareApplication`, `ItemList`, and `FAQPage` schemas to the page.
   - Add internal links from the homepage or relevant blog posts.
   - *Verification*: Validate JSON-LD with Schema Markup Validator.

4. **[x] Task 4: SEO Pillar Page Audit**
   - Run `npm run lint` and `npm run build` to ensure no regressions.
   - *Verification*: Successful production build (Lint and Type-check passed for new files).

5. **[x] Task 5: 404 Error Remediation**
   - [x] Identify broken links and missing pages.
   - [x] Create `/privacidad` and `/terminos` pages.
   - [x] Update footer and legal references.
   - [x] Clean up `robots.ts` and update `sitemap.ts`.
   - [x] Run final verification and push changes.

6. **[x] Task 6: SEO Content Cluster**
   - [x] Create cluster articles for the blog targeting long-tail keywords.
   - [x] Implement internal linking from new articles to the Pillar Page.
   - [x] Update blog content management to support new articles.
   - [x] Verification: Verify links and SEO metadata in the new blog posts.

7. **[x] Task 7: Fix Specific 404/301 SEO Routes**
   - [x] Resolve 301 for `curso-ingles-aprender-ingles`.
   - [x] Fix 404 for `curso-ingles-trabajo`.
   - [x] Fix 404 for `curso-ingles-viajar`.
   - [x] Update `manualMapping` in `[slug]/page.tsx` for dynamic SEO routes.
   - [x] Fix Global Canonical tag in `layout.tsx` to allow site-wide indexing.
   - [x] Verification: Verify all routes resolve and Google indexing block is removed.

8. **[x] Task 8: Deepen SEO Strategy & Conversion**
   - [x] Create additional cluster articles (mejores-apps-ingles-ia-2025, ielts-vs-toefl-diferencias).
   - [x] Add SoftwareApplication JSON-LD schema to the Email Signature Generator.
   - [x] Clean up unused imports and escape entities in Tool components.
   - [x] Verification: Successful build and schema validation.
