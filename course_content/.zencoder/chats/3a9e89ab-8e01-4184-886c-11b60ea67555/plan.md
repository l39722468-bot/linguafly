# Plan - Font Improvement for Exercises

## Workflow Steps

### [x] Step: Requirements
- Create PRD: [requirements.md](./requirements.md)

### [x] Step: Technical Specification
- Create Spec: [spec.md](./spec.md)

### [ ] Step: Planning
- Break down the work into concrete tasks.

### [x] Step: Implementation

#### 1. Global CSS Cleanup
- [x] Update `src/app/globals.css`:
  - Define or alias `--font-dm-sans` and `--font-space-grotesk` to `var(--font-nunito)`.
  - Change `h1` from `font-black tracking-tighter` to `font-extrabold tracking-tight`.
  - Change `h1, h2, h3, h4, h5, h6` from `font-extrabold tracking-tight` to `font-bold tracking-normal`.

#### 2. ExerciseRenderer Typography Update
- [x] Update `src/components/ExerciseRenderer.tsx`:
  - Replace `font-black` with `font-extrabold` or `font-bold` in titles and questions.
  - Relax `tracking-tight` or `tracking-tighter` where needed.

#### 3. Spelling Exercise Update
- [x] Add `spelling` type to `ExerciseRenderer.tsx`.
- [x] Update `DragDropExercise.tsx` to support letter-by-letter spelling (joining without spaces).
- [x] Convert exercise `a1-u1-e10` in `unit-1.ts` to `spelling` type.

#### 4. Verification
- [x] Start dev server and verify visually with the `browser` tool.
- [x] (Optional) Run existing E2E tests: `npm run test:e2e`.

### [x] Step: Test Plan Approval
- [x] Present test plan for approval before writing any new E2E tests.

### [x] Step: Completion
- [x] Commit and push changes. (Commit: 1c13471a)

## Phase 2: Fix Missing Translations (Units 30-60)

### [x] Step: Requirements
- Create PRD: [requirements.md](./requirements.md)

### [x] Step: Technical Specification
- Create Spec: [spec.md](./spec.md)

### [x] Step: Planning
- [x] Break down the work into unit batches.

### [x] Step: Implementation
- [x] Fix Unit 30
- [x] Fix Units 31-40
- [x] Fix Units 41-50
- [x] Fix Units 51-60

### [x] Step: Verification
- [x] Run validation scripts.
- [x] Visual check in browser. (Manual verification of file contents)

### [x] Step: Completion
- [x] Commit and push changes. (Commit: 4795869e)
