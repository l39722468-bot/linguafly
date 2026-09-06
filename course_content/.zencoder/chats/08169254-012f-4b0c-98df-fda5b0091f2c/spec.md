# Technical Specification - Exercise 10 Audio Addition

## 1. Technical Context
- **Language**: TypeScript
- **Runtime**: Node.js (via `ts-node`)
- **Dependencies**: `dotenv`, `fs`, `path`, `fetch` (native or polyfilled), `elevenlabs-node` (or direct API calls via `src/lib/text-to-speech.ts`)
- **Infrastructure**: ElevenLabs Text-to-Speech API

## 2. Implementation Approach
We will create a specialized script to generate audio for exercises that are not part of the main `ALL_MODULES` constant. This avoids modifying the existing generation script which seems tailored for a different data structure.

### 2.1 New Utility Script: `scripts/generate-single-audio.ts`
This script will:
1. Accept command-line arguments: `--file` (path to JSON) and `--id` (exercise ID).
2. Read the specified JSON file.
3. Locate the exercise by ID.
4. Verify the exercise has a `transcript` and `audioUrl`.
5. Ensure the target directory in `public/` exists.
6. Invoke `generateConversationAudio` from `src/lib/text-to-speech.ts`.
7. Use `VOICE_IDS.british_female` (Rachel) as the default voice for listening exercises, consistent with `generate-course-audio.ts`.

### 2.2 Directory Management
- Use `fs.mkdirSync(dir, { recursive: true })` to ensure `public/audio/finanzas/` exists before writing.

## 3. Source Code Structure Changes
- **New File**: `scripts/generate-single-audio.ts`

## 4. Verification Approach
- **Manual Check**: Verify file existence at `public/audio/finanzas/podcast-semana01.mp3`.
- **Command**: `ls -l public/audio/finanzas/podcast-semana01.mp3`
- **Playback**: If possible, verify via a test script or by checking the file size (should be > 0).

## 5. Delivery Phases
1. **Phase 1**: Script Development - Create `scripts/generate-single-audio.ts`.
2. **Phase 2**: Audio Generation - Execute the script for the Finance B2 course.
3. **Phase 3**: Verification - Confirm the audio file is correctly placed.
