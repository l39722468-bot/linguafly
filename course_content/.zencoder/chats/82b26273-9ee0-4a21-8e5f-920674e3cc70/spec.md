# Technical Specification: A1 Course Expansion (300 Exercises/Unit)

## 1. Technical Context
- **Language**: Python 3.x for generation, JSON for storage.
- **Dependencies**: Standard Python libraries (`json`, `os`, `random`).
- **Target Path**: `src/content/cursos/ingles-a1/unit{id}.json`.

## 2. Implementation Approach
We will use an enhanced version of the `scripts/expand-a1-course.py` logic. To ensure quality across 18,000 exercises (60 units * 300 exercises):

### 2.1 Data Structure
A central `CONTENT_DATABASE` will map each of the 60 units to:
- **Core Vocabulary**: 30-50 words/phrases with Spanish translations.
- **Grammar Patterns**: 10-20 specific sentence structures or rules.
- **Dialogues/Communication**: 10-15 context-rich interactions.

### 2.2 Generation Logic
For each unit, we will generate 300 exercises distributed as follows (approximate):
- **Vocabulary (100 exercises)**: 
    - 40 `multiple_choice` (ES -> EN).
    - 30 `matching` (pairs of 3).
    - 30 `short_writing` (Translation ES -> EN).
- **Grammar & Syntax (120 exercises)**:
    - 40 `transformation` (Gap fill).
    - 40 `reorder_words` (Sentence structure).
    - 40 `true_false` (Grammar check).
- **Communication & Context (80 exercises)**:
    - 40 `multiple_choice` (Dialogue completion).
    - 40 `short_writing` (Sentence completion/Simple translation).

### 2.3 Quality Assurance
- **Scaffolding**: All `prompt_es` will be pedagogical and clear.
- **Uniqueness**: Interaction IDs will follow `U{unit}_I{index}` format.
- **Consistency**: Final JSON must match the frontend exercise components requirements.

## 3. Source Code Structure Changes
- **New Script**: `scripts/generate-a1-mega-course.py` (inheriting and expanding logic from `expand-a1-course.py`).
- **Data Modules**: If the script becomes too large, data will be moved to `scripts/data/a1_units.py`.

## 4. Verification Approach
- **Lint**: Run `scripts/validate-exercises.mjs` (if it exists and is applicable).
- **Manual Spot Check**: Review Unit 1, 30, and 60 for content quality.
- **JSON Validation**: Ensure all generated files are valid JSON.

## 5. Delivery Phases
1. **Phase 1**: Implement the core generator script with high-quality data for the first 10 units.
2. **Phase 2**: Expand the database to cover units 11-60.
3. **Phase 3**: Execution of the full generation.
4. **Phase 4**: Verification and cleanup.
