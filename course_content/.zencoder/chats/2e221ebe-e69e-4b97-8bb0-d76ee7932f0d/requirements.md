# PRD: Duolingo A1 Exercise Expansion

## Overview
The goal of this feature is to expand the existing Duolingo A1 course from minimal content to a comprehensive educational experience. The course consists of 30 units (Modules 1-3), and currently, most units (except Unit 1) have very few exercises.

## Goals
- Increase the number of exercises/interactions in Units 2 through 30.
- Match the depth and variety of Unit 1.
- Ensure each unit has at least 15-20 interactions.
- Maintain the existing JSON structure and exercise types.

## Target Audience
- Beginner English learners (A1 level).
- Users of the Focus English platform.

## Functional Requirements
1. **Exercise Density**: Each of the 30 units must contain a robust set of exercises.
2. **Variety of Interactions**: Use a mix of the following interaction types:
   - `multiple_choice`
   - `matching`
   - `reorder_words`
   - `categorization`
   - `transformation`
   - `true_false`
   - `odd_one_out`
   - `role_play` (text-based)
   - `short_writing`
3. **Curriculum Alignment**: Exercises must align with the topics defined in `syllabus.md`.
4. **Interactive Blocks**: Organise content into logical blocks (Warm-up, Video/Scene, Practice, Test).
5. **Consistency**: Ensure consistent naming conventions for `interaction_id` and `block_id`.

## Technical Constraints
- **Format**: All content must be synchronized between:
  - JSON files in `src/content/cursos/duolingo-a1/unit[X].json`.
  - SQL migration files in `supabase/migrations/` (inserting into `course_lessons` and `course_exercises`).
- **Language**: UI language is `es-ES`, target language is `en`.
- **Metadata**: Each unit must include `learning_outcomes` and `mastery_tags`.
- **Audio**: Audio URLs will be generated later using existing scripts, but `tts_en` or `stimulus_en` fields must be populated.
- **Content Generation**: Generate meaningful A1-level pedagogical content for each unit.

## Content Plan (Modules 1-3)
- **Module 1 (Basics)**: Units 1-10.
- **Module 2 (Daily Life)**: Units 11-20.
- **Module 3 (My World)**: Units 21-30.

## Verification
- JSON files must be valid.
- Content must match the level (A1).
- `npm run validate-exercises` (if available) should pass.
