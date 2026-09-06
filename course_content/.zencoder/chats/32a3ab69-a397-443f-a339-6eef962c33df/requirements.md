# Product Requirements Document (PRD) - 300 A1 Exercises (Unit 1 Focus)

## 1. Goal
Generate 300 unique, non-repetitive English exercises for A1 level students, specifically focusing on **Unit 1: Presentations and Everyday Life**.

## 2. Target Audience
- A1 Level English students (Beginners).
- Spanish-speaking students (explanations in Spanish).

## 3. Functional Requirements
- **Quantity**: 300 unique exercises.
- **Level**: A1 (CEFR).
- **Core Topics (Unit 1)**:
    - Greetings and introductions.
    - Personal information (name, age, nationality).
    - Family and friends.
    - House and rooms.
    - Daily routines.
    - Days of the week and months.
- **Core Grammar (Unit 1)**:
    - Verb 'to be' (am, is, are).
    - Personal pronouns.
    - Possessive adjectives (my, your, his, her).
    - Present Simple (basic).
    - Articles (a, an, the).
    - Singular/Plural nouns.
    - Demonstratives (this, that, these, those).
- **Anti-Repetition Measures**:
    - Each exercise must use a unique scenario (e.g., a specific character, city, or situation).
    - High variety in exercise types (Multiple Choice, Fill-in-the-blanks, Matching, Word Search, Crossword, Sentence Building).
    - No two exercises should feel identical in structure or content.

## 4. Technical Requirements
- Use `ExerciseGenerator` (OpenAI GPT-4o).
- Implement a batch generation script `scripts/generate-a1-unit1-exercises.ts`.
- Store exercises in `src/lib/generated-a1-unit1-exercises.ts`.
- Use a "Scenario Matrix" to rotate through different contexts (Home, Work, School, Travel, Shopping).

## 5. Scope & Constraints
- Only Unit 1 content.
- Batch generation to avoid timeouts and maintain quality.
- Manual verification of a sample (e.g., 5%) for quality assurance.

## 6. Success Criteria
- 300 exercises generated and correctly formatted.
- < 2% similarity between any two exercises (verified by content hash).
- All exercises pass the existing validation scripts.
