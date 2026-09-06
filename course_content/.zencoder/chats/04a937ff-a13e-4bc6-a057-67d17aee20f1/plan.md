# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. [x] Review existing codebase to understand current architecture and patterns
2. [x] Analyze the feature definition and identify unclear aspects
3. [x] Ask the user for clarifications on aspects that significantly impact scope or user experience
4. [x] Make reasonable decisions for minor details based on context and conventions
5. [x] If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/04a937ff-a13e-4bc6-a057-67d17aee20f1/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/04a937ff-a13e-4bc6-a057-67d17aee20f1/requirements.md`.

1. [x] Review existing codebase architecture and identify reusable components
2. [x] Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/04a937ff-a13e-4bc6-a057-67d17aee20f1/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/04a937ff-a13e-4bc6-a057-67d17aee20f1/spec.md`.

1. [x] Break down the work into concrete tasks
2. [x] Each task should reference relevant contracts and include verification steps
3. [x] Replace the Implementation step below with the planned tasks

### [ ] Step: Implementation

1.  **[x] Task 1: Update `src/lib/course/a1/unit-1.ts` using `update_unit_1.mjs`**
    - Run `node update_unit_1.mjs`.
    - Verification: `wc -l src/lib/course/a1/unit-1.ts` should show ~1400 lines (60 exercises).
2.  **[x] Task 2: Synchronize `src/content/cursos/ingles-a1/unit1.json`**
    - Create a script to map the TS exercises from `unit-1.ts` back to the JSON structure of `unit1.json`.
    - Verification: Compare the number of exercises in both files.
3.  **[x] Task 3: Validate JSON Content**
    - Run `npm run validate-exercises`.
    - Verification: Ensure no errors are reported for Unit 1.
4.  **[x] Task 4: Final Verification and Push**
    - Restart the dev server (if needed) and check `/curso-a1/unit-1` in the browser.
    - Push changes to remote.
    - Verification: Commit hash provided.
