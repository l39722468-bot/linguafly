# Technical Specification - Pedagogical Engine Enrichment

## Technical Context
- **Language**: TypeScript
- **Target Files**: 
  - `src/lib/course/engine/generator.ts`: Main logic for exercise assembly.
  - `src/lib/course/engine/blueprints.ts`: Structure definition for exercises.
  - `src/types/premium-course.ts`: Exercise type definitions.

## Implementation Approach
1. **Blueprint Enhancement**:
   - Update `Blueprint` interface to include optional `title` and `instruction` templates.
   - Add `explanationTemplate` to support dynamic variables (e.g., "Usa {word} para hablar de...").

2. **Generator Logic Updates**:
   - Modify `mapToExercise` in `generator.ts` to populate the `content` object with:
     - `title`: Extracted from blueprint or skill name.
     - `instructions`: Standardized based on `ExerciseType`.
     - `explanation`: Processed template with Spanish translations.
   - Update `fill-blank` assembly to include `translation` at the question level if supported by `ExerciseRenderer`.

3. **Data Model Alignment**:
   - Ensure the output strictly matches the `Exercise` interface in `src/lib/exercise-generator.ts`.

4. **Verification**:
   - Run `npm run validate-exercises` to ensure JSON compatibility.
   - Use `src/app/debug/engine/page.tsx` for visual confirmation.
