# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7c1c54c2-2f57-45ea-831c-84dc90171a55/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7c1c54c2-2f57-45ea-831c-84dc90171a55/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7c1c54c2-2f57-45ea-831c-84dc90171a55/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

### [x] Step: Implementation

1. [x] **Update Keyword Categorization**: Add the ~400 new keywords to `seo-keyword-categorization.json` under the `reported_speech` category.
2. [x] **Create Seeding Script**: Develop `scripts/seed-reported-speech-cluster.mjs` to automate the creation of the 6 Markdown files with proper SEO frontmatter.
3. [x] **Generate Content**: Execute the seeding script to create the blog posts in `src/content/blog/seo/`.
4. [x] **Verify Coverage**: Run `python3 scripts/analyze-keyword-authority.py` to ensure all new keywords are covered by the new articles.
5. [x] **Final Quality Check**: Review the generated files for correct internal linking and structure.
6. [x] **Fix Build Errors**: Resolved `YAMLException` caused by unescaped double quotes in frontmatter descriptions and verified with `npm run build`.
