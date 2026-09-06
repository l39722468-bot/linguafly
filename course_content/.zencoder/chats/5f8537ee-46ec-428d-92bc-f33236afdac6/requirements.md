# PRD: Expand Unit 17 (A1) to 60 exercises

## Context
Unit 17 of the A1 course was accidentally overwritten with "Transport" content. According to the syllabus, it should cover "Breakfast, Lunch & Dinner". The unit currently has 10 valid exercises (pre-overwrite) and needs to be expanded to 60.

## Goals
1. **Topic Restoration**: Revert Unit 17 content to "Breakfast, Lunch & Dinner".
2. **Expansion**: Add 50 new exercises to reach a total of 60.
3. **Quality Standards**:
    - Use `[[English|Spanish]]` format for translations in `question`, `options`, `correctSentence`, etc.
    - Each exercise must have a unique ID (`a1-u17-e1` to `a1-u17-e60`).
    - Each exercise must have a corresponding `audioUrl`.
    - Topics should cover Breakfast, Lunch, Dinner, Utensils, and Actions.

## Requirements
- **Grammar**: Present Simple (Affirmative/Negative), "I eat...", "She likes...", "Do you have...?".
- **Vocabulary**: Meal items (cereal, eggs, bread, salad, chicken, pasta, steak, soup), drinks (milk, coffee, juice, water), utensils (fork, knife, spoon, plate, glass), and actions (cook, wash, set the table).
- **Exercise Types**: Flashcard, Multiple-choice, Sentence-building.

## Plan
1. Restore the first 10 exercises from git history.
2. Adapt the 50 exercises from the SQL migration to the TS format.
3. Enrich the 50 exercises with:
    - Proper instructions and titles in Spanish.
    - Bilingual format `[[English|Spanish]]`.
    - Transcripts for audio.
    - Pedagogical explanations.
4. Verify the final 60 exercises.
