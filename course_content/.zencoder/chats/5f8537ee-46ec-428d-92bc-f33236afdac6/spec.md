# Technical Specification: Unit 17 Expansion

## Implementation Approach
1. **Source Code**: Modify `src/lib/course/a1/unit-17.ts`.
2. **Data Source**: 
    - Exercises 1-10: Restore from git history (commit `a824ae2f^`).
    - Exercises 11-60: Adapt from `supabase/migrations/20260201_expand_unit_17.sql`.
3. **Format Adaptation**:
    - Convert `multipleChoice` SQL type to `multiple-choice` TS type.
    - Convert `matching` SQL type to `flashcard` or `multiple-choice` (since the current TS engine for A1 units seems to prefer these).
    - Convert `fillBlanks` and `drag-drop` to `sentence-building` or `multiple-choice`.
    - Add `[[English|Spanish]]` annotations.
    - Add `audioUrl` and `topicName`.
    - Ensure `Exercise` interface compatibility.

## Structure Changes
No new files or schema changes. Only content update in `src/lib/course/a1/unit-17.ts`.

## Verification Plan
- **Linting**: Run `npm run lint` (if available) or check for TS errors.
- **Preview**: User can verify via `/debug/a1-preview/unit-17`.
- **Unit Test**: Ensure IDs are unique and all fields are present.
