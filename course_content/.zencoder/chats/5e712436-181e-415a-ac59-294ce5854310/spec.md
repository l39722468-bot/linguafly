# Technical Specification: English for Travel (A1) 60-Unit Course

## 1. Technical Context
- **Frontend**: Next.js 15 (App Router).
- **Language**: TypeScript (Backend/Service), Python (Content Generation).
- **Database**: Supabase (PostgreSQL).
- **Content Storage**: JSON files for local access and Supabase for dashboard/tracking.

## 2. Implementation Approach
To handle 60 units and 6,000 exercises, we will use a **Script-First Approach**:
1. **Curriculum Expansion**: Define the detailed 60-unit roadmap in `src/lib/curriculum-data.ts`.
2. **Automated Generation**: Create a specialized Python generator `scripts/generate-travel-a1-course.py` based on `generate-a1-mega-course.py`.
3. **Multi-Source Content**: The generator will use a rich dictionary of travel-specific vocabulary, grammar points, and situational dialogues.
4. **Database Synchronization**: Create a TypeScript utility to sync the generated JSON content into Supabase tables (`course_modules`, `course_lessons`, `course_exercises`).

## 3. Data Model Changes
- **Supabase**: No schema changes needed, but significant data insertion.
    - `course_goal`: "viajes"
    - `course_level`: "A1"
    - Trimesters will be mapped to `course_modules`.
    - Units will be mapped to `course_lessons`.
    - Exercises will be mapped to `course_exercises`.

## 4. Source Code Structure
- `src/content/cursos/viajes/a1/`: Root for travel course content.
    - `trimester1/week01-15/`
    - `trimester2/week16-30/`
    - `trimester3/week31-45/`
    - `trimester4/week46-60/`
- Each week folder will contain `lesson1.json` (the interactive unit).

## 5. Delivery Phases
### Phase 1: Curriculum & Tooling
- Update `VIAJES_A1` in `src/lib/curriculum-data.ts` with all 60 units.
- Develop the Python generator script.
### Phase 2: Content Generation (Trimester 1 & 2)
- Generate first 30 units (3,000 exercises).
- Verify quality and variety.
### Phase 3: Content Generation (Trimester 3 & 4)
- Generate remaining 30 units (3,000 exercises).
### Phase 4: Integration & Sync
- Sync all content to Supabase.
- Verify visibility in `http://localhost:5436/dashboard/viajes/a1`.

## 6. Verification Approach
- **Validation**: Run `npm run validate-exercises` and `npm run validate-exercise-types` on generated content.
- **Manual QA**: Check random units in the local dashboard to ensure "excellent UX".
- **Database Check**: Verify exercise counts in Supabase using `scripts/list-tables.ts` or similar.
