# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/0062f76f-e426-42c2-8ec8-7b55520b017d/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/0062f76f-e426-42c2-8ec8-7b55520b017d/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/0062f76f-e426-42c2-8ec8-7b55520b017d/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/0062f76f-e426-42c2-8ec8-7b55520b017d/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function) or too broad (entire feature).

If the feature is trivial and doesn't warrant full specification, update this workflow to remove unnecessary steps and explain the reasoning to the user.

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/0062f76f-e426-42c2-8ec8-7b55520b017d/plan.md`.

### [ ] Step: Implementation

#### Phase 1: Service Enhancements
1. [ ] **Update `localCourseService`**: Modify `convertItemsToExercises` in `src/lib/services/local-course-service.ts` to support `writingTask` and `rolePlayPrompt`.
    - **Verification**: Check if items with these types no longer fall back to empty `grammar` exercises.

#### Phase 2: Content Population
2. [ ] **Refine `exercises.json`**: Update `src/content/cursos/trabajo/finanzas/b2/trimestre1/semana01/exercises.json`.
    - Map `writingTask` and `rolePlayPrompt` correctly.
    - Ensure grammar/vocabulary items have proper `questions` if they are meant to show in "Practical Application".
    - **Verification**: File saves correctly and JSON is valid.

#### Phase 3: UI Verification
3. [ ] **Manual UI Test**: Open the lesson in the browser and verify all 7 exercises (as seen in `exercises.json`) render correctly.
    - Specifically check Exercise 5 (Roleplay) and Exercise 4 (Writing).
    - Ensure "Practical Application" sections have questions where appropriate.
4. [ ] **Final Check**: Run `npm run lint` to ensure no code quality regressions.

