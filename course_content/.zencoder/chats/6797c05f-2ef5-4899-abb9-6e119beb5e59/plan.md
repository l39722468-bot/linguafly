# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/6797c05f-2ef5-4899-abb9-6e119beb5e59/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/6797c05f-2ef5-4899-abb9-6e119beb5e59/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/6797c05f-2ef5-4899-abb9-6e119beb5e59/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/6797c05f-2ef5-4899-abb9-6e119beb5e59/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

### [x] Task 1: Create script boilerplate and route discovery
Implement the foundation of `scripts/check-404s.mjs` including logic to discover all valid internal routes.
- **Verification**: Run `node scripts/check-404s.mjs` and check if it logs the count of valid routes.

### [x] Task 2: Implement link extraction
Add logic to parse Markdown files and extract all internal and external links.
- **Verification**: Log extracted links for a sample file.

### [x] Task 3: Implement link validation
Add logic to validate internal links against discovered routes and external links via HTTP requests.
- **Verification**: Run the script and ensure it identifies at least one (intentional or real) broken link if any exists.

### [x] Task 4: Finalize report and execution
Format the output to be clear and professional, providing a full list of 404 errors.
- **Verification**: Final execution of the script.

## Phase: Blog Reorganization and URL Fixes
Improve blog architecture by moving grammar articles to a dedicated category and fixing detected 404s.

### [x] Task 5: Fix detected internal broken links
Update links with spaces and accents in `aprender-ingles-ia-guia.md`, `ingles-emergencias-viaje.md`, and `ingles-nomadas-digitales-mochileros.md`.
- **Verification**: Run `node scripts/check-404s.mjs` and ensure these 404s are gone.

### [x] Task 6: Create 'gramatica' category and move articles
Move grammar-focused articles from `metodos` to `gramatica` folder and update their frontmatter.
- **Verification**: Verify files exist in `src/content/blog/gramatica/`.

### [x] Task 7: Update internal links to reorganized articles
Search and replace all internal links pointing to the old `/blog/metodos/...` paths with the new `/blog/gramatica/...` paths.
- **Verification**: Run `node scripts/check-404s.mjs` to ensure no new 404s are introduced.

### [x] Task 8: Fix URL decoding in blog article page
Modify `src/app/blog/[category]/[slug]/page.tsx` to decode the `category` parameter.
- **Verification**: Manually verify the logic or run a test if possible.

### [x] Task 9: Verify all internal links again
Run the 404 checker to ensure no regressions.
