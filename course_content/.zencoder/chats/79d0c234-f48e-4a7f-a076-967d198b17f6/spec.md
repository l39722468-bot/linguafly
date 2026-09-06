# Technical Specification - A2 Course Generation

## Overview
This specification details the automated generation of 3,000 A2 exercises (60 units x 50 exercises) and their insertion into the Supabase database.

## 1. Technical Context
- **Language**: TypeScript (Node.js script).
- **AI Provider**: OpenAI (GPT-4o via `ExerciseGenerator`).
- **Persistence**: PostgreSQL (SQL migration files).
- **Source Material**: `20260207153357-yme74j.txt`.

## 2. Implementation Approach

### A. Syllabus Structure
The 60 units will be organized into 10 modules:
- **Module 1-2**: Basics & Review (Present Simple, Be, Have Got).
- **Module 3-4**: Everyday Life (Daily Routines, Food, Home).
- **Module 5-6**: Past & Experiences (Past Simple, Present Perfect).
- **Module 7-8**: Comparisons & Future (Comparatives, Superlatives, Going to, Will).
- **Module 9-10**: Specific Situations (Health, Travel, Work, Social).

### B. Entity Extraction
A pre-processing step will scan the source text to extract:
- **Vocabulary sets**: e.g., Adjectives, Family, Numbers, Prices.
- **Grammar points**: e.g., Adjectives (-ed vs -ing), Adverbs of frequency, Saxon Genitive.
- **Example sentences**: To be used as templates for variants.

### C. Generation Script (`scripts/generate-a2-course.ts`)
The script will:
1. Load the A2 Full Syllabus.
2. Iterate through Units 1 to 60.
3. For each unit:
   - Identify the target theme and grammar/vocab.
   - Select relevant examples from the source material.
   - Call `ExerciseGenerator.generateMultiple()` with a custom prompt to create variants.
   - Ensure a mix of `ExerciseType` (e.g., 10 multiple-choice, 10 fill-blank, 10 sentence-building, 10 true-false, 10 matching).
4. Save results to a temporary JSON file per batch.

### D. SQL Transformation
A utility function will transform the JSON exercises into SQL `INSERT` statements for:
- `public.course_modules`
- `public.course_lessons`
- `public.course_exercises`

## 3. Data Model Mapping
- `id`: `a2-m{module}-l{lesson}-ex{index}`.
- `lesson_id`: `a2-m{module}-l{lesson}`.
- `content`: JSONB field containing the full exercise object (questions, explanation, etc.).

## 4. Delivery Phases
- **Phase 1**: Curriculum & Extraction (Units 1-10).
- **Phase 2**: Generation Batch 1 (Units 1-10).
- **Phase 3**: Generation Batch 2-6 (Units 11-60).
- **Phase 4**: Verification & Cleanup.

## 5. Verification
- **Linting**: `npm run lint`.
- **Validation**: Schema validation of generated JSON before SQL conversion.
- **Testing**: Manual check of a sample of generated exercises in each batch.
