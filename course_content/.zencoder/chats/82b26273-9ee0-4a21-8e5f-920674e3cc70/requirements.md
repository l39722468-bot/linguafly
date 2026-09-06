# Product Requirements Document (PRD): A1 Course Expansion

## 1. Overview
Expansion of the English A1 course content to provide a more robust and professional learning experience. The goal is to reach 300 exercises per unit across 60 units, specifically tailored for absolute beginners (Spanish speakers) who have no prior knowledge of English.

## 2. Target Audience
- **Absolute beginners**: People starting from zero.
- **Native Spanish speakers**: The course must use Spanish as a bridge (scaffolding).

## 3. Goals
- **Scale**: Increase exercise count from ~100 to 300 per unit.
- **Quality**: Ensure pedagogical soundness, following a logical progression for beginners.
- **Variety**: Use multiple exercise types to keep users engaged and address different learning styles.
- **Professionalism**: Content should be accurate, culturally relevant, and free of errors.

## 4. Requirements

### 4.1 Content Structure
- **Units**: 60 units as defined in `syllabus.md`.
- **Quantity**: Exactly 300 exercises per unit.
- **Scaffolding**: Every exercise must have clear instructions in Spanish (`prompt_es`).
- **Pedagogical Progression**: Each unit should cover:
    - Vocabulary (matching, multiple choice).
    - Basic Grammar (transformation, true/false).
    - Syntax (reorder words).
    - Communication/Real-life usage (multiple choice with context).
    - Translation (short writing).

### 4.2 Exercise Types
- `multiple_choice`: For vocabulary and grammar.
- `matching`: For word-translation pairs.
- `transformation`: For verb conjugations and grammatical changes.
- `true_false`: For grammar accuracy and comprehension.
- `reorder_words`: For sentence structure (syntax).
- `short_writing`: For basic translations from Spanish to English.

### 4.3 Technical Requirements
- Data format: JSON files in `src/content/cursos/ingles-a1/unit{id}.json`.
- Consistency: Maintain existing JSON schema used by the frontend.
- Scalability: Use a script to generate the bulk of the content while ensuring high quality through robust pedagogical data or AI-assisted generation.

## 5. Success Metrics
- 60 JSON files generated.
- Each file containing 300 exercises.
- All exercises passing basic validation (no missing fields, correct JSON format).
- Pedagogical alignment with the A1 syllabus.
