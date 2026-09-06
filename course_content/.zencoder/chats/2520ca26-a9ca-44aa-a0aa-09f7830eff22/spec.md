# Technical Specification - Exercise Specialization Cleanup

## 1. Technical Context
- **Language**: TypeScript, SQL
- **Database**: Supabase (PostgreSQL)
- **Frontend**: Next.js 15 (App Router)

## 2. Implementation Approach

### 2.1. Database Cleanup (Supabase)
We will create a new migration `supabase/migrations/20260210_cleanup_specialized_content.sql` to:
1.  **Identify Specialized Modules**: List all modules that are strictly professional, IT, finance, or exam-oriented.
2.  **Delete Content**: Perform a cascaded delete (exercises -> lessons -> modules) for the identified IDs.
3.  **Generalize remaining modules**: Update the `course_goal` of all remaining modules to 'general' to unify the curriculum.

### 2.2. Codebase Cleanup
1.  **Remove Files**:
    - `src/lib/sectors/` (Entire directory)
    - `src/lib/it-curriculum.ts`
    - `src/lib/legal-curriculum.ts`
    - `src/lib/engineering-curriculum.ts`
    - `src/lib/admin-curriculum.ts`
    - `src/lib/education-curriculum.ts`
    - `src/lib/marketing-curriculum.ts`
    - `src/lib/tourism-curriculum.ts`
    - `src/lib/services/toefl-course-service.ts` (TOEFL specific)
2.  **Modify Files**:
    - `src/lib/cambridge-curriculum.ts`: Remove specialized topics (Business, Specialized, etc.) and remove "Exam Mastery" framing from descriptions.
    - `src/components/onboarding/OnboardingFlow.tsx`: Update the `options` for the 'goal' step. Instead of 'trabajo', 'viajes', 'examenes', we will focus on a single generic goal or simplify the selection to focus on "General English Mastery".
    - `src/lib/ai/generator-v2.ts`: Ensure it doesn't fail if specialized topics are missing.

### 2.3. Source Code Structure Changes
- Removal of `src/lib/sectors/`.
- Consolidation of generic curriculum data.

## 3. Data Model / API Changes
- No schema changes.
- `course_goal` in `course_modules` will mostly (or entirely) contain 'general'.

## 4. Delivery Phases

### Phase 1: Database Purge
- Create and run the SQL migration.
- Verify that generic A1-C2 modules remain.

### Phase 2: Codebase Cleanup
- Delete specialized TypeScript files.
- Update `cambridge-curriculum.ts` to be purely linguistic.

### Phase 3: Frontend Refinement
- Update `OnboardingFlow.tsx` to align with the generic focus.

## 5. Verification Approach
- **Manual Verification**: Browse the course structure in the dashboard to ensure only generic levels (A1-C2) are visible.
- **Linting**: Run `npm run lint` to ensure no broken imports remain after file deletions.
- **Type Checking**: Run `npm run typecheck` to verify consistency.
- **Tests**: Run `npm test` to ensure core generators still function with the reduced curriculum.
