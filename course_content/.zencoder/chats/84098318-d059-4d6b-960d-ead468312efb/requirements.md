# Product Requirements Document (PRD) - A2 Course Expansion

## 1. Goal
Expand the English A2 course units to include 500 exercises each, covering all 60 units defined in the syllabus. The content should be aligned with the A2 Key (KET) level.

## 2. Scope
- **Target Level**: A2 (Elementary).
- **Units**: 1 to 60.
- **Exercise Count**: 500 exercises per unit.
- **Exercise Types**: 
    - Multiple Choice (Vocabulary and Communication)
    - Matching (Vocabulary)
    - Grammar Transformation (Fill in the blanks)
    - True/False (Grammar/Syntax)
    - Word Reordering (Syntax)
    - Short Writing (Translation from Spanish to English)

## 3. Thematic Guide (A2 Key/KET)
Exercises will be based on the following thematic areas as per the KET handbook:
- Personal identification and information
- House and home
- Daily life
- Free time, entertainment, and media
- Travel, holidays, and transport
- Places and buildings
- Health, medicine, and exercise
- School and study
- Food and drink
- Shopping
- Social interaction
- The natural world
- Work and jobs

## 4. Implementation Approach
- Update the existing Python script `scripts/expand-a2-course.py`.
- Enhance `PEDAGOGICAL_DATA` with a comprehensive pool of vocabulary, grammar, and sentences for all 60 units.
- Increase `EXERCISES_PER_UNIT` to 500.
- Update `UNITS_COUNT` to 60.
- Ensure the script generates high-quality, level-appropriate exercises using randomized templates.
- The script will overwrite existing `unit[X].json` files in `src/content/cursos/ingles-a2/`.

## 5. Success Criteria
- 60 JSON files generated in `src/content/cursos/ingles-a2/`.
- Each file contains 500 exercises.
- All exercises follow the correct schema for the frontend to render them.
- Content is appropriate for A2 level.
