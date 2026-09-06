# Technical Specification: C1 Advanced English Course

## 1. Technical Context
- **Language**: TypeScript
- **Framework**: Next.js 15 (App Router)
- **Database/Backend**: Supabase
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 2. Implementation Approach
We will replicate the B2 course structure for the C1 course to ensure consistency and reuse existing UI components.

### 2.1. Data Layer
- **New Directory**: `src/lib/c1-units/` to house unit definitions.
- **Utility Functions**: Copy and adapt `src/lib/b2-units/utils.ts` to `src/lib/c1-units/utils.ts` (changing prefix from `b2-` to `c1-`).
- **Curriculum Mapping**: Create `src/lib/c1-units/curriculum.ts` with 60 units tailored for C1 level.
- **Unit Files**: Create `src/lib/c1-units/unit-1.ts` through `src/lib/c1-units/unit-60.ts`.
- **Course Data**: Update `src/lib/course-data-c1.ts` to export `ALL_C1_UNITS` and `C1_MODULES`.

### 2.2. UI Layer
- **New Directory**: `src/app/curso/ingles-c1/`.
- **Pages**:
  - `page.tsx`: Course dashboard (stats, modules, units).
  - `[unitId]/page.tsx`: Individual unit practice page.
  - `practica/page.tsx`, `practica/PracticeClient.tsx`, `practica/actions.ts`: Random practice feature for C1.

### 2.3. Logic & Services
- **Progress Tracking**: Update `src/lib/services/premium-course-service.ts` to include methods for C1 progress (if not already generic).
- **Navigation**: Ensure the C1 course is accessible from the main navigation/dashboard.

## 3. C1 Curriculum Highlights (Example for first 10 units)
1.  **Unit 1**: Advanced Narrative Tenses & Inversion.
2.  **Unit 2**: Cleft Sentences for Emphasis.
3.  **Unit 3**: Modal Verbs of Deduction & Speculation in the Past.
4.  **Unit 4**: Advanced Conditionals (Mixed & Inverted).
5.  **Unit 5**: Subjunctive Mood & Formal Expressions.
6.  **Unit 6**: Phrasal Verbs (Three-part) & Idioms.
7.  **Unit 7**: Passive Reporting Verbs (It is said that...).
8.  **Unit 8**: Gerunds vs Infinitives (Advanced Nuances).
9.  **Unit 9**: Advanced Relative Clauses & Participle Clauses.
10. **Unit 10**: Module 1 Review.

## 4. Delivery Phases
- **Phase 1**: Infrastructure & First 5 Units.
- **Phase 2**: UI Implementation & Navigation.
- **Phase 3**: Units 6-30.
- **Phase 4**: Units 31-60.
- **Phase 5**: Final Review & Polish.

## 5. Verification Approach
- **Linting**: `npm run lint`
- **Type Checking**: `npm run typecheck`
- **Manual Verification**: Access `/curso/ingles-c1` and verify unit loading and exercise functionality.
