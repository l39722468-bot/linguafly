# Product Requirements Document (PRD) - English A1 Course Content Improvement

## 1. Overview
The English A1 course content currently contains repetitive exercises and limited vocabulary variety. This project aims to audit all units, identify these issues, and replace problematic content with original, pedagogically sound, and varied exercises.

## 2. Goals
- **Eliminate Repetition**: Ensure no identical or nearly identical exercises exist within a unit or across closely related lessons.
- **Expand Vocabulary**: Diversify the words and phrases used in exercises to provide a richer learning experience.
- **Maintain Level Consistency**: All new content must strictly adhere to the A1 English level.
- **Variety of Interactions**: Use different interaction types (matching, transformation, multiple choice, etc.) to keep students engaged.

## 3. Scope
- All units within `src/content/cursos/ingles-a1/`.
- Focus on `matching`, `short_writing`, `multiple_choice`, `transformation`, and `reorder_words` types as these are highly prone to repetition.

## 4. Requirements

### 4.1 Content Audit
- A script or process must be established to detect duplicate `stimulus_en`, `stimulus_es`, and `correct_answer` values within the same unit.
- Detection of high overlap in `pairs` for matching exercises.

### 4.2 Content Regeneration
- Repetitive exercises must be replaced with new ones that cover the same grammar or vocabulary objective but using different examples.
- For Unit 14 (and others), vocabulary like "Speak", "Write", "Read", "Understand" should not be the sole focus of every second exercise. Introduce more verbs and nouns relevant to the unit's topic (Present Simple).

### 4.3 Pedagogical Guidelines
- Language: English (Target), Spanish (UI/Support).
- Level: A1 (CEFR).
- Context: General English (Travel, Work, Daily life).

## 5. Success Criteria
- No duplicate exercises in any A1 unit.
- Vocabulary variety increased by at least 30% in problematic units.
- All JSON files pass structural validation (if schema exists).
