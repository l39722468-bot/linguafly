# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/31673b9c-302c-4ebf-9fa0-35141ade9495/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/31673b9c-302c-4ebf-9fa0-35141ade9495/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/31673b9c-302c-4ebf-9fa0-35141ade9495/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/31673b9c-302c-4ebf-9fa0-35141ade9495/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

### [x] Step: Implementation

#### Phase 1: Infrastructure & Schema
- [x] Update `generateArticleSchema` in `src/lib/schemas.ts` to improve rich results.
- [x] Create SEO Audit script `scripts/audit-blog-seo.mjs`.

#### Phase 2: Content Audit & Fixes
- [x] Run `node scripts/audit-blog-seo.mjs` to identify gaps.
- [x] Update blog content (markdown files) to fill missing SEO metadata.

#### Phase 3: Rendering Enhancements
- [x] Refactor markdown-to-html logic in `src/app/blog/[category]/[slug]/page.tsx` for better accessibility and SEO (image alts).
- [x] Optimize `generateMetadata` for higher CTR.

#### Phase 4: Final Verification
- [x] Verify Sitemap and Robots.txt.
- [x] Run final lint and typecheck.
