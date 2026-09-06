# Product Requirements Document (PRD): Focus English AI Lab

## 1. Vision & Purpose
The **Focus English AI Lab** is a novel, immersive feature designed to provide students with high-impact, interactive English practice using the latest AI trends. It moves beyond traditional exercises into goal-oriented "Missions" that simulate real-world scenarios across professional sectors, travel, and exam preparation.

## 2. Target Audience
- **Professional Students**: Focusing on Tech, Marketing, Healthcare/Pharma, Finance, etc.
- **Travelers**: Preparing for international trips.
- **Exam Candidates**: Practicing for Cambridge (B2/C1), IELTS, or TOEFL speaking/integrated tasks.
- **General Learners**: Seeking conversational fluency.

## 3. Key Features (Trends)

### 3.1 Dynamic AI Missions (Gamification & Scenarios)
- **Concept**: Instead of static questions, users complete "missions".
- **Structure**: Each mission has a specific goal (e.g., "Get a refund for a cancelled flight" or "Pitch a new project to your manager").
- **Multi-turn**: Conversations are dynamic; the AI's response depends on what the user says.
- **Success Criteria**: Missions are completed only when the goal is achieved.

### 3.2 Immersive Voice Interaction (AI Conversations)
- **STT (Speech-to-Text)**: High-accuracy transcription using Whisper.
- **TTS (Text-to-Speech)**: Real-time, natural-sounding AI voices with different accents (UK, US, etc.).
- **Emotional Nuance**: AI personas have personalities (e.g., "The Impatient Client", "The Supportive Colleague").

### 3.3 Adaptive Learning & Feedback
- **Level-Adjusted Difficulty**: AI simplifies or complicates its language based on the user's CEFR level (A1-C2).
- **Soft Skills Evaluation**: Feedback includes not just grammar/vocab, but also politeness, persuasiveness, and cultural appropriateness.
- **Branching Paths**: The conversation flow changes based on user choices.

### 3.4 Micro-Learning Integration
- **Short Scenarios**: Missions are designed to be completed in 5-10 minutes.
- **Progressive Unlocking**: Users earn "XP" or "Badges" and unlock more complex missions.

## 4. User Experience (UX) Flow
1. **Lab Entry**: User enters the "AI Lab" from the dashboard.
2. **Select Path**: User chooses between "Professional", "Travel", "Exams", or "Daily Life".
3. **Select Sector/Scenario**: (e.g., "Tech" -> "Agile Stand-up Meeting").
4. **Mission Briefing**: Goal is explained (e.g., "Explain why the feature is delayed and propose a solution").
5. **Interactive Roleplay**: Back-and-forth voice/text interaction.
6. **Mission Wrap-up**: AI provides immediate feedback and a "Mission Score".
7. **Rewards**: XP, Badges, and progress toward the next level.

## 5. Technical Constraints & Patterns
- **Backend**: Next.js API Routes, OpenAI (GPT-4o for logic, Whisper for STT).
- **Frontend**: React 19, Tailwind CSS, Framer Motion for animations.
- **State Management**: React state (or Supabase for persistence).
- **Audio**: Web Audio API for recording and playback.

## 6. Success Metrics
- Completion rate of missions.
- Time spent in the AI Lab.
- Improvement in speaking scores over time (tracked in profile).
