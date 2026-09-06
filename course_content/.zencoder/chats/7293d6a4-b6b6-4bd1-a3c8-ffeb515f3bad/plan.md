# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. [x] Review existing codebase to understand current architecture and patterns
2. [x] Analyze the feature definition and identify unclear aspects
3. [x] Ask the user for clarifications on aspects that significantly impact scope or user experience
4. [x] Make reasonable decisions for minor details based on context and conventions
5. [x] If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7293d6a4-b6b6-4bd1-a3c8-ffeb515f3bad/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7293d6a4-b6b6-4bd1-a3c8-ffeb515f3bad/requirements.md`.

1. [x] Review existing codebase architecture and identify reusable components
2. [x] Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7293d6a4-b6b6-4bd1-a3c8-ffeb515f3bad/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7293d6a4-b6b6-4bd1-a3c8-ffeb515f3bad/spec.md`.

1. [x] Break down the work into concrete tasks
2. [x] Each task should reference relevant contracts and include verification steps
3. [x] Replace the Implementation step below with the planned tasks

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7293d6a4-b6b6-4bd1-a3c8-ffeb515f3bad/plan.md`.

### [ ] Step: Implementation

#### Phase 1: Component Enhancement
- [x] **Task 1.1**: Modify `src/components/course/exercises/TranslatedText.tsx` to support `[[word|translation]]` syntax.
    - *Verification*: Create a temporary test exercise with the syntax and verify hover behavior in the browser.
- [x] **Task 1.2**: Update `GLOBAL_LEXICON` in `src/lib/course/engine/lexicon.ts` with foundational B1 vocabulary.
    - *Verification*: Check if common words show tooltips without explicit `[[...]]` syntax.

#### Phase 2: Unit Generation Setup
- [x] **Task 2.1**: Create a new generation script `scripts/redo-b1-course.ts` that uses LLM to generate exercises with inline translations.
    - *Verification*: Run for a single unit and inspect the output file.

#### Phase 3: Content Redesign (30 Units)
- [x] **Task 3.1**: Generate Unit 1 (50 exercises) with generic theme "Daily Routine & Life".
    - *Verification*: Inspect `src/lib/course/b1/unit-1.ts`.
- [ ] **Task 3.2**: Generate Units 2-10 (50 exercises each).
- [ ] **Task 3.3**: Generate Units 11-20 (50 exercises each).
- [ ] **Task 3.4**: Generate Units 21-30 (50 exercises each).

#### Phase 4: Integration & UX
- [x] **Task 4.1**: Update `src/lib/course/b1/index.ts` with the new unit titles and exercises.
    - *Verification*: Verify the course navigation in the app.
- [ ] **Task 4.2**: Final verification of word-by-word translations across multiple exercises.
    - *Verification*: Spot check random exercises in different units.

#### Phase 5: Quality Assurance
- [ ] **Task 5.1**: Run lint and type checking.
    - *Verification*: `npm run lint` and `npm run build` (or `tsc`).
- [ ] **Task 5.2**: Obtain approval for E2E tests and implement one if approved.
    - *Verification*: Test suite passes.
