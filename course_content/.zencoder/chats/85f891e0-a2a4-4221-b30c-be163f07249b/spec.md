# Technical Specification: Focus English A2 Course Rebuild

## 1. Technical Context
- **Language**: English (Target), Spanish (UI/Instructions).
- **Format**: JSON (Next.js App Router content).
- **Location**: `src/content/cursos/ingles-a2/`.
- **Level**: CEFR A2.

## 2. Implementation Approach

### 2.1. Content Generation
To ensure high-quality "real A2" content across 60 units, I will:
1.  **Syllabus Mapping**: Use the syllabus defined in the PRD.
2.  **Unit Templating**: Each unit will follow the A1 structure:
    -   **Block 1 (B1)**: Vocabulary (30-40 interactions: MC, Matching, Flashcards).
    -   **Block 2 (B2)**: Grammar (30-40 interactions: Fill Blanks, True/False, Reorder).
    -   **Block 3 (B3)**: Communication/Review (20-30 interactions: MC, Reorder, Short Writing).
3.  **Content Variety**: Ensure diverse examples and realistic scenarios (emails, simple conversations, descriptions).

### 2.2. Exercise Typology Implementation
I will use the exact JSON schema from A1:
-   `multiple_choice`: `{ interaction_id, type, prompt_es, stimulus_en?, options: [{id, text}], correct_answer, mastery_tag }`
-   `matching`: `{ interaction_id, type, prompt_es, pairs: [{id, left, right}], correct_answer, mastery_tag }`
-   `flashcard`: `{ interaction_id, type, prompt_es, flashcards: [{front, back, pronunciation}], mastery_tag }`
-   `true_false`: `{ interaction_id, type, prompt_es, correct_answer, feedback_correct_es?, feedback_incorrect_es?, mastery_tag }`
-   `fill_blanks`: `{ interaction_id, type, prompt_es, stimulus_en, correct_answer, mastery_tag }`
-   `reorder_words`: `{ interaction_id, type, prompt_es, options: [{id, text}], correct_answer: [ids], mastery_tag }`

### 2.3. Data Consistency
-   `interaction_id` format: `U{unit_number}_I{interaction_number}`.
-   `block_id` format: `B1`, `B2`, `B3`.
-   `mastery_tag`: `vocabulary`, `grammar`, `communication`, `syntax`.

## 3. Source Code Structure Changes
-   Replace existing `src/content/cursos/ingles-a2/unit*.json` files.
-   Add missing units up to `unit60.json`.
-   Update/Create `src/content/cursos/ingles-a2/syllabus.md`.

## 4. Delivery Phases

### Phase 1: Foundation
-   Create `syllabus.md` for A2.
-   Implement Unit 1 as a "Golden Master" to verify structure and level.

### Phase 2: Core Modules (1-3)
-   Generate and implement units 2-30.
-   Verify against A2 standards.

### Phase 3: Advanced A2 Modules (4-6)
-   Generate and implement units 31-60.
-   Ensure progression from Module 1 to Module 6.

### Phase 4: Verification
-   Run `npm run validate-exercises` (if it exists, as seen in `auto-applied-rule`).
-   Manual spot check of levels and typologies.

## 5. Verification Approach
-   **Validation Script**: `npm run validate-exercises` to ensure JSON schema compliance.
-   **Linting**: Ensure JSON files are valid and properly formatted.
-   **Manual Review**: Check a sample of units for pedagogical quality.
