# PRD - Exercise Specialization Cleanup

## 1. Goal
Remove all English exercises and modules related to specialized topics (Finance, IT, Email, Professional/Business) while maintaining a generic English curriculum from A1 to C2.

## 2. Identification Criteria

### 2.1. Specialized Content (To be Removed)
- **IT / Software Development**: Anything related to Scrum, Agile, coding reviews, technical documentation, etc.
- **Finance / Economics**: Quarterly reports, KPIs, financial terminology, market trends, compliance.
- **Professional / Career**: Salary negotiation, leadership, LinkedIn optimization, high-impact presentations for boards.
- **Office / Business**: Formal emails, office phrasal verbs, business meetings, reports.
- **Sectors**: Legal, Engineering, Admin, Education, Marketing, Tourism (as found in `src/lib/sectors`).
- **Exam Preparation**: Specific preparation for CAE, IELTS, TOEFL, etc. (unless the content is purely linguistic and generic).

### 2.2. Generic Content (To be Kept)
- **Survival English**: Greetings, alphabet, numbers, time, ordering food (basic level).
- **Daily Life**: Routines, hobbies, family, describing cities, past experiences, future plans.
- **Grammar & Vocabulary**: General CEFR-aligned structures for levels A1 through C2.
- **Universal Topics**: Travel (basics), Culture, Social Interaction, General Writing/Speaking.

## 3. Impacted Components

### 3.1. Database (Supabase Migrations)
- **Modules/Lessons/Exercises**:
    - `b2-work-it`
    - `b2-work-finance`
    - `b2-work-m1` (Career Success)
    - `c1-exams-m1` (CAE Mastery)
    - `b1-step-by-step` (Contains job interviews)
    - `b2-step-by-step` (Contains KPI presentations/reports)
    - Any module tagged as `course_goal` = 'trabajo' or 'examenes' that is not generic.

### 3.2. Codebase (TypeScript Files)
- `src/lib/sectors/` (Entire directory)
- `src/lib/exam-curriculum.ts`
- `src/lib/cambridge-curriculum.ts`
- Specialized exercise definitions in `src/lib/` (e.g., `it-curriculum.ts`, `legal-curriculum.ts`, etc.)

## 4. Proposed Actions
1. Create a new migration to:
    - Delete modules, lessons, and exercises identified as specialized.
    - Update generic modules currently tagged as `viajes` or `trabajo` to a more generic goal like `general`.
2. Remove specialized TypeScript files from the repository.
3. Update any "Dispatcher" components (e.g., `B2ExerciseDispatcher.tsx`) if they reference deleted specialized content.

## 5. Open Questions for User
- Should **Travel English** (`viajes`) be kept as part of the generic path? (Assumption: Basic travel like "At the airport" or "Ordering food" is generic enough to stay).
- Should **Academic/Exam** English be removed entirely? (Assumption: The user said "generic only", so exam-specific strategies should go).
