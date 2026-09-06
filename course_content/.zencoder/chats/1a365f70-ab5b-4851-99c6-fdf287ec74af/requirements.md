# PRD: C1 Advanced English Course

## 1. Overview
The goal is to create a comprehensive C1 Advanced English course (Advanced/CAE level) for the Focus English platform. This course will follow the successful architecture and user interface of the existing B2 course.

## 2. Target Audience
- Students who have completed B2 and want to reach an Advanced level.
- Candidates preparing for the Cambridge C1 Advanced (CAE) or equivalent exams.
- Professionals needing high-level English for work.

## 3. Scope
- **60 Units**: Total of 60 instructional and practice units.
- **6,000 Exercises**: Approximately 100 exercises per unit (10 blocks of 10 questions each).
- **Content Areas**:
  - Advanced Grammar (Inversion, Cleft Sentences, Modal Verbs of Deduction, etc.).
  - Academic & Professional Vocabulary.
  - Idioms, Phrasal Verbs, and Collocations.
  - Use of English (Cambridge style: Key Word Transformation, Multiple Choice Cloze, etc.).
  - Reading Comprehension (Longer, more complex texts).
  - Listening (Nuance, attitude, and complex arguments).
  - Writing Analysis (Formal reports, proposals, essays).
  - Speaking Analysis (Expressing abstract ideas, negotiating, evaluating).

## 4. Technical Requirements
- **Consistency**: Mimic the B2 course file structure and naming conventions.
- **Data Model**: Use the existing `Exercise`, `Unit`, and `Module` types.
- **Storage**: Unit definitions in `src/lib/c1-units/` and UI in `src/app/curso/ingles-c1/`.
- **Integration**: Update navigation and progress tracking to include the C1 course.

## 5. Reference
The B2 course at `/curso/ingles-b2` and its data in `src/lib/b2-units/` serve as the primary reference for both content structure and UI/UX.

## 6. Milestones
1.  Establish the C1 directory structure and base utility functions.
2.  Define the 60-unit curriculum (Topics and Grammar points).
3.  Implement the first set of units (1-10).
4.  Create the C1 course dashboard and unit pages.
5.  Implement remaining units (11-60).
6.  Final verification and linting.
