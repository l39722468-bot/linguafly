# Technical Specification: Duolingo Course Expansion

## 1. Technical Context
- **Platform**: Next.js 15, Supabase (PostgreSQL).
- **Data Storage**: `public.course_exercises` table.
- **Languages**: TypeScript (Frontend), SQL (Seed data).

## 2. Implementation Approach
- **Seed Migration Files**: We will create new SQL migration files for each unit or module to keep them manageable.
- **Exercise ID Generation**: IDs will follow the pattern `{lesson_id}-ex{n}`, where `n` starts from the next available index.
- **Exercise Types & JSON Schemas**:
    - **flashcard**:
      ```json
      {
        "title": "Title",
        "instructions": "Instructions",
        "items": [{ "front": "English", "back": "Spanish", "pronunciation": "/phonetic/" }]
      }
      ```
    - **multipleChoice**:
      ```json
      {
        "prompt": "Question text?",
        "options": ["A", "B", "C"],
        "answerIndex": 0,
        "explanation": "Why A is correct."
      }
      ```
    - **drag-drop**:
      ```json
      {
        "title": "Title",
        "instructions": "Instructions",
        "correctSentence": "Full English sentence",
        "translation": "Traducción al español"
      }
      ```
    - **matching**:
      ```json
      {
        "instructions": "Match...",
        "pairs": [{ "id": "1", "word": "English", "correctMatch": "Spanish", "distractors": ["Other"] }]
      }
      ```
    - **fillBlanks**:
      ```json
      {
        "text": "The ___ is on the table.",
        "answers": ["cat"],
        "instructions": "Fill in..."
      }
      ```

## 3. Data Model Changes
No changes to the database schema are required. We are only adding rows to `public.course_exercises`.

## 4. Source Code Structure
- New migration files: `supabase/migrations/20260201_expand_unit_{nn}.sql`.

## 5. Verification Plan
- **Syntax Check**: Run `supabase db lint` (if available) or manually verify SQL syntax.
- **Validation Script**: Use `scripts/validate-exercises.mjs` to ensure JSON content adheres to the expected format.
- **Visual Check**: Verify exercises appear correctly in the application UI (manual check).

## 6. Delivery Milestones
- **Milestone 1**: Module 1 Expansion (Units 1-10) - 500 exercises.
- **Milestone 2**: Module 2 Expansion (Units 11-20) - 500 exercises.
- **Milestone 3**: Module 3 Expansion (Units 21-30) - 500 exercises.
