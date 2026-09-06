# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/82b26273-9ee0-4a21-8e5f-920674e3cc70/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/82b26273-9ee0-4a21-8e5f-920674e3cc70/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/82b26273-9ee0-4a21-8e5f-920674e3cc70/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/82b26273-9ee0-4a21-8e5f-920674e3cc70/spec.md`.

### [x] Step: Implementation

1. [x] **Core Content Database Development**: Create a robust dictionary/mapping for all 60 units with high-quality pedagogical data (Vocab, Grammar, Phrases) in a new script `scripts/generate-a1-mega-course.py`.
2. [x] **Advanced Generator Logic**: Implement the generation functions for all 6 types of exercises (MC, Matching, Transformation, True/False, Reorder, Short Writing) ensuring high variety and pedagogical value.
3. [x] **Batch Processing & File Output**: Implement the loop to generate 300 exercises per unit and save them to the correct JSON paths.
4. [x] **Execution & Verification**:
    - [x] Run the generation script.
    - [x] Run `npm run validate-exercises` (if available) or a custom validation script.
    - [x] Spot check units 1, 30, and 60.
5. [x] **UI & Pedagogical Refinements**:
    - [x] Audit and fix English answer leaks in prompts (replaced `(his)` with `(de él)` etc.).
    - [x] Implement "Correct Order" display for `true_false` exercises when the statement is false in `FocusedSession.tsx` and `PremiumSession.tsx`.
    - [x] Perform exhaustive audit of all 18,000 exercises to ensure no answers are spoiled in prompts.
