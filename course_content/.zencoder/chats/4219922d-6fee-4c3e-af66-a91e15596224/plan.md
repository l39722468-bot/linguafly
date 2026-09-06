# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. [x] Review existing codebase to understand current architecture and patterns
2. [x] Analyze the feature definition and identify unclear aspects
3. [x] Ask the user for clarifications on aspects that significantly impact scope or user experience
4. [x] Make reasonable decisions for minor details based on context and conventions
5. [x] If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/4219922d-6fee-4c3e-af66-a91e15596224/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/4219922d-6fee-4c3e-af66-a91e15596224/requirements.md`.

1. [x] Review existing codebase architecture and identify reusable components
2. [x] Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/4219922d-6fee-4c3e-af66-a91e15596224/spec.md`.

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/4219922d-6fee-4c3e-af66-a91e15596224/spec.md`.

1. [x] Break down the work into concrete tasks
2. [x] Each task should reference relevant contracts and include verification steps
3. [x] Replace the Implementation step below with the planned tasks

### [x] Step: Implementation

#### Phase 1: Structure Definition
- [x] Define the 30-unit syllabus for C1 level with neutral themes and specific topics.
- [x] Create debug preview route `/debug/c1-preview/[unitId]`.
- [x] Verify the syllabus and preview route with the user.

#### Phase 2: Unit Generation (Technical: .ts files in src/lib/c1-units/)
- [x] Generate Unit 1 (50 activities - updated with `[[word|translation]]`).
- [x] Generate Unit 2 (50 activities - updated with `[[word|translation]]`).
- [x] Generate Units 3-10 (50 activities each - updated with `[[word|translation]]`).
- [x] Generate Units 11-20 (50 activities each - updated with `[[word|translation]]`).
- [x] Generate Units 21-30 (50 activities each - updated with `[[word|translation]]`).
- [x] Export all units in `index.ts`.
- [x] Fixed export naming inconsistency (unit1-unit5).
- [x] Enhanced C1 Debug Preview with "Complete Unit/Course" functionality.

#### Phase 3: Final Verification & Polishing
- [x] Verify hover translations across all 30 units.
- [x] Run final type-check and lint (verified core C1 units).
- [x] Final verification of unit exports and index.ts.

#### Phase 4: Content Leak Correction
- [x] Remove answers from `fill-blank` and `multiple-choice` questions (no hints in parentheses).
- [x] Ensure `___` is used consistently in all questions.
- [x] Verify that translations `[[word|translation]]` are preserved for context words but not for the answer words themselves.
- [x] Fix Unit 6 and apply the pattern to all 60 units.
- [x] Final verification of all units.

#### Phase 5: Pedagogical Refactoring & Consistency
- [ ] Ensure for ALL `multiple-choice` questions, the `correctAnswer` is the FIRST option in the array.
- [ ] Convert all `vocabulary` + `fill-blank` exercises to `multiple-choice` (student needs clues for specific lexis).
- [ ] Convert `grammar` + `fill-blank` with verb hints (e.g., `(work)`) to `multiple-choice` with at least two tense options (removing the hint from the question).
- [ ] Apply these changes iteratively across all 60 units (starting with 1-30).
- [ ] Verify that no `fill-blank` remains without a clear hint if it's not a closed-class word (like prepositions).
