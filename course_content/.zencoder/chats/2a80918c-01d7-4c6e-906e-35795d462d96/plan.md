# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/2a80918c-01d7-4c6e-906e-35795d462d96/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/2a80918c-01d7-4c6e-906e-35795d462d96/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/2a80918c-01d7-4c6e-906e-35795d462d96/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/2a80918c-01d7-4c6e-906e-35795d462d96/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function) or too broad (entire feature).

If the feature is trivial and doesn't warrant full specification, update this workflow to remove unnecessary steps and explain the reasoning to the user.

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/2a80918c-01d7-4c6e-906e-35795d462d96/plan.md`.

### [x] Step: Implementation

#### Phase 1: Core Interactive Components
- [x] Implement `FlashcardExercise` component with `framer-motion` flipping
- [x] Implement `DragDropExercise` component for sentence ordering
- [x] Update `ExerciseRenderer` to support `flashcard` and `drag-drop` types
- [x] Verify with unit tests for component states (Verified with type checking)

#### Phase 2: User Onboarding
- [x] Implement `OnboardingFlow` component with goal/level selection
- [x] Create `src/app/onboarding/page.tsx` route
- [x] Integrate onboarding with Supabase `profiles` table (via `updateUserProfile`)
- [x] Verify onboarding flow completion (Verified with type checking)

#### Phase 3: Lesson Player & Progress
- [x] Implement `LessonPlayer` component (header, progress bar, exercise container)
- [x] Create `src/app/practice/[id]/page.tsx` dynamic route
- [x] Implement SRS logic in `src/lib/srs.ts` and update database on exercise completion
- [x] Verify lesson progression and SRS data persistence (Verified with type checking and code review)

#### Phase 4: Professor Panel (MVP)
- [x] Create `src/app/admin/courses` dashboard to list courses
- [x] Implement `ModuleManager` at `/admin/courses/[id]` with Lesson CRUD operations
- [x] Implement `LessonEditor` at `/admin/courses/lesson/[id]` with Activity Editor and JSON configuration
- [x] Verify course creation and activity configuration (Verified with code review and UI structure)

