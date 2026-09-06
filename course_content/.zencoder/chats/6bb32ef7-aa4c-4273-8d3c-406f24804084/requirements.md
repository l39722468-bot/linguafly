# Product Requirements Document (PRD): Phrases Section Improvements

## 1. Overview
The "English Phrases" section is a key asset for Domain Authority and SEO. It follows a Hub & Spoke architecture. This project aims to improve its visibility, navigation, and internal linking to maximize SEO impact and user experience.

## 2. Goals
- Increase internal linking to the Phrases Hub from other high-traffic pages.
- Improve navigation between the Phrases section and the rest of the site.
- Ensure all phrases categories are easily discoverable.
- Enhance SEO signals through better structure and metadata.

## 3. Current State Analysis
- **Hub**: `/frases-en-ingles` exists and lists categories.
- **Spoke**: `/frases-en-ingles/[slug]` exists and lists phrases.
- **Navigation**: 
    - Footer has a link.
    - Top Navigation **lacks** a link.
    - `/aprender-ingles` (main SEO hub) **lacks** a link to Phrases.
- **Interlinking**:
    - Breadcrumbs are present and correct.
    - "Back to Hub" link is present in Spoke pages.

## 4. Proposed Improvements

### 4.1. Integration in `/aprender-ingles`
Add "Frases en Inglés" as a main pillar in the `/aprender-ingles` page grid. This page is the primary entry point for many SEO queries and should link to all major resources.

### 4.2. Navigation Enhancement
Add a "Frases" link or a "Recursos" dropdown to the main `Navigation` component. If a dropdown is too much, at least ensure it's easily accessible.
*Decision*: Add a "Frases" link to the desktop and mobile navigation to increase visibility.

### 4.3. SEO & Content Review
- Verify that `generateStaticParams` is correctly implemented to ensure all categories are pre-rendered (Already checked: YES).
- Ensure `canonical` tags are correct (Already checked: YES).
- Ensure JSON-LD schemas are present (Already checked: YES).

### 4.4. UI/UX Refinement
- Ensure the "Frases" section matches the visual identity of the rest of the site (Already checked: YES).
- Check for any mobile responsiveness issues in the phrases grid.

## 5. Success Metrics
- Increase in organic traffic to `/frases-en-ingles`.
- Lower bounce rate on phrase category pages due to better navigation.
- Improved ranking for "frases en ingles" related keywords.
