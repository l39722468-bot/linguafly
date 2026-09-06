# Product Requirements Document (PRD): C2 English Proficiency Course

## 1. Introduction
The objective is to expand the "Focus English" platform with a high-level English course (CEFR C2). This course targets students aiming for the highest level of English proficiency, focusing on nuanced communication, advanced grammar, and specialized vocabulary.

## 2. Feature Description
Create a comprehensive C2 level English course consisting of 60 units, with 100 exercises per unit, following the structure and quality of existing levels.

## 3. Goals
- Provide 6,000 high-quality C2 level exercises.
- Cover a wide range of topics (Personality, Science, Arts, Business, Philosophy, etc.).
- Ensure a 100% completion of the C2 syllabus.
- Maintain consistency with the existing platform architecture.

## 4. Functional Requirements
- **Content Structure**: 60 Units divided into 6 Modules (10 units per module).
- **Unit Content**: Each unit must contain 10 blocks of 10 exercises each (Total 100 exercises/unit).
- **Exercise Types**: Must include a variety of types such as Multiple Choice, Fill-in-the-blanks, Key Word Transformation, etc.
- **Language**: Exercises should be in English, with explanations and prompts in Spanish (consistent with current courses).
- **Difficulty**: Real C2 level (Proficiency).

## 5. Technical Requirements
- **File Format**: TypeScript files (`.ts`) in `src/lib/c2-units/`.
- **Data Model**: Use `Lesson` and `Exercise` types from `src/lib/exercise-types.ts`.
- **Integration**: All units must be imported and registered in `src/lib/c2-units/index.ts`.
- **Syllabus Reference**: Follow `src/lib/c2-units/curriculum.ts`.

## 6. User Experience
- Students should see a progress bar for each unit.
- Instant feedback on exercises (in Spanish).
- Advanced vocabulary and grammar focus.

## 7. Assumptions & Constraints
- Content will be generated using AI patterns similar to previous levels.
- The 60-unit syllabus mapping in `curriculum.ts` is considered final and should be followed.
- Units 1-6 are already partially or fully implemented and should be reviewed/fixed if necessary.

## 8. Success Criteria
- 60 units are available in the system.
- Each unit contains exactly 100 exercises.
- Course is navigable from the dashboard (if integrated).
- Lint and type checks pass.
