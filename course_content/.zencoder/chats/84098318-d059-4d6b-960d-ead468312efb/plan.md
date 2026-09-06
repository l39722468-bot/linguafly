# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. [x] Review existing codebase to understand current architecture and patterns
2. [x] Analyze the feature definition and identify unclear aspects
3. [x] Ask the user for clarifications on aspects that significantly impact scope or user experience
4. [x] Make reasonable decisions for minor details based on context and conventions
5. [x] If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/84098318-d059-4d6b-960d-ead468312efb/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/84098318-d059-4d6b-960d-ead468312efb/requirements.md`.

1. [x] Review existing codebase architecture and identify reusable components
2. [x] Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/84098318-d059-4d6b-960d-ead468312efb/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/84098318-d059-4d6b-960d-ead468312efb/spec.md`.

1. [x] Break down the work into concrete tasks
2. [x] Each task should reference relevant contracts and include verification steps
3. [x] Replace the Implementation step below with the planned tasks

### [x] Step: Implementation

#### [x] Task 1: Populate Pedagogical Data for Module 1 (Units 1-10)
Update `scripts/expand-a2-course.py` with grammar, vocab, and sentences for Units 1-10.
- **Verification**: Check script syntax.

#### [x] Task 2: Populate Pedagogical Data for Module 2 (Units 11-20)
Update `scripts/expand-a2-course.py` with data for Units 11-20.
- **Verification**: Check script syntax.

#### [x] Task 3: Populate Pedagogical Data for Module 3 (Units 21-30)
Update `scripts/expand-a2-course.py` with data for Units 21-30.
- **Verification**: Check script syntax.

#### [x] Task 4: Populate Pedagogical Data for Module 4 (Units 31-40)
Update `scripts/expand-a2-course.py` with data for Units 31-40.
- **Verification**: Check script syntax.

#### [x] Task 5: Populate Pedagogical Data for Module 5 (Units 41-50)
Update `scripts/expand-a2-course.py` with data for Units 41-50.
- **Verification**: Check script syntax.

#### [x] Task 6: Populate Pedagogical Data for Module 6 (Units 51-60)
Update `scripts/expand-a2-course.py` with data for Units 51-60.
- **Verification**: Check script syntax.

#### [x] Task 7: Update Script Constants and Refine Generation Logic
Set `UNITS_COUNT = 60`, `EXERCISES_PER_UNIT = 500`. Refine `generate_exercises` for variety.
- **Verification**: Run `python3 -m py_compile scripts/expand-a2-course.py`.

#### [x] Task 8: Execute Script and Generate Exercises
Run the script to generate all 60 unit JSON files.
- **Verification**: Check `src/content/cursos/ingles-a2/` for 60 files.

#### [x] Task 9: Validate Generated Files
Run `node scripts/validate-a2-json.mjs` to ensure JSON and schema validity.
- **Verification**: Command output shows no errors.

### [x] Step: Final Cleanup and Delivery
1. [x] Remove any temporary files (if applicable)
2. [x] Perform a final check of the generated content sample
3. [x] Submit changes for final review

### Step: Post-Generation Audit & Fixes
- [x] Audit exercise correction logic in `PremiumSession.tsx` and `FocusedSession.tsx`
- [x] Fix `short_writing` validation to strictly compare with `correct_answer` when no regex is present
- [x] Ensure robust normalization (`toLowerCase().trim()`) across all text-based exercises
- [x] Verify that "araund" is no longer accepted for "around" in translation exercises


