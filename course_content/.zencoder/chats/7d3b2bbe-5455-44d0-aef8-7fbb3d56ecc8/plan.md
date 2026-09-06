# TOEFL iBT Preparation Course Implementation Plan

## Workflow Steps

### [x] Step: Requirements
Create a Product Requirements Document (PRD) based on the feature description.
Saved to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/7d3b2bbe-5455-44d0-aef8-7fbb3d56ecc8/requirements.md`.

### [x] Step: Technical Specification
Create a technical specification based on the PRD.
Saved to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/7d3b2bbe-5455-44d0-aef8-7fbb3d56ecc8/spec.md`.

### [x] Step: Planning
Create a detailed implementation plan.
Updating this file with the concrete tasks.

### [x] Step: Implementation (Massive Expansion Phase)

#### Phase 1: Foundation & Placement Test
- [x] **Task 1.1**: Create `src/lib/placement/toefl-test-data.ts` with 30-40 questions specifically designed to distinguish between B1, B2, and C1 for TOEFL.
- [x] **Task 1.2**: Update `src/lib/placement/engine.ts` (if necessary) to handle the new TOEFL placement test logic.
- [x] **Task 1.3**: Create directory structure for `src/lib/toefl-units/{b1,b2,c1}`.

#### Phase 2-4: Base Content Generation
- [x] **Initial 108 units created** with baseline exercises (10 per week).

#### Phase 5: Technical Integration & Audio
- [x] **Task 5.1**: Register new courses in `src/lib/services/toefl-course-service.ts`.
- [x] **Task 5.2**: Update `scripts/generate-course-audio.ts` to process the new `toefl-units`.
- [ ] **Task 5.2.1**: Generate all audios for B1, B2, and C1 TOEFL tracks.
- [x] **Task 5.3**: Update `PremiumSession.tsx` to support `audio-player` and `multiple-choice` (hyphenated).

#### Phase 7: Massive Exercise Expansion (100 exercises/week)
- [x] **Task 7.1**: Create `scripts/generate-toefl-mass-exercises.ts` (Managed manually/via agent).
- [x] **Task 7.2**: Refactor `src/lib/toefl-units/utils.ts` to support larger data volumes (sharding).
- [x] **Task 7.3**: Execute expansion for B1 (36 weeks * 100 exercises).
    - [x] Weeks 1-36 completed.
- [x] **Task 7.4**: Execute expansion for B2 (36 weeks * 100 exercises).
    - [x] Weeks 1-4 completed (Block 1: Reading Focus).
    - [x] Weeks 5-8 completed (Block 2: Listening Focus).
    - [x] Weeks 9-12 completed (Block 3: Speaking Focus).
    - [x] Weeks 13-16 completed (Block 4: Writing Focus).
    - [x] Weeks 17-24 completed (Block 5: Mixed Review & Advanced Strategy).
    - [x] Weeks 25-36 completed (Block 6: Full Simulacros & Score Boost).
- [x] **Task 7.5**: Execute expansion for C1 (36 weeks * 100 exercises).
    - [x] Weeks 1-12 completed (Block 1: Academic Mastery).
    - [x] Weeks 13-24 completed (Block 2: Rhetorical Analysis).
    - [x] Weeks 25-36 completed (Block 3: Native-Level Fluency & Mock Exams).

#### Phase 8: Verification & Final Audit
- [x] **Task 8.1**: Run `npm run type-check` and fix all TOEFL-related errors.
- [x] **Task 8.2**: Verify performance with 100 exercises per unit.
- [x] **Task 8.3**: Final review of the 36-week structure (108 units) and adaptation to Premium UI.
