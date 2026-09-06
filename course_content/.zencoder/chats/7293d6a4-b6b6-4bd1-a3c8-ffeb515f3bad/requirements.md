# PRD - Redesign of B1 English Course

## 1. Goal
Redesign the B1 English course to provide a high-quality, comprehensive learning experience with 30 units, 50 exercises per unit, and word-by-word translations.

## 2. Target Audience
Intermediate learners (B1 level) looking to consolidate their skills and move towards B2.

## 3. Key Requirements
- **30 Units**: A complete B1 curriculum covering grammar, vocabulary, and common scenarios.
- **50 Exercises per Unit**: A mix of multiple-choice, fill-in-the-blanks, flashcards, sentence building, etc.
- **All-Word Translation**: Every word in the exercises should be interactive, showing a translation and pronunciation/definition when hovered/clicked (dotted underline).
- **Thematic Consistency**: Each unit should focus on a specific theme and associated grammar/vocabulary.

## 4. Proposed Generic Thematic Structure (30 Units)
1. **Daily Routine & Life** (Present Simple/Continuous review)
2. **Memories & The Past** (Past Simple/Continuous)
3. **Personal Experiences** (Present Perfect Simple)
4. **Travel & Transportation** (Present Perfect vs Past Simple)
5. **Future Plans & Intentions** (Will vs Going to)
6. **Work & Professions** (Gerunds & Infinitives)
7. **Education & Learning** (Modals of obligation/permission)
8. **Health & Physical Care** (Modals for advice & possibility)
9. **Food & Restaurants** (Countable/Uncountable, Quantifiers)
10. **Shopping & Services** (Comparatives & Superlatives)
11. **Entertainment & Hobbies** (Defining Relative Clauses)
12. **Nature & The Environment** (Passive Voice: Present/Past)
13. **Technology & Communication** (Zero & First Conditionals)
14. **People & Personality** (Used to / Would)
15. **Places & Housing** (Prepositions of place/movement)
16. **Media & News** (Reported Speech: Statements)
17. **Sports & Competition** (Present Perfect Continuous)
18. **Art & Literature** (Past Perfect Simple)
19. **Culture & Customs** (Articles & Quantifiers)
20. **Society & Rules** (Modals of deduction)
21. **The Modern World** (Second Conditional)
22. **Crime & Justice** (Passive Voice: All tenses)
23. **Science & Discovery** (Reported Speech: Questions)
24. **Feelings & Emotions** (Question tags)
25. **Fashion & Style** (Relative Clauses: Non-defining)
26. **Natural Disasters** (Third Conditional)
27. **Success & Achievement** (Future Continuous & Perfect)
28. **Music & Festivals** (Conditionals: Mixed)
29. **Global Challenges** (Causative: Have/Get something done)
30. **Review & Final Assessment** (Comprehensive review)

## 5. Technical Approach for All-Word Translation
- **Option A**: Expand `GLOBAL_LEXICON` to cover all words in the new exercises.
- **Option B**: Implement a syntax like `[[word|translation]]` in the exercise content that the `TranslatedText` component can parse directly.
- **Option C**: Use an LLM-based preprocessing step to generate a per-exercise dictionary.

*Recommendation*: Start with **Option A** (expanding lexicon) for common words and use **Option B** for context-specific or less common words to ensure 100% coverage without bloating the global lexicon unnecessarily.

## 6. Implementation Strategy
- Phase 1: Finalize syllabus and exercise types.
- Phase 2: Implement Unit 1 (50 exercises) as a template.
- Phase 3: Iteratively implement Units 2-30.
- Phase 4: Final verification and testing.
