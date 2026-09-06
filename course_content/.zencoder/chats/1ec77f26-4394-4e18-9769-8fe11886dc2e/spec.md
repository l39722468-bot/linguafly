# Technical Specification: Improved Natural Audios for A1 Unit 1

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Audio Service**: ElevenLabs API (multilingual_v2 model)
- **Storage**: Local filesystem (`public/audio/course/a1/unit-1/`)

## Implementation Approach

1. **Extraction Script**:
   - Create or update a script to parse `src/lib/course/a1/unit-1.ts`.
   - Collect all English phrases that need audio.
   - For each phrase, generate a unique filename (e.g., using a hash of the text or the exercise ID).

2. **Audio Generation**:
   - Use the `ElevenLabs` API via a Node.js script.
   - Use `VOICE_IDS.american_female` (Bella) for general phrases and `VOICE_IDS.british_female` (Rachel) if specific variety is needed.
   - Save files as `.mp3` in `public/audio/course/a1/unit-1/`.

3. **Data Model Updates**:
   - Modify `src/lib/course/a1/unit-1.ts` to include `audio` or `audioUrl` fields in the exercise content.
   - Example for Flashcards:
     ```typescript
     {
       front: { text: 'Hello', audio: '/audio/course/a1/unit-1/hello.mp3' },
       back: { translation: 'Hola' }
     }
     ```
   - Example for Multiple Choice:
     ```typescript
     {
       id: 'q1',
       question: '...',
       options: [
         { text: 'Good morning', audio: '/audio/course/a1/unit-1/good-morning.mp3' },
         ...
       ]
     }
     ```

4. **Component Support**:
   - Ensure `FlashcardExercise.tsx` correctly handles `normalizedFront.audio`.
   - Update `MultipleChoice` (if it's a separate component) or the renderer to show audio icons next to options.
   - Update `SpeakingExercise.tsx` to include a "Listen to model" button using the generated audio.

## Source Code Structure Changes
- `src/lib/course/a1/unit-1.ts`: Content updates.
- `public/audio/course/a1/unit-1/`: New directory for MP3 files.
- `scripts/generate-a1-unit1-audio.ts`: New script for automation.

## Verification Approach
- **Manual Verification**: Run the dev server and navigate to `/debug/a1-preview/unit-1`. Verify each exercise plays the correct natural audio.
- **E2E Testing**: Add a Playwright test to ensure audio elements are present and have valid sources.
