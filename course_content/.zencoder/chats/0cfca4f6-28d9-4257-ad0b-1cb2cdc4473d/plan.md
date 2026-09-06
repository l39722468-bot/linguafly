# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/0cfca4f6-28d9-4257-ad0b-1cb2cdc4473d/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/0cfca4f6-28d9-4257-ad0b-1cb2cdc4473d/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/0cfca4f6-28d9-4257-ad0b-1cb2cdc4473d/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [ ] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/0cfca4f6-28d9-4257-ad0b-1cb2cdc4473d/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function) or too broad (entire feature).

If the feature is trivial and doesn't warrant full specification, update this workflow to remove unnecessary steps and explain the reasoning to the user.

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/0cfca4f6-28d9-4257-ad0b-1cb2cdc4473d/plan.md`.

### [x] Phase 1: Infrastructure & Promotion
- [x] Create `scripts/analyze-a1-content.mjs`
- [x] Promote units 31-60 from `archive/` to `src/content/cursos/ingles-a1/`
- [x] Run analysis and generate report of duplicates and variety issues

### [x] Phase 2: Refactoring Units 1-30
- [x] Fix repetitions in units 1-30
- [x] Improve exercise variety in units 1-30

### [x] Phase 3: Refactoring Units 31-60
- [x] Fix repetitions in units 31-60
- [x] Improve exercise variety in units 31-60

### [x] Phase 4: Final Verification
- [x] Run final validation across all 60 units
- [x] Verify syllabus alignment

### [x] Phase 5: Navigation & UI/UX Improvements
- [x] Enable exercise listing in `PremiumUnitViewer.tsx` to allow jumping to specific exercises
- [x] Update `PremiumSession.tsx` to support `initialIndex`
- [x] Fix rendering for `fill_blanks`, `fill_blank`, and `transformation` exercise types
- [x] Add fallback for `transformation` exercises without stimulus but with options
- [x] Fix validation for `matching` exercises to handle duplicates (e.g., articles "a/an")
- [x] Remove answer hints (e.g., `(actor)`, `(new / coat)`) globally from all 60 units and SQL migrations
- [x] Fix hydration error by removing nested buttons in `PremiumSession.tsx`

### [x] Phase 6: Content Cleanup
- [x] Delete units 61-90 from `archive/`

