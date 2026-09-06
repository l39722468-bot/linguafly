# PRD - Duolingo Course Audit

## Overview
The "Duolingo" course (A1 level) consists of 30 units, each containing multiple blocks of educational content and interactive exercises. The goal of this task is to audit these 30 units to ensure they are functional, pedagogically sound, and free of technical errors in their data definitions.

## Objectives
1. **Data Integrity**: Verify that all 30 `unit*.json` files follow the required schema and are valid JSON.
2. **Pedagogical Correctness**: Ensure that the `correct_answer` for each interaction is actually correct and matches the prompt.
3. **Consistency**: Check that `mastery_tags` are used consistently and reflect the learning outcomes.
4. **Logical Flow**: Verify that branching logic (where applicable) and block sequencing are correctly defined.
5. **Media Validation**: Ensure `audioUrl` and other media references are correctly formatted and consistent.
6. **UI Compatibility**: Confirm that all exercise types used in the JSON files are implemented in the `DuolingoUnitViewer.tsx` component.

## Scope
- **Input**: 30 JSON files located in `src/content/cursos/duolingo-a1/`.
- **Target Component**: `src/components/course/DuolingoUnitViewer.tsx`.
- **Tasks**: Automated validation script + Manual/Semi-automated review of content.

## Functional Requirements

### 1. Schema Validation
Each unit JSON must contain:
- `course`: Object with `unit_id`, `unit_title`, etc.
- `learning_outcomes`: Array of strings.
- `mastery_tags`: Array of strings.
- `blocks`: Array of content blocks.
- `qa_report`: Object summarizing the unit's status.

### 2. Interaction Types Audit
Ensure the following types are correctly handled:
- `multiple_choice`: `options` must exist, `correct_answer` must match an option ID.
- `odd_one_out`: `options` must exist, `correct_answer` must match an option ID.
- `matching`: `pairs` must exist, `correct_answer` must map IDs correctly.
- `categorization`: `categories` must exist with items.
- `transformation`: `stimulus_en` and `correct_answer` (or regex) must be valid.
- `true_false`: `correct_answer` must be a boolean.
- `role_play`: `stimulus_en` (dialogue) and `options` must be valid.
- `short_writing`: `validation_regex` and `example` must be present.
- `reorder_words`: `options` (word pool) and `correct_answer` (sequence of IDs) must be valid.
- `video`: `scenes`, `interactions`, and `branching` logic must be consistent.

### 3. Content Audit
- No typos in English or Spanish prompts.
- Feedback messages match the context.
- Difficulty level is appropriate for A1.

## Non-Functional Requirements
- **Maintainability**: Any fixes should follow the existing JSON structure.
- **Performance**: The JSON files should be optimized (no redundant data).

## Acceptance Criteria
- All 30 units pass a validation check for schema and logical consistency.
- Identified bugs in exercises (e.g., wrong correct answer) are fixed.
- UI renders all 30 units without errors.
