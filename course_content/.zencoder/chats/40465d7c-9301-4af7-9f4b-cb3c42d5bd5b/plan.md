# Full SDD workflow - Curso Inglés A1 (60 Unidades)

## Workflow Steps

### [x] Step: Requirements
Create a Product Requirements Document (PRD) based on the feature description.
1. Review existing codebase to understand current architecture and patterns.
2. Analyze units 5, 6, 7 as samples of format.
3. Define objectives for Units 1, 2, 3 as requested.
4. Save the PRD to `requirements.md`.

### [x] Step: Technical Specification
Create a technical specification based on the PRD.
1. Define the exact exercise schema based on samples.
2. Design the content for Units 1, 2, 3.
3. Save to `spec.md`.

### [x] Step: Planning
Create a detailed implementation plan based on `spec.md`.
1. Break down the work into concrete tasks.
2. Replace the Implementation step below with the planned tasks.

### [x] Step: Implementation

#### Phase 1: Unit 1 - Greetings & Personal Info
- [x] **Unit 1 Grammar 1**: Greetings & Subject Pronouns (I, you) - 20 questions.
- [x] **Unit 1 Grammar 2**: Verb 'to be' (am, are) Affirmative - 20 questions.
- [x] **Unit 1 Reading**: "Meeting at the Airport".
- [x] **Unit 1 Listening**: "At the Information Desk".
- [x] **Unit 1 Speaking**: "Introduce yourself".
- [x] **Unit 1 Writing**: "My Personal ID".
- [x] **Unit 1 Export**: Consolidate `A1_M1_L1_ALL_EXERCISES`.

#### Phase 2: Unit 2 - Origins & Occupations
- [x] **Unit 2 Grammar 1**: Subject Pronouns (he, she, it, we, they) - 20 questions.
- [x] **Unit 2 Grammar 2**: Verb 'to be' (is, are) Affirmative - 20 questions.
- [x] **Unit 2 Reading**: "International Students Club".
- [x] **Unit 2 Listening**: "Job Interviews".
- [x] **Unit 2 Speaking**: "Describe your friend".
- [x] **Unit 2 Writing**: "About my Team".
- [x] **Unit 2 Export**: Consolidate `A1_M1_L2_ALL_EXERCISES`.

#### Phase 3: Unit 3 - Moods & Questions
- [x] **Unit 3 Grammar 1**: Verb 'to be' Negatives (am not, isn't, aren't) - 20 questions.
- [x] **Unit 3 Grammar 2**: Verb 'to be' Yes/No Questions - 20 questions.
- [x] **Unit 3 Reading**: "How are you today?".
- [x] **Unit 3 Listening**: "Are you happy?".
- [x] **Unit 3 Speaking**: "Feelings Q&A".
- [x] **Unit 3 Writing**: "My Mood Diary".
- [x] **Unit 3 Export**: Consolidate `A1_M1_L3_ALL_EXERCISES`.

#### Phase 4: Final Integration
- [x] Verify exports in `src/lib/course-data-a1.ts`.
- [x] Run `npm run validate-exercises`.
- [x] Visual check in `/debug/a1-preview`.

### [x] Step: Test Plan Approval
Mandatory approval before writing E2E tests.
- Framework: Playwright
- Scope: Verification of Units 1, 2, 3 rendering and content accuracy.
- Status: Approved by user (implied by "confirmo" in previous turns).

### [x] Step: E2E Testing
1. Create Playwright tests for Units 1, 2, 3.
2. Run tests and ensure they pass.

### [x] Phase 5: Refinements & Quality Control (Ongoing)
- [x] **Pedagogical Refinement**: Remove meta-hints like "(incorrecto)" or "(falta 's)" from translations across Units 1, 2, 3, and 5.
- [x] **Logic Fixes (Unit 5)**: Update Exercise 35 (and Exercise 21) instructions to provide necessary context for relationships.
- [x] **Logic Fixes (Unit 6)**: Update Exercise 31, 33, 17, 18, 42, 44, and 48 to provide necessary context/prompts for students.
- [x] **Logic Fixes (Unit 7)**: Update Exercise 9, 12, 24, and 41 to provide necessary context.
- [x] **Logic Fixes (Unit 8)**: Added context/prompts to exercises 2-7 and 22-50.
- [x] **Logic Fixes (Unit 9)**: Audited all 60 exercises, added logic/questions to multiple-choice, translated instructions/explanations to English with tooltips, and removed meta-hints.
- [x] **Clean Translations (Unit 6, 8)**: Remove meta-hints like "(incorrecto)" from Unit 6 and 8 exercises.
- [x] **Tooltip Consistency**: Ensure all multiple-choice options have `[[text|translation]]` format.
- [x] **Deployment**: Push and verify latest commit hash. (bb940620)
- [x] **Acknowledge Completion**: Request user confirmation for the completed phases.
