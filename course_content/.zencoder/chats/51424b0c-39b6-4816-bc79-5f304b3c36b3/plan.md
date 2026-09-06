# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/51424b0c-39b6-4816-bc79-5f304b3c36b3/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/51424b0c-39b6-4816-bc79-5f304b3c36b3/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/51424b0c-39b6-4816-bc79-5f304b3c36b3/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/51424b0c-39b6-4816-bc79-5f304b3c36b3/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function) or too broad (entire feature).

If the feature is trivial and doesn't warrant full specification, update this workflow to remove unnecessary steps and explain the reasoning to the user.

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/51424b0c-39b6-4816-bc79-5f304b3c36b3/plan.md`.

### [ ] Step: Implementation

#### Phase A: Codebase Consolidation
- [x] Task 1: Remove redundant `.disabled` and `.bak` files using a script
- [x] Task 2: Unify auth routes (migrate signin/signup to cuenta/login and cuenta/registro)
- [x] Task 3: Update all internal links and redirects to consolidated routes

#### Phase B: Level Test & CRM Integration
- [x] Task 4: Create `POST /api/level-test/submit` endpoint for CRM sync
- [x] Task 5: Integrate lead capture form in `LevelTestInteractive.tsx`
- [x] Task 6: Implement automated redirection to courses after test completion

#### Phase C: Dynamic Dashboard
- [/] Task 7: Set up Supabase schema for user progress and evaluations
- [ ] Task 8: Implement `/api/user/progress` endpoint
- [ ] Task 9: Replace mock data in `DashboardPage` with real data fetch

#### Phase D: AI Refinement
- [ ] Task 10: Update `evaluator.ts` system prompt for better pedagogical feedback
- [ ] Task 11: Final verification (lint, typecheck, manual testing)
