# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/0d3065c2-b265-4d75-aa96-7d8a6f25df62/requirements.md`.

### [x] Step: Cleanup

Delete all existing blog articles to start with a clean slate.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/0d3065c2-b265-4d75-aa96-7d8a6f25df62/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/0d3065c2-b265-4d75-aa96-7d8a6f25df62/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Detailed implementation tasks generated from spec.md.

### [x] Step: Implementation

- [x] **Task 1: Create shared blog library**
  - Implement `src/lib/blog.ts` with `getBlogArticles`, `getArticleBySlug`, and `getArticlesByCategory`.
  - Define `BlogPost` interface.
  - Verification: Manual test with a dummy markdown file.

- [x] **Task 2: Create high-quality articles**
  - Create 2 SEO-optimized markdown files in `src/content/blog/` ("Guía de Viajes" and "Inglés para Trabajo").
  - Verification: Verify files exist and content is complete.

- [x] **Task 3: Refactor individual article page**
  - Update `src/app/blog/[slug]/page.tsx` to use `src/lib/blog.ts`.
  - Verification: Browse to a sample article's slug and ensure it renders correctly.

- [x] **Task 4: Refactor blog index page**
  - Update `src/app/blog/page.tsx` to fetch articles dynamically.
  - Implement dynamic category grouping and featured article logic.
  - Verification: Verify index page displays sample articles correctly by category.

- [x] **Task 5: Visual Enhancements**
  - Implement `TableOfContents` with active states.
  - Add `BlogEnhancements` (progress bar, scroll to top).
  - Modernize `ArticleCard` and layout.
  - Verification: UI looks modern and professional.

- [x] **Task 6: Final Verification**
  - Run `npm run typecheck`.
  - Run `npm run lint`.
  - Verification: All commands pass.

- [x] **Task 7: SEO Audit and Technical Implementation**
  - Create `robots.txt`.
  - Fix JSON-LD Schema (Silo paths).
  - Add metadata and canonical tags to all blog pages.
  - Implement sitemap with dynamic silo structure.

- [x] **Task 8: Complete Articles Content**
  - Enrich the 2 created articles with detailed "programmatic" sections:
    - Phrases ES-EN, Diálogos, Errores comunes.
    - CTA to trial with card.

- [x] **Task 9: Advanced Visual Enhancements**
  - Add main images to article pages.
  - Improve typography and spacing for better readability.
  - Add category subhub pages with distinct visual identity.
