# Product Requirements Document (PRD): AI Speaking Tutor v2 (Realtime)

## Overview
Improve the current "IA Conversacional" feature by implementing a more fluid, real-time interaction using the OpenAI Realtime API. This will provide a "human-like" conversation experience with instant feedback on pronunciation and grammar.

## Problem Statement
The current `AIConversationSimulator` relies on browser-based `SpeechRecognition` which is inconsistent across browsers and lacks high-quality transcription. The interaction is turn-based and slow (Record -> Transcribe -> Chat API -> TTS API -> Play), which doesn't feel natural.

## Goals
- **Fluidity**: Zero-latency feel using WebSockets for streaming audio both ways.
- **Accuracy**: Professional-grade speech-to-text using OpenAI models.
- **Detailed Feedback**: Phonetic analysis and scoring (0-100) for pronunciation, fluency, and grammar.
- **Engagement**: A more immersive UI that reflects the real-time nature of the conversation.

## Features

### 1. Real-time Voice Interaction
- Use OpenAI Realtime API (via WebSockets).
- Support for multiple AI Tutor personas (Emma, James, etc.) with consistent voices.
- Voice activity detection (VAD) to automatically handle turn-taking.

### 2. Detailed Pronunciation Analysis
- Real-time or post-turn analysis of phonetic accuracy.
- Visual highlighting of words mispronounced.
- Overall scores for Pronunciation, Fluency, and Grammar.

### 3. Session Persistence
- Save conversation summaries and scores to Supabase.
- Allow users to review past conversations and feedback.

### 4. Scenario-based Learning
- Pre-defined scenarios (Job Interview, Restaurant, etc.) that set the context for the AI.

## Technical Constraints
- Must use existing Next.js / Tailwind environment.
- Requires OpenAI API key with Realtime API access.
- Audio handling in the browser (Web Audio API).

## User Experience (UX)
- Interactive "Orb" or visualizer showing the AI is listening/speaking.
- Real-time transcript display.
- Instant "Corrections" popups or side panel.

## Success Metrics
- Average conversation length (engagement).
- User satisfaction with pronunciation feedback accuracy.
- Reduction in perceived latency compared to v1.
