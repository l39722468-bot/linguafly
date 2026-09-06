# Product Requirements Document (PRD): Duolingo Course Expansion

## 1. Overview
Expand the existing A1 English course (Duolingo-style) by adding 50 new exercises to each of the first 30 units. This expansion aims to provide a more comprehensive and engaging learning experience, following the pedagogical standards of a Cambridge-qualified teacher.

## 2. Target
- **Units**: 1 to 30 (Modules 1, 2, and 3).
- **Quantity**: 50 **additional** exercises per unit.
- **Total**: 1,500 new exercises.

## 3. Pedagogical Requirements
Exercises must be:
- **Level-appropriate**: Strictly A1 (Beginner) level.
- **Contextual**: Focused on the specific topic of the unit (e.g., Numbers, Daily Routine, Giving Directions).
- **Varied**: Mix of different exercise types to keep students engaged.
- **Accurate**: High-quality English with correct Spanish translations/explanations.

## 4. Technical Requirements
### Exercise Types
1.  **flashcard**: Vocabulary and pronunciation.
2.  **drag-drop**: Sentence building and word ordering.
3.  **multipleChoice**: Grammar, vocabulary, and situational questions.
4.  **matching**: Word-to-translation or word-to-category pairs.
5.  **fillBlanks**: Cloze tests for grammar and context.

### Data Structure
All exercises must be formatted as SQL `INSERT` statements for the `public.course_exercises` table, following the existing JSON structure in the `content` column.

## 5. Scope of Content (Units 1-30)
- **Module 1 (Units 1-10)**: Greetings, Numbers 1-100, Alphabet, Spelling, Countries, Family, Colors, Jobs.
- **Module 2 (Units 11-20)**: Time, Days, Routine, Present Simple (all persons), Cafe/Food, Likes/Dislikes, Months/Dates.
- **Module 3 (Units 21-30)**: House/Furniture, There is/are, Prepositions, Neighborhood, Directions, Pets, Body, Clothes.

## 6. Delivery Phases
Due to the volume (1,500 exercises), delivery will be split into three milestones:
1.  **Phase 1**: Units 1-10 (Module 1) - 500 exercises.
2.  **Phase 2**: Units 11-20 (Module 2) - 500 exercises.
3.  **Phase 3**: Units 21-30 (Module 3) - 500 exercises.

## 7. Verification
- All SQL scripts must be valid and executable.
- Exercise JSON content must be valid against internal schemas.
- Content must be checked for duplicates.
