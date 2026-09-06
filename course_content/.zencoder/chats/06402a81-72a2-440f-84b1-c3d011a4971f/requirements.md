# Product Requirements Document (PRD) - Course Unit Expansion and Simplification

## 1. Overview
The goal is to enhance the `duolingo-a1` course by expanding the number of exercises in each of the 30 units and simplifying the unit structure by removing lesson-based divisions.

## 2. Requirements

### 2.1 Content Expansion
- **Exercise Count**: Each unit must contain at least 50 additional exercises (totaling ~60+ exercises per unit).
- **Source of Content**: Use the existing SQL migrations in `supabase/migrations/20260201_expand_unit_X.sql` as a source of truth for the additional exercises, adapting them to the JSON format used by the `duolingo-a1` course.
- **Coverage**: All 30 units must be expanded.

### 2.2 Structural Simplification
- **Single Block Experience**: Units should no longer be divided into "Lessons" or "Blocks" from the user's perspective. Once a user enters a unit, they should go through all exercises in a single, continuous flow.
- **Data Model Update**: The `unitX.json` files should reflect this change, either by having a single block or by flattening the exercise list if the component supports it.
- **UI Changes**:
    - The "Plan de estudios" (Syllabus) preview in `DuolingoUnitViewer` should be removed or updated to show a summary of the unit instead of individual lessons.
    - The transition screens between blocks in `PremiumDuolingoSession` should be removed.

## 3. Scope
- **Affected Course**: `duolingo-a1` (found in `src/content/cursos/duolingo-a1/`).
- **Affected Components**: 
    - `DuolingoUnitViewer.tsx`
    - `PremiumDuolingoSession.tsx`
- **Affected Content Files**: `unit1.json` through `unit30.json`.

## 4. Constraints
- Preserve the existing exercise types (multiple_choice, matching, etc.).
- Maintain compatibility with the `DuolingoUnitViewer` and `PremiumDuolingoSession` components.
- Ensure audio URLs or generation logic remains functional for the new exercises.

## 5. Success Criteria
- Each unit has 50+ exercises.
- Users can start a unit and progress through all exercises without lesson interruptions.
- The UI no longer displays a list of lessons within a unit.
