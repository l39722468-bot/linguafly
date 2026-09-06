# Product Requirements Document: Multiple Choice Matching Exercise

## 1. Overview
The goal of this feature is to improve the user experience of "Matching Challenge" exercises by converting them from free-text input to multiple-choice selection. This reduces friction for the learner and ensures they can focus on recognition rather than exact spelling/phrasing.

## 2. Problem Statement
Learners currently have to type out definitions for terms in matching exercises. Even with AI-assisted evaluation, this can be error-prone and tedious, especially on mobile devices.

## 3. Proposed Solution
Update the `MatchingRenderer` to automatically provide multiple-choice options for each term if explicit options are not already provided in the exercise data.

## 4. Detailed Requirements

### 4.1. Automatic Option Generation
- If a matching item does not have an `options` array, the system should generate one.
- The `options` array for a given term should include:
  1. The **correct definition** (`correctMatch`) for that term.
  2. The **correct definitions** for **all other terms** in the same matching exercise (cross-matching pool).
  3. Any **explicit distractors** (`distractors`) defined for that specific term.
- The resulting list of options must be **shuffled** to avoid predictable patterns.

### 4.2. UI/UX Changes
- Replace the text input field with the existing multiple-choice button grid in `MatchingRenderer`.
- Ensure the layout is responsive (e.g., 2 columns on desktop, 1 on mobile).
- Maintain existing feedback mechanisms (color changes on submit).

### 4.3. Data Model Support
- Ensure that the `local-course-service.ts` preserves the `distractors` field from the source JSON files, as it is currently being discarded.

## 5. Success Criteria
- Matching exercises show a grid of options instead of an input field.
- Learners can successfully complete the exercise by clicking/tapping options.
- Feedback correctly identifies right and wrong selections.
