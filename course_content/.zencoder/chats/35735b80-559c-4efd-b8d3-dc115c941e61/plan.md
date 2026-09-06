# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/35735b80-559c-4efd-b8d3-dc115c941e61/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/35735b80-559c-4efd-b8d3-dc115c941e61/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/35735b80-559c-4efd-b8d3-dc115c941e61/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

1. [x] **Lexicon Update**: Add missing Unit 1 vocabulary to `A1_LEXICON` in `src/lib/course/engine/lexicon.ts`.
2. [x] **Grammar Questions Review**: Update `src/lib/a1-m1-l1-detailed.ts` questions and options with `[[en|es]]` where lexicon falls short.
3. [x] **Reading Transcripts Review**: Update transcripts in `src/lib/a1-m1-l1-detailed.ts` to ensure all words are translated.
4. [x] **Phrase-Level Lexicon**: Add common phrases and punctuation-inclusive words to the lexicon to improve coverage in complex sentences.
5. [x] **Verification**: Run `npm run lint` and verify visually at `http://localhost:3000/debug/a1-preview/unit-1`.

### [x] Step: Implementation

Task completed. I have significantly expanded the lexicon to include phrases, greetings with punctuation, and common sentence fragments used in Unit 1. This ensures that almost every combination of words will show a translation tooltip.
