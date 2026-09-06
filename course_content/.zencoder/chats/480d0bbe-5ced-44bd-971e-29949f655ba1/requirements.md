# PRD: Fix SEO Indexing Issues for Blog Articles

## 1. Introduction
Several blog articles on Focus English are being crawled by Google but not indexed ("Crawled - currently not indexed"). This prevents these pages from appearing in search results, reducing organic traffic.

## 2. Problem Description
Google Search Console reports that several URLs under `/blog/viajes/` and `/blog/trabajo/` are crawled but not indexed. The latest crawl was on January 31, 2026.

## 3. Root Cause Analysis
- **Future Publication Dates**: Many articles have a `date` field in their frontmatter set to a future date (e.g., February 15, 2026, February 20, 2026). Google may be ignoring these pages for indexing because it perceives them as not yet "live" or as having invalid metadata.
- **Content Depth**: Some articles are around 300-500 words. While not strictly "thin," increasing the depth and unique value of these "guides" can improve indexing probability.
- **Lazy Sitemap lastModified**: The sitemap uses the current execution time for all URLs' `lastModified` field, which isn't ideal for search engine discovery of actual changes.

## 4. Proposed Changes
- **Update Dates**: Change all future dates in blog article frontmatter to a past date (e.g., January 30, 2026) to ensure they are perceived as live and ready for indexing.
- **Improve Sitemap Metadata**: Update `sitemap.ts` to use the actual article date for `lastModified` instead of the current time.
- **Content Enhancement (Optional but recommended)**: Add more unique content, examples, or "Focus Tips" to the affected articles to increase their value proposition.
- **Internal Linking**: Ensure these blog posts are linked from relevant course pages or the SEO hub (`/aprender-ingles`) to increase their authority.

## 5. Success Criteria
- Google Search Console shows the affected URLs as "Indexed."
- Articles appear in search results for their target keywords.
- Sitemap correctly reflects the actual last modification/publication dates.
