# Product Requirements Document (PRD): Uncompleted Exercises Finder

## Overview
The goal of this feature is to allow users (and potentially administrators) to identify which exercises have not yet been completed within a specific timeframe (e.g., Week 1) of a specific course (e.g., Banking and Finance).

## Problem Statement
Users currently don't have a clear way to see what they have left to do in a specific week of their course, which makes it harder to track progress and complete all required activities.

## Target Audience
- Students of the English courses.
- Administrators monitoring student progress.

## Functional Requirements
1. **Identify Uncompleted Exercises**: The system must be able to list exercises that have not been marked as completed for a given user.
2. **Filter by Course and Week**: The user must be able to specify the course (e.g., "Banca y Finanzas") and the week (e.g., "Semana 1").
3. **Display Exercise Details**: The list should show the exercise ID, title, and type.
4. **Data Source**:
   - Course content is stored in JSON files (e.g., `src/content/cursos/trabajo/finanzas/[level]/trimestre1/semana01/exercises.json`).
   - User progress is tracked in the Supabase database (e.g., `user_lesson_progress` or `xp_transactions`).

## Technical Constraints
- The solution should integrate with the existing Next.js and Supabase architecture.
- Performance: The lookup should be efficient enough for regular use.

## Assumptions
- "Banca y Finanzas" refers to the content under `src/content/cursos/trabajo/finanzas`.
- Progress is tracked via `xp_transactions` (for individual exercises) or `user_lesson_progress` (if exercises are grouped into lessons).
- If no progress is found in the database, all exercises are considered uncompleted.

## Open Questions
- Should this be a UI component, an API endpoint, or a command-line tool? (Given the context, likely a UI feature or a utility function).
- Which level (A1, A2, B1, etc.) should be searched? (Default to all levels or a specific one provided by the user).
