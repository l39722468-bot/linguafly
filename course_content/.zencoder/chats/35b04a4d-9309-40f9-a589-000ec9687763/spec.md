# Technical Specification - Banking & Finance Course Enhancements

## 1. Technical Context
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Content Format**: JSON (stored in `src/content/cursos/trabajo/finanzas/`)
- **Assets**: Audio files for podcasts in `public/audio/finanzas/`
- **Existing Components**: `LessonViewer`, `ReadingRenderer`, `ListeningRenderer`, `InteractiveTranscript`, `localCourseService`.

## 2. Implementation Approach

### 2.1. Content Schema Enhancements
We will enhance the JSON files in `src/content/cursos/trabajo/finanzas/` to support the new features.

#### `theory.json`
- Ensure each section has a descriptive title and high-quality Markdown content.
- Add an optional `vocabulary` array to each section for quick reference.

#### `exercises.json`
- Add new items with type `listening-comprehension`.
- Add new items with type `reading-comprehension`.
- Each `reading-comprehension` item should include `vocabularyHelp` for tooltips.
- Each `listening-comprehension` item should include `audioUrl` and `transcript` (or `structuredTranscript`).

### 2.2. Service Layer (`localCourseService`)
The `localCourseService.convertItemsToExercises` function needs to be updated to handle the new `listening-comprehension` type and better map `reading-comprehension`.

### 2.3. Data Flow
1. `ProfessionalLessonPage` (SSR) calls `localCourseService.getProfessionalLesson`.
2. `localCourseService` reads `theory.json`, `exercises.json`, and `exam.json`.
3. It converts the data to the `Lesson` interface (defined in `src/lib/exercise-types.ts`).
4. `LessonClient` passes the `Lesson` object to `LessonViewer`.
5. `LessonViewer` uses `ReadingRenderer` for reading tasks and `ListeningRenderer` for listening tasks.

## 3. Source Code Changes

### 3.1. `src/lib/services/local-course-service.ts`
- Update `convertItemsToExercises` to:
    - Handle `listening-comprehension` / `listening` type.
    - Map `audioUrl`, `transcript`, and `duration` for listening exercises.
    - Map `vocabularyHelp` for reading exercises.
    - Handle `vocabulary` type explicitly if needed.

### 3.2. Content Files
- Update existing `b2/trimestre1/semana01` as a pilot.
- Add a sample article and a sample podcast.

## 4. Verification Plan
- **Manual Test**: Navigate to the Banking & Finance B2 Week 1 lesson and verify:
    - Theory sections are rendered correctly.
    - Reading comprehension article shows vocabulary tooltips.
    - Listening comprehension podcast plays audio and shows transcript.
- **Automated Tests**:
    - Run `npm run lint` to ensure no regressions.
    - Run existing e2e tests for reading and listening (if applicable).
