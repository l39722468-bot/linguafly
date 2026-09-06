# Technical Specification - Practical Application Exercises

## Technical Context
- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Source**: Local JSON files in `src/content/cursos/trabajo/...`
- **Service**: `localCourseService` in `src/lib/services/local-course-service.ts`
- **Renderers**: `LessonViewer`, `GrammarVocabularyRenderer`, `SpeakingRenderer`, etc.

## Implementation Approach
The current issue is that many exercise types in `exercises.json` are not recognized by `localCourseService`, causing them to fall back to a generic `grammar` type with no questions. We will:
1.  **Enhance `localCourseService`**: Update `convertItemsToExercises` to support `writingTask`, `rolePlayPrompt`, and other missing types.
2.  **Map to Correct Types**:
    - `writingTask` -> `writing`
    - `rolePlayPrompt` -> `speaking` (or `roleplay` if supported)
3.  **Content Expansion**: Update `exercises.json` for the target lesson to ensure that exercises intended for "Practical Application" have populated `questions` arrays or are correctly typed to use their respective interactive renderers.

## Source Code Changes
### `src/lib/services/local-course-service.ts`
- Update `convertItemsToExercises` method:
    - Add case for `writingTask`: Map to `writing` type with `prompt`, `minWords`, `maxWords`, etc.
    - Add case for `rolePlayPrompt`: Map to `speaking` or `roleplay` type with `context`, `keyPhrases`, etc.
    - Improve `multiple-choice` handling to support multiple questions if provided in a single item (though current JSON has them as separate items).

### `src/content/cursos/trabajo/finanzas/b2/trimestre1/semana01/exercises.json`
- Review and update items to ensure they are correctly typed and have sufficient content for "Practical Application".
- For grammar-focused items, ensure they are grouped or have the correct `questions` structure if they are meant to be rendered together.

## Data Model Changes
- No changes to the `Lesson` or `Exercise` interfaces in `exercise-types.ts` are expected, as we are filling in existing structures.
- Potential addition of optional fields in `exercises.json` to support more complex exercise configurations.

## Delivery Phases
1.  **Phase 1: Service Update**: Fix the mapping in `localCourseService`.
2.  **Phase 2: Content Update**: Populate `exercises.json` with correct types and content.
3.  **Phase 3: Verification**: Verify in the UI that "Ejercicio 5" (and others) render correctly without "0 QUESTIONS".

## Verification Approach
- **Manual Testing**: Navigate to `/cursos/trabajo/finanzas/b2/trimestre1/semana01` and verify each exercise renders as expected.
- **Linting**: Run `npm run lint` to ensure no regressions in code quality.
- **Type Checking**: Run `npm run typecheck` (if available) or rely on IDE feedback for TypeScript correctness.
