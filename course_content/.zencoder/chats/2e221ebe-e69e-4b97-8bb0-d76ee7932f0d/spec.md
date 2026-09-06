# Technical Specification: Duolingo A1 Exercise Expansion

## Context
- **Framework**: Next.js 15 (App Router).
- **Backend**: Supabase (PostgreSQL).
- **Languages**: TypeScript, SQL.
- **Content Source**: `src/content/cursos/duolingo-a1/`.
- **Database Seed**: `supabase/migrations/`.

## Implementation Approach
1. **Content Generation**: Use AI (Zencoder capabilities) to generate high-quality A1 English exercises for Units 2-30.
2. **JSON Expansion**:
   - For each unit file `unit[X].json`, expand the `blocks` array.
   - Each unit should have ~4-5 blocks (Warm-up, Grammar/Vocabulary, Practice 1, Practice 2, Test).
   - Each block will contains 3-5 interactions, totaling 15-20 interactions per unit.
3. **SQL Synchronization**:
   - Create new migration files or update existing ones (preferred to keep it organized).
   - Each interaction or group of interactions will be inserted into `public.course_exercises`.
   - **Mapping Rule**: 
     - JSON `interaction` maps to a row in `course_exercises`.
     - `order_index` will be maintained sequentially across blocks.
     - `content` JSONB in SQL will match the structure expected by the frontend (which seems to be the content of the interaction).

## Source Code Structure Changes
- Modify existing JSON files in `src/content/cursos/duolingo-a1/`.
- Create a new migration file: `supabase/migrations/20260202_expanded_duolingo_a1_content.sql` (to consolidate all additions).

## Data Model Changes
No changes to the schema. We will use the existing `course_modules`, `course_lessons`, and `course_exercises` tables.

## Implementation Phases
### Phase 1: Module 1 (Basics - Units 2-10)
- Generate content for Units 2, 3, 4, 5, 6, 7, 8, 9, 10.
- Update JSON files.
- Update SQL migration.

### Phase 2: Module 2 (Daily Life - Units 11-20)
- Generate content for Units 11, 12, 13, 14, 15, 16, 17, 18, 19, 20.
- Update JSON files.
- Update SQL migration.

### Phase 3: Module 3 (My World - Units 21-30)
- Generate content for Units 21, 22, 23, 24, 25, 26, 27, 28, 29, 30.
- Update JSON files.
- Update SQL migration.

## Verification
1. **Linting**: Run `npm run lint` to ensure no syntax errors in JSON/TS.
2. **Validation**: Use `scripts/validate-exercises.mjs` to check JSON integrity.
3. **Dry Run**: Check the generated SQL for correct IDs and foreign key relationships.
