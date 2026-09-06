# Product Requirements Document (PRD) - Exercise 10 Audio Addition

## 1. Overview
The "Banca y Finanzas" (Banking and Finance) B2 course, Week 1, includes a listening exercise (Ejercicio 10: Listening) that currently lacks an audio file. The goal is to generate and integrate the missing audio file to ensure a complete learning experience.

## 2. Target Exercise
- **Course**: Cursos de Trabajo - Finanzas (B2)
- **Timeframe**: Trimestre 1, Semana 1
- **Exercise ID**: `finance-b2-w1-podcast1`
- **Type**: `listening-comprehension`
- **Title**: Podcast: The Future of Fintech and M&A

## 3. Requirements
### 3.1 Audio Generation
- **Source**: The transcript provided in the `exercises.json` file for the specific lesson.
- **Voice**: A natural-sounding voice (preferably matching existing patterns, e.g., British Female for listening exercises).
- **Format**: MP3.
- **Output Path**: `public/audio/finanzas/podcast-semana01.mp3`.

### 3.2 Directory Structure
- Create the `public/audio/finanzas/` directory if it does not exist.

### 3.3 Verification
- The audio file must be accessible via the web server (e.g., `http://localhost:3000/audio/finanzas/podcast-semana01.mp3`).
- The audio should correctly reflect the transcript.

## 4. Technical Constraints
- Must use existing text-to-speech (TTS) infrastructure (ElevenLabs or Google Cloud TTS).
- Must adhere to the project's directory structure for assets.

## 5. Assumptions
- The `ELEVENLABS_API_KEY` is configured and has enough credits.
- The `generateConversationAudio` function in `src/lib/text-to-speech.ts` is suitable for generating the podcast audio.
