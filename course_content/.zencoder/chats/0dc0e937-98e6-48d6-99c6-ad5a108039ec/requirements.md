# Product Requirements Document (PRD) - Smart Exercise Generator Enhancements

## 1. Overview
The goal is to transform the current AI-powered exercise generator into a highly personalized, interactive, and gamified learning experience. The system will adapt to the user's level, track persistent errors, and provide professional-grade feedback.

## 2. Goals
- Increase user engagement through gamification (streaks, XP).
- Improve pedagogical effectiveness through error-driven personalization.
- Enhance interactivity with new exercise types and multimedia.
- Provide deeper insights through granular AI feedback.

## 3. Detailed Features

### Phase 1: Adaptive Learning & Gamification
#### 3.1 Error Memory System
- **Requirement**: Store user mistakes to identify weak areas.
- **Implementation**: 
    - Create `user_errors` table: `id, user_id, category, topic, error_type, count, last_seen`.
    - Automatically log errors during session evaluation.
    - Feed these "weak topics" into the AI generator prompt to request targeted practice.
#### 3.2 Dynamic Difficulty Adjustment
- **Requirement**: Adjust difficulty in real-time based on session performance.
- **Implementation**: 
    - If 3 consecutive correct answers: increment difficulty (easy -> medium -> hard).
    - If 2 consecutive incorrect: decrement difficulty.
#### 3.3 Session Streaks & XP Multipliers
- **Requirement**: Reward consistency.
- **Implementation**: 
    - Calculate XP based on: `base_points * difficulty_multiplier * streak_multiplier`.
    - Display "Combo" counter in UI.
#### 3.4 Challenge Mode (Timed)
- **Requirement**: Practice under time pressure.
- **Implementation**: 
    - Toggle for "Challenge Mode".
    - Countdown timer per question (e.g., 30s).
    - Bonus points for time remaining.

### Phase 2: Enriched AI Feedback & Multimedia
#### 3.5 Visual Grammar Analysis
- **Requirement**: Highlight specific parts of the user's answer that are wrong.
- **Implementation**: 
    - Update `evaluate-response` API to return a list of error objects: `{ text, type (grammar/vocab), correction, explanation, startIndex, endIndex }`.
    - UI component to render the user's text with color-coded underlines.
#### 3.6 AI Rewrite Suggestions
- **Requirement**: Show how a native speaker would say it.
- **Implementation**: 
    - AI provides 2-3 versions of the user's response (Formal, Casual, Natural).
#### 3.7 Multi-accent Audio Support
- **Requirement**: Expose users to different English accents.
- **Implementation**: 
    - Selector in UI: "American (US)", "British (UK)", "Australian (AU)".
    - Update `generate-audio` API to accept `accent` parameter.
#### 3.8 Intelligent Dictation Mode
- **Requirement**: Improve listening and spelling.
- **Implementation**: 
    - New exercise type `dictation`.
    - User listens to a sentence and types it. AI evaluates accuracy and spelling.

### Phase 3: Advanced Interaction Modes
#### 3.9 Interactive Sentence Builder
- **Requirement**: Practice syntax and word order.
- **Implementation**: 
    - Drag-and-drop UI component.
    - AI provides scrambled sentences relevant to the level/topic.
#### 3.10 Visual Vocabulary Support
- **Requirement**: Contextualize learning with images.
- **Implementation**: 
    - Use AI-generated image descriptions or direct Unsplash/Pexels search based on keywords.
    - Enhance A1 "visualHint" to display actual images or high-quality SVG icons.
#### 3.11 Dialogue Simulation
- **Requirement**: Practice conversational English.
- **Implementation**: 
    - Stateful conversation (5-8 turns).
    - AI acts as a persona (waiter, boss, friend).
    - Evaluation at the end of the full dialogue.

## 4. Success Metrics
- Increase in exercises completed per user session.
- Improvement in accuracy over time for "remembered" error topics.
- Positive user feedback on feedback clarity.
