# Technical Specification - Rediseño Unidades 1, 2 y 3

## 1. Technical Context
- **Language**: TypeScript.
- **Data Location**: `src/lib/a1-m1-l[1-3]-detailed.ts`.
- **Target Component**: `ExerciseRenderer.tsx`.
- **Validation**: `npm run validate-exercises`.

## 2. Implementation Approach

### 2.1. Exercise Schema Consistency
We will use the schema observed in Units 5, 6, and 7. Each file will export independent exercise objects and a combined array of all exercises.

**Key Schema Elements**:
- **Grammar**: `title`, `grammarPoint`, `explanation` (Markdown), `examples` (string[]), `questions` (20+ items: `multiple-choice`, `fill-blank`, `true-false`).
- **Reading**: `title`, `text` (Markdown), `wordCount`, `readingTime`, `questions` (6 items).
- **Listening**: `title`, `audioUrl`, `transcript`, `questions` (6 items).
- **Speaking**: `title`, `instructions`, `prompts`, `evaluationCriteria`, `questions` (speaking type).
- **Writing**: `title`, `instructions`, `prompt`, `minWords`, `maxWords`, `rubric`.

### 2.2. Content Design

#### Unit 1: Greetings & Personal Info
- **Grammar 1**: Greetings & Subject Pronouns (I, you).
- **Grammar 2**: Verb 'to be' (am, are) - Affirmative.
- **Reading**: "Meeting at the Airport" - A simple dialogue/text about two people meeting.
- **Listening**: "At the Information Desk" - Asking for personal details.
- **Speaking**: "Introduce yourself to a classmate".
- **Writing**: "My Personal ID" - A short paragraph about self.

#### Unit 2: Origins & Occupations
- **Grammar 1**: Subject Pronouns (he, she, it, we, they).
- **Grammar 2**: Verb 'to be' (is, are) - Affirmative.
- **Reading**: "International Students Club" - Profiles of students from different countries.
- **Listening**: "Job Interviews" - People describing their professions.
- **Speaking**: "Describe your friend's origin and job".
- **Writing**: "About my Team" - Describing colleagues or friends.

#### Unit 3: Moods & Questions
- **Grammar 1**: Verb 'to be' - Negatives (am not, isn't, aren't).
- **Grammar 2**: Verb 'to be' - Yes/No Questions and Short Answers.
- **Reading**: "How are you today?" - A blog post about emotions and daily states.
- **Listening**: "Are you happy?" - A quick survey about moods.
- **Speaking**: "Ask and answer about your feelings".
- **Writing**: "My Mood Diary" - Describing feelings throughout a week.

## 3. Delivery Phases
1. **Phase 1**: Unit 1 Implementation.
2. **Phase 2**: Unit 2 Implementation.
3. **Phase 3**: Unit 3 Implementation.
4. **Phase 4**: Verification & Audio Placeholder Check.

## 4. Verification
- Manual verification via `/debug/a1-preview`.
- Ensuring all IDs are unique and follow the pattern `a1-m1-l[unit]-[type]-[index]`.
