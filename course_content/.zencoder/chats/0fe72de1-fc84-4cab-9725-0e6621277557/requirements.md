# PRD: Update and Verify Unit 1 Exercises (A1 Course)

## Objective
Ensure that Unit 1 of the A1 English course ("Greetings and Personal Information") contains a full set of 60 high-quality exercises that follow the pedagogical and technical guidelines of the project.

## Current State
- `src/content/cursos/ingles-a1/unit1.json` contains only 2 exercises.
- `src/lib/a1-m1-l1-detailed.ts` contains 60 detailed exercises (grammar, practice, and reading).
- The application loads content from the JSON file first.

## Requirements
1.  **Full Exercise Set**: Unit 1 must have exactly 60 exercises.
2.  **Pedagogical Standards**:
    -   Exercises must not be trivial.
    -   Include full translations in `[[English|Spanish]]` format for all English text.
    -   Randomized correct answers.
3.  **Content Scope**:
    -   Greetings (Hello, Hi, Good morning) and Farewells (Goodbye, Bye).
    -   Personal Information (Name, Surname).
    -   Verb 'to be' (I am, you are, he/she/it is) and Subject Pronouns (I, You, He, She, It).
    -   Possessive adjectives (My, Your).
4.  **Reading Comprehension**:
    -   Include reading passages with multiple questions.
    -   Follow the two-phase system (text first, then questions).
5.  **Technical Format**:
    -   The JSON file `src/content/cursos/ingles-a1/unit1.json` must be updated to the correct structure (`UnitData` with `blocks`).
    -   Each interaction must have a unique `interaction_id`, `type`, `prompt_es`, and appropriate content fields.
    -   Include `mastery_tag`, `concept_tags`, and `complexity`.

## Success Criteria
- `unit1.json` contains 60 exercises.
- All exercises have correct translations.
- All exercises have mastery and concept tags.
- The unit can be completed successfully in the application.
