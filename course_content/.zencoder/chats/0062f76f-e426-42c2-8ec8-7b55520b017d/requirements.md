# Product Requirements Document (PRD) - Practical Application Exercises

## Overview
The "Practical Application" feature aims to provide students with interactive exercises that reinforce the grammar and vocabulary concepts learned in each lesson. Currently, many lessons have a "Practical Application" section that displays "0 QUESTIONS", indicating a lack of content.

## Goals
- Populated "Practical Application" sections with relevant questions for lessons.
- Ensure questions align with the lesson's level (e.g., B2) and topic (e.g., Finance).
- Support various question types (multiple-choice, fill-in-the-blank, etc.) as defined in `exercise-types.ts`.

## Requirements
1. **Content Integration**: Exercises must be added to the lesson data structures (e.g., in `src/lib/course-data-*.ts` or similar files).
2. **Exercise Types**: Use existing exercise types:
    - `multiple-choice`
    - `fill-blank`
    - `short-answer`
    - `true-false`
3. **Rendering**: Ensure `GrammarVocabularyRenderer` and `QuestionRenderer` correctly display the new questions.
4. **Scoring**: New questions must contribute to the "Progress" and "Avg Score" calculations in `LessonViewer`.
5. **Feedback**: Students should receive immediate feedback upon submission, including explanations.

## Target Lessons
- The initial focus is on the lesson shown in the screenshot: `cursos/trabajo/finanzas/b2/trimestre1/semana01`.
- This pattern should be extensible to other lessons in the course.

## Constraints
- Must follow the existing architecture using `LessonViewer` and specialized renderers.
- Exercises should be tailored to the specific sector (e.g., Finance) and level (B2).

## Success Criteria
- The "Practical Application" section no longer shows "0 QUESTIONS".
- Students can complete the exercises and see their results.
- Progress and scores are accurately updated.
