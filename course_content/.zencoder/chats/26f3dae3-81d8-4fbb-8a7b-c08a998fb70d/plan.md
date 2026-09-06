# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/26f3dae3-81d8-4fbb-8a7b-c08a998fb70d/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/26f3dae3-81d8-4fbb-8a7b-c08a998fb70d/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/26f3dae3-81d8-4fbb-8a7b-c08a998fb70d/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/26f3dae3-81d8-4fbb-8a7b-c08a998fb70d/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/26f3dae3-81d8-4fbb-8a7b-c08a998fb70d/plan.md`.

### [x] Step: Implementation

#### Phase 1: Infrastructure & Content Audit
- [x] **Task 1: Verify existing schema compliance**
  - Action: Run a validation script against `src/content/cursos/**/*.json` using `InteractionSchema` from `src/lib/course-engine/schema.ts`.
  - Verification: All existing files pass validation or issues are documented.
- [x] **Task 2: Standardize A1-B2 metadata**
  - Action: Update `concept_tags` and `complexity` in existing A1-B2 JSON files to ensure they align with the new curriculum definitions.
  - Verification: Spot check 5 files per level for tag consistency.

#### Phase 2: High-Level Content Expansion (C1 & C2)
- [x] **Task 3: Create C1 units**
  - Action: Generate and save units for `ingles-c1` focusing on advanced grammar (Inversion, Cleft sentences).
  - Verification: Files exist in `src/content/cursos/ingles-c1/` and pass validation.
- [x] **Task 4: Create C2 units**
  - Action: Generate and save units for `ingles-c2` focusing on highly specialized and idiomatic English.
  - Verification: Files exist in `src/content/cursos/ingles-c2/` and pass validation.

#### Phase 3: Integration & Final Verification
- [x] **Task 5: Update GlobalContentProvider levels**
  - Action: Ensure `ingles-c1` and `ingles-c2` are included in the `levels` array within `src/lib/course-engine/global-content-provider.ts`.
  - Verification: `loadAllContent()` logs show C1 and C2 interactions being loaded.
- [x] **Task 6: E2E Verification in /practica-inteligente**
  - Action: Use the browser tool to verify that exercises from all levels (including new C1/C2) are correctly fetched and rendered.
- [x] **Task 7: Final Lint & Typecheck**
  - Action: Run `npm run lint` and `npm run typecheck`.

#### Phase 4: A1 Level Calibration (Simplification)
- [x] **Task 11: Audit A1 complexity**
  - Action: Scan `src/content/cursos/ingles-a1/` and lower the complexity of early units (1-10) to level 1.
  - Verification: `complexity` fields are set to 1 for recognition tasks.
- [x] **Task 12: Add Scaffolding/Hints**
  - Action: Enhance `prompt_es` and add more `explanation` fields in Spanish for A1 exercises to guide the user.
  - Verification: At least 90% of A1 exercises have clear Spanish instructions.

#### Phase 5: Full Migration to Supabase
- [x] **Task 8: Script for JSON to SQL Migration**
  - Action: Create a script that reads all JSON files in `src/content/cursos/` and generates SQL inserts for `course_modules`, `course_lessons`, and `course_exercises`.
  - Verification: Migration file generated and verified against schema.
- [x] **Task 9: Database Seeding**
  - Action: Apply the migration to Supabase.
  - Verification: Querying `course_exercises` returns the full count of exercises across all levels.
- [x] **Task 10: Update GlobalContentProvider to fetch from DB**
  - Action: Modify `GlobalContentProvider` to prioritize (or exclusively use) Supabase as the data source.
  - Verification: The app works correctly after removing/renaming the local JSON files.

#### Phase 6: Pedagogical & Content Quality Improvement
- [x] **Task 13: Audit and Fix Placeholder Content**
  - Action: Identify and replace "Wrong1", "Wrong2", "Correct" placeholder values in all levels with contextually relevant content.
  - Verification: Grep search returns no instances of "Wrong1" or "Wrong2" in exercise options.
- [x] **Task 14: A1 Visual & Pedagogical Overhaul**
  - Action: Update A1 exercises to include `image_url` and focus on basic recognition (visual-to-word matching).
  - Verification: Spot check A1 units 1-5 for visual support.
- [x] **Task 15: Structural Refactoring of Learning Curves**
  - Action: Reorganize exercise sequences in each level to follow: 1. Input/Recognition, 2. Guided Production, 3. Free Production.
  - Verification: Sequence audit of Module 1 in levels A1, A2, B1.
- [x] **Task 16: Fix Matching Exercise UI Logic**
  - Action: Ensure the frontend correctly shuffles matching pairs and that the backend doesn't serve them pre-aligned.
  - Verification: Visual verification in browser that matching pairs are randomized.
- [x] **Task 17: Content Push & DB Sync**
  - Action: Generate final SQL migration with improved content and apply to Supabase.
  - Verification: Exercise count per level matches expected totals.
- [x] **Task 18: Split large SQL migrations into chunks**
  - Action: Modify `scripts/generate-supabase-migration.mjs` to split any level exceeding 5 lessons into multiple smaller SQL files to avoid Supabase timeout errors.
  - Verification: A2 SQL files are split in `supabase/migrations/full_content_split/a2_chunks/`.

#### Phase 7: Pedagogical Restructuring & Inductive A1
- [ ] **Task 19: Comprehensive A1 Content Replacement**
  - Action: Replace current A1 exercises with a strictly visual and inductive set (Unit 0 - Unit 10). No translation allowed.
  - Verification: A1 interactions use `image_url` or `left_image` and avoid Spanish-to-English translation tasks.
- [ ] **Task 20: Curriculum Alignment Script**
  - Action: Create a script `scripts/enforce-pedagogical-sequence.mjs` that re-orders lessons and exercises within JSON files to follow the Induction -> Recognition -> Production flow.
  - Verification: All JSON files show increasing complexity within blocks.
- [x] **Task 21: Visual Bank Expansion**
  - Action: Expand `A1_IMAGE_BANK` in `src/lib/a1-visual-exercises.ts` to cover more topics (Work, Travel, Daily Life).
  - Verification: 20+ new high-quality image URLs added.
- [ ] **Task 22: Final DB Cleanup and Seed**
  - Action: Apply the refined pedagogical content to all levels and regenerate chunked migrations.
  - Verification: Smart Practice shows clear, logical progression from level to level.
