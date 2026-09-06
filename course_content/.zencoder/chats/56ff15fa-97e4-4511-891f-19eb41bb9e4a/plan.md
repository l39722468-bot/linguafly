# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. [x] Review existing codebase to understand current architecture and patterns
2. [x] Analyze the feature definition and identify unclear aspects
3. [x] Ask the user for clarifications on aspects that significantly impact scope or user experience
4. [x] Make reasonable decisions for minor details based on context and conventions
5. [x] If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/56ff15fa-97e4-4511-891f-19eb41bb9e4a/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD.

1. [x] Review existing codebase architecture and identify reusable components
2. [x] Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/56ff15fa-97e4-4511-891f-19eb41bb9e4a/spec.md`.

### [x] Step: Planning

Create a detailed implementation plan based on `spec.md`.

1. [x] Break down the work into concrete tasks
2. [x] Replace the Implementation step below with the planned tasks

### [x] Step: Implementation

- [x] **Task 1: Interface Updates**
  - Update `Blueprint` in `src/lib/course/engine/blueprints.ts` to include `title` and `instruction`.
  - Update `LexicalItem` in `src/lib/course/engine/lexicon.ts` if needed for better translations.
- [x] **Task 2: Generator Logic Enhancement**
  - Modify `assemble` and `mapToExercise` in `src/lib/course/engine/generator.ts`.
  - Implement dynamic instruction mapping based on exercise type.
  - Implement pedagogical explanation assembly using the `translationTemplate`.
- [x] **Task 3: Blueprint Enrichment**
  - Update existing A1 blueprints in `src/lib/course/engine/blueprints.ts` with metadata.
- [x] **Task 4: Verification**
  - Run `npm run validate-exercises`.
  - Verify via browser at `/debug/engine`.
  - [x] Write and run E2E tests for pedagogical metadata.

### [x] Step: UI Refactor (Engine Debug)
- [x] **Task 5: Refactor Engine Debug Page**
  - Replace `PremiumCourseSession` with `ExerciseRenderer`.
  - Implement navigation (arrows, counter, progress bar).
  - Add "REVIEW: ENGINE" header and badges.
- [x] **Task 6: Visual Verification**
  - Confirm UI matches the requested "Review" style.

- [x] Step: Ultra Adaptive Engine Implementation
- [x] **Task 10: Student Mastery Schema**
  - Implement a tracking system for success/failure per skill (using Supabase or LocalStorage for debug).
- [x] **Task 11: Adaptive Selection Algorithm**
  - Implement logic: `pickNextExercise(studentProfile, curriculum)`.
  - Prioritize: 1. Failures (reinforcement), 2. New content (progression), 3. Old content (retention).
- [x] **Task 12: Curriculum Mapping (Units 1-30)**
  - [x] Units 1-10 mapped (Blueprints, Lexicon, Skills).
  - [x] Units 11-20 mapped (Blueprints, Lexicon, Skills).
  - [x] Units 21-30 mapped (Blueprints, Lexicon, Skills).
- [x] **Task 13: Fix Blank Screen & Improve Robustness**
  - Added Unit 1 Blueprints and Lexicon (missing previously).
  - Fixed `ExerciseRenderer` multiple-choice string evaluation.
  - Added fallback logic in `ExerciseGenerator` to prevent crashes when lexical matches fail.
  - Added error state in debug page if generation fails.
- [x] **Task 14: Pedagogical Logic & Content Variety**
  - Introduced `correctSlot` in `Blueprint` to specify which slot is the answer.
  - Refactored `assemble` in `generator.ts` to ensure answers are never leaked in the prompt.
  - Fixed evaluation bug where `correctAnswers` (plural) was being ignored.
  - Expanded Unit 1 & 2 Lexicon and Blueprints to support thousands of dynamic variants.
  - Verified that all 30 units follow the pedagogical guidelines by targeting specific slots.
- [x] **Task 15: Pedagogical Clarity (Contextual Instructions)**
  - Implemented dynamic instruction resolution using Lexical tags.
  - Added metadata to greetings and routine verbs (formal, informal, morning, night).
  - Updated generator to translate tags into Spanish context for instructions.
  - Refactored blueprints to use `{slot_type}` placeholders for clearer guidance.
- [x] **Task 16: Translation-Anchored Learning (End of Guessing)**
  - Implemented mandatory "Translation Anchor" in `generator.ts` for all multiple-choice and fill-blank exercises.
  - Replaced ambiguous "guess the word" exercises with grammar-focused or translation-focused tasks.
  - Ensured that "To Be" exercises focus on the verb form (am/is/are) rather than random nouns.
- [x] **Task 17: Massive Variety & High-Quality Explanations**
  - Updated selection algorithm to allow mixing content from all 30 units (Global Pool).
  - Implemented "Coach-style" pedagogical explanations with grammatical analysis.
  - Expanded Blueprints pool to ensure thousands of unique exercise variations.
  - Improved translation reliability for fixed values in templates.
- [x] **Task 18: Pedagogical Sequencing (Discovery -> Practice)**
  - [x] Implement `vocabularyExposure` tracking in `mastery.ts`.
  - [x] Classify Blueprints into pedagogical stages (Discovery, Recognition, Production).
  - [x] Modify `generator.ts` to block Production exercises (fill-blank) until Discovery/Recognition stages are met for a word.
  - [x] Add more "Discovery" blueprints (Matching/Flashcards) for all units.
- [x] **Task 19: Dynamic Exercise Types (Flashcards & Matching)**
  - [x] Implement full `matching` logic in `generator.ts` (pair 8 items).
  - [x] Implement `flashcard` presentation logic.
  - [x] Ensure the selection algorithm intersperses these types to avoid monotony.
- [x] **Task 20: Pedagogical Refinement & Semantic Shielding**
  - [x] Refactor Blueprints to focus `correctSlot` on verbs, prepositions, and articles.
  - [x] Implement `proper_noun` vs `common_noun` logic to prevent semantic errors.
  - [x] Add automated pluralization logic for number-based exercises.
  - [x] Classify verbs (physical vs stative) to ensure logical skill sentences.
- [x] **Task 21: Advanced Spanish Grammar & Semantic Engine**
  - [x] Update `LexicalItem` with `plural_es` and `i_es`.
  - [x] Implement Spanish pluralization and conjugation logic in `generator.ts`.
- [x] **Task 22: Forced Variety & Sequencing Fix**
  - [x] Re-balance weights to ensure Matching/Flashcards appear first.
  - [x] Implement "First attempts are always Discovery" rule.
- [x] **Task 23: Instruction & Template Cleanup**
  - [x] Update instructions for formal/informal context.
  - [x] Fix translation anchor answer leakage.
- [x] **Task 24: Fix Generation Crashes & Data Alignment**
  - [x] Fix `A1-UNIVERSAL` skill missing error.
  - [x] Fix `typesSeen.has` TypeError in selection algorithm.
  - [x] Align `generator.ts` output with `FlashcardExercise` (`items`) and `MatchingExercise` (`pairs`) data structures.
  - [x] Fix Spanish grammar (pluralization/conjugation) for "I study" and "two keys".
  - [x] Implement strict "Discovery-first" sequencing for new words.
- [x] **Task 25: Final Validation & 30-Unit Polish**
  - [x] Perform full walkthrough of Units 1-30 with categorical hard-lock.
  - [x] Verify logic for sensory organs, movement, and jobs.
  - [x] Obtain final user confirmation.
- [x] **Task 26: Harmony & Anti-Clustering Engine**
- [x] **Task 27: Spanish Gender Engine (El/La/Un/Una)**
- [x] **Task 28: Semantic Compatibility Matrix**
- [x] **Task 29: Reflexive & Infinitive Logic**
- [x] **Task 30: Sensory Organ Mapping (Logic Guard)**
- [x] **Task 31: Granular Vocabulary Gating (Discovery First)**
- [x] **Task 34: Categorical Hard-Lock (Anti-Delirium)**
- [x] **Task 36: Hardened Adaptive Engine**
  - [x] Set matching exercises to exactly 6 unique pairs.
  - [x] Implement unique translation mapping in matching to prevent ambiguous pairs.
  - [x] Implement `forcePlural` in blueprints and anatomy pluralization logic.
  - [x] Add `human` and `physical_action` tags to lexicon for semantic shielding.
  - [x] Refactor fallback logic to be strictly categorical and avoid "delirium" words.
  - [x] Implement strict word-level gating (Discovery -> Recognition -> Production).
  - [x] Fix reflexive Spanish conjugation in routine templates.
  - [x] Implement Semantic Compatibility Matrix (Preposition vs Surface/Container).
- [x] **Task 38: Logic Refinement & Anti-Repetitivity**
  - [x] Implement gender-matching for family members (He/She vs member_gender).
  - [x] Refine semantic logic for containers (Food vs Storage).
  - [x] Remove "El/La" hardcoding in color blueprints.
  - [x] Expand lexicon for Units 1-15 and 30 to increase variety.
  - [x] Expand global review pool to prevent repetitiveness when current unit is mastered.
  - [x] Ensure anatomy verbs (see, smell) strictly match organs (eyes, nose).

### Phase 4: Infinite Logic & Pedagogical Depth
- [ ] **Task 39: Sentence Logic Guard (Relational Constraints)**
  - Implement relational slot constraints (e.g., if Slot A is "drink", Slot B must be "liquid").
  - Refine `checkSemanticCompatibility` to handle complex "logical delirium" scenarios.
- [ ] **Task 40: Strict Categorical Distractors**
  - Hard-lock distractor selection to the primary category of the answer (Days -> only Days, Jobs -> only Jobs).
  - Prevent "Today is good afternoon" by segregating Greetings from Time/Day categories.
- [ ] **Task 41: Gender & Number Anchor Refinement**
  - Ensure "He/She" strictly anchors the gender of family members and professions in all templates.
- [ ] **Task 42: Lexicon "Pedagogical" Expansion**
  - Add 50+ new items across A1 units to reach "infinite" feel.
  - Add logic tags: `edible`, `human_only_action`, `office_item`, `home_item`.
- [ ] **Task 43: Final Engine Hardening**
  - Fix "I work in the Friday" by separating Day-of-week prepositions (on) from Time-of-day prepositions (in the).
  - Verify all 30 units one last time for "naturalness".
- [x] **Task 37: Final Browser Verification & Push**
  - [x] Verify all 30 units in `/debug/engine`.
  - [x] Perform git push and report commit number.
