# Technical Specification: SEO Content Expansion

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Content Format**: Markdown (.md) with YAML frontmatter
- **Language**: Spanish
- **Target Word Count**: 750+ words per article

## Implementation Approach
1. **Word Count Audit**: For each article, calculate the current word count to determine how much more content is needed.
2. **Content Research**: Analyze the current content and title to identify key subtopics to expand on.
3. **Drafting**: Write additional sections (Headings, bullet points, paragraphs) to reach the target word count.
4. **Integration**: Merge the new content into the existing Markdown file, ensuring the frontmatter remains intact.
5. **Validation**: Verify the final word count and ensure the Markdown syntax is valid.

## Source Code Structure Changes
- No changes to the code structure. Only updates to files in `src/content/blog/**/*.md`.

## Verification Approach
- **Manual Verification**: Check word count using a word count script or tool.
- **Build Check**: Run `npm run build` to ensure no Markdown errors were introduced that would break the static site generation.
- **Lint Check**: Run `npm run lint` if applicable.

## Delivery Phases
### Phase 1: Audit and Tooling
- Create a script to list all blog articles and their current word counts.
### Phase 2: Sequential Expansion
- Expand articles category by category:
    1. `seo/`
    2. `metodos/`
    3. `examenes/`
    4. `trabajo/`
    5. `viajes/`
