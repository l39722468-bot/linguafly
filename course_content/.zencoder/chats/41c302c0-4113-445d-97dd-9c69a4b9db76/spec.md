# Technical Specification: Duolingo A1 Exercise Expansion

## Technical Context
- **Frontend**: Next.js 15, React 19, Tailwind CSS.
- **Backend**: Supabase (PostgreSQL) for content storage.
- **UI Components**: Framer Motion for animations in exercises.

## Implementation Approach

### 1. ExerciseRenderer Integration
Update `src/components/course/exercises/ExerciseRenderer.tsx` to handle:
- `flashcard`: Import and render `FlashcardExercise`.
- `drag-drop`: Import and render `DragDropExercise`.
- Ensure the `onResult` (or `onComplete`) callbacks are correctly mapped to update the progress state.

### 2. Type Definition Updates
Ensure `src/components/course/exercises/types.ts` includes the necessary interfaces for `FlashcardContent` and `DragDropContent` to maintain type safety.

### 3. Database Seeding (SQL)
Create migration files (SQL seeds) for each module:
- `Module 1 (Units 1-10)`: Basic personal info, numbers, colors.
- `Module 2 (Units 11-20)`: Routines, meals, likes/dislikes.
- `Module 3 (Units 21-30)`: House, furniture, directions.

Each unit will contain:
- 1-2 Flashcard sets (Vocabulary introduction).
- 2-3 Drag & Drop (Sentence building).
- 2-3 Multiple Choice / Fill Blanks (Grammar & Practice).

## Source Code Structure Changes
- `src/components/course/exercises/ExerciseRenderer.tsx`: Add new rendering branches.
- `supabase/migrations/`: Add new seed files (e.g., `20260201_seed_units_2_10.sql`, etc.).

## Verification Approach
1. **Linting**: Run `npm run lint` to ensure no regressions in TypeScript or ESLint.
2. **Visual Verification**: Check the Exercises Panel in the app to ensure new types render correctly.
3. **Database Check**: Verify that `course_modules`, `course_lessons`, and `course_exercises` are correctly populated.
