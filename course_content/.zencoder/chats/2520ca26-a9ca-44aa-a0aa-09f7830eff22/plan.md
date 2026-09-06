# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/2520ca26-a9ca-44aa-a0aa-09f7830eff22/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/2520ca26-a9ca-44aa-a0aa-09f7830eff22/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/2520ca26-a9ca-44aa-a0aa-09f7830eff22/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/2520ca26-a9ca-44aa-a0aa-09f7830eff22/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function) or too broad (entire feature).

If the feature is trivial and doesn't warrant full specification, update this workflow to remove unnecessary steps and explain the reasoning to the user.

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/2520ca26-a9ca-44aa-a0aa-09f7830eff22/plan.md`.

### [x] Step: Implementation

- [x] **Task 1: Database Purge (SQL Migration)**
    - Create `supabase/migrations/20260210_cleanup_specialized_content.sql`.
    - Delete modules: `b2-work-it`, `b2-work-finance`, `b2-work-m1`, `c1-exams-m1`, `b1-travel-m1`, and all exam-prep modules.
    - Update `course_goal` to 'general' for all surviving generic modules.
    - *Verification*: Query `course_modules` to ensure only 'general' goal exists and specialized IDs are gone.

- [x] **Task 2: Codebase Cleanup (File Deletion)**
    - Delete `src/lib/sectors/` directory and its contents.
    - Delete specialized curriculum files: `it-curriculum.ts`, `legal-curriculum.ts`, `engineering-curriculum.ts`, `admin-curriculum.ts`, `education-curriculum.ts`, `marketing-curriculum.ts`, `tourism-curriculum.ts`.
    - Delete `src/lib/services/toefl-course-service.ts`.
    - *Verification*: `ls src/lib/sectors` should fail; `npm run lint` should identify any broken imports.

- [x] **Task 3: Curriculum Refactoring**
    - Modify `src/lib/cambridge-curriculum.ts` to remove specialized IDs like `b2-business`, `c1-academic`, `c2-specialized-fields`.
    - Generalize descriptions in `cambridge-curriculum.ts` (remove specific exam names if necessary to focus on levels).
    - *Verification*: `npm run typecheck` to ensure no type errors in generators using these IDs.

- [x] **Task 4: Frontend Onboarding Update**
    - Modify `src/components/onboarding/OnboardingFlow.tsx` to remove 'trabajo' and 'examenes' from the goal selection.
    - Simplify to a single focus or generic options (e.g., "General English Mastery").
    - *Verification*: Manual check of the onboarding flow UI.

- [x] **Task 5: Final Verification & Cleanup**
    - Fix any broken imports found by lint.
    - Run `npm test` to ensure exercise generators still work.
    - *Verification*: All tests pass, lint is clean, and dashboard shows only generic A1-C2 path.
