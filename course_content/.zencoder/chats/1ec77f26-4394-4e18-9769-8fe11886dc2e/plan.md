# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements
Create a Product Requirements Document (PRD) based on the feature description.
- [x] PRD saved to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/1ec77f26-4394-4e18-9769-8fe11886dc2e/requirements.md`

### [x] Step: Technical Specification
Create a technical specification based on the PRD.
- [x] Spec saved to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/1ec77f26-4394-4e18-9769-8fe11886dc2e/spec.md`

### [x] Step: Planning
Create a detailed implementation plan based on the specification.
- [x] Create implementation tasks
- [x] Update `plan.md`

### [ ] Step: Implementation

#### Phase 1: Audio Generation Script
- [x] Create `scripts/generate-a1-unit1-audio.ts` to extract strings and generate audios.
- [x] Run the script to generate all required audios for Unit 1.
- [x] Verify audios exist in `public/audio/course/a1/unit-1/`.

#### Phase 2: Update Course Data
- [x] Update `src/lib/course/a1/unit-1.ts` with references to the new audio files.
- [x] Ensure all exercise types are covered (Flashcards, Multiple Choice, Speaking, etc.).

#### Phase 3: UI Enhancements
- [x] Verify `FlashcardExercise.tsx` uses the new audios.
- [x] Add audio playback support to other exercise types in `ExerciseRenderer.tsx` if missing.
- [x] Add a "Listen to model" button in `SpeakingExercise.tsx`.

#### Phase 4: Verification
- [x] Manually verify behavior at `/debug/a1-preview/unit-1`.
- [x] Run existing tests.
- [x] Create and run E2E tests for Unit 1 audio (pending approval).
