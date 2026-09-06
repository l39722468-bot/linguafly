# Technical Specification: SEO Authority for "aplicaciones para aprender ingles"

## Context
- **Keyword**: "aplicaciones para aprender ingles" (High volume, high intent).
- **Format**: Pillar Page (Long-form content).
- **Target URL**: `/aplicaciones-para-aprender-ingles` (Clean slug for maximum weight).

## Implementation Approach
1. **New Route**: Create a dedicated page at `src/app/aplicaciones-para-aprender-ingles/page.tsx` instead of using the generic `[slug]` to allow for a custom, high-converting layout (Comparison table, rich UI).
2. **SEO Componentry**: Reuse `@/components/sections/Navigation` and Footer. Create a new `ComparisonTable` component.
3. **Structured Data**:
   - `ItemList`: For the list of applications.
   - `SoftwareApplication`: Individual schema for Focus English to highlight it as the superior choice.
   - `FAQPage`: To capture "People Also Ask" snippets.
4. **Content Structure**:
   - H1: "Las 10 Mejores Aplicaciones para Aprender Inglés en 2026 (Guía Real)"
   - Intro: Why apps are great but why a structured course is faster.
   - Comparison Table: Feature comparison (Focus English vs. Duolingo, ELSA Speak, Babbel).
   - Detailed Reviews: Pros/Cons of each, positioning Focus English as the "Best for Professional Results".

## Data Model Changes
- No DB changes required.
- Markdown content stored in `src/content/seo-pages/aplicaciones-ingles.md` for easy editing.

## Delivery Phases
1. **Phase 1**: Content drafting and keyword mapping.
2. **Phase 2**: Development of the custom page and comparison components.
3. **Phase 3**: Schema implementation and internal linking audit.

## Verification
- **Lighthouse**: Ensure SEO score is 100.
- **Schema Validator**: Validate JSON-LD at validator.schema.org.
- **Mobile Friendly**: Ensure comparison tables are responsive.
