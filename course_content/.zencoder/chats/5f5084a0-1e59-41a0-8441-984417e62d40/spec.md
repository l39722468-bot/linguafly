# Technical Specification - "Banca y Finanzas" Week 1 Expansion

## 1. Context
- **Language**: English (A1 Level)
- **Target File**: `src/content/cursos/trabajo/finanzas/a1/trimestre1/semana01/exercises.json`
- **Current State**: 5 exercises (Multiple Choice, Matching, Writing)
- **Target State**: 50 exercises

## 2. Schema Selection
We will follow the existing schema in `src/content/cursos/trabajo/finanzas/a1/trimestre1/semana01/exercises.json`:
- Root object keys: `goal`, `level`, `trimester`, `weekId`, `title`, `items` (array).
- Keys within `items`: camelCase (e.g., `answerIndex`, `explanation`).

### 2.1 Reading Comprehension Schema
- `type`: `reading-comprehension`
- `title`: String
- `text`: String (use `**word**` for highlights)
- `vocabularyHelp`: Array of `{ word, definition }`
- `questions`: Array of `{ question, options, answerIndex, explanation }`

### 2.2 Listening Comprehension Schema
- `type`: `listening-comprehension`
- `title`: String
- `transcript`: String (used for TTS or display)
- `vocabularyHelp`: Array of `{ word, definition }`
- `questions`: Array of `{ question, options, answerIndex, explanation }`

### 2.3 Word Search Schema
- `type`: `word-search`
- `title`: String
- `instructions`: String
- `words`: Array of uppercase strings
- `gridSize`: Number (default 10)

### 2.4 Crossword Schema
- `type`: `crossword`
- `title`: String
- `instructions`: String
- `items`: Array of `{ word, clue, direction, row, col }`

## 3. Implementation Approach
1. **Content Generation**: Create 45 new exercises covering:
    - Large Numbers (1,000 to 1,000,000)
    - Currencies (Dollar, Euro, Pound)
    - Digital Money (E-wallet, Bitcoin, Online Banking)
    - Grammar: Verb 'to be' (Am, Is, Are)
2. **Distribution**:
    - Existing: 5 (Multiple Choice, Matching, Writing)
    - New Reading: 5 exercises (each with 3 questions) = 5 items
    - New Listening: 5 exercises (each with 3 questions) = 5 items
    - New Word Searches: 5 items
    - New Crosswords: 5 items
    - New Multiple Choice / Fill Blanks: 25 items
    - **Total**: 5 + 5 + 5 + 5 + 5 + 25 = 50 items.
3. **Validation**:
    - Ensure all `id`s are unique (following pattern `fin-a1-w1-qX`).
    - Verify JSON syntax.

## 4. Verification Plan
- **Manual Check**: Verify that `vocabularyHelp` matches the words in `**bold**` in reading exercises.
- **Lint**: Run `npm run lint` (if available) to ensure JSON is valid within the project context.
- **Type Check**: The project has a `validate-exercises.mjs` script; we should run it.
