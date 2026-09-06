# Technical Specification: SEO Audit and Enhancements

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Content**: Markdown via `gray-matter`
- **Styling**: Tailwind CSS Typography (`prose`)
- **Metadata**: Next.js `generateMetadata` API
- **Schemas**: Custom JSON-LD generation in `src/lib/schemas.ts`

## Implementation Approach

### 1. Markdown Parser Enhancement
Currently, `src/app/blog/[category]/[slug]/page.tsx` uses basic regex replacements for markdown. This is brittle and misses features like image `alt` tags and proper nesting.
- **Goal**: Improve the `htmlContent` generation to support `alt` text for images and ensure semantic HTML.
- **Action**: Update the regex patterns or introduce a lightweight markdown-to-html helper that prioritizes SEO (e.g., adding `loading="lazy"` to images and descriptive `alt`).

### 2. Schema.org Improvements
- **Goal**: Enrich `Article` schema.
- **Action**: Update `generateArticleSchema` in `src/lib/schemas.ts` to include:
    - `mainEntityOfPage` with absolute URLs.
    - `publisher` logo validation.
    - Proper `author` object structure.

### 3. Automated SEO Auditor Script
- **Goal**: Create a utility to audit all blog posts for SEO readiness.
- **Action**: Create `scripts/audit-blog-seo.mjs` to check:
    - Missing frontmatter fields (excerpt, keywords, image).
    - Image `alt` text presence in content.
    - Heading hierarchy (no skipping levels).
    - Link health (relative vs absolute).

### 4. Metadata Optimization
- **Goal**: Ensure "2026" inclusion and metadata consistency.
- **Action**: Refine the `generateMetadata` function to ensure high-click-through-rate (CTR) titles and descriptions.

## Source Code Changes
- `src/lib/schemas.ts`: Update `ArticleSchemaProps` and `generateArticleSchema`.
- `src/app/blog/[category]/[slug]/page.tsx`: Refactor markdown-to-html logic and metadata generation.
- `scripts/audit-blog-seo.mjs`: New script for ongoing audits.

## Verification Plan
- **Lint**: `npm run lint`
- **Manual Audit**: Run `node scripts/audit-blog-seo.mjs` and fix reported issues.
- **Schema Validation**: Use Schema Markup Validator on generated JSON-LD.
