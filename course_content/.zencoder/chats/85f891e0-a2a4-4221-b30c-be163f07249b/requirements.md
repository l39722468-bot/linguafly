# PRD: Focus English A2 Course Rebuild

## 1. Overview
Rebuild the English A2 course to ensure it meets real CEFR A2 standards and follows the same exercise typology and structure as the A1 course.

## 2. Goals
- **Real A2 Level**: Align all content with CEFR A2 (Cambridge KET equivalent).
- **Consistent Typology**: Use the same interaction types and unit structure as the A1 course.
- **Scale**: Expand from the current 30 low-quality units to 60 high-quality units.
- **User Experience**: Provide a progressive learning path from basic A2 to solid intermediate-preparatory level.

## 3. Target Audience
Spanish-speaking students who have completed A1 and want to progress to A2 level.

## 4. Functional Requirements

### 4.1. Course Structure
- **Total Units**: 60 units.
- **Modules**: 6 modules of 10 units each.
- **Unit Content**: Each unit should contain approximately 80-100 exercises.
- **Unit Organization**: Each unit should be divided into logical blocks (Vocabulary, Grammar, Communication/Social).

### 4.2. Exercise Typology (Consistent with A1)
- `multiple_choice`: Vocabulary and grammar selection.
- `matching`: Word-translation pairs, sentence parts.
- `flashcard`: Review of vocabulary with pronunciation.
- `true_false`: Grammar correctness or reading comprehension.
- `fill_blanks`: Grammar practice (cloze tests).
- `reorder_words`: Sentence structure and syntax.

### 4.3. Pedagogical Content
- **Grammar**: Present simple/continuous, Past simple/continuous, Present perfect, Future (will/going to), Modals (can, must, should, etc.), Comparatives/Superlatives, Conditionals (Zero/First), etc.
- **Vocabulary**: Daily life, Work, Health, Travel, Home, Nature, Feelings, etc.
- **Skills**: Focus on vocabulary acquisition, grammar accuracy, and basic communicative functions.

## 5. Technical Requirements
- **Data Format**: JSON files located in `src/content/cursos/ingles-a2/`.
- **Naming Convention**: `unit1.json`, `unit2.json`, ..., `unit60.json`.
- **Schema**: Must strictly follow the existing schema used in A1 units.
- **Audio**: Audio files for flashcards and stimuli should be referenced (generation to be handled by existing pipelines).

## 6. Syllabus (Preliminary)

### Module 1: People & Daily Life
1. Greetings & Personal Info (A2)
2. Describing Appearance
3. Personality & Character
4. Family & Relationships
5. Daily Routines & Habits
6. Housework & Home Activities
7. Jobs & The Workplace
8. School & University Life
9. Feelings & Emotions
10. Module 1 Review

### Module 2: The World Around Us
11. City Life & Places
12. Shopping & Department Stores
13. Food, Cooking & Recipes
14. At the Restaurant
15. Sports & Fitness
16. Health & Common Illnesses
17. The Natural World & Animals
18. Weather & Seasons
19. Clothes, Styles & Materials
20. Module 2 Review

### Module 3: Past & Memories
21. Past Simple: To Be & Regulars
22. Past Simple: Irregulars
23. Past Simple: Questions & Negatives
24. A Day to Remember (Past Narrative)
25. Childhood & School Days
26. Past Continuous: Setting the Scene
27. Past Simple vs Past Continuous
28. Important Dates & Years
29. Famous People & Biographies
30. Module 3 Review

### Module 4: Future & Plans
31. Future with 'Going to': Intentions
32. Future with 'Present Continuous': Arrangements
33. Future with 'Will': Predictions
34. Future with 'Will': Offers & Promises
35. Travel Plans & Bookings
36. Weekend & Holiday Plans
37. Future Hopes & Dreams
38. Time Clauses: When, As soon as
39. Zero Conditional: General Truths
40. Module 4 Review

### Module 5: Experiences & Comparisons
41. Present Perfect: Life Experiences
42. Present Perfect: Ever & Never
43. Present Perfect: Just, Already, Yet
44. Present Perfect: For & Since
45. Present Perfect vs Past Simple
46. Comparing Places: Adjectives
47. Superlatives: The best in the world
48. Comparing Lifestyles
49. Transport & Travel Experiences
50. Module 5 Review

### Module 6: Rules, Advice & Interactions
51. Modals: Have to & Must (Obligation)
52. Modals: Mustn't & Don't have to
53. Modals: Should & Shouldn't (Advice)
54. Modals: Could & May (Permission/Possibility)
55. Relative Clauses: Who, Which, That
56. Connectors: Although, So, Because
57. Directions & Map Reading
58. Social English: Apologizing & Requesting
59. First Conditional: Real Possibilities
60. Final A2 Review & Assessment
