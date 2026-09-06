# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/87260d5e-d83e-4d98-8c2b-f549062864e0/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/87260d5e-d83e-4d98-8c2b-f549062864e0/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/87260d5e-d83e-4d98-8c2b-f549062864e0/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/87260d5e-d83e-4d98-8c2b-f549062864e0/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function) or too broad (entire feature).

If the feature is trivial and doesn't warrant full specification, update this workflow to remove unnecessary steps and explain the reasoning to the user.

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/87260d5e-d83e-4d98-8c2b-f549062864e0/plan.md`.

### [x] Step: Implementation

1. [x] **Simplify `b1-u30-e26`**: Reduce to 8-10 words in `src/lib/course/b1/unit-30.ts`.
2. [x] **Simplify `b1-u30-e27`**: Reduce to 8-10 words in `src/lib/course/b1/unit-30.ts`.
3. [x] **Simplify `b1-u30-e28`**: Reduce to 8-10 words in `src/lib/course/b1/unit-30.ts`.
4. [x] **Implement `b1-u30-e29`**: Create a 8-10 word exercise in `src/lib/course/b1/unit-30.ts`.
5. [x] **Implement `b1-u30-e30`**: Create a 8-10 word exercise in `src/lib/course/b1/unit-30.ts`.
6. [x] **Verify Changes**: Check the preview route and run type checks.
7. [x] **Push Changes**: Commit and push the final changes.
8. [x] **Review Translations**: Ensure all word chips in sentence-building exercises are translated.
9. [x] **Translate Unit 30 Phrases**: Apply `[[English|Spanish]]` formatting and translate titles/instructions in `src/lib/course/b1/unit-30.ts`.
10. [x] **Complete Unit 30**: Add exercises `b1-u30-e31` to `b1-u30-e50` to reach 50 total exercises.
11. [x] **Redesign A1 Unit 1**: Remove flashcards and replace them with other types in `src/lib/course/a1/unit-1.ts`.
12. [x] **Standardize Tooltips**: Apply `[[English|Spanish]]` formatting to all exercises in A1 Unit 1.
13. [x] **Verify A1 Unit 1**: Ensure 50 exercises remain and run validation scripts.
14. [x] **Fix A1 Unit 1 Runtime Error**: Identify and resolve the client-side exception in `src/lib/course/a1/unit-1.ts`.
15. [x] **Final Review and Fixes**: Corrected translation misalignments in Unit 30 and missing tooltips in A1 matching.
16. [x] **Push and Commit**: Final push with commit `bb2475d4`.
