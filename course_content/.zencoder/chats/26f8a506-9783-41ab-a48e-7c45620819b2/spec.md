# Technical Specification: B1 English Course Improvement

## Technical Context
- **Language**: Python (for generation script), TypeScript (Frontend)
- **Data Format**: JSON
- **Location**: `src/content/cursos/ingles-b1/unit{1-30}.json`

## Implementation Approach
1. **Curriculum Design**: Define a 30-unit curriculum mapping each unit to B1 grammar and vocabulary topics.
2. **Data Expansion**: Expand `PEDAGOGICAL_DATA` in a generation script to include specific data for ALL 30 units.
3. **Content Generation**: Update the script to generate high-quality exercises based on the expanded data.
4. **Validation**: Ensure generated JSONs match the schema required by the frontend.

## Proposed Curriculum (30 Units)

1.  **Lifestyles & Routines**: Present Simple vs Continuous, State verbs. Lifestyles, routines.
2.  **The World of Work**: Modals of obligation (must, have to). Jobs, workplace.
3.  **Technology & Innovation**: Present Perfect Simple. Technology, gadgets.
4.  **Travel & Exploration**: Past Simple vs Continuous. Travel, transport.
5.  **Environmental Awareness**: Zero and First Conditional. Nature, environment.
6.  **Media & Entertainment**: Passive Voice (Present). Media, news.
7.  **Health & Wellbeing**: Modals of advice (should, ought to). Health, fitness.
8.  **Education & Learning**: Present Perfect vs Past Simple. School, university.
9.  **Society & Culture**: Comparatives and Superlatives. Customs, traditions.
10. **The Natural World**: Articles (a/an, the, zero). Animals, habitats.
11. **Shopping & Consumerism**: Quantifiers (too much, enough). Shopping, money.
12. **Food & Nutrition**: Countable/Uncountable nouns. Cooking, diet.
13. **History & Heritage**: Used to / Would. Historical events, heritage.
14. **Sports & Fitness**: Past Perfect Simple. Sports, competition.
15. **Art & Creativity**: Relative Clauses (defining). Art, literature.
16. **Science & Discovery**: Future with Will vs Going to. Space, inventions.
17. **Modern Communications**: Reported Speech (statements). Social media, communication.
18. **Relationships & Family**: Phrasal Verbs (social). Family, friends.
19. **Global Issues**: Second Conditional. Politics, global problems.
20. **Personal Finance**: Gerunds and Infinitives. Banking, saving.
21. **Crime & Justice**: Passive Voice (Past). Law, crime.
22. **Inventions & Creators**: Past Simple vs Past Perfect. Famous people, inventions.
23. **Music & Performance**: Adverbs of manner and degree. Music, theater.
24. **Future Trends**: Future Continuous. Trends, predictions.
25. **Leisure & Hobbies**: Preferences (prefer, would rather). Hobbies, free time.
26. **The Animal Kingdom**: Modals of possibility (may, might, could). Animals.
27. **Geography & Landmarks**: Prepositions of place and movement. Geography.
28. **Fashion & Design**: Order of adjectives. Clothes, fashion.
29. **Work-Life Balance**: Wish / If only. Work, stress.
30. **Success & Achievement**: Review of B1 levels. Goals, achievements.

## Delivery Phases

### Phase 1: Data Preparation
- Complete the `PEDAGOGICAL_DATA` dictionary for all 30 units with at least 5-10 grammar examples and 5-10 vocabulary pairs per unit.

### Phase 2: Generation Script Update
- Modify `scripts/expand-b1-course.py` to use the full dataset.
- Adjust `EXERCISES_PER_UNIT` to a more realistic number (e.g., 30-40) to maintain quality and avoid extreme repetition, or keep 200 but ensure they are better distributed.

### Phase 3: Execution and Verification
- Run the script.
- Verify JSON files.
- Manual check of a few units in the UI.
