# Product Requirements Document (PRD): Exhaustive English Exercise Database

## 1. Overview
The goal is to create a comprehensive and exhaustive database of English exercises covering all CEFR levels (A1 to C2). This database will serve as the primary content source for the **Smart Practice (/practica-inteligente)** feature, enabling an adaptive learning experience that adjusts to the user's level, skills, and progress.

## 2. Target Audience
- Students of all levels (A1-C2) looking for personalized practice.
- Users of the Focus English platform who want to improve specific skills (grammar, vocabulary, reading, etc.).

## 3. Pedagogical Framework & Curriculum
All levels must follow a structured **Learning Curve** based on:
1. **Immersion/Induction**: Presenting concepts through context, visuals, or examples.
2. **Recognition**: Identifying the correct form (Multiple choice, Matching).
3. **Guided Production**: Creating parts of the language (Fill blanks, Reorder).
4. **Free Production**: Using the language independently (Short writing, Speaking).

### A1 (Inductive & Visual - Beginner)
- **Zero Translation Policy**: Avoid direct translation exercises. Use images, icons, and clear visual context to explain meaning.
- **Deductive Learning**: Users should figure out meaning through visual associations (e.g., Image of a dog -> Word "Dog").
- **Topics**: Greetings, Personal Information, Numbers, Family, Colors, Daily Routines, Food & Drink.
- **Grammar**: Verb "to be", Have got, Present Simple (affirmative/negative/question), Basic Prepositions (in, on, at), Possessive adjectives.
- **Complexity**: Level 1 (Recognition) and Level 2 (Guided).

### A2 (Elementary)
- **Controlled Transition**: Start introducing simple instructions in Spanish but keep exercises English-focused.
- **Topics**: Hobbies, Shopping, Travel, Health, Work, House & Furniture.
- **Grammar**: Past Simple (regular/irregular), Present Continuous, Comparatives & Superlatives, Modal Verbs (can, must, should), Future with "going to".
- **Complexity**: Level 2 (Guided) and Level 3 (Controlled).

### B1 (Intermediate)
- **Topics**: Environment, Education, Relationships, Technology, Media, Crime & Punishment.
- **Grammar**: Present Perfect (simple/continuous), Passive Voice (basic), Conditionals (0, 1, 2), Relative Clauses, Past Continuous vs. Past Simple.
- **Complexity**: Level 2 (Guided) to Level 4 (Free).

### B2 (Upper Intermediate)
- **Topics**: Global Issues, Business, Art & Literature, Psychology, Science & Innovation.
- **Grammar**: Conditionals (3, mixed), Past Perfect (simple/continuous), Future Continuous/Perfect, Reported Speech, Gerunds & Infinitives, Advanced Connectors.
- **Complexity**: Level 3 (Controlled) and Level 4 (Free).

### C1 (Advanced)
- **Topics**: Philosophy, Politics, Economics, Abstract Concepts, Nuances of Culture.
- **Grammar**: Inversion, Cleft Sentences, Emphasis, Modals in the past, Wish/If only (advanced), Complex Passives.
- **Complexity**: Level 3 (Controlled) and Level 4 (Free).

### C2 (Proficiency)
- **Topics**: Highly specialized academic, legal, and literary subjects.
- **Grammar**: Mastery of all forms, including archaic or very formal structures, subtle nuances in meaning, idiomatic mastery at native level.
- **Complexity**: Level 4 (Free).

## 4. Exercise Specifications
All exercises must adhere to the `InteractionSchema` defined in the codebase:
- **Multiple Choice**: Single correct answer from options.
- **Fill in the Blanks**: Completing sentences with correct words/phrases.
- **Reorder Words**: Constructing sentences from scrambled words.
- **Matching**: Pairing related items (e.g., word-definition, synonym-antonym).
- **Transformation**: Rewriting sentences using a specific word (Cambridge style).
- **Reading Comprehension**: Questions based on a provided text.
- **Short Writing**: Brief open-ended responses.
- **Speaking Task**: Prompts for oral practice (integrated with AI speaking coach).

## 5. Metadata Requirements
Each exercise MUST include:
- `interaction_id`: Unique identifier.
- `level`: A1, A2, B1, B2, C1, or C2.
- `concept_tags`: Specific skills (e.g., ["grammar", "past-simple"], ["vocabulary", "travel"]).
- `complexity`: 1 to 4 (Recognition, Guided, Controlled, Free).
- `prompt_es`: Instructions in Spanish.
- `explanation`: Educational feedback explaining the correct answer.

## 6. Delivery Strategy
1. **Structure Creation**: Organize `src/content/cursos/` into clean subdirectories per level.
2. **Initial Seed**: Generate a representative batch of 100+ exercises for levels currently lacking content (C1, C2).
3. **Refinement**: Audit existing A1-B2 content for consistency and quality.
4. **Integration**: Ensure the `GlobalContentProvider` correctly indexes all new content.

## 7. Success Criteria
- The `/practica-inteligente` page successfully pulls and renders exercises from all levels.
- The `UltraAdaptiveEngine` can transition a user between levels based on performance.
- No duplicate or broken exercises (verified by lint/validation scripts).
