# Product Requirements Document (PRD): AI Speaking Partner with Realistic Avatars

## 1. Overview
The goal is to create a high-quality web application where students can practice their English speaking skills with a realistic AI partner. The AI will act as a pedagogical guide, helping the student improve their fluency, grammar, and pronunciation in real-time.

## 2. Target Audience
Students of Focus English (A1 to C2 levels) who need a safe and interactive environment to practice speaking.

## 3. Key Features

### 3.1. Realistic Video Avatars
- **Visuals**: Use high-quality video avatars (e.g., via HeyGen Streaming API) that synchronize lip-sync with AI-generated speech.
- **Selection**: Students can choose from multiple avatars with different personalities, accents, and appearances.
- **Responsiveness**: The avatar should react visually to the conversation (idle animations, talking states).

### 3.2. Real-time Conversational AI
- **Low Latency**: Integration with OpenAI Realtime API for natural, low-latency voice interactions.
- **Context-Awareness**: The AI should remember previous sessions and understand the current learning context (scenario, student level).

### 3.3. Pedagogical Guidance
- **Correction Logic**: The AI should provide natural, non-intrusive corrections during the conversation.
- **Structured Feedback**: After certain milestones (e.g., every 5 turns), provide a detailed evaluation of pronunciation, fluency, vocabulary, and grammar.
- **Guided Missions**: Support structured scenarios (Job Interview, Restaurant, etc.) with specific objectives.

### 3.4. Multi-modal Interaction
- **Speech-to-Speech**: Primary mode of interaction.
- **Transcription**: Real-time display of both student and AI speech for visual reinforcement.
- **Feedback UI**: Visual cards showing corrections and progress against mission objectives.

## 4. User Experience (UX)
1. **Selection Screen**: Choose an avatar and a speaking scenario.
2. **Onboarding**: Brief explanation of how the session works and microphone permission request.
3. **The Session**: Full-screen or focused interface with the video avatar as the center of attention.
4. **Conclusion**: Detailed summary of the session, including achievements and areas for improvement.

## 5. Technical Constraints
- **Framework**: Next.js 15 (App Router), TypeScript, Tailwind CSS.
- **Backend**: Supabase (Auth, DB, Real-time persistence).
- **AI/Video**: OpenAI Realtime API for voice/logic, HeyGen Streaming API for video avatars.
- **Performance**: Must maintain low latency for a natural conversation feel.

## 6. Success Metrics
- Average session duration.
- Number of successfully completed mission objectives.
- User satisfaction ratings (post-session).
- Retention (students returning for more speaking practice).
