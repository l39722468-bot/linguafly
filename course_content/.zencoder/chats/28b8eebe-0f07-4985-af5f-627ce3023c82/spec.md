# Technical Specification - A1 Unit 2 Remake

## Technical Context
- **Language**: TypeScript
- **Framework**: Next.js (App Router)
- **Data Store**: Static TypeScript files in `src/lib/course/`
- **Component**: `CourseExercise` (inferred from usage)

## Implementation Approach
1. **Data Structure**:
    - Modify `src/lib/course/a1/unit-2.ts`.
    - Export a `unit2` object (or array) that implements the `Exercise` interface.
    - Implement a `status: "LOCKED"` property or header comment to indicate protection.
    
2. **Authorization Logic**:
    - The user requested a "code" to unlock the unit for future modifications.
    - Since this is a static file, the "locking" is primarily a metadata flag and a convention.
    - **Proposed implementation**: Add a `metadata` property with `isLocked: true` and a placeholder for `authCodeHash`.

3. **Exercise Generation Strategy**:
    - **Vocabulary (1-20)**: Focus on Countries (Spain, Mexico, UK, USA, France, Italy, Japan, Brazil, Germany, Canada) and Nationalities. Add basic professions (Teacher, Doctor, Student, Engineer, Nurse, Chef).
    - **Grammar (21-40)**: Focus on `he`, `she`, `it`, `we`, `they` with `is/are`. Include contractions (`he's`, `they're`).
    - **Reading (41-50)**: Short texts (3-4 sentences) about people's origins and jobs.
    - **Mixed (51-60)**: Integrated exercises combining all topics.

## Source Code Structure
- **File**: `src/lib/course/a1/unit-2.ts`
- **Exports**: `export const unit2Exercises: Exercise[] = [...]`

## Delivery Phases
- **Phase 1**: Vocabulary Exercises (1-20)
- **Phase 2**: Grammar Exercises (21-40)
- **Phase 3**: Reading & Mixed Exercises (41-60)
- **Phase 4**: Security Implementation & Validation

## Verification
- **Visual**: Use the browser tool to view `https://www.focus-on-english.com/debug/a1-preview/unit-2`.
- **Linting**: Run `npm run lint` or `tsc` to ensure type safety.
- **E2E**: Write a Playwright test to verify the first, middle, and last exercises load correctly.
