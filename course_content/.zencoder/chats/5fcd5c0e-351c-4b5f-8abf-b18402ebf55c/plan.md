# Implementation Plan - Fix Sitemap Redirects

## Workflow Steps

### [x] Step: Requirements
Create a Product Requirements Document (PRD) based on the feature description.
- PRD created in `.zencoder/chats/5fcd5c0e-351c-4b5f-8abf-b18402ebf55c/requirements.md`.

### [x] Step: Technical Specification
Create a technical specification based on the PRD.
- Spec created in `.zencoder/chats/5fcd5c0e-351c-4b5f-8abf-b18402ebf55c/spec.md`.

### [x] Step: Planning
Create a detailed implementation plan.
- Tasks defined below.

### [x] Step: Implementation

1. [x] **Fix baseUrl in sitemap.ts**
   - Change `baseUrl` to `https://www.focus-on-english.com` in `src/app/sitemap.ts`.
   - Verification: Checked file content.

2. [x] **Global Audit of non-www URLs**
   - Search for `https://focus-on-english.com` (without www) in the codebase.
   - Replace with `www` version where appropriate (e.g., metadata, canonical tags).
   - Verification: Grep results confirmed all instances were replaced.

3. [x] **Final Verification**
   - Run `npm run lint`.
   - Verification: Lint run completed. (Note: pre-existing project lint errors unrelated to these changes).
