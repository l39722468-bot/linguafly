# Technical Specification: Reported Speech & Reporting Verbs SEO Macro-Strategy

## Context
This specification details the implementation of a Topic Cluster for "Reported Speech" and "Reporting Verbs" to establish domain authority. The focus is on high-value educational content for Cambridge exam candidates (B2-C2).

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Content**: Markdown files in `src/content/blog/seo/`
- **Data**: `seo-keyword-categorization.json` for tracking
- **Automation**: Node.js script for content seeding

## Implementation Approach

### 1. Data Model Update
Add a new category `reported_speech` to `seo-keyword-categorization.json` containing the keywords provided by the user.

### 2. Content Structure (Topic Cluster)
Create 6 Markdown files in `src/content/blog/seo/`:
1. `guia-maestra-reported-speech.md` (Hub)
2. `reported-speech-ejercicios-pdf.md` (Spoke)
3. `reported-speech-cambridge-exams.md` (Spoke)
4. `passive-reporting-verbs-guia-avanzada.md` (Spoke)
5. `reporting-verbs-patterns-list.md` (Spoke)
6. `reported-speech-questions-commands.md` (Spoke)

### 3. Internal Linking Strategy
- **Hub to Spokes**: Each spoke will be linked in a dedicated "Recursos Adicionales" section of the Hub.
- **Spokes to Hub**: Each spoke will have a "Volver a la Guía Maestra" link and breadcrumb-like link.
- **Cross-linking**: Relevant spokes will link to each other (e.g., Passive Reporting Verbs to Cambridge Exams).

### 4. Automation: Seeding Script
Create `scripts/seed-reported-speech-cluster.mjs` to:
- Define the metadata (YAML frontmatter) for all 6 files.
- Generate boilerplate content for each file based on its purpose (Theory vs Exercises).
- Write files to `src/content/blog/seo/`.

## Source Code Changes
- `seo-keyword-categorization.json`: New entries.
- `src/content/blog/seo/*.md`: 6 new files.
- `scripts/seed-reported-speech-cluster.mjs`: New script.

## Verification Approach
1. **Lint/Typecheck**: Run `npm run lint` if applicable.
2. **Coverage Analysis**: Run `python3 scripts/analyze-keyword-authority.py` and verify 100% coverage for the new category.
3. **Visual Audit**: Verify the generated Markdown files follow existing patterns.
