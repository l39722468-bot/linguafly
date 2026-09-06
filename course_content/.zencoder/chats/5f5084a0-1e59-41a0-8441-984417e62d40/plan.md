# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/5f5084a0-1e59-41a0-8441-984417e62d40/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/5f5084a0-1e59-41a0-8441-984417e62d40/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/5f5084a0-1e59-41a0-8441-984417e62d40/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/5f5084a0-1e59-41a0-8441-984417e62d40/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function) or too broad (entire feature).

If the feature is trivial and doesn't warrant full specification, update this workflow to remove unnecessary steps and explain the reasoning to the user.

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/5f5084a0-1e59-41a0-8441-984417e62d40/plan.md`.

### [x] Step: Implementation

1. [x] **Phase 1: Content Preparation**
   - Generate 45 new exercises (Reading, Listening, Word Search, Crossword, and MC/Fill-Blanks).
   - Verify vocabulary matches the "Numbers, Currencies, and Digital Money" theme.

2. [x] **Phase 2: Add Reading Exercises**
   - Implement 5 `reading-comprehension` items with `vocabularyHelp` and bolded words.
   - Verification: Check schema compliance.

3. [x] **Phase 3: Add Listening Exercises**
   - Implement 5 `listening-comprehension` items with transcripts and `vocabularyHelp`.
   - Verification: Ensure transcripts are appropriate for A1 level.

4. [x] **Phase 4: Add Interactive Games**
   - Implement 5 `word-search` items.
   - Implement 5 `crossword` items.
   - Verification: Check grid logic and clues for consistency.

5. [x] **Phase 5: Add Knowledge Check Exercises**
   - Implement 25 `multipleChoice` and `fillBlanks` items.
   - Verification: Total exercise count reaches 50.

6. [x] **Phase 6: Final Verification & Linting**
   - Run `node scripts/validate-exercises.mjs`.
   - Manually check JSON structure in `src/content/cursos/trabajo/finanzas/a1/trimestre1/semana01/exercises.json`.
