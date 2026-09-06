# Technical Specification: English A1 Course Content Optimization

## 1. Technical Context
- **Data Format**: JSON
- **Location**: `src/content/cursos/ingles-a1/`
- **Archive Location**: `src/content/cursos/ingles-a1/archive/`
- **Validation**: Scripts in `scripts/` (e.g., `validate-exercises.mjs`)

## 2. Implementation Approach

### 2.1 Content Audit Tooling
Instead of manual review, I will create a temporary analysis script (`scripts/analyze-a1-content.mjs`) to:
- Detect duplicate `prompt_es` or `text` fields within a unit.
- Calculate the percentage of each exercise type per unit.
- Flag units that have less than 3 different exercise types.

### 2.2 Content Refactoring
- **Promotion**: Move `unit31.json` through `unit60.json` from `archive/` to `src/content/cursos/ingles-a1/`.
- **Deduplication**: For each unit flagged with duplicates:
    - Replace the duplicate exercise with a new one following the unit's theme.
    - Ensure `interaction_id` remains unique and sequential (e.g., `U1_I1`, `U1_I2`).
- **Variety Injection**: 
    - Convert some `multiple_choice` exercises to `matching` or other supported types if the vocabulary allows.
    - Ensure a mix of types in every 10-exercise block.

### 2.3 Structural Alignment
- Verify that `unit_id` and `unit_title` in JSON match the `syllabus.md`.
- Ensure all units have the correct metadata (language, level).

## 3. Data Model / Interface Changes
No changes to the JSON schema are planned to maintain compatibility with the existing frontend. 

## 4. Delivery Phases

### Phase 1: Analysis & Infrastructure
- Create `scripts/analyze-a1-content.mjs`.
- Run analysis on all 60 units.
- Promote archived units 31-60.

### Phase 2: Deduplication & Mixing (Units 1-30)
- Fix repetitions in units 1-30.
- Improve variety in units 1-30.

### Phase 3: Deduplication & Mixing (Units 31-60)
- Fix repetitions in units 31-60.
- Improve variety in units 31-60.

### Phase 4: Final Validation
- Run the general validation script.
- Final review of the logical order.

## 5. Verification Approach
- **Linting**: Ensure JSON files are correctly formatted.
- **Validation Script**: Run `node scripts/validate-exercises.mjs` (adapted if necessary).
- **Manual Spot Check**: Verify a sample of refactored units for content quality.
