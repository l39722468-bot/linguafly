# Product Requirements Document (PRD) - A1 English Course Rebuild

## 1. Goal
Rebuild the A1 level English course professionally using the provided pedagogical material. The goal is to create a non-monotonous, high-quality user experience with varied exercise types and intermixed vocabulary.

## 2. Source Material Analysis
The provided text contains:
- **Adjectives**: Position (Adj + Noun), no plural.
- **Adverbs**: Adjectives vs Adverbs (-ly, irregulars like good/well, hard, fast).
- **Frequency Adverbs**: 
    - Group 1 (Between S and V, after 'to be'): always, usually, often, sometimes, never, hardly ever.
    - Group 2 (Start/End of sentence): Every day, Every Monday, Once/Twice a week/month.
- **Connectors**: After (Prep/Conj) vs Then/Afterwards (Adv).
- **Common Mistakes for Spanish Speakers**: 'a' before singular countable nouns, 'in the world' (not 'of'), 'much' vs 'a lot of', 'children' (no 's'), 'information/homework/work' (uncountable), 'on the Internet'.
- **Saxon Genitive**: 's for possession (People, Animals, Places). Use of 'of' for inanimate objects.
- **Capital Letters**: Nationalities, Languages, Months, Days (Spanish speakers often fail here).
- **Ordinal Numbers & Dates**: 1st, 2nd, 3rd, etc. British vs American date formats.
- **Transport & Prepositions**: 'by' (general), 'on/in' (specific), 'on foot'.
- **Verbs for Transport**: Get on/off (train/bus/plane/bike), Get into/out of (car/taxi).
- **Prepositions of Place**: Near (no 'of'), Close to, Next to, In front of (delante), Opposite (enfrente).

## 3. Requirements
- **Content Variety**: Do not repeat prompts (enunciados).
- **Exercise Types**: Use all available interaction types:
    - `multiple_choice`
    - `matching`
    - `reorder_words`
    - `true_false`
    - `fill_blanks`
    - `short_writing`
    - `flashcard`
    - `categorization`
    - `reading-comprehension`
    - `audio_player`
- **Intermixing**: Mix different topics and vocabulary within units to avoid monotony.
- **Professionalism**: Use clear explanations and high-quality examples.
- **User Experience**: Excellent UX, ensuring logical progression and clarity.

## 4. Scope
- Rebuild the A1 course units.
- Map the provided material into structured JSON units.
- Ensure compliance with existing curriculum schemas.

## 5. Constraints
- Must follow existing JSON structure in `src/content/cursos/ingles-a1/`.
- Must respect TypeScript interfaces in `src/lib/curriculum-data.ts`.
