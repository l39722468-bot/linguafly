# Technical Specification: Multiple Choice Matching Exercise

## 1. Technical Context
- **Language**: TypeScript / React
- **Framework**: Next.js (App Router)
- **UI Components**: Tailwind CSS
- **Data Source**: Local JSON files processed via `local-course-service.ts`

## 2. Implementation Approach
We will implement the multiple-choice functionality by enhancing the existing `MatchingRenderer` and ensuring the data pipeline correctly passes distractors.

### 2.1. Code Patterns
- We will use React's `useMemo` to generate and shuffle options for each matching item to avoid reshuffling on every render.
- We will maintain the same interaction pattern as existing multiple-choice components.

## 3. Source Code Changes

### 3.1. `src/lib/services/local-course-service.ts`
- Update the `matching` type conversion logic to correctly extract `distractors` from the source data instead of hardcoding an empty array.

### 3.2. `src/components/course/renderers/MatchingRenderer.tsx`
- Implement logic to generate `options` if they are not provided in the exercise item.
- **Option Generation Algorithm**:
    - `correctValue = item.correctMatch || item.meaning || item.right || item.definition`
    - `poolOfCorrectAnswers = allItemsInExercise.map(i => i.correctMatch || ...)`
    - `distractors = item.distractors || []`
    - `options = Unique([correctValue, ...poolOfCorrectAnswers, ...distractors])`
    - Shuffle the `options`.
- Update the rendering logic to always prefer the multiple-choice grid if options are available (which they will be after the change).

## 4. Data Model Changes
- No changes to interfaces in `src/lib/exercise-types.ts` are required as `distractors` is already present in `CollocationMatchingExercise`.

## 5. Delivery Phases

### Phase 1: Data Pipeline Fix
- Modify `local-course-service.ts` to preserve distractors.
- Verify that `MatchingRenderer` receives the distractors.

### Phase 2: Renderer Enhancement
- Implement the automatic option generation and shuffling in `MatchingRenderer.tsx`.
- Switch from text input to multiple-choice buttons.

### Phase 3: Verification
- Test with the specific exercise mentioned in the request.
- Ensure other matching exercises (e.g., idioms) are not negatively affected.

## 6. Verification Approach
- **Linting**: Run `npm run lint` (or equivalent) to ensure no regressions in code style.
- **Manual Verification**: Open the lesson `/cursos/trabajo/finanzas/b2/trimestre1/semana01` and verify the Matching Challenge is now multiple choice.
- **Automated Tests**: Run existing E2E tests for matching if available (`e2e/multiple-matching.spec.ts`).
