# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/41c302c0-4113-445d-97dd-9c69a4b9db76/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/41c302c0-4113-445d-97dd-9c69a4b9db76/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/41c302c0-4113-445d-97dd-9c69a4b9db76/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/41c302c0-4113-445d-97dd-9c69a4b9db76/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

### [x] Step 1: Update Exercise Types and Renderer
- Update `src/components/course/exercises/types.ts` to include `flashcard` and `drag-drop` types.
- Update `src/components/course/exercises/ExerciseRenderer.tsx` to support `flashcard` and `drag-drop` exercise types.
- **Verification**: `npm run lint` and manual check of the renderer component.

### [x] Step 2: Seed Module 1 (Units 2-10)
- Create and execute SQL seed for Module 1.
- Units: Introductions, Numbers, Alphabet, Countries, Family, Colors, Jobs.
- **Verification**: Check database tables and verify exercises in the UI.

### [x] Step 3: Seed Module 2 (Units 11-20)
- Create and execute SQL seed for Module 2.
- Units: Time, Days, Routine, Present Simple, Cafe, Meals, Likes, Months.
- **Verification**: Check database tables and verify exercises in the UI.

### [x] Step 4: Seed Module 3 (Units 21-30)
- Create and execute SQL seed for Module 3.
- Units: Rooms, Furniture, There is/are, Prepositions, Neighborhood, Directions, Pets, Body, Clothes.
- **Verification**: Check database tables and verify exercises in the UI.

### [x] Step 5: Final Validation
- Run full project lint.
- Verify exercise flow and progress tracking.
- **Verification**: `npm run lint` and `npm test` (if applicable).
