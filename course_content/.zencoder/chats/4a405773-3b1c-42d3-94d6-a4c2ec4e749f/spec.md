# Technical Specification: C2 English Proficiency Course

## 1. Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.7.2
- **Data Architecture**: Static TypeScript files for course content, integrated into the frontend.
- **Location**: `src/lib/c2-units/`
- **Existing Assets**: Units 1-6 are implemented. Syllabus mapping in `src/lib/c2-units/curriculum.ts`.

## 2. Implementation Approach
The implementation will follow the pattern established in `src/lib/c2-units/unit-1.ts` to `unit-6.ts`. 

### Key Components:
1.  **Content Files**: Individual `.ts` files for each unit (`unit-7.ts` to `unit-60.ts`).
2.  **Exercise Blocks**: Each unit file will export 10 `Exercise` blocks (`C2_UX_BLOCK1` to `C2_UX_BLOCK10`).
3.  **Lesson Creation**: Use `createC2Unit` from `./utils` to assemble the unit.
4.  **Integration**: Export all units from `src/lib/c2-units/index.ts`.

### Generation Strategy:
- Use the 60-unit syllabus in `curriculum.ts` as the source of truth for topics and grammar.
- Ensure each unit has 100 exercises (10 blocks of 10).
- Maintain a mix of exercise types:
    - `multiple-choice`
    - `fill-blank`
    - `key-word-transformation`
    - `vocabulary`
    - `grammar`

## 3. Source Code Structure Changes
- **Add**: `src/lib/c2-units/unit-7.ts` ... `src/lib/c2-units/unit-60.ts`.
- **Modify**: `src/lib/c2-units/index.ts` to import and export all new units.

## 4. Data Model
- **Exercise**: Defined in `src/lib/exercise-types.ts`.
- **Lesson**: Defined in `src/lib/exercise-types.ts`.

## 5. Delivery Phases
- **Phase 1**: Infrastructure & Template setup.
- **Phase 2**: Generation of Module 1 remaining units (Units 7-10).
- **Phase 3**: Generation of Module 2 units (Units 11-20).
- **Phase 4**: Generation of Module 3 units (Units 21-30).
- **Phase 5**: Generation of Module 4 units (Units 31-40).
- **Phase 6**: Generation of Module 5 units (Units 41-50).
- **Phase 7**: Generation of Module 6 units (Units 51-60).

## 6. Verification Approach
- **Type Checking**: Run `npm run typecheck` or `tsc --noEmit`.
- **Structure Audit**: Verify each unit has 10 blocks of 10 questions.
- **Linting**: Run `npm run lint`.
