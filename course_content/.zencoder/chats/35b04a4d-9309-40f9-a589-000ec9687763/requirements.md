# Product Requirements Document (PRD) - Banking & Finance Course Enhancements

## 1. Overview
The goal is to enhance the existing Banking & Finance course by adding more structured and rich content, specifically focusing on economic theory, authentic-style articles, and podcasts, all with a high density of specialized economic vocabulary.

## 2. Target Audience
- Professionals in the banking and finance sector.
- Students of finance and economics.
- Individuals preparing for professional English exams in a financial context.

## 3. Key Features

### 3.1. Enhanced Theory Sections
- Each lesson should start with a comprehensive theory section covering a specific financial topic.
- Topics should range from basic banking (A1/A2) to complex investment banking, risk management, and fintech (B2/C1).
- Theory should include key terminology, conceptual explanations, and real-world applications.

### 3.2. Economic Articles (Reading Comprehension)
- Addition of authentic-style economic articles.
- Each article should be accompanied by reading comprehension questions (multiple choice, true/false, or short answer).
- Articles should use advanced economic vocabulary and reflect current market trends.

### 3.3. Podcasts (Listening Comprehension)
- Addition of podcast-style audio content (interviews, financial news, expert discussions).
- Each podcast should have listening comprehension questions.
- Audio should be accompanied by a transcript (optionally interactive).

### 3.4. Economic Vocabulary Focus
- Integration of a rich set of economic terms throughout all content types.
- Vocabulary exercises (matching, gap-fill, or flashcards) to reinforce learning.
- Use of the existing glossary or enhancement of it.

## 4. User Experience (UX)
- Users should be able to navigate between Theory, Practice (Exercises), and Reading/Listening tasks seamlessly.
- Immediate feedback on comprehension questions.
- Access to transcripts for audio content to facilitate understanding.

## 5. Content Structure (Proposed)
The current structure in `src/content/cursos/trabajo/finanzas/` follows a `Level > Trimester > Week` hierarchy.
Each `semanaXX` folder currently contains:
- `theory.json`: Topic sections.
- `exercises.json`: A mix of multiple-choice, writing, and some reading tasks.
- `exam.json`: Weekly assessment.

**Enhancement:**
- Expand `theory.json` to include more depth.
- Standardize `readingComprehension` within `exercises.json` or create a new `articles.json`.
- Add `listening` exercises with `audioUrl` and `transcript`.

## 6. Constraints & Assumptions
- Content will be stored locally as JSON files in the existing structure.
- Audio files (podcasts) will be hosted or placed in `public/audio/`.
- AI evaluation (existing in the platform) will be used for open-ended questions.

## 7. Success Metrics
- Completion rate of finance-specific lessons.
- Accuracy in comprehension questions.
- Positive user feedback on the relevance and depth of the economic content.
