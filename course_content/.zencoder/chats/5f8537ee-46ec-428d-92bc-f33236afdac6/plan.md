# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements
### [x] Step: Technical Specification
### [x] Step: Planning

### [x] Step: Implementation (Unit 17)
1. [x] Restore exercises 1-10 from git history into `src/lib/course/a1/unit-17.ts`.
2. [x] Add exercises 11-20 (Breakfast topic) based on migration content.
3. [x] Add exercises 21-30 (Lunch topic) based on migration content.
4. [x] Add exercises 31-40 (Dinner topic) based on migration content.
5. [x] Add exercises 41-50 (Utensils & Actions topic) based on migration content.
6. [x] Add exercises 51-60 (Challenge Review & Extra vocabulary).

### [x] Step: Refactor Unit 19 (Months & Dates)
1. [x] Replace current content in `src/lib/course/a1/unit-19.ts` with 60 new exercises about Months, Dates, and Birthdays.

### [x] Step: Fix UI/UX Issues
1. [x] Fix missing text in Reading Comprehension exercises by updating `ExerciseRenderer.tsx` to implement a two-phase display: Reading Phase (Text only) and Question Phase (Questions).
2. [x] Ensure pedagogical logic in reading questions (avoiding triviality) and correct grouping of questions.

### [x] Step: Course Specifications Documentation
1. [x] Create `src/content/cursos/ingles-a1/course-specifications.md` with detailed academic objectives for all 60 units (Grammar, Vocabulary, Reading).

### [ ] Step: Standardization of A1 Course (Module by Module)

#### General Quality Rules (Apply to all units):
- **Non-Trivial Exercises**: Must require actual comprehension of the English text.
- **Full Translations**: Every English word in transcript/question must use `[[English|Spanish]]`.
- **"Son" Warning**: Be careful with words like "son" (English for hijo) that the system might highlight if they appear in Spanish instructions.
- **Randomized Answers**: Correct options must be distributed (not always 'a').
- **Reading UI**: Use the two-phase system (Text first, then questions).

#### Module 1: Basics & Personal Info (Refactor Status)
- [x] **Unit 1**: Greetings & Personal Info (Done - High Quality Refactor)
- [x] **Unit 2**: Countries & Nationalities (Done)
- [x] **Unit 3**: Emotions & States (Done)
- [x] **Unit 4**: Numbers 1-10 & Classroom Objects (Done)
- [x] **Unit 5**: Possessive 's & Family Members (Done)
- [x] **Unit 6**: More Family & Adjectives (Done)
- [x] **Unit 7**: Colors & Physical Descriptions (Done - High Quality Refactor)
- [x] **Unit 8**: Numbers 20-100, Prices & Ages (Done - High Quality Refactor)
- [x] **Unit 9**: Jobs & Occupations (Done)
- [x] **Unit 10**: Module 1 Review & Assessment (Done)

#### Module 2: Daily Life & Routines
- [ ] **Unit 11**: Telling the Time
- [ ] **Unit 12**: Days of the Week
- [ ] **Unit 13**: Daily Routine
- [ ] **Unit 14**: Present Simple: I, You, We, They
- [ ] **Unit 15**: Present Simple: He, She, It
- [ ] **Unit 16**: At the Cafe
- [x] **Unit 17**: Breakfast, Lunch & Dinner (Done)
- [ ] **Unit 18**: Likes & Dislikes
- [x] **Unit 19**: Months & Dates (Done)
- [x] **Unit 20**: Health & Body (Done)

#### Module 3-6: Remaining Refactor
- [ ] Audit and Refactor Units 21-60 according to `course-specifications.md`.
