# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7079b4d0-fae0-4adf-b661-dba99a65a4f8/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7079b4d0-fae0-4adf-b661-dba99a65a4f8/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7079b4d0-fae0-4adf-b661-dba99a65a4f8/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7079b4d0-fae0-4adf-b661-dba99a65a4f8/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function) or too broad (entire feature).

If the feature is trivial and doesn't warrant full specification, update this workflow to remove unnecessary steps and explain the reasoning to the user.

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7079b4d0-fae0-4adf-b661-dba99a65a4f8/plan.md`.

### [x] Step: Implementation

#### [x] Complete Unit 30 Exercises
1. [x] Review Units 21-29 to gather vocabulary and grammar points.
2. [x] Restructure `unit30.json` into meaningful sections.
3. [x] Add exercises for Rooms in a House (Unit 21).
4. [x] Add exercises for Furniture (Unit 22).
5. [x] Add exercises for There is / There are (Unit 23).
6. [x] Add exercises for Prepositions of Place (Unit 24).
7. [x] Add exercises for My Neighborhood (Unit 25).
8. [x] Add exercises for Giving Directions (Unit 26).
9. [x] Add exercises for Pets & Animals (Unit 27).
10. [x] Add exercises for Body Parts (Unit 28).
11. [x] Add exercises for Clothes (Unit 29).
12. [x] Update Listening and Pronunciation sections with meaningful content.
13. [x] Validate JSON structure and run validation scripts.

