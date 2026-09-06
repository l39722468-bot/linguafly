# Product Requirements Document (PRD) - "Banca y Finanzas" Week 1 Expansion

## 1. Overview
The goal of this task is to expand the "Banca y Finanzas" (Banking and Finance) course, specifically for Week 1 of the A1 level. The current exercise set is limited (5 exercises), and the requirement is to reach a total of 50 exercises.

## 2. Target Features
- **Total Exercises**: Increase the count from 5 to 50 for Week 1.
- **Exercise Types**:
    - **Reading Comprehension**: Exercises must include a text with highlighted words. When the user hovers over these words, a definition must be shown.
    - **Listening Comprehension**: Audio-based exercises with transcripts and questions.
    - **Word Search (Sopa de Letras)**: Grid-based word finding exercises.
    - **Crossword (Crucigramas)**: Standard crossword puzzles with clues.
- **Course Context**: Banking and Finance, Level A1, Week 1.
- **Topics**: Numbers, Currencies, and Digital Money (as defined in the theory file).

## 3. User Experience
- Students should have a variety of exercises to practice the weekly topics.
- Reading exercises should provide immediate vocabulary support via hover tooltips.
- The interface for Word Search and Crossword should be consistent with existing implementations in other parts of the platform.

## 4. Technical Requirements
- Update `src/content/cursos/trabajo/finanzas/a1/trimestre1/semana01/exercises.json` with 45 new items.
- Ensure all exercise IDs are unique.
- Follow the existing schema for `reading-comprehension`, `listening-comprehension`, `word-search`, and `crossword`.
- Maintain the language level at A1 (simple sentences, basic vocabulary).

## 5. Success Criteria
- Week 1 exercises file contains exactly 50 items.
- All exercises are correctly typed and follow the schema.
- Reading exercises have `vocabularyHelp` and double-asterisk highlighting in the text.
- Listening exercises have transcripts and relevant questions.
