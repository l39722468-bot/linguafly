# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/06402a81-72a2-440f-84b1-c3d011a4971f/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/06402a81-72a2-440f-84b1-c3d011a4971f/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/06402a81-72a2-440f-84b1-c3d011a4971f/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/06402a81-72a2-440f-84b1-c3d011a4971f/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

### [x] Step: Implementation

- [x] **UI Refactor**: Modify `DuolingoUnitViewer.tsx` and `PremiumDuolingoSession.tsx` to remove lesson divisions.
- [x] **Migration Script**: Create and run `scripts/expand-duolingo-units.mjs`.
- [x] **Bug Fix**: Add missing stimulus to `true_false` exercises.
- [x] **Bug Fix**: Handle object items in `categorization` exercises to avoid runtime errors.

### [x] Step: Final Confirmation
