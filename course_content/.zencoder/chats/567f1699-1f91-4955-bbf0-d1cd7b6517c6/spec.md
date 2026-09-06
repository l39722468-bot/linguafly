# Technical Specification - English A1 Course Content Improvement

## 1. Technical Context
- **Course Data**: JSON files in `src/content/cursos/ingles-a1/`.
- **Validation**: JSON Schema (if applicable), manually via `scripts/audit-generic.mjs` (extended).
- **Automation**: Python/Node.js scripts for auditing.
- **Content Generation**: Manual curation assisted by AI to ensure A1 level compliance and variety.

## 2. Implementation Approach

### 2.1 Audit Strategy
A script will be developed to:
- Iterate through all `unit*.json` files.
- Track occurrences of `stimulus_en`, `stimulus_es`, and `correct_answer` per unit.
- Flag units where unique stimulus/answer count is significantly lower than the total interaction count.
- Flag matching exercises with more than 50% overlap in pairs within the same unit.

### 2.2 Content Regeneration Strategy
- **Unit 14 Example**:
  - Current: Over-reliance on "Read", "Write", "Speak", "Understand".
  - Proposed: Introduce "Listen", "Learn", "Study", "Practice", "Talk", "Use", "Work", "Play" in varied contexts (e.g., "I talk to my friends", "We study in the library").
- **Structure Retention**: Keep the `interaction_id` and `type` consistent but update `prompt_es`, `stimulus_en/es`, `options`, and `correct_answer`.
- **Variety**: Ensure a mix of interaction types for the same concept (e.g., if "Speak" is in matching, use "Study" in transformation).

### 2.3 Source Code Changes
- Updates to `src/content/cursos/ingles-a1/unit*.json`.
- Addition of a temporary audit script `scripts/audit-duplicates.py`.

## 3. Delivery Phases

### Phase 1: Audit & Identification
- Run the audit script across all A1 units.
- Generate a list of "Problematic Units" and specific interactions to be replaced.

### Phase 2: Content Drafting
- Draft new content for the flagged interactions.
- Ensure vocabulary variety and A1 level adherence.

### Phase 3: Implementation
- Replace content in JSON files.
- Run existing and new audit scripts to verify.

### Phase 4: Final Verification
- Linting and schema validation.

## 4. Verification Approach
- `scripts/audit-generic.mjs` for basic structure.
- `scripts/audit-duplicates.py` (new) for content quality.
- Manual spot-check of regenerated units.
