# C2 Proficiency (CPE) Refocus Plan

## Objective
Refocus the 60-unit C2 course to align strictly with the Cambridge C2 Proficiency Teacher's Handbook, covering all 4 papers: Reading and Use of English, Writing, Listening, and Speaking.

## Workflow Steps

### [x] Step 1: Curriculum Redesign
- [x] Define 6 modules (10 units each) covering the 8 parts of Reading & Use of English.
- [x] Integrate Writing (Part 1 & 2) strategies and practice.
- [x] Integrate Listening (Part 1-4) practice.
- [x] Integrate Speaking (Part 1-3) strategies.

### [x] Step 2: Technical Update
- [x] Update `src/lib/course-data-c2.ts` with new module titles and unit descriptions.
- [ ] Update `src/lib/c2-units/utils.ts` if needed for new exercise types.

### [ ] Step 3: Implementation (Phases 1-6)
- [x] **Phase 1: Units 1-10 (Reading & Use of English Part 1)**
    - [x] Unit 1: Part 1 - Multiple-choice Cloze (100 exercises)
    - [x] Unit 2: Part 1 - Multiple-choice Cloze (100 exercises)
    - [x] Units 3-10: Part 1 - Multiple-choice Cloze (100 exercises each)
- [x] **Phase 2: Units 11-20 (Reading & Use of English Part 2)**
    - [x] Units 11-20: Part 2 - Open Cloze (100 exercises each)
- [x] **Phase 3: Units 21-30 (Reading & Use of English Part 3 & 4)**
    - [x] Units 21-25: Part 3 - Word Formation (100 exercises each)
    - [x] Units 26-30: Part 4 - Key Word Transformation (100 exercises each)
- [x] **Phase 4: Units 31-40 (Writing Focus)**
    - [x] Units 31-40: Writing Skills & Language (100 exercises each)
- [x] **Phase 5: Units 41-50 (Listening Focus)**
    - [x] Units 41-50: Listening Skills & Language (100 exercises each)
- [x] **Phase 6: Units 51-60 (Speaking Focus & Exam Review)**
    - [x] Units 51-60: Speaking Skills & Final Review (100 exercises each)

### [x] Step 4: Verification
- [x] Run `npm run type-check`.
- [x] Verify 6,000 exercises total (100 per unit).
