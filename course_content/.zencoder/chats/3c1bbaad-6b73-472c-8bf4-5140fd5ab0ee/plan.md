# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/3c1bbaad-6b73-472c-8bf4-5140fd5ab0ee/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/3c1bbaad-6b73-472c-8bf4-5140fd5ab0ee/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/3c1bbaad-6b73-472c-8bf4-5140fd5ab0ee/spec.md`.

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/3c1bbaad-6b73-472c-8bf4-5140fd5ab0ee/spec.md`.

### Implementation Tasks

#### Phase 1: Content Foundation (Pillar Page)
- [x] **Task 1: Create Pillar Page Markdown**: Create `src/content/seo-pages/cursos-online-ingles-b1.md` with comprehensive content and metadata.
  - *Verification*: Ensure file exists and frontmatter is valid.
- [x] **Task 2: Implement Course and FAQ Schema**: Add JSON-LD schema to the pillar page content or component.
  - *Verification*: Use a Rich Results Test tool (simulated) or check `<script type="application/ld+json">` in output.

#### Phase 2: Cluster Expansion (Supporting Pages)
- [x] **Task 3: Create Supporting Page - Cambridge/Aptis**: Create `src/content/seo-pages/rutas/preparacion-examen-b1-cambridge.md`.
  - *Verification*: Verify link to `/cursos-online-ingles-b1` is present.
- [x] **Task 4: Create Supporting Page - Grammar**: Create `src/content/seo-pages/rutas/gramatica-ingles-b1-guia.md`.
  - *Verification*: Verify internal linking.
- [x] **Task 5: Create Supporting Page - Vocabulary**: Create `src/content/seo-pages/rutas/vocabulario-b1-ingles-trabajo.md`.
  - *Verification*: Verify internal linking.

#### Phase 3: Technical Verification & Refinement
- [x] **Task 6: Verify Internal Linking Graph**: Ensure all new pages are correctly linked and indexed by the `getSEOPageBySlug` service.
  - *Verification*: Check if pages are reachable via their slugs.
- [x] **Task 7: Final QA & Linting**: Run project-wide checks.
  - *Verification*: `npm run lint` and `npm run typecheck` pass (ignoring pre-existing project-wide warnings, but ensuring `src/app/[slug]/page.tsx` is clean).
