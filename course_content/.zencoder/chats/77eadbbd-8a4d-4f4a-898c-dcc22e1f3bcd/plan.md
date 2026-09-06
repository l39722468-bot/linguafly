# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/77eadbbd-8a4d-4f4a-898c-dcc22e1f3bcd/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/77eadbbd-8a4d-4f4a-898c-dcc22e1f3bcd/requirements.md`.

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/77eadbbd-8a4d-4f4a-898c-dcc22e1f3bcd/spec.md`.

### [x] Step: Implementation

1. **Delete legacy routes**: Remove `src/app/curso` and `src/app/dashboard/general`.
2. **Expand Unit 1 (A1)**:
    - Update `src/lib/course/a1/unit-1.ts` to include 60 exercises.
    - Add Reading Comprehension exercises (simple A1 texts).
    - Maintain "Hello! Introductions" theme with expanded vocabulary (countries, professions, feelings).
3. **Verify Implementation**:
    - Check `/debug/a1-preview/unit-1` in the browser.
    - Ensure all links in `/debug` are functional.

### [x] Step: Test Plan Approval
- **Framework**: Playwright.
- **Scope**: Verify that `/debug/a1-preview/unit-1` contains 60 exercises and that legacy routes are gone (404).
- **Primary Flows**: Navigation between exercises, completion of reading exercises.

### [x] Step: Running Tests
- Ran `npm run test:e2e e2e/unit-1-expansion.spec.ts`.
- Results: All 3 tests passed in chromium.

### [x] Step: Expand Unit 2 (A1)
1. **Analyze Unit 2**: Current content has 11 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Nice to meet you!" (Introductions, People, Relations).
    - Add Vocabulary: Family, more relations (neighbor, boss), common adjectives.
    - Add Grammar: Possessive adjectives (his, her, our, their), Plurals.
    - Add Reading Comprehension blocks.
3. **Verify Implementation**:
    - Check `/debug/a1-preview/unit-2` in the browser.
4. **Test Plan Approval**:
    - Verify that `/debug/a1-preview/unit-2` contains 60 exercises.
    - Ran `npm run test:e2e e2e/unit-2-expansion.spec.ts`.
    - Results: All 3 tests passed in chromium.

### [x] Step: Expand Unit 3 (A1)
1. **Analyze Unit 3**: Current content has 11 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Numbers and Quantities" (Numbers 1-100, age, phone numbers, quantities).
    - Add Vocabulary: Numbers 21-100, common objects (plural), phone vocabulary.
    - Add Grammar: Have/Has, Plural nouns (regular/irregular review), Questions with "How many".
    - Add Reading Comprehension blocks.
3. **Verify Implementation**:
    - Check `/debug/a1-preview/unit-3` in the browser.
4. **Test Plan Approval**:
    - Verify that `/debug/a1-preview/unit-3` contains 60 exercises.
    - Ran `npm run test:e2e e2e/unit-3-expansion.spec.ts`.
    - Results: All 3 tests passed in chromium.

### [x] Step: Expand Unit 4 (A1) - Redo with new focus
1. **Analyze Unit 4**: Redo with higher academic complexity.
2. **Expand to 60 exercises**:
    - Theme: "Daily Life & Routines" (Daily activities, time, days of the week).
    - Add Vocabulary: Verbs (get up, work, eat, sleep, go), Time expressions, Days.
    - Add Grammar: Present Simple (I/You/We/They), Adverbs of frequency (always, usually, never).
    - Add Reading Comprehension: Detailed daily routine of a professional or student.
3. **Verify Implementation**:
    - Check `/debug/a1-preview/unit-4` in the browser.
4. **Test Plan Approval**:
    - Verify that `/debug/a1-preview/unit-4` contains 60 exercises with the new theme.
    - Ran `npm run test:e2e:chromium e2e/unit-4-expansion.spec.ts`.
    - Results: All 3 tests passed in chromium.
    - **Refinement**: Replaced "eat" with "have" for meals (breakfast, lunch, dinner) to be more idiomatic.
    - **Fix**: Updated Exercise 8 to have better options and Exercise 4 to use "have".
    - **Fix**: Ensured Unit 1 reading exercises are gap-free in the questions.

### [x] Step: Expand Unit 5 (A1)
1. **Analyze Unit 5**: Current content was "Countries & Nationalities", redone to "My Home and Furniture" as per plan.
2. **Expand to 60 exercises**:
    - Theme: "My Home and Furniture" (Rooms in the house, furniture, describing a home).
    - Add Vocabulary: Rooms (kitchen, living room, bedroom), Furniture (sofa, table, bed), Adjectives for home (comfortable, small, modern).
    - Add Grammar: There is / There are, Prepositions of place (in, on, under, next to, between).
    - Add Reading Comprehension: Description of a dream house or a famous apartment.
3. **Verify Implementation**:
    - Check `/debug/a1-preview/unit-5` in the browser.
4. **Test Plan Approval**:
    - Verify that `/debug/a1-preview/unit-5` contains 60 exercises.
    - Ran `npm run test:e2e:chromium e2e/unit-5-expansion.spec.ts`.
    - Results: All tests passed.

### [x] Step: Expand Unit 6 (A1)
1. **Analyze Unit 6**: Current content has 11 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Food and Drink" (Common foods, drinks, ordering in a cafe).
    - Add Vocabulary: Fruits, vegetables, dairy, meat, common drinks, cafe menu items.
    - Add Grammar: Countable vs Uncountable nouns, Some / Any, "I would like...".
    - Add Reading Comprehension: Detailed descriptions of meals and cafe visits.
3. **Verify Implementation**:
    - Check `/debug/a1-preview/unit-6` in the browser.
4. **Test Plan Approval**:
    - Verify that `/debug/a1-preview/unit-6` contains 60 exercises.
    - Ran `npm run test:e2e:chromium e2e/unit-6-expansion.spec.ts`.
    - Results: All tests passed.

### [x] Step: Expand Unit 7 (A1)
1. **Analyze Unit 7**: Current content has 11 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Leisure and Hobbies" (Sports, free time activities, abilities).
    - Add Vocabulary: Common hobbies (reading, swimming, music), Sports.
    - Add Grammar: Can / Can't for ability, Like / Love / Hate + -ing.
    - Add Reading Comprehension: Interview with a person about their hobbies.
3. **Verify Implementation**:
    - Check `/debug/a1-preview/unit-7` in the browser.
4. **Test Plan Approval**:
    - Verify that `/debug/a1-preview/unit-7` contains 60 exercises.
    - Ran `npm run test:e2e:chromium e2e/unit-7-expansion.spec.ts`.
    - Results: All tests passed.

### [x] Step: Expand Unit 8 (A1)
1. **Analyze Unit 8**: Current content has 10 exercises focused on "Numbers 20-100".
2. **Expand to 60 exercises**:
    - Theme: "Shopping and Prices" (Money, buying clothes, asking for prices).
    - Add Vocabulary: Clothing items (shirt, pants, dress, shoes), shopping verbs (buy, sell, pay), money (dollar, euro, cash, card).
    - Add Grammar: Demonstratives (this, that, these, those), "How much is it?".
    - Add Reading Comprehension: A dialogue in a clothing store or a text about a shopping trip.
3. **Verify Implementation**:
    - Checked `/debug/a1-preview/unit-8` in the browser.
4. **Test Plan Approval**:
    - Verified that `/debug/a1-preview/unit-8` contains 60 exercises.
    - Ran `npm run test:e2e:chromium e2e/unit-8-expansion.spec.ts`.
    - Results: All tests passed.

### [x] Step: Expand Unit 10 (A1)
1. **Analyze Unit 10**: Current content has 10 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Module 1 Review" (Reviewing units 1-9).
    - Content: Mixed practice of all grammar and vocabulary covered so far.
    - Reading Comprehension: Longer texts integrating all concepts.
3. **Verify Implementation**:
    - Checked `/debug/a1-preview/unit-10` in the browser.
4. **Test Plan Approval**:
    - Verified that `/debug/a1-preview/unit-10` contains 60 exercises.
    - Ran `npm run test:e2e:chromium e2e/unit-10-expansion.spec.ts`.
    - Results: All tests passed.

### [x] Step: Expand Unit 11 (A1)
1. **Analyze Unit 11**: Current content has 11 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Telling the Time" (Clock times, parts of the day, daily routine timing).
    - Add Vocabulary: Time measures (minute, hour, second), parts of the day (morning, afternoon, evening, night).
    - Add Grammar: Prepositions of time (at, in, on), Frequency adverbs (always, sometimes, never).
    - Add Reading Comprehension: Detailed daily routine schedules.
3. **Verify Implementation**:
    - Checked `/debug/a1-preview/unit-11` in the browser.
4. **Test Plan Approval**:
    - Verified that `/debug/a1-preview/unit-11` contains 60 exercises.
    - Ran `npm run test:e2e:chromium e2e/unit-11-expansion.spec.ts`.
    - Results: All tests passed.

### [x] Step: Expand Unit 12 (A1)
1. **Analyze Unit 12**: Current content focused on Days of the Week.
2. **Expand to 60 exercises**:
    - Theme: "My City and Places" (City locations, directions, describing a city).
    - Add Vocabulary: Places (bank, park, library, museum, shop), direction words (left, right, straight).
    - Add Grammar: Imperatives for directions, Prepositions of place (next to, across from, behind).
    - Add Reading Comprehension: Description of a city tour or a neighborhood.
3. **Verify Implementation**:
    - Checked `/debug/a1-preview/unit-12` in the browser.
4. **Test Plan Approval**:
    - Verified that `/debug/a1-preview/unit-12` contains 60 exercises.
    - Ran `npx playwright test e2e/unit-12-expansion.spec.ts --project=chromium`.
    - Results: All tests passed.

### [x] Step: Expand Unit 13 (A1)
1. **Analyze Unit 13**: Current content focused on Daily Routine.
2. **Expand to 60 exercises**:
    - Theme: "Clothes and Fashion" (Types of clothes, colors, describing what someone is wearing).
    - Add Vocabulary: Clothes (shirt, dress, pants, jacket), colors (red, blue, green), patterns.
    - Add Grammar: Present Continuous (for wearing), possessive 's (review).
    - Add Reading Comprehension: Descriptions of people's outfits for different occasions.
3. **Verify Implementation**:
    - Checked `/debug/a1-preview/unit-13` in the browser.
4. **Test Plan Approval**:
    - Verified that `/debug/a1-preview/unit-13` contains 60 exercises.
    - Ran `npx playwright test e2e/unit-13-expansion.spec.ts --project=chromium`.
    - Results: All tests passed.

### [x] Step: Expand Unit 14 (A1)
1. **Analyze Unit 14**: Current content.
2. **Expand to 60 exercises**:
    - Theme: "My Hobbies and Free Time" (Interests, sports, frequency).
    - Add Vocabulary: Hobbies (reading, traveling, cooking), sports (basketball, swimming, tennis).
    - Add Grammar: Like/Love/Hate + -ing, Adverbs of frequency (review and expansion).
    - Add Reading Comprehension: Interview about a person's weekend activities and hobbies.
3. **Verify Implementation**:
    - Checked `/debug/a1-preview/unit-14` in the browser.
4. **Test Plan Approval**:
    - Verified that `/debug/a1-preview/unit-14` contains 60 exercises.

### [x] Step: Expand Unit 15 (A1)
1. **Analyze Unit 15**: Current content has 11 exercises on "Present Simple: He, She, It".
2. **Expand to 60 exercises**:
    - Theme: "People and their Routines (3rd Person)" (Jobs, daily habits of others, descriptions).
    - Add Vocabulary: Jobs (chef, engineer, nurse), 3rd person verbs (works, studies, teaches), lifestyle verbs.
    - Add Grammar: Present Simple (He/She/It - spelling rules for -s/-es/-ies), Negatives (Doesn't), Questions (Does).
    - Add Reading Comprehension: Biographies or descriptions of someone's day.
3. **Verify Implementation**:
    - Checked `/debug/a1-preview/unit-15` in the browser.
4. **Test Plan Approval**:
    - Verified that `/debug/a1-preview/unit-15` contains 60 exercises.
    - Ran `npx playwright test e2e/unit-15-expansion.spec.ts --project=chromium`.
    - Results: All tests passed.

### [x] Step: Expand Unit 16 (A1)
1. **Analyze Unit 16**: Expanded to 60 exercises.
2. **Expand to 60 exercises**:
    - Theme: "At the Cafe & Ordering" (Ordering drinks/snacks, cafe environment, social interaction).
    - Add Vocabulary: Coffee types (latte, cappuccino), snacks (croissant, muffin), cafe items (mug, napkin, receipt).
    - Add Grammar: Polite requests ("Can I have...?", "I'd like..."), Questions about prices, "Is there/Are there" for availability.
    - Add Reading Comprehension: Dialogues between a customer and a barista, cafe reviews.
3. **Verify Implementation**:
    - Checked `/debug/a1-preview/unit-16` in the browser.
4. **Test Plan Approval**:
    - Verified that `/debug/a1-preview/unit-16` contains 60 exercises.

### [x] Step: Expand Unit 17 (A1)
1. **Analyze Unit 17**: Expanded to 60 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Transport and Travel" (Types of transport, buying tickets, travel verbs).
    - Add Vocabulary: Transport (bus, train, plane, taxi, bicycle), stations (airport, bus stop, platform), verbs (travel, arrive, leave, take).
    - Add Grammar: Present Simple for schedules, Prepositions of movement (to, from), "How do you get to...?".
    - Add Reading Comprehension: Short travel stories or a travel itinerary description.
3. **Verify Implementation**:
    - Checked `/debug/a1-preview/unit-17` in the browser.
4. **Test Plan Approval**:
    - Verified that `/debug/a1-preview/unit-17` contains 60 exercises.
    - Ran `npx playwright test e2e/unit-17-expansion.spec.ts --project=chromium`.
    - Results: All tests passed.

### [x] Step: Expand Unit 18 (A1)
1. **Analyze Unit 18**: Expanded to 60 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Likes & Dislikes" (Interests, hobbies, expressing preferences).
    - Add Vocabulary: Love, like, enjoy, don't like, hate, prefer, favorite, hobby words (reading, swimming, gaming).
    - Add Grammar: Like/Love/Hate + -ing, questions with "What" and "Do you".
    - Add Reading Comprehension: Descriptions of people's favorite things and activities.
3. **Verify Implementation**:
    - Checked `/debug/a1-preview/unit-18` in the browser.
4. **Test Plan Approval**:
    - Verified that `/debug/a1-preview/unit-18` contains 60 exercises.
    - Ran `npx playwright test e2e/unit-18-expansion.spec.ts --project=chromium`.
    - Results: All tests passed.

### [x] Step: Expand Unit 19 (A1)
1. **Analyze Unit 19**: Expanded to 60 exercises.
2. **Expand to 60 exercises**:
    - Theme: "The World of Work" (Jobs, workplaces, daily tasks).
    - Add Vocabulary: Job titles (doctor, engineer, waiter), workplaces (hospital, office, restaurant), work activities (meetings, emails, phone calls).
    - Add Grammar: Present Simple for work routines, "What do you do?", "Where do you work?".
    - Add Reading Comprehension: Profiles of different professionals and their work days.
3. **Verify Implementation**:
    - Checked `/debug/a1-preview/unit-19` in the browser.
    - **Fix**: Resolved critical rendering bug in `TranslatedText.tsx` where reading texts were blank due to global regex `lastIndex` conflicts.
    - **Pedagogical Fix**: Standardized exercise instruction rendering using Markdown for consistent formatting and tooltip support.
4. **Test Plan Approval**:
    - Verified that `/debug/a1-preview/unit-19` contains 60 exercises.

### [x] Step: Expand Unit 21 (A1)
1. **Analyze Unit 21**: Expanded to 60 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Rooms in a House" (My Home & Furniture).
    - Add Vocabulary: Furniture (sofa, table, bed, chair, desk), Appliances (fridge, oven, microwave, TV).
    - Add Grammar: There is / There are (Review), Prepositions of Place (in, on, under, next to, behind).
    - Add Reading Comprehension: Descriptions of a house or an apartment.
3. **Verify Implementation**:
    - Checked `/debug/a1-preview/unit-21` in the browser.
4. **Test Plan Approval**:
    - Verified that `/debug/a1-preview/unit-21` contains 60 exercises.

### [x] Step: Expand Unit 22 (A1)
1. **Analyze Unit 22**: Expand to 60 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Objects in a House" (Common household items, electronics, kitchenware).
    - Add Vocabulary: Clock, mirror, pillow, blanket, plate, spoon, fork, knife, glass, computer, telephone.
    - Add Grammar: Demonstratives (this, that, these, those) Review, Possessive 's Review.
    - Add Reading Comprehension: A text about "My favorite object at home".
3. **Verify Implementation**:
    - Checked `/debug/a1-preview/unit-22` in the browser.
4. **Test Plan Approval**:
    - Verified that `/debug/a1-preview/unit-22` contains 60 exercises.

### [x] Step: Expand Unit 23 (A1)
1. **Analyze Unit 23**: Expanded to 60 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Family Members" (Extended family, family tree, relationships).
    - Add Vocabulary: Mother, father, brother, sister, grandfather, grandmother, aunt, uncle, cousin, nephew, niece.
    - Add Grammar: Possessive adjectives (my, your, his, her, its, our, their) Review, Genitive 's.
    - Add Reading Comprehension: A text describing a family tree or a family gathering.
3. **Verify Implementation**:
    - Checked `/debug/a1-preview/unit-23` in the browser.
4. **Test Plan Approval**:
    - Verify that `/debug/a1-preview/unit-23` contains 60 exercises.
    - Ran `npx playwright test e2e/unit-23-expansion.spec.ts --project=chromium`.
    - Results: All tests passed.

### [x] Step: Expand Unit 24 (A1)
1. **Analyze Unit 24**: Expanded to 60 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Describing People (Appearance)" (Physical attributes, hair, eyes, height, age).
    - Add Vocabulary: Tall, short, slim, fat, young, old, hair colors/styles (blond, dark, curly, straight), eye colors.
    - Add Grammar: Have/Has got for physical descriptions, Verbs "to be" vs "to have" for descriptions.
    - Add Reading Comprehension: Descriptions of friends or family members.
3. **Verify Implementation**:
    - Checked `/debug/a1-preview/unit-24` in the browser.

### [x] Step: Expand Unit 25 (A1)
1. **Analyze Unit 25**: Expand to 60 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Describing People (Personality)" (Adjectives to describe character, feelings).
    - Add Vocabulary: Kind, funny, serious, intelligent, shy, friendly, happy, sad, angry, tired, bored.
    - Add Grammar: Question "What is he/she like?" vs "What does he/she look like?".
    - Add Reading Comprehension: Profiles of different people describing their personality.
3. **Verify Implementation**:
    - Check `/debug/a1-preview/unit-25` in the browser.

### [x] Step: Unit 16 and Unit 6 Fixes
1. **Fix "azúcar" bug**: Shielded "azúcar" in `unit-16.ts` and `unit-6.ts` using `[[azúcar|azúcar]]` to prevent "car" parsing.
2. **Improve Pedido Complejo**: Added Spanish prompt to instructions in Unit 16 Exercise 57.

### [ ] Step: Expand Unit 26 (A1)
1. **Analyze Unit 26**: Expand to 60 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Abilities (Can/Can't)" (Talking about skills and what you can do).
    - Add Vocabulary: Action verbs (sing, dance, swim, play an instrument, speak a language, drive).
    - Add Grammar: Can / Can't (Ability/Possibility), Questions and Short Answers with Can.
    - Add Reading Comprehension: A talent show description or a job application mentioning skills.
3. **Verify Implementation**:
    - Check `/debug/a1-preview/unit-26` in the browser.

### [ ] Step: Expand Unit 27 (A1)
1. **Analyze Unit 27**: Expand to 60 exercises.
2. **Expand to 60 exercises**:
    - Theme: "My Town (Places and Directions)" (Buildings, asking for and giving directions).
    - Add Vocabulary: Post office, pharmacy, supermarket, cinema, hospital, police station, square, bridge.
    - Add Grammar: Prepositions of place (Review), Giving directions (Go straight, turn left/right).
    - Add Reading Comprehension: A map description or a tourist guide for a small town.
3. **Verify Implementation**:
    - Check `/debug/a1-preview/unit-27` in the browser.

### [ ] Step: Expand Unit 28 (A1)
1. **Analyze Unit 28**: Expand to 60 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Weather and Seasons" (Describing the weather, climate, the four seasons).
    - Add Vocabulary: Sunny, rainy, cloudy, snowy, windy, hot, cold, warm, spring, summer, autumn, winter.
    - Add Grammar: "What's the weather like?", Use of "It" for weather (It is sunny).
    - Add Reading Comprehension: A weather report or a description of favorite seasons.
3. **Verify Implementation**:
    - Check `/debug/a1-preview/unit-28` in the browser.

### [ ] Step: Expand Unit 29 (A1)
1. **Analyze Unit 29**: Expand to 60 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Months and Dates" (Calendar, ordinal numbers, birthdays).
    - Add Vocabulary: Months of the year, Ordinal numbers (1st to 31st), Special days (birthday, holiday).
    - Add Grammar: Prepositions of time (in + month, on + date), Questions with "When".
    - Add Reading Comprehension: A calendar of events or a birthday party invitation.
3. **Verify Implementation**:
    - Check `/debug/a1-preview/unit-29` in the browser.

### [ ] Step: Expand Unit 30 (A1)
1. **Analyze Unit 30**: Expand to 60 exercises.
2. **Expand to 60 exercises**:
    - Theme: "Module 3 Review" (Reviewing units 21-29).
    - Content: Mixed practice of all grammar and vocabulary from Module 3.
    - Reading Comprehension: Longer texts integrating House, Family, Descriptions, Abilities, Town, and Dates.
3. **Verify Implementation**:
    - Check `/debug/a1-preview/unit-30` in the browser.
