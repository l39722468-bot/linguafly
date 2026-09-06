# Technical Specification - Fixing Unit 5 Exercise Rendering

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: Tailwind CSS, Lucide React
- **Affected Components**: `src/components/ExerciseRenderer.tsx`
- **Data Source**: `src/lib/course/a1/unit-5.ts`

## Implementation Approach

### 1. Fix `fill-blank` Input Rendering
The current `ExerciseRenderer` check for rendering the `fill-blank` input relies on `q.type === 'fill-blank'`. However, in many exercises (like those in Unit 5), the `type` is only defined at the top-level `exercise` object, not in individual questions.
- **Change**: Update the condition in `renderCurrentQuestion` to check both `q.type` and `exercise.type`.
- **Logic**: 
  ```typescript
  const isFillBlank = q.type === 'fill-blank' || (exercise.type === 'fill-blank' && !q.type);
  ```

### 2. Add Audio Playback Support
Exercise definitions include an `audioUrl` (e.g., `audio/a1/unit-5/e24.mp3`), but it is not currently rendered in `ExerciseRenderer`.
- **Change**: Add a "Listen" button in the exercise header or question area.
- **UI**: Use the `Volume2` icon from `lucide-react`.
- **Implementation**:
  - Add a state `isPlaying` or just a helper function to play the audio.
  - Since the paths are relative (e.g., `audio/...`), ensure they are prefixed correctly if needed (usually starting with `/` or from a CDN).
  - Add the button near the exercise title or inside the question card.

### 3. Handle Inline Gaps (Optional but Recommended)
The user mentioned "missing elements". If "A (______) is a boy." is displayed, it looks better if the input is inline. However, the current renderer uses a separate input field below. I will first fix the visibility of the input field. If time permits and it aligns with project style, I will consider inline gaps.

## Source Code Structure Changes
- Modify `src/components/ExerciseRenderer.tsx` to:
    - Include audio playback logic.
    - Fix the `fill-blank` rendering condition.

## Verification Approach
- **Manual Verification**: Use the preview page `/debug/a1-preview/unit-5?index=23` (Index 23 is Exercise 24) to verify:
    - The input field is visible.
    - An audio button is present and plays the correct audio.
- **Automated Testing**:
    - Use Playwright to ensure the "Confirm Answer" button becomes enabled when text is entered in the `fill-blank` input.
    - Verify the audio button is present in the DOM.
