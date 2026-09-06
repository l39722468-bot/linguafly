# Technical Specification: Uncompleted Exercises Finder

## Technical Context
- **Language**: TypeScript
- **Framework**: Next.js (App Router)
- **Database**: Supabase
- **Data Storage**: JSON files for course content

## Implementation Approach
1.  **Service Layer**: Create a utility in `src/lib/course-utils.ts` to:
    - Load exercises from `src/content/cursos/trabajo/finanzas`.
    - Query Supabase for completed exercises (using `xp_transactions` or `user_lesson_progress`).
    - Filter and return uncompleted exercises.
2.  **API Endpoint**: Implement a GET route at `src/app/api/courses/uncompleted-exercises/route.ts` that accepts `coursePath` and `weekId`.
3.  **Data Consistency**: Map exercise IDs from JSON to `source_id` in `xp_transactions`.

## Source Code Structure Changes
- `src/lib/course-utils.ts`: New utility functions for progress tracking.
- `src/app/api/courses/uncompleted-exercises/route.ts`: New API endpoint.

## Data Model / Interface Changes
No changes to the database schema are required, as we will use existing tables.

## Verification Approach
- **Unit Tests**: Test the utility function with mocked Supabase responses and local JSON data.
- **Integration Tests**: Verify the API endpoint returns the correct list of exercises for the admin user.
