# Product Requirements Document (PRD): English A1 Course Content Optimization

## 1. Introduction
The objective is to optimize the 60 units of the English A1 course content to ensure high quality, engagement, and a logical learning progression. Currently, the course content (specifically units 1-30) shows significant repetition of exercises and lacks a balanced variety of exercise types.

## 2. Goals
- **Eliminate Repetitions**: Identify and remove identical or highly similar exercises within the same unit.
- **Ensure Variety**: Mix different types of exercises (multiple choice, matching, etc.) to keep the content engaging.
- **Logical Progression**: Reclassify and order units to follow a natural and effective learning path.
- **Consolidate 60 Units**: Ensure that the first 60 units from the 100-unit syllabus are polished and ready for production.

## 3. Scope
- **Target Content**: The first 60 units of the English A1 course.
- **Current State**: 
    - Units 1-30 are in `src/content/cursos/ingles-a1/`.
    - Units 31-100 are in `src/content/cursos/ingles-a1/archive/`.
- **Review Criteria**:
    - Repetitions within units.
    - Repetitions across units (if applicable).
    - Exercise type distribution.
    - Vocabulary and grammar consistency.

## 4. Requirements

### 4.1 Content Analysis
- Analyze all 60 units for duplicated questions/prompts.
- Audit exercise types (e.g., `multiple_choice`, `matching`).
- Check for "Workplace context" consistency where specified in the unit title.

### 4.2 Content Improvement
- Replace duplicated exercises with new, unique exercises relevant to the unit's theme.
- Increase the variety of exercise types per unit.
- Ensure each unit has a clear beginning, middle, and end (e.g., introduction, practice, review).

### 4.3 Reclassification and Ordering
- Review the `syllabus.md` and ensure units follow the described modules.
- Re-order units if necessary to improve the learning curve.
- Standardize the naming and ID structure across all 60 units.

### 4.4 Technical Validation
- Ensure all JSON files are valid and follow the schema (implied by existing files).
- Validate that all units are correctly placed in `src/content/cursos/ingles-a1/`.

## 5. Constraints
- Maintain the existing JSON structure to avoid breaking the frontend.
- Use the Spanish-to-English translation format (prompt_es -> options in en).

## 6. Assumptions
- The "60 units" mentioned by the user refer to units 1-60 in the 100-unit syllabus.
- Units 31-60 need to be moved from `archive/` to the main directory after review.
- The existing exercise types (`multiple_choice`, `matching`) are the primary ones to use, but others can be added if supported by the frontend.
