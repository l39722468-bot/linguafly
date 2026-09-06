# Product Requirements Document (PRD): English A2 Course Expansion

## 1. Overview
The goal is to implement a comprehensive English A2 (Pre-Intermediate) course within the Focus English platform. This course will bridge the gap between A1 and B1 levels, focusing on vocabulary expansion, mastery of Present Simple/Continuous, and introductory complex structures.

## 2. Target Audience
Students at a CEFR A2 level who have completed the A1 course or have basic foundational knowledge of English.

## 3. Feature Requirements

### 3.1 Course Structure
- **Route**: Accessible at `/curso/ingles-a2`.
- **Scope**: 60 Units (Lessons).
- **Volume**: 100 exercises per unit (Total: 6,000 exercises).
- **Modules**: The 60 units should be grouped into logical modules (e.g., 6 modules of 10 units each).

### 3.2 Content Coverage
The course must cover the following topics provided in the source material:
- **Adjectives**: Plural rules (none), position (before noun).
- **Adjectives with -ed/-ing**: Feelings (temporal) vs. Qualities (permanent).
- **Adjectives vs. Adverbs**: Identifying qualities vs. describing actions (how).
- **Adverbs of Frequency**: Position in sentences (before main verb, after 'to be').
- **Connectors**: `as well as`, `whereas`, `while`, `as a consequence`, `since`, `on the one hand/other hand`, `nonetheless`, etc.
- **Comparatives & Superlatives**: Rules for adjectives and adverbs, irregular forms, and the use of 'in' for locations.
- **Superlatives + Present Perfect**: "What's the [best]... you have ever [seen]?"
- **Enough**: Position with nouns (before) and adjectives (after).
- **Common Mistakes**: Articles with countable nouns, prepositions in superlatives, `much` vs. `a lot of`, irregular plurals (children).

### 3.3 Exercise Types
To ensure variety and avoid repetition, the following types must be used (as defined in `exercise-types.ts`):
- `multiple-choice`: Grammar and vocabulary selection.
- `fill-blank`: Gap filling for verb forms and connectors.
- `sentence-building`: Reordering words to form correct sentences (e.g., frequency adverbs).
- `reading-comprehension`: Based on A2-level texts.
- `speaking-analysis`: Identifying natural responses or correct register.
- `error-identification`: Specifically targeting the "Common Mistakes" section.
- `matching`: Definitions or adjective-adverb pairs.

### 3.4 Scalability & Generation
- Given the high volume (6,000 exercises), a **procedural generation approach** using templates or the existing `mixed-exercise-generator.ts` logic is required to ensure consistency and speed.
- Content must be validated against the `Exercise` type in `exercise-types.ts`.

## 4. Technical Constraints
- Follow the existing pattern of storing lesson data in `src/lib/a2-units/`.
- Use TypeScript for all data definitions.
- Ensure compatibility with the `ExerciseRenderer.tsx` component.

## 5. Success Criteria
- All 60 units are accessible and navigable.
- Each unit contains 100 distinct exercises.
- Content accurately reflects the grammar and vocabulary rules provided in the reference material.
- No regression in existing A1/B2 course functionality.
