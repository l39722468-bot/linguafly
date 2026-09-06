# Product Requirements Document (PRD) - A2 Course Rebuild

## Overview
Rebuild the A2 English course to include 60 units, each containing 50 exercises, for a total of 3,000 exercises. The generation will be based on provided A2 source material, ensuring multiple variants of examples and vocabulary words.

## Goals
- **Scale**: Generate 3,000 high-quality A2 exercises.
- **Variety**: Implement multiple exercise types (multiple-choice, fill-blank, sentence-building, etc.).
- **Source-Driven**: Use the provided text material to create contextually relevant variants.
- **Organization**: Classify all exercises by theme according to the standard A2 (Cambridge) curriculum.
- **Persistence**: Store all exercises in the database via SQL migrations.

## Requirements

### 1. Content Generation
- **Level**: Strictly CEFR A2 (Elementary).
- **Source Material**: Utilize the provided text snippet (approx. 4,244 lines) to extract grammar points, vocabulary, and examples.
- **Variants**: For every example or vocabulary word in the source, create at least 3-5 variations to ensure repetition and reinforcement.
- **Languages**: 
  - Exercise content (questions, answers, options): English.
  - Explanations and instructions: Spanish.

### 2. Structure & Classification
- **Units**: 60 units in total.
- **Exercises per Unit**: 50 exercises.
- **Themes**: Map units to standard A2 Cambridge themes (e.g., Travel, Shopping, Health, Hobbies, Work, etc.).
- **Exercise Types**: Utilize a diverse mix of types:
  - `multiple-choice`
  - `fill-blank`
  - `true-false`
  - `sentence-building`
  - `word-search`
  - `crossword`
  - `matching`
  - `key-word-transformation` (A2 appropriate)

### 3. Implementation Batches
- Generation must be performed in batches of 5-10 units to ensure quality control and avoid API timeouts or context limits.
- Each batch will result in a SQL migration file.

### 4. Technical Constraints
- Use the existing `ExerciseGenerator` and `ExerciseTypeConfig`.
- Exercises must follow the database schema for `exercises`, `unit_exercises`, etc.
- Unique IDs for all generated exercises.

## Success Criteria
- 3,000 exercises successfully inserted into the database.
- Exercises are pedagogically sound for A2 level.
- High variety and low repetition within and across units.
