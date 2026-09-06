# PRD - SEO Hub Content Enhancement

## Description
The goal is to improve the SEO authority of "Keyword Hub" pages (located at `/blog/temas/[keyword]`) by adding high-quality, long-form introductory content (~1500 words). Currently, these pages only serve as a list of links to related articles, which is suboptimal for SEO.

## Goals
- Identify all existing keyword hubs in the project.
- Implement a system to store and retrieve long-form content for each hub.
- Update the hub page UI to display this content.
- Enhance domain authority by transforming "thin" pages into high-value content pillars.

## Target URLs
`https://www.focus-on-english.com/blog/temas/[keyword]`

## Content Requirements
- Approximately 1500 words per hub (introductory and educational content).
- Structured with headings (H2, H3) for SEO.
- Related articles should still be listed, but integrated with or following the new content.

## Technical Requirements
- Hub content should be stored in Markdown/MDX files for easy editing and SEO.
- The `KeywordHubPage` component must be updated to fetch and render this content.
- Fallback mechanism: if a hub doesn't have custom content yet, it should still show the article list (as it does now).

## Open Questions
- Should we use AI to generate the initial 1500 words for each hub? (User requested 1500 words, I will provide a framework and potentially initial content for requested hubs).
- Are there specific hubs that should be prioritized?
