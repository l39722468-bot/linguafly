# Product Requirements Document (PRD) - A1 Course Redesign & Exercise Variety

## 1. Overview
The goal is to redesign the A1 English course to provide a high-quality, varied, and pedagogically sound experience for students. The current system suffers from excessive repetition. The new course will follow a 12-unit structure (approximately 24-36 hours of study) and include up to 6000 unique exercises.

## 2. Target Audience
Absolute beginners (A1 level) who want to learn English for everyday situations (greetings, shopping, directions, etc.).

## 3. Curriculum Structure (12 Units)
The course will follow this specific syllabus:
- **Unit 1**: First contact (Alphabet, greetings, classroom English, countries, numbers 0-20).
- **Unit 2**: Introductions (Verb to be - I/you, personal pronouns, possessives).
- **Unit 3**: Personal Info (Verb to be - all forms, Wh- questions, jobs).
- **Unit 4**: Objects & House (Articles a/an, plurals, demonstratives, colors).
- **Unit 5**: Daily Routine (Present simple, adverbs of frequency, time).
- **Unit 6**: Family & Descriptions (Have/Has got, possessives, adjectives).
- **Unit 7**: Food & Drink (There is/are, some/any, likes/dislikes).
- **Unit 8**: Shopping & Prices (Can/Can't, How much, money, clothes).
- **Unit 9**: City & Directions (Prepositions of place, imperatives, transport).
- **Unit 10**: Free Time & Plans (Present continuous, Let's...).
- **Unit 11**: Travel & Situations (Past was/were, travel vocabulary).
- **Unit 12**: Final Review & Fluency (Comprehensive assessment).

## 4. Functional Requirements
### 4.1 Exercise Generation
- **Volume**: Generate up to 500 exercises per unit (Total: 6000).
- **Variety**: Ensure a mix of types (Multiple Choice, Matching, Transformation, True/False, Reorder, Short Writing).
- **Pedagogical Mixing**: Exercises must not be grouped by type or concept only; they must be interleaved to improve retention.
- **Vocabulary Expansion**: Use a broad range of vocabulary appropriate for A1 level, avoiding repetitive "Apple/Manzana" placeholders.

### 4.2 Verification System
- **Audit Tool**: A script to verify the distribution of exercise types within each unit.
- **Vocabulary Check**: Ensure that key vocabulary from the syllabus is covered and not excessively repeated.
- **Grammar Check**: Verify that each unit covers the required grammar points.

## 5. Technical Requirements
- Use existing `ExerciseGenerator` and `MixedExerciseGenerator` logic.
- Expand `cambridge-curriculum.ts` or create a specific A1 curriculum mapping for these 12 units.
- Store exercises in JSON format (e.g., `src/content/cursos/ingles-a1/unitX.json`).

## 6. Constraints
- Content must be in English (questions) and Spanish (prompts/explanations).
- Follow CEFR A1 standards strictly.
