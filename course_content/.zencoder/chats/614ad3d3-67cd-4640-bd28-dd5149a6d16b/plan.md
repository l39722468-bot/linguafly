# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/614ad3d3-67cd-4640-bd28-dd5149a6d16b/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/614ad3d3-67cd-4640-bd28-dd5149a6d16b/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/614ad3d3-67cd-4640-bd28-dd5149a6d16b/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/614ad3d3-67cd-4640-bd28-dd5149a6d16b/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

### [x] Step: Implementation - Phase 1: Automation & Cleanup

1.  **Create `scripts/fix_content_quality.py`**:
    -   Implement global `interaction_id` re-indexing following `{LEVEL}_{UNIT}_{BLOCK}_{INDEX}`.
    -   Implement deduplication logic using content hashing.
    -   Implement placeholder detection (searching for `r\d+`).
    -   Verification: Run on a test unit and verify IDs and uniqueness.

2.  **Execute Cleanup**:
    -   Run the script on all directories in `src/content/cursos/`.
    -   Verification: Confirm reduction in file size for `ingles-a2/unit1.json` and consistency in IDs.

### [x] Step: Implementation - Phase 2: Content Expansion (B2-C2)

1.  **Expand B2 Units**:
    -   Add at least 10 high-quality interactions to `ingles-b2` units (focus on FCE style).
    -   Verification: Spot check JSON and run `scripts/fix_content_quality.py` to ensure IDs are consistent.

2.  **Expand C1 Units**:
    -   Add at least 10 high-quality interactions to `ingles-c1` units (focus on CAE style).
    -   Verification: Spot check JSON.

3.  **Expand C2 Units**:
    -   Add at least 10 high-quality interactions to `ingles-c2` units (focus on CPE style).
    -   Verification: Spot check JSON.

### [x] Step: Implementation - Phase 3: Final Validation

1.  **Run Validation Suite**:
    -   Run `scripts/validate-exercises.mjs`.
    -   Run `scripts/fix_content_quality.py` in audit mode.
    -   Verification: Zero errors reported.

