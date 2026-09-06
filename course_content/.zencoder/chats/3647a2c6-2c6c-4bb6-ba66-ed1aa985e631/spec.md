# Technical Specification: Complete Unit 5 Exercises

## Technical Context
- **Language**: TypeScript
- **Framework**: Next.js 15 (App Router)
- **Target File**: `src/lib/a1-m1-l5-detailed.ts`
- **Topic**: Family and Relationships (A1 Level)
- **Status**: The file contains many placeholder exercises (e.g., "Question 7", "Sample sentence 4") that need to be replaced with actual pedagogical content.

## Implementation Approach
1. **Identify Placeholders**: Locate all exercise blocks in `src/lib/a1-m1-l5-detailed.ts` that contain placeholder text.
2. **Generate Content**: Create A1-level English exercises focused on:
   - Family members (parents, siblings, grandparents, cousins, etc.)
   - Relationships and roles.
   - Possessive 's (genitive case).
   - Basic family descriptions.
3. **Replace Placeholders**: Update the following exports with real questions:
   - `A1_M1_L5_GRAMMAR_1` (Possessive 's)
   - `A1_M1_L5_GRAMMAR_2` (Family Relationships)
   - `A1_M1_L5_READING` (Comprehension questions)
   - `A1_M1_L5_LISTENING` (Comprehension questions)
   - `A1_M1_L5_VOCABULARY_1` (Immediate Family)
   - `A1_M1_L5_VOCABULARY_2` (Extended Family)
   - `A1_M1_L5_SENTENCE_COMPLETION`
   - `A1_M1_L5_ERROR_IDENTIFICATION`
   - `A1_M1_L5_GAP_FILL`
   - `A1_M1_L5_COLLOCATION_MATCHING`
4. **Consistency**: Ensure all exercises follow the bilingual `[[English|Spanish]]` format used in the project.

## Source Code Structure Changes
- Only modifications to `src/lib/a1-m1-l5-detailed.ts`.

## Verification Approach
1. **Manual Verification**: Use the debug preview at `/debug/a1-preview/unit-5` to ensure exercises render correctly and logic is sound.
2. **Automated Testing**: Run existing E2E tests (if any) and potentially add a new one to verify the expansion.
3. **Linting**: Run `npm run lint` to ensure no syntax errors were introduced.
