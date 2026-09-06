# Full SDD workflow - Audio Verification

## Workflow Steps

### [x] Step: Requirements

Verify all audio files for listening exercises in `/curso/ingles-a1` are created.

1. Review existing codebase to identify content structure and audio storage.
2. Define verification script to automate checking all units.

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/106a6685-d49e-4bb9-a067-1339705b54aa/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD.

1. Identify all JSON unit files in `src/content/cursos/ingles-a1/`.
2. Extract all `audioUrl` references from these files.
3. Check existence of corresponding files in the `public` directory.

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/106a6685-d49e-4bb9-a067-1339705b54aa/spec.md`.

### [x] Step: Planning

Create a detailed implementation plan based on `spec.md`.

1. **Task 1: Implement extraction logic**: Write the function to recursively find `audioUrl` in a JSON object.
2. **Task 2: Implement file scanning**: Write the logic to read all `unit*.json` files and collect URLs.
3. **Task 3: Implement verification**: Write the logic to check file existence in `public/`.
4. **Task 4: Report generation**: Format the output for the console.

### [x] Step: Implementation

1. **Create verification script**: Implement `scripts/verify-a1-audio.mjs` with the planned tasks. [./scripts/verify-a1-audio.mjs](./scripts/verify-a1-audio.mjs)
2. **Run verification**: Execute `node scripts/verify-a1-audio.mjs` and identify missing audio files.
   - **Result**: **110 missing audio files** identified.
   - **Diagnosis**: Existing audio files in `public/audio/courses/ingles-a1/shared/` (71 files) do not match any references in the JSON files. They appear to have been generated for `stimulus_en` fields instead of the `text` field used in `audio_player` interactions.
3. **Verify results**: Present the list of missing files to the user for confirmation.

### [x] Step: Audio Generation

1. **Create generation script**: Implement `scripts/generate-a1-audio-fix.mjs` that reads all unit JSONs and generates missing audio files using the `text` field. [./scripts/generate-a1-audio-fix.mjs](./scripts/generate-a1-audio-fix.mjs)
2. **Verify API Credits**: Check ElevenLabs usage before starting. (Verified via ElevenLabs API key provided).
3. **Run generation**: Execute the script to generate all 110 missing files.
   - **Result**: **110 files generated** successfully.
4. **Final Verification**: Run `scripts/verify-a1-audio.mjs` again to ensure all files are now present.
   - **Result**: **All 110 audio files are present**.

### [x] Step: Audio Playback Resilience

1. [x] **Implement Fallback Logic**: Update `PremiumSession.tsx` and `FocusedSession.tsx` to include on-the-fly audio generation if static files fail to play.
2. [x] **Commit and Push**: Ensure all audio files and logic changes are pushed to the repository.
   - **Commit**: `a144f93b` (Audio files) + `10dc2e26` (Resilience logic)

### [x] Step: Expansion Audio Generation (Missing Audios)

1. [x] **Identify Expansion Audios**: Verify if `_EXP_` interactions are missing audio.
2. [x] **Modify Generation Script**: Update `scripts/generate-a1-expansion-audio.ts` (handled via `generate-a1-expansion-fix.mjs`) to use ElevenLabs and handle complex structures.
3. [x] **Run Expansion Generation**: Generate audio for the missing expansion exercises.
4. [x] **Final Push**: Push all generated expansion audios and updated JSONs.
   - **Commit**: `733b77ae`

