# Technical Specification: Login Redirection and Visibility

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth (via `auth-helpers.ts`)
- **Language**: TypeScript

## Implementation Approach
1. **Fix Missing Styles**: The `cta-primary` and `cta-secondary` classes used in `src/app/page.tsx` are not defined in `globals.css`. I will define them or replace them with standard Tailwind classes to ensure the "Iniciar Sesión" button is visible and properly styled.
2. **Add Login Link to Registration Page**: Users arriving at `/cuenta/registro` should be able to navigate to `/cuenta/login` if they already have an account. I will add a "Ya tengo cuenta" link.
3. **Ensure Consistency**: Verify that all "Iniciar Sesión" links point to `/cuenta/login`.

## Source Code Structure Changes
- Modify `src/app/page.tsx` to fix button styling.
- Modify `src/app/cuenta/registro/page.tsx` to add a login link.
- (Optional) Modify `src/app/globals.css` if global CTA classes are needed.

## Data Model / API / Interface Changes
- No changes to data models or APIs.
- Interface changes: Added a link on the registration page and fixed button styling on the home page.

## Verification Approach
- Manual verification of the home page to ensure the "Iniciar Sesión" button is visible and clickable.
- Manual verification of the registration page to ensure the login link is present and works.
- Run `npm run lint` if available.
