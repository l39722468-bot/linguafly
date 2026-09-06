# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/567f1699-1f91-4955-bbf0-d1cd7b6517c6/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/567f1699-1f91-4955-bbf0-d1cd7b6517c6/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/567f1699-1f91-4955-bbf0-d1cd7b6517c6/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/567f1699-1f91-4955-bbf0-d1cd7b6517c6/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/567f1699-1f91-4955-bbf0-d1cd7b6517c6/plan.md`.

### [ ] Step: Implementation

- [x] **Task 1: Audit Script Implementation**
  - Create `scripts/audit-duplicates.py` to detect content repetition.
  - Run the script and document results for Unit 14 and others.
- [x] **Task 2: Content Improvement for Unit 14**
  - Review flagged exercises in Unit 14.
  - Replace duplicates with original A1-level content and expanded vocabulary.
- [ ] **Task 3: Global Audit & Scale**
  - Apply findings from Task 1 to all other A1 units.
  - [x] **Batch 1 (Units 1, 8, 9, 10)**: Completed.
  - [x] **Batch 2 (Units 2, 3, 4, 5, 6, 7)**: Completed.
  - [in_progress] **Batch 3 (Units 11, 12, 13, 15, 16, 17, 18, 19, 20)**: Units 11-19 refactored. Pending 20.
- [ ] **Task 4: Verification**
  - Re-run audit scripts.
  - Run `npm run validate-exercises` to ensure JSON integrity.
