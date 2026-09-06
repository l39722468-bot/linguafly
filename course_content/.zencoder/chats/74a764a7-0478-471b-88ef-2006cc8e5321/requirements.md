# Product Requirements Document (PRD): A1 English Course "Fun" Upgrade

## Objective
The objective is to transform the A1 English course into a more engaging, stimulating, and fun learning experience by introducing a variety of gamified exercise types and completing the curriculum for all 9 modules.

## User Persona
Beginner English learners (A1 level) who need high motivation and engaging content to stay committed to their learning journey.

## Functional Requirements

### 1. New Exercise Types
Integrate the following "fun" exercise types across the A1 curriculum:
- **Word Search**: For vocabulary reinforcement.
- **Crossword**: For testing definitions and spelling.
- **Drag & Drop**: For matching images to words or categorizing items.
- **Sentence Building**: Shuffled words that must be ordered correctly.
- **Flashcards**: For memory practice and active recall.

### 2. Curriculum Completion
- Populate Modules 4 through 9 with complete content (lessons and exercises).
- Ensure each module has a mix of standard and "fun" exercises.

### 3. Varied Learning Experience
- Mix new exercise types with existing ones (`multiple-choice`, `fill-blank`, `reading`, `listening`, `speaking`).
- Avoid repetitive blocks of the same exercise type.

### 4. Visual Content
- Leverage the existing `A1_IMAGE_BANK` for visual-heavy exercises (Drag & Drop, Flashcards).

## Non-Functional Requirements
- **Performance**: Exercises should load quickly.
- **Mobile Friendly**: Drag and drop and other interactive exercises must work well on touch devices.
- **Consistency**: Maintain the existing data structure and components where possible.

## Technical Constraints
- Use existing Next.js / React components for exercises.
- Content must be stored in the existing TypeScript data files (`src/lib/a1-m*-detailed.ts`).
- Follow the CEFR A1 curriculum standards.

## Success Criteria
- All 9 modules of the A1 course have functional, varied exercises.
- A user can complete a lesson with at least 3 different types of exercises.
- Positive feedback on course engagement.
