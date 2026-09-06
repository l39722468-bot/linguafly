# Technical Specification - Content Optimization & Expansion

## 1. Technical Context
- **Format**: JSON files in `src/content/cursos/`.
- **Schema/Types**: Defined in `src/types/premium-course.ts` (specifically `UnitData` and `PremiumInteraction`).
- **Validation**: Current scripts `scripts/audit_duplicates.py`, `scripts/audit_courses.py`, and `scripts/validate-exercises.mjs`.

## 2. Implementation Approach

### 2.1 Content Normalization & Cleanup (Automation)
I will create a Python utility script `scripts/fix_content_quality.py` that will:
1. **Global ID Renaming**: Re-index all `interaction_id` to follow the pattern `{LEVEL}_{UNIT}_{BLOCK}_{INDEX}` (e.g., `A2_U1_B1_I1`) to ensure global uniqueness.
2. **Deduplication**: Scan each unit and remove redundant interactions based on a content hash (normalized stimulus + answer).
3. **Placeholder Removal**: Identify and report (or auto-fix if possible) AI artifacts like `r1`, `r2` options.

### 2.2 Content Expansion (Pedagogical Strategy)
- **Levels A1-A2**: Reduce bloat, focus on core variety.
- **Levels B1-C2**: Expand content to ensure each unit has at least 10-15 high-quality interactions.
- **Cambridge Alignment**:
    - **B2 (FCE)**: Include transformation, multiple choice cloze, and phrasal verbs.
    - **C1 (CAE)**: Focus on advanced collocations and context-dependent grammar.
    - **C2 (CPE)**: Focus on register, nuance, and advanced idiomatic expressions.

### 2.3 Verification Strategy
- **JSON Schema Validation**: Use `scripts/validate-exercise-types.mjs` (adapted for JSON) to ensure structural correctness.
- **Pedagogical Audit**: Manual spot-checks of expanded content to ensure it matches the CEFR level.
- **Linting**: Ensure no broken JSON or invalid types.

## 3. Source Code Changes
- New Script: `scripts/fix_content_quality.py`.
- Modified Content: Multiple JSON files in `src/content/cursos/`.

## 4. Delivery Phases

### Phase 1: Automation & Cleanup
- Implement `scripts/fix_content_quality.py`.
- Run on all A1-A2 units to eliminate redundancy and fix IDs.

### Phase 2: B2-C2 Expansion
- Batch generate/implement pedagogical content for units with fewer than 10 interactions.
- Target: `ingles-b2`, `ingles-c1`, `ingles-c2`.

### Phase 3: Final Validation
- Run validation scripts on the entire content directory.
- Perform a final pedagogical spot-check.
