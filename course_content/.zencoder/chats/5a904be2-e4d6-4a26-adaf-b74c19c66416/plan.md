# Plan - Fix Unit 5 Exercise Rendering

## [x] Phase 1: Exploration and Diagnosis
- [x] Read the plan and provide a UI observation report.
- [x] Identify the exercise in the codebase (`unit-5.ts`).
- [x] Analyze `ExerciseRenderer.tsx` and identify why elements are missing.
- [x] Create technical specification (`spec.md`).

## [x] Phase 2: Implementation
- [x] Implement `fill-blank` input rendering fix in `ExerciseRenderer.tsx`.
- [x] Add an audio playback button in `ExerciseRenderer.tsx` (using `Volume2` icon).
- [ ] (Optional) Consider adding inline gaps if the current UI looks broken.
- [x] Ensure the "Confirm Answer" button is properly enabled/disabled.

## [x] Phase 3: Verification
- [x] Obtain permission for E2E tests.
- [x] Pushed changes with commit 2a128000.
- [x] Task completed successfully.

## [x] Phase 4: Unit 6 Audit
- [x] Audit all exercises in `unit-6.ts` for configuration issues.
- [x] Ensure `audioUrl` is present where expected.
- [x] Check for `instructions` vs `question` mismatches.
- [x] Fix any discovered issues and commit.

## [x] Phase 5: Remove Flashcards from A1 Course
- [x] Identify all A1 unit files in `src/lib/course/a1/`.
- [x] Remove all exercises of type `flashcard` from these files.
- [x] Ensure exercise numbering or IDs remain consistent (if needed).
- [x] Commit and push changes. (Commit fa31f44f)
