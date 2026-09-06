# Implementation Plan: A1 Course Standardization - Module 2 (Phase 1)

This plan covers the refactoring and standardization of Units 11, 12, and 13 to meet the high-quality pedagogical and technical standards of the Focus English A1 course.

## Tasks

### 1. Refactor Unit 11: Telling the Time
- [ ] Apply bilingual `[[English|Spanish]]` format to all 60 exercises in `src/lib/course/a1/unit-11.ts`.
- [ ] Refactor Reading exercises (e55-e60) to use the two-phase UI (remove repeated text from questions, ensure full bilingual transcript).
- [ ] Audit pedagogical quality: Ensure no trivial answers and balanced `correctAnswer` distribution.
- [ ] **Verification**: Run `npm run lint` and verify exercise count (60).

### 2. Refactor Unit 12: Days of the Week
- [ ] Apply bilingual `[[English|Spanish]]` format to all 60 exercises in `src/lib/course/a1/unit-12.ts`.
- [ ] Refactor Reading exercises to use the two-phase UI.
- [ ] Audit pedagogical quality: Focus on correct use of `on` for days and `at` for times.
- [ ] **Verification**: Run `npm run lint` and verify exercise count (60).

### 3. Refactor Unit 13: Daily Routine
- [ ] Apply bilingual `[[English|Spanish]]` format to all 60 exercises in `src/lib/course/a1/unit-13.ts`.
- [ ] Refactor Reading exercises to use the two-phase UI.
- [ ] Audit pedagogical quality: Focus on sequence adverbs (`First`, `Then`, `Finally`).
- [ ] **Verification**: Run `npm run lint` and verify exercise count (60).

### 4. Final Verification & Approval
- [ ] Start dev server and visually verify the Reading UI in Unit 11.
- [ ] Obtain user approval for E2E test plan.
- [ ] Write and run E2E tests for the standardized units.
