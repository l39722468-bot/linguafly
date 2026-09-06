# Technical Specification - Randomizing B2 Exercise Answers and Improving Variety

## Technical Context
- **Language**: TypeScript
- **Framework**: Next.js 15
- **Data Source**: Static exercise files in `src/lib/course/b2/unit-*.ts`
- **Goal**: Prevent students from guessing correct answers by:
  1. Shuffling multiple-choice options so the correct answer is not always at index 0 (option 'a').
  2. Ensuring a better variety of grammatical topics/tenses within each unit to avoid predictable sequences.

## Implementation Approach

### 1. Shuffling Multiple-Choice Options
I will create a script to iterate through all 30 B2 unit files. For each file:
- Locate all `multiple-choice` exercises.
- For each question in the exercise:
  - Take the `options` array and the `correctAnswer` index.
  - Identify the correct option string.
  - Shuffle the `options` array.
  - Find the new index of the correct option string.
  - Update `correctAnswer` with the new index.
- Save the modified files.

### 2. Improving Grammatical Variety
I will analyze the distribution of exercise types and topics within the B2 units.
The user noted that correct answers shouldn't always be the same verb tense "ejercicio tras ejercicio".
I will check if there are consecutive exercises focusing on the same grammar point (like 3 inversions in a row) and try to reorder them or vary the distractors to make them less predictable.

## Source Code Structure Changes
No structural changes, only content updates in:
- `src/lib/course/b2/unit-1.ts` through `src/lib/course/b2/unit-30.ts`

## Verification Approach
- **Automated**: Run `npm run validate-exercises` if available, or create a simple script to verify that `correctAnswer` actually matches the intended correct string (if I can determine it from context or by preserving it during shuffle).
- **Manual**: Use the `/debug/b2-preview/[unitId]` page to verify that the options are indeed randomized.
- **E2E**: Create a Playwright test to check multiple exercises and ensure the correct answer is not always the first one.
