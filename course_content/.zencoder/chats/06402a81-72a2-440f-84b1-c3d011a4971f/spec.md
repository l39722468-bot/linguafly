# Technical Specification - Course Unit Expansion

## 1. Technical Context
- **Language**: TypeScript / Node.js
- **Content**: JSON files in `src/content/cursos/duolingo-a1/`
- **UI Framework**: React (Next.js App Router)
- **Styling**: Tailwind CSS / Framer Motion

## 2. Implementation Approach

### 2.1 Content Transformation Script
A script will be used to automate the expansion of 30 units:
1. **Extraction**: Read `./supabase/migrations/20260201_expand_unit_X.sql`.
2. **Mapping**: 
    - `multipleChoice` -> `multiple_choice`
    - `matching` -> `matching`
    - `fillBlanks` -> `transformation` (or `short_writing` depending on complexity)
    - `drag-drop` -> `reorder_words`
    - `flashcard` -> `vocabulary` (Note: component might need mapping for these types)
3. **Merging**:
    - Read existing `unitX.json`.
    - Flatten all existing `blocks[].content` into a single array.
    - Append the 50 new exercises.
    - Update `total_duration_minutes` (estimate 1 min per new exercise).
    - Save back to `unitX.json`.

### 2.2 UI Component Refactoring

#### `DuolingoUnitViewer.tsx`
- **Target**: Remove "Plan de estudios" block list.
- **Change**: Replace the `blocks.map` loop with a summary of activities or simply remove that section to focus on the "Start" button.
- **Change**: Update "Lecciones" counter to "Ejercicios" (showing `blocks[0].content.length`).

#### `PremiumDuolingoSession.tsx`
- **Target**: Remove block transitions.
- **Change**: In the `queue` useMemo, remove the logic that pushes `{ type: 'transition' }`.

## 3. Verification Plan
- **Linting**: Run `npm run lint` to ensure no UI breakages.
- **Manual Test**: Open Unit 1 in the browser and verify it starts directly and has 60+ exercises in the progress bar.
- **Data Integrity**: Validate JSON files against existing schemas if applicable.
