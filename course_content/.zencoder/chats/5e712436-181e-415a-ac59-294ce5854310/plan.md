# Plan: English for Travel (A1) 60-Unit Course

## Workflow Steps

### [x] Step: Requirements
### [x] Step: Technical Specification
### [x] Step: Planning

### [x] Step: Implementation

#### 1. Curriculum Definition
- [x] Update `src/lib/curriculum-data.ts` to include the full 60-unit roadmap for `VIAJES_A1`.
- **Verification**: Check if `VIAJES_A1.modules` contains all 4 trimesters and 60 units.

#### 2. Generator Development
- [x] Create `scripts/generate-travel-a1-course.py`.
- [x] Define travel-specific vocabulary (1,000+ words).
- [x] Define travel-specific grammar patterns.
- [x] Implement exercise generation logic (Matching, MC, Fill-blanks).
- **Verification**: Run script for 1 unit and check `src/content/cursos/viajes/a1/trimester1/week01/lesson1.json`.

#### 3. Mass Content Generation
- [x] Run the generator for all 60 units.
- [x] Ensure 100 exercises per unit.
- **Verification**: Check directory structure and file counts (60 JSON files).

#### 4. Content Validation
- [x] Run `npm run validate-exercises`.
- [x] Run `npm run validate-exercise-types`.
- **Verification**: Fix any validation errors reported by the scripts.

#### 5. Database Synchronization
- [x] Create/Use a sync script to insert modules, lessons, and exercises into Supabase.
- **Verification**: Check Supabase dashboard for "viajes" goal and "A1" level.

#### 6. Final UX Review
- [x] Navigate to `http://localhost:5436/dashboard/viajes/a1`.
- [x] Test random exercises for interactivity and correctness.
- **Verification**: Confirm "excellent user experience" as requested.
