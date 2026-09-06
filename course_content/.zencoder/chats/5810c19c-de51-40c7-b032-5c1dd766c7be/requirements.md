# Product Requirements Document (PRD) - A1 Course Expansion

## Feature Overview
The goal is to expand the existing A1 English course (60 units) to have **100 high-quality exercises per unit**. The exercises should be varied, pedagogical, and include interactive games like word searches and crosswords to make learning more engaging.

## User Persona
- **Role**: AI Assistant acting as a **Cambridge English Teacher**.
- **Target Audience**: Spanish-speaking students learning English at A1 (Beginner) level.
- **Tone**: Professional, encouraging, and educationally rigorous.

## Requirements

### 1. Content Quantity & Quality
- **100 exercises per unit**: Each of the 60 units defined in `syllabus.md` must be completed to have 100 interactions.
- **Pedagogical Rigor**: Exercises must stimulate learning, avoid repetitions, and avoid "obvious" solutions that lead to guessing.
- **A1 Level Appropriateness**: All content must align with the Common European Framework of Reference for Languages (CEFR) A1 level.

### 2. Variety of Exercise Types
The expanded units should use a mix of the following types:
- **multiple_choice**: Standard multiple-choice questions for vocabulary and grammar.
- **fill_blanks**: Gap-filling exercises for sentence structure and verb forms.
- **true_false**: True or false statements for comprehension and grammar.
- **reorder_words**: Scrambled sentences to test syntax.
- **matching**: Linking words to meanings or translations.
- **flashcard**: Vocabulary review with front and back sides.
- **categorization**: Sorting words or phrases into categories.
- **short_writing**: Simple translation or composition tasks.
- **word-search (Interactive Game)**: Finding hidden words in a grid.
- **crossword (Interactive Game)**: Solving word puzzles using clues.

### 3. Interactive Games Specification
- **Word Search**:
  - Requires a list of `words`.
  - Optional `gridSize` (default 10).
  - Optional `clues` for each word.
- **Crossword**:
  - Requires a list of `items` with `word`, `clue`, `direction` ('across' | 'down'), `row`, and `col`.

### 4. Technical Constraints
- **File Format**: Content must be stored in `src/content/cursos/ingles-a1/unitX.json`.
- **Data Structure**: Follow the existing `UnitData` structure with `blocks` containing `content` (interactions).
- **Normalization**: Ensure all fields (e.g., `prompt_es`, `stimulus_en`, `correct_answer`) follow the conventions used by the `PremiumSession.tsx` normalizer.

## Delivery Phases (Proposed)
1. **Phase 1: Foundation (Units 1-10)**: Complete the first 10 units of Module 1.
2. **Phase 2: Daily Life (Units 11-20)**: Complete Module 2.
3. **Phase 3: My World (Units 21-30)**: Complete Module 3.
4. **Phase 4: Abilities (Units 31-40)**: Complete Module 4.
5. **Phase 5: Travel (Units 41-50)**: Complete Module 5.
6. **Phase 6: Shopping & Food (Units 51-60)**: Complete Module 6.

## Verification
- Validate JSON structure against existing patterns.
- Ensure 100 exercises are present in each expanded unit.
- Manual/Automated check for variety and educational value.
