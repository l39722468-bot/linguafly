# Full SDD workflow

## Workflow Steps

### [ ] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/86b39178-3246-4abf-8c9b-c0713177e29a/requirements.md`.

### [ ] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/86b39178-3246-4abf-8c9b-c0713177e29a/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/86b39178-3246-4abf-8c9b-c0713177e29a/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [ ] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/86b39178-3246-4abf-8c9b-c0713177e29a/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function) or too broad (entire feature).

If the feature is trivial and doesn't warrant full specification, update this workflow to remove unnecessary steps and explain the reasoning to the user.

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/86b39178-3246-4abf-8c9b-c0713177e29a/plan.md`.

### [x] Step: Content Audit (Unit 1)

Performed an exhaustive review of Unit 1 (Greetings and Introductions).
1. **Scope Consistency**: Identified and fixed out-of-scope grammar in pronunciation exercises (Ex 8 and 48) which included "will", "have to", "should", and "must". Replaced with present simple "be" structures.
2. **Bug Fixes**: Corrected a critical error in Exercise 49 where the answer for "My name is Anna" was marked as "am".
3. **Spoiler Check**: Verified that no solutions are leaked in stimuli.
4. **Standardization**: Unified JSON keys for `fill-blank` (`answers` array) and `reading-comprehension` (`answer` string) to ensure robust rendering.
5. **Verification**: Exercises now strictly follow the syllabus: Be verb, Subject pronouns, Greetings, Nationalities, and Numbers 0-100.
6. **SQL Fix**: Resolved a syntax error in the migration file caused by trailing commas in the `VALUES` clauses of Exercises 8 and 48.

### [ ] Step: Implementation (Batch 2)
