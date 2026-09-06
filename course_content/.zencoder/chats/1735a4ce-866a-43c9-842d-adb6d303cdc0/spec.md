# Technical Specification: Unit 1 Review and Improvements

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: Tailwind CSS, Lucide React (icons), Framer Motion (animations)
- **State Management**: React `useState`, `useEffect`
- **Components**: `ExerciseRenderer`, `TranslatedText`, `SpeakingExercise`
- **Content**: Static exercise definitions in `src/lib/a1-m1-l1-detailed.ts`

## Implementation Approach

### 1. Audio Integration
- Use the existing `generate-audio` script to generate audio for Unit 1.
- Update `ExerciseRenderer` to include a `Volume2` icon button that plays the audio for the current question/text.
- Use the Web Audio API or a simple `<audio>` tag for playback.

### 2. Image Support
- Extend `ExerciseRenderer` to support an `imageUrl` field in the question object.
- If `imageUrl` is present, display it above the question text.

### 3. Content Chunking (UI level)
- Modify `UnitPreviewContent` to group exercises into batches (e.g., 15 questions per batch).
- Show a "Lesson Completed" screen between batches.

### 4. Visual Improvements
- Enhance the feedback section with more encouraging messages.
- Add a summary screen at the end of the unit showing score and time taken.

## Source Code Structure Changes
- `src/components/ExerciseRenderer.tsx`: Add audio playback and image support.
- `src/app/debug/a1-preview/[unitId]/page.tsx`: Implement lesson chunking.
- `src/lib/a1-m1-l1-detailed.ts`: Add `imageUrl` and `audioUrl` (after generation) to exercises.

## Verification Approach
- **Manual Verification**: Test the new audio and image features in the debug preview.
- **Automated Testing**: Add Playwright E2E tests to verify that the audio button exists and functions.
- **Linting**: Run `npm run lint` and `npm run type-check`.
