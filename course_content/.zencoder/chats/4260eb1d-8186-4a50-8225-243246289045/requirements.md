# Product Requirements Document (PRD) - Ultra-Intelligent Adaptive Learning Algorithm

## 1. Overview
The goal is to create an "ultra-intelligent" adaptive learning algorithm that leverages the extensive exercise material (A1-C2) in the Focus English platform to provide a personalized, efficient, and engaging learning experience.

## 2. Goals
- Seamless progression across all CEFR levels (A1 to C2).
- Optimize retention using integrated Spaced Repetition System (SRS).
- Dynamic difficulty adjustment based on real-time user performance.
- Targeted reinforcement of weak concepts.
- Sector-specific content prioritization (IT, Marketing, Legal, etc.).

## 3. Key Features

### 3.1. Unified Mastery Model
- Track mastery at the **concept** level (e.g., "present-perfect", "business-idioms") rather than just unit completion.
- Map concepts across levels (e.g., "past-simple" in A2 is a prerequisite for "past-perfect" in B1).

### 3.2. Multi-Factor Adaptive Engine
- **Complexity Scaffolding**: Adjust the type of interaction based on mastery.
    - Level 1: Recognition (Multiple Choice, True/False)
    - Level 2: Guided Production (Reorder words, Matching)
    - Level 3: Controlled Production (Fill blanks, Transformation)
    - Level 4: Free Production (Writing, Speaking)
- **Error Pattern Analysis**: Detect recurring mistakes in specific grammar points or vocabulary sets and automatically inject corrective exercises.
- **Performance-Based Pacing**: Speed up or slow down the introduction of new material based on response accuracy and time.

### 3.3. Integrated SRS (Spaced Repetition System)
- Use a modified SM-2 algorithm to schedule reviews.
- Review items are interleaved with new content to maintain engagement (Interleaving effect).
- Priority-weighted scheduling: Failed items appear sooner; mastered items appear less frequently.

### 3.4. Sector-Aware Prioritization
- Incorporate user's professional background (from profile) to prioritize relevant vocabulary and scenarios.
- Boost weight for exercises tagged with the user's selected sector (IT, Tourism, etc.).

### 3.5. Smart Global Path
- Dynamically generate sessions that pull from the entire content library (A1-C2) based on the user's current "frontier" of knowledge.
- **Infinite Flow**: The session continues until the user chooses to exit, maintaining a steady flow of engagement.

### 3.6. Advanced Engagement & Pedagogical Behaviors
- **Stuck Detection**: If a user fails the same concept 3 times, provide a "break" with a simpler, high-success interaction or a brief explanation before re-attempting.
- **Boredom Detection**: If the user's accuracy is 100% and response time is very low for several interactions, skip ahead in difficulty or introduce more complex interaction types (e.g., from Multiple Choice to Short Writing).
- **Gamified Interleaving**: Inject "Bonus" high-XP challenges or fast-paced "Rapid Fire" rounds to break monotony.
- **Real-time Enrichment**: Automatically generate audio for exercises missing it using integrated AI (ElevenLabs/OpenAI) to ensure a high-quality multimedia experience.
- **Variety Engine**: Ensure a mix of listening, reading, writing, and grammar within every 10 interactions to keep the brain active.

## 4. Technical Constraints
- Must use existing `Interaction` schemas and exercise types.
- Must integrate with Supabase for state persistence.
- Must be performant for real-time exercise generation.

## 5. Success Metrics
- Increase in user retention and session length.
- Improved accuracy over time in review sessions.
- Reduced time-to-mastery for core grammatical concepts.
