# Technical Specification - SEO & Authority Enhancements

## 1. Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Content**: Markdown-based blog posts in `src/content/blog`
- **UI**: Tailwind CSS, Lucide React icons

## 2. Implementation Approach

### 2.1. Author System (EEAT)
- **Data Structure**: Create `src/lib/authors.ts` to store author data (name, bio, image, social links, expertise).
- **Author Pages**: Implement `src/app/blog/autor/[slug]/page.tsx` to display author details and their articles.
- **Integration**: Update `BlogPost` interface in `src/lib/blog.ts` to support author slugs and link them to the full profile.

### 2.2. Conversion Optimization
- **CourseConversionCard**: Create a high-conversion component in `src/components/blog/CourseConversionCard.tsx` that accepts a `courseType` prop (via category) to show tailored offers.
- **Integration**: Insert this card automatically at the end of articles and optionally via a custom Markdown component.

### 2.3. Schema & SEO Refinement
- **Enhanced Schemas**: Update `generateArticleSchema` in `src/lib/schemas.ts` to use `Person` for authors instead of just `Organization`.
- **Breadcrumbs**: Ensure all blog-related breadcrumbs correctly reflect the hierarchy.
- **Title Optimization**: Use `optimizeSEOTitle` utility to ensure titles are under 60 characters and include primary keywords.

## 3. Source Code Changes

### New Files
- `src/lib/authors.ts`: Author database.
- `src/app/blog/autor/[slug]/page.tsx`: Individual author profile pages.
- `src/components/blog/CourseConversionCard.tsx`: Reusable conversion widget.

### Modified Files
- `src/lib/blog.ts`: Update `getBlogArticles` to link authors.
- `src/lib/schemas.ts`: Enhance JSON-LD generators.
- `src/app/blog/[category]/[slug]/page.tsx`: Update article layout to show author bio and conversion cards.
- `src/app/sitemap.ts`: Add author pages to sitemap.

## 4. Verification Plan
- **Linting**: Run `npm run lint`.
- **Visual Check**: Use browser tool to verify author pages and conversion cards.
- **Schema Validation**: Verify JSON-LD output in the browser console or via Rich Results Test patterns.
