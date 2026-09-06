# Technical Specification: A1 Administration Redesign

## 1. Context
The current A1 Administration course uses a week-based structure with separate theory, exercises, and exam files. To support the new "interactive slides" and "3 lessons per week" requirement, we need to move to a lesson-centric file structure and enhance the UI to render theory as slides.

## 2. Implementation Approach

### 2.1. File System Structure
We will move from:
```
a1/trimestre1/semana01/
  theory.json
  exercises.json
  exam.json
```
To:
```
a1/trimestre1/semana01/
  lesson1.json
  lesson2.json
  lesson3.json
  review.json (optional, for the weekend/exam)
```

### 2.2. Lesson Data Model
Each `lessonX.json` will implement the `Lesson` interface from `src/lib/exercise-types.ts`, but we will optimize the use of `theoryContent` by using a JSON-stringified array of sections or a new field `theorySlides`.

```typescript
// Proposed enhancement to Lesson interface in data files
interface LessonData extends Lesson {
  videoUrl: string; // Required for this feature
  theorySlides: {
    title: string;
    content: string; // Markdown supported
    imageUrl?: string;
    audioUrl?: string;
    interactiveCheck?: Question; // Optional quiz question for this slide
  }[];
}
```

### 2.3. Frontend: Interactive Slide Viewer
We will modify `LessonViewer.tsx` (or create a sub-component `TheorySlideViewer.tsx`) to:
1.  Check if `theorySlides` exists in the lesson object.
2.  Render a "Carousel-like" interface for the theory part.
3.  Embed the `videoUrl` (YouTube embed) at the start or as a dedicated slide.
4.  Allow students to navigate between slides.
5.  Show the "Interactive Check" questions between slides.

### 2.4. Media Pipeline Integration
- **Audio**: Use the existing ElevenLabs/Azure TTS scripts to generate audio for each slide.
- **Video**: Use the existing Python pipeline logic (B2) to generate MP4s for A1 lessons. We will need to create a new `jobs` directory for A1: `src/content/cursos/trabajo/administracion/a1/jobs/`.

## 3. Delivery Phases

### Phase 1: Infrastructure & Prototyping
- Enhance `Lesson` interface and `LessonViewer.tsx` to support slides.
- Create the first 3 lessons for A1 Week 1 (Greetings).
- Generate audio and video for Week 1.

### Phase 2: Curriculum Expansion (Trimester 1)
- Create content for Weeks 2-12.
- Set up the media pipeline for batch processing.

### Phase 3: Completion (Trimesters 2 & 3)
- Create remaining lessons (Weeks 13-36).
- Final verification and linting.

## 4. Verification Plan
- **Linting**: `npm run lint`
- **Type Checking**: `npm run typecheck`
- **Manual Verification**: Test navigation and video playback in the `LessonViewer` for A1 content.
- **Content Validation**: Use `scripts/audit-generic.mjs` to ensure the new JSON files match the required schema.
