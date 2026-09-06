# Technical Specification - TOEFL iBT Preparation Course

## Technical Context
- **Framework**: Next.js 15 (App Router).
- **Language**: TypeScript.
- **Backend**: Supabase.
- **Content Storage**: TypeScript modules in `src/lib/toefl-units/`.
- **Audio Generation**: `scripts/generate-course-audio.ts` (using ElevenLabs/OpenAI).

## Implementation Approach

### 1. Data Model & Structure
- Create a new directory structure:
  - `src/lib/toefl-units/`
    - `b1/`: 36 TypeScript files (`week-1.ts` to `week-36.ts`).
    - `b2/`: 36 TypeScript files.
    - `c1/`: 36 TypeScript files.
    - `index.ts`: Expose all modules.
- Use existing interfaces from `src/lib/exercise-types.ts` (Module, Lesson, Exercise).

### 2. Placement Test
- Create `src/lib/placement/toefl-test-data.ts`.
- Implement a function `calculateToeflLevel(score: number)` that maps scores to B1, B2, or C1.

### 3. Audio Pipeline
- Extend `scripts/generate-course-audio.ts` to include the new `toefl-units` modules.
- Ensure naming conventions for audio files match the expectations of the frontend player.

### 4. Course Registration
- Register the new TOEFL courses in `src/lib/course-service.ts` or where courses are listed for the UI.

## Source Code Changes

### New Files
- `src/lib/placement/toefl-test-data.ts`: TOEFL level assessment questions.
- `src/lib/toefl-units/b1/week-1.ts` ... `week-36.ts`.
- `src/lib/toefl-units/b2/week-1.ts` ... `week-36.ts`.
- `src/lib/toefl-units/c1/week-1.ts` ... `week-36.ts`.
- `src/lib/toefl-units/index.ts`.

### Modified Files
- `src/lib/exercise-types.ts`: Add any TOEFL-specific interaction types if needed (e.g., `academic_discussion`).
- `src/lib/course-service.ts`: To include TOEFL as a course category.
- `scripts/generate-course-audio.ts`: To process the new content.

## Delivery Phases

### Phase 1: Placement Test & Core Structure
- Create `toefl-test-data.ts`.
- Set up the directory structure for `toefl-units`.

### Phase 2: B1 Course Content (Weeks 1-36)
- Generate curriculum and content for B1 level.
- Generate initial audio.

### Phase 3: B2 Course Content (Weeks 1-36)
- Generate curriculum and content for B2 level.

### Phase 4: C1 Course Content (Weeks 1-36)
- Generate curriculum and content for C1 level.

### Phase 5: Verification
- Run `npm run validate-exercises` (if applicable to TS modules).
- Manual verification of the placement test flow.

## Verification Approach
- **Linting**: `npm run lint`.
- **Typing**: `tsc --noEmit`.
- **Validation**: Use existing audit scripts adjusted for the new path.
