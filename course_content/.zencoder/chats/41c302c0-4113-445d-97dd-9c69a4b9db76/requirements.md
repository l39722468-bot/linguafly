# PRD: Expansion of Duolingo A1 Course Exercises (Units 1-30)

## Overview
Expand the interactive exercises for the first 30 units of the Duolingo A1 English course. Each unit should have a set of exercises designed for educational engagement, following the established Duolingo-style learning path.

## Scope
- **Units**: 1 to 30 (Modules 1, 2, and 3).
- **Language Level**: A1 English.
- **Content Type**: Interactive exercises (vocabulary, grammar, listening, reading).
- **Target Platform**: Focus English Web Platform (Next.js + Supabase).

## Exercise Types
Based on the existing codebase and the Duolingo style, we will use:
- **Flashcards**: For vocabulary introduction and pronunciation.
- **Drag & Drop**: For sentence construction and reordering.
- **Multiple Choice**: For grammar and comprehension.
- **Fill in the Blanks**: For vocabulary and grammar practice.
- **Matching**: For word-definition or word-translation pairs.

## Unit Breakdown (Based on Syllabus)
### Module 1: Basics & Personal Info (Units 1-10)
- Greetings,Introductions, Numbers 1-20, Alphabet, Countries, Family, Colors, Numbers 20-100, Jobs.

### Module 2: Daily Life & Routines (Units 11-20)
- Time, Days, Daily Routine, Present Simple (I/You/We/They), Present Simple (He/She/It), Cafe, Meals, Likes/Dislikes, Months/Dates.

### Module 3: My World (Units 21-30)
- Rooms, Furniture, There is/are, Prepositions of Place, Neighborhood, Directions, Pets, Body Parts, Clothes.

## Technical Requirements
- Exercises must be stored in the `public.course_exercises` table in Supabase.
- Exercise content must follow the JSON schema expected by the components.
- `ExerciseRenderer` must be updated to support `flashcard` and `drag-drop` (which are already defined as components but not integrated in the renderer).

## Success Criteria
- 30 units fully populated with at least 5-8 exercises each.
- All exercises functional and correctly rendered.
- content aligned with A1 English level.
