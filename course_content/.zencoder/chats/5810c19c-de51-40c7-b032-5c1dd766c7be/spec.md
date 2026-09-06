# Technical Specification - A1 Course Expansion

## Technical Context
- **Framework**: Next.js 15 (App Router).
- **Language**: TypeScript.
- **Content Storage**: JSON files located in `src/content/cursos/ingles-a1/`.
- **Renderer**: `src/components/course/exercises/PremiumSession.tsx` and `src/components/ExerciseRenderer.tsx`.
- **Game Components**: `WordSearchExercise.tsx` and `CrosswordExercise.tsx`.

## Implementation Approach
We will systematically update each of the 60 JSON files. Due to the high volume of content, we will follow a structured pedagogical template for each unit to ensure variety and coverage of all A1 skills.

### Pedagogical Template (per Unit)
Each unit will be divided into blocks (e.g., Vocabulary, Grammar, Communication, Games) to reach 100 exercises.
- **Block 1: Vocabulary (30 interactions)**: Multiple choice, matching, flashcards.
- **Block 2: Grammar (30 interactions)**: Fill blanks, transformation, reorder words.
- **Block 3: Communication & Skills (20 interactions)**: True/false, short writing, multiple choice situational.
- **Block 4: Games & Review (20 interactions)**: Word searches, crosswords, categorization.

### Data Structures

#### Word Search Interaction
```json
{
  "interaction_id": "U1_G1",
  "type": "word-search",
  "prompt_es": "Encuentra el vocabulario de saludos",
  "words": ["hello", "goodbye", "morning", "night"],
  "gridSize": 10,
  "clues": [
    {"word": "hello", "clue": "Greeting"},
    {"word": "goodbye", "clue": "Farewell"}
  ],
  "mastery_tag": "vocabulary"
}
```

#### Crossword Interaction
```json
{
  "interaction_id": "U1_G2",
  "type": "crossword",
  "prompt_es": "Resuelve el crucigrama",
  "items": [
    {
      "word": "HELLO",
      "clue": "The opposite of goodbye",
      "direction": "across",
      "row": 0,
      "col": 0
    },
    {
      "word": "HI",
      "clue": "Short for hello",
      "direction": "down",
      "row": 0,
      "col": 0
    }
  ],
  "mastery_tag": "vocabulary"
}
```

## Source Code Structure Changes
No changes to the source code logic are expected, only data additions/modifications in `src/content/cursos/ingles-a1/*.json`.

## Delivery Phases
We will work in trimesters (20 units each) or modules (10 units each) to ensure incremental progress.
- **Milestone 1**: Units 1-10 (Module 1 completed)
- **Milestone 2**: Units 11-20 (Module 2 completed)
- ... and so on.

## Verification Approach
- **Linting**: Run `npm run lint` to ensure no syntax errors.
- **Validation Script**: Use existing validation scripts like `scripts/validate-exercises.mjs` to ensure JSON schema compliance.
- **Manual Review**: Verify game rendering in the UI for a sample of units.
