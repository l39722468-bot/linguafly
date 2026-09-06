# PRD: Improved Natural Audios for A1 Unit 1

## Overview
The goal of this feature is to replace the robotic/unnatural audios in the A1 Unit 1 course with high-quality, natural-sounding voices using ElevenLabs. Currently, some exercises (like Flashcards) fall back to the browser's built-in speech synthesis when no explicit audio file is provided.

## User Stories
- As a student, I want to hear natural-sounding English pronunciations so that I can learn the correct accent and intonation.
- As a teacher, I want the course materials to sound professional and engaging.

## Requirements
1. **Audio Generation**:
   - Identify all English strings in `src/lib/course/a1/unit-1.ts` that require audio.
   - Use ElevenLabs API with high-quality voices (e.g., Bella for American Female, Rachel for British Female) to generate MP3 files.
   - Audios should be clear and at a suitable pace for A1 level learners.

2. **Integration**:
   - Save generated audio files in `public/audio/course/a1/unit-1/`.
   - Update `src/lib/course/a1/unit-1.ts` to reference these new audio files.
   - Ensure `FlashcardExercise` and other relevant components use the provided audio files instead of falling back to speech synthesis.

3. **Exercise Types to Update in Unit 1**:
   - `multiple-choice`: Audio for options and potentially questions.
   - `flashcard`: Audio for the English text on the front/back.
   - `sentence-building`: Audio for the correct sentence.
   - `speaking-analysis`: Audio for the model phrase the user needs to repeat.
   - `matching`: Audio for the English terms.
   - `fill-blank`: Audio for the correct answer or the whole sentence.

## Constraints
- Use ElevenLabs API key from `.env.local`.
- Minimize API costs by checking if an audio file already exists before generating it.
- Follow existing naming conventions for audio files.

## Success Criteria
- All English text in A1 Unit 1 exercises has an associated "natural voice" audio button.
- Audios play correctly when clicking the volume icon in the UI.
- No fallback to browser speech synthesis for Unit 1.
