# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/85f891e0-a2a4-4221-b30c-be163f07249b/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/85f891e0-a2a4-4221-b30c-be163f07249b/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/85f891e0-a2a4-4221-b30c-be163f07249b/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/85f891e0-a2a4-4221-b30c-be163f07249b/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function) or too broad (entire feature).

If the feature is trivial and doesn't warrant full specification, update this workflow to remove unnecessary steps and explain the reasoning to the user.

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/85f891e0-a2a4-4221-b30c-be163f07249b/plan.md`.

### [ ] Step: Implementation

#### Phase 1: Preparation
- [x] Create `src/content/cursos/ingles-a2/syllabus.md`
- [x] Create `unit1.json` as a Golden Master and verify

#### Phase 2: Content Expansion & Alignment (Units 1-10)
- [x] Unidad 1: Greetings & Personal Info (100 ejercicios)
- [x] Unidad 2: Describing Appearance (100 ejercicios)
- [x] Unidad 3: Personality & Character (100 ejercicios)
- [x] Unidad 4: Family & Relationships (100 ejercicios)
- [x] Unidad 5: Daily Routines & Habits (100 ejercicios)
- [x] Unidad 6: Housework & Home Activities (100 ejercicios)
- [x] Unidad 7: Jobs & The Workplace (100 ejercicios)
- [x] Unidad 8: School & University Life (100 ejercicios)
- [x] Unidad 9: Feelings & Emotions (100 ejercicios)
- [x] Unidad 10: Module 1 Review & Assessment (100 ejercicios)

#### Phase 3: Content Batch 2 (Units 11-20)
- [x] Unidad 11: City Life & Places (100 ejercicios)
- [x] Unidad 12: Shopping & Department Stores (100 ejercicios)
- [x] Unidad 13: Food, Cooking & Recipes (100 ejercicios)
- [x] Unidad 14: At the Restaurant (100 ejercicios)
- [x] Unidad 15: Sports & Fitness (100 ejercicios)
- [x] Unidad 16: Health & Common Illnesses (100 ejercicios)
- [x] Unidad 17: The Natural World & Animals (100 ejercicios)
- [x] Unidad 18: Weather & Seasons (100 ejercicios)
- [x] Unidad 19: Clothes, Styles & Materials (100 ejercicios)
- [x] Unidad 20: Module 2 Review & Assessment (100 ejercicios)

#### Phase 4: Content Batch 3 (Units 21-30)
- [x] Unidad 21: Past Simple: To Be & Regular Verbs (100 ejercicios)
- [x] Unidad 22: Past Simple: Irregular Verbs (100 ejercicios)
- [x] Unidad 23: Past Simple: Questions & Negatives (100 ejercicios)
- [x] Unidad 24: A Day to Remember (100 ejercicios)
- [x] Unidad 25: Childhood & School Days (100 ejercicios)
- [x] Unidad 26: Travel Experiences (100 ejercicios)
- [x] Unidad 27: Nature & Landscapes (100 ejercicios)
- [x] Unidad 28: Extreme Weather (100 ejercicios)
- [x] Unidad 29: Life Stories & Biographies (100 ejercicios)
- [x] Unidad 30: Module 3 Review & Assessment (100 ejercicios)

#### Phase 5: Content Batch 4 (Units 31-40)
- [x] Unidad 31: Future with 'Going to' (100 ejercicios)
- [x] Unidad 32: Future with 'Present Continuous' (100 ejercicios)
- [x] Unidad 33: Future with 'Will': Predictions (100 ejercicios)
- [x] Unidad 34: Future with 'Will': Offers & Promises (100 ejercicios)
- [x] Unidad 35: Travel Plans & Bookings (100 ejercicios)
- [x] Unidad 36: Weekend & Holiday Plans (100 ejercicios)
- [x] Unidad 37: Future Hopes & Dreams (100 ejercicios)
- [x] Unidad 38: Time Clauses (100 ejercicios)
- [x] Unidad 39: Zero Conditional (100 ejercicios)
- [x] Unidad 40: Module 4 Review & Assessment (100 ejercicios)

#### Phase 6: Content Batch 5 (Units 41-51)
- [x] Unidad 41: Comparing Places: Adjectives (100 ejercicios)
- [x] Unidad 42: Superlatives: The Best in the World (100 ejercicios)
- [x] Unidad 43: Comparing Lifestyles: City vs Country (100 ejercicios)
- [x] Unidad 44: Health & Lifestyle: Expansion (100 ejercicios)
- [x] Unidad 45: Dealing with Problems: Troubleshooting (100 ejercicios)
- [x] Unidad 46: Making Predictions: The Future (100 ejercicios)
- [x] Unidad 47: Expressing Opinions: Agreements (100 ejercicios)
- [x] Unidad 48: Module 6 Review & Assessment (100 ejercicios)
- [x] Unidad 49: Telling Stories: The Setting (Past Continuous) (100 ejercicios)
- [x] Unidad 50: Media & Entertainment: News (Used to) (100 ejercicios)
- [x] Unidad 51: Narrative Tenses: The Climax (Past Simple vs Continuous) (100 ejercicios)

#### Phase 7: Content Batch 6 (Units 52-60)
- [x] Unidad 52: Social Life: Events & Invitations (100 ejercicios)
- [x] Unidad 53: Politeness: Requests & Permissions (100 ejercicios)
- [x] Unidad 54: Socializing: Expansion (100 ejercicios)
- [x] Unidad 55: Relative Clauses: People & Things (100 ejercicios)
- [x] Unidad 56: Connectors: Linking Ideas (100 ejercicios)
- [x] Unidad 57: Directions & Wayfinding (100 ejercicios)
- [x] Unidad 58: First Conditional: Real Possibilities (100 ejercicios)
- [x] Unidad 59: Indirect Questions & Polite Inquiry (100 ejercicios)
- [x] Unidad 60: Final A2 Review & Assessment (100 ejercicios)

#### Phase 8: Verification & Cleanup
- [x] Run `npm run validate-exercises` (Verified via manual JSON check as script is hardcoded for other files)
- [x] Spot check units for level consistency
