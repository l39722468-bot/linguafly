# Requirements Document - A1 Unit 2 Remake

## Overview
Remake Unit 2 of the A1 English course to meet professional academic standards. The unit must focus on specific grammar and vocabulary topics and include 60 high-quality exercises.

## Academic Objectives (Unit 2)
- **Grammar**: Verb "to be" (he, she, it, we, they) in affirmative forms.
- **Vocabulary**: Countries, nationalities, and basic professions.
- **Reading**: Personal profiles and descriptions of origin.

## Functional Requirements
1. **Content Overhaul**: Replace existing placeholders in `src/lib/course/a1/unit-2.ts` with 60 professional exercises.
2. **Exercise Distribution (Target)**:
    - Vocabulary (Countries/Nationalities/Professions): ~20 exercises
    - Grammar (Verb to be - plural and 3rd person): ~20 exercises
    - Reading Comprehension: ~10 exercises
    - Mixed/Review: ~10 exercises
3. **Bilingual Support**: All instructions and explanations must use the `[[English|Spanish]]` syntax.
4. **Security/Locking**: 
    - The unit must be marked as `LOCKED`.
    - A specific authorization mechanism/code (to be provided by the user) is required for future modifications.
5. **Consistency**: Follow the data structure and styling used in `unit-1.ts`.

## Content Specifications
- **Exercise Types**: `multiple-choice`, `fill-blank`, `sentence-building`, `matching`.
- **Difficulty Levels**: Balanced across Easy, Medium, and Hard.
- **Feedback**: Every exercise must include a bilingual `explanation`.
- **Engagement**: Use realistic names, diverse countries, and modern professions.

## Non-Functional Requirements
- **Maintainability**: Clear IDs following the `a1-u2-e{N}` pattern.
- **Performance**: Ensure the large array of exercises doesn't negatively impact UI performance in the previewer.
