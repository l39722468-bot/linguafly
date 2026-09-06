# Technical Specification - Extra 70 Keywords Selection

## Technical Context
- **Source Data**: `seo-keyword-categorization.json`
- **Reference**: `top_700_keywords.md` (to avoid duplicates)
- **Criteria**: 
    - Exclude keywords containing "gratis".
    - Priority: `trabajo`, `examenes`, `viajes`, `metodos`, `uncategorized`.
    - Select keywords from position 701 to 770 in the filtered priority list.
- **Output**: `extra_70_keywords.md` (cleaned format, no headers or dashes)

## Implementation Approach
1. Load `seo-keyword-categorization.json`.
2. Generate the full prioritized list of keywords excluding "gratis".
3. Extract keywords from index 700 to 769 (the next 70).
4. Save them to `extra_70_keywords.md`, one per line.

## Source Code Structure Changes
- New file: `extra_70_keywords.md`

## Verification Approach
- Verify `extra_70_keywords.md` contains exactly 70 lines.
- Verify no keyword in the new file exists in `top_700_keywords.md`.
