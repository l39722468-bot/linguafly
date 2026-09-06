# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/5ea623ae-0db2-4137-8114-ee3a6eb4d630/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/5ea623ae-0db2-4137-8114-ee3a6eb4d630/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/5ea623ae-0db2-4137-8114-ee3a6eb4d630/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/5ea623ae-0db2-4137-8114-ee3a6eb4d630/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

### [x] Step: Implementation - Phase 1: Levels & General SEO
Implement articles for levels A1-C2 and general online course keywords.
- [x] Create articles for A1, A2, B1, B2, C1, C2 guides.
- [x] Create articles for "cursos online ingles b1", "aprender ingles desde cero", etc.
- [x] Verify internal linking to hubs.

### [x] Step: Implementation - Phase 2: Professional & Business English
Implement articles for career, interviews, and specialized sectors.
- [x] Create articles for CVs, interviews, and LinkedIn in English.
- [x] Create articles for Engineering, Health, and Hospitality sectors.
- [x] Verify CTA placement to business/pro plans.

### [x] Step: Implementation - Phase 3: Exams & Certifications
Implement articles for official certifications.
- [x] Create articles for Cambridge, Aptis, IELTS, and TOEFL.
- [x] Create guides for pricing and preparation strategies.
- [x] Link to `/rutas/certificaciones-ingles`.

### [x] Step: Implementation - Phase 4: Travel & Survival English
Implement articles for tourism and survival.
- [x] Create articles for airport, restaurant, and hotel vocabulary.
- [x] Create guides for emergencies and digital nomads.
- [x] Link to `/blog/temas/ingles para viajar`.

### [x] Step: Implementation - Phase 5: Tools & AI
Implement articles for English learning apps and AI tools.
- [x] Create articles for "mejores apps ingles 2026", "aprender ingles con ia", etc.
- [x] Compare Focus English with other apps.
- [x] Verify final linking structure and canonical URLs.

### [x] Step: Phase 6: 404 Troubleshooting & Keyword Coverage
Fix reported 404 errors and ensure all requested keywords are covered.
- [x] Normalize category hubs to handle accents (e.g., /blog/gramática).
- [x] Add missing long-tail keywords to article metadata (e.g., career english).
- [x] Add 301 redirects for legacy URLs and `/rutas/` paths.
- [x] Verify that all user-provided URLs now resolve to the correct content.
