# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/6c568dd6-4ce1-44d5-8701-4bdb7c934150/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/6c568dd6-4ce1-44d5-8701-4bdb7c934150/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/6c568dd6-4ce1-44d5-8701-4bdb7c934150/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

1. [x] Analyze all 30 JSON files to identify all interaction types used.
2. [ ] Implement `categorization` exercise type in `DuolingoUnitViewer.tsx`.
3. [ ] Audit each JSON file for pedagogical and technical correctness.
4. [ ] Run linting and verification.

### [x] Step: Implementation

1. [x] **JSON Analysis**: Use a script to list all interaction types and find potential schema violations.
2. [x] **UI Component Update**:
    - [x] Add `categorization` rendering to `renderInteraction`.
    - [x] Fix `transformation` rendering to support stimuli without `___` markers.
    - [x] Fix `COMPROBAR` button logic for `short_writing`, `transformation`, and `dictation_guided`.
    - [x] Update `handleCheckAnswer` to support `categorization`.
    - [x] Ensure all other types mentioned in JSON are correctly handled.
3. [x] **Unit-by-Unit Content Audit**:
    - [x] Units 1-10: Verify answers and prompts.
    - [x] Units 11-20: Verify answers and prompts.
    - [x] Units 21-30: Verify answers and prompts.
4. [x] **Verification**:
    - [x] Run `npm run lint`.
    - [x] Final check of the course flow.
