# Requirements - Complete Unit 30 for B1 Course

## Overview
Unit 30 "History & Ancient Civilizations" exists but is incomplete compared to the standard unit structure. It currently only contains multiple-choice exercises. The goal is to complete the unit by adding the necessary grammar-focused exercises, specifically `sentence-building` types.

## Scope
- Target file: `src/lib/course/b1/unit-30.ts`
- Task: Add at least 5 `sentence-building` exercises.
- Constraint: Each `sentence-building` exercise must have between **8 and 10 words**.

## Functional Requirements
1. **Exercise Type**: Implement `sentence-building` exercises.
2. **Word Count**: Each `correctSentence` must contain between 8 and 10 translatable units.
3. **Topic Alignment**: Exercises must focus on "History & Ancient Civilizations".
4. **Data Consistency**:
    - Assign unique IDs starting from `b1-u30-e16`.
    - Provide `transcript`, `content` (title, instructions, correctSentence, words), `explanation`, `audioUrl`, and `topicName`.
    - Maintain `[[English|Spanish]]` format for translations.

## Non-Functional Requirements
- Valid TypeScript syntax.
- Consistency with B1 level difficulty.
