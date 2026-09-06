# Technical Specification: A1 Course Standardization - Module 2 (Phase 1)

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Data Location**: `src/lib/course/a1/`
- **Component**: `ExerciseRenderer.tsx` handles the UI logic for different exercise types.

## Implementation Approach
The refactor will focus on three files:
1. `src/lib/course/a1/unit-11.ts` (Telling the Time)
2. `src/lib/course/a1/unit-12.ts` (Days of the Week)
3. `src/lib/course/a1/unit-13.ts` (Daily Routine)

### 1. Data Structure Standard
Each exercise must strictly follow the `Exercise` interface from `@/lib/exercise-generator`.
- **Transcripts**: Must be fully bilingual using `[[English|Spanish]]`.
- **Content Fields**: Instructions, titles, options, and explanations must also be bilingual.
- **IDs**: Sequential from `a1-uX-e1` to `a1-uX-e60`.

### 2. Reading Exercise Refactor
Current reading exercises often repeat text in the `question` field. We will:
- Move the reading passage to the `transcript` field (for audio/display).
- Use the `reading` type if available, or `multiple-choice` with `topic: "Reading"`.
- Ensure the `transcript` contains the full bilingual text.
- Remove redundant text from individual questions to trigger the two-phase UI (Reading Phase vs Question Phase).

### 3. "Son" Token Safety
In Spanish instructions (e.g., "Son las cinco"), the word "son" might be incorrectly flagged if the system expects English. 
- **Solution**: Wrap Spanish "son" in double brackets `[[son|son]]` or ensure it's clearly within a bilingual block to avoid linting/tokenization issues if any exist in the pipeline.

### 4. Distribution of Answer Keys
A script or manual check will ensure that `correctAnswer` (0, 1, 2) is balanced across the 60 exercises to prevent guessing patterns.

## Delivery Phases

### Phase 1: Unit 11 (Telling the Time)
- Refactor existing 60 exercises.
- Ensure 100% bilingual coverage.
- Update Reading exercises to the new UI standard.

### Phase 2: Unit 12 (Days of the Week)
- Refactor existing 60 exercises.
- Focus on `at`, `in`, `on` prepositions for time/days.

### Phase 3: Unit 13 (Daily Routine)
- Refactor existing 60 exercises.
- Focus on Present Simple first person and sequence adverbs.

## Verification Approach
- **Linting**: Run `npm run lint` (or equivalent) to check for syntax errors.
- **Unit Audit**: A custom script `scripts/audit-unit.mjs` (if exists) or manual `grep` to verify exercise count and bilingual tags.
- **E2E/Browser**: Verify Unit 11's Reading UI in the browser.
