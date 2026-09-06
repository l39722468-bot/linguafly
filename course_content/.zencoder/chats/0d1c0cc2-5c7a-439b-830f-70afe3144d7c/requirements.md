# Product Requirements Document (PRD): Paid Courses Dashboard Protection

## 1. Goal
Ensure that the paid courses dashboard and all related premium content (courses, lessons, practice) are only accessible to users with valid credentials and an active subscription.

## 2. Target Audience
- **Paid Users**: Users who have purchased a course and have an `active` or `trialing` subscription status.
- **Administrators**: Support and management staff who need access to all content.

## 3. User Stories
- As a **Paid User**, I want to access the dashboard and my courses without friction after logging in.
- As a **Free User** (or expired subscription), I should be redirected to the pricing page if I try to access premium content.
- As an **Administrator**, I want to bypass subscription checks to verify content.
- As an **Owner**, I want to ensure that premium content is protected from unauthorized access at the application level.

## 4. Functional Requirements
- **Authentication**: All protected routes require a logged-in user (already handled by current middleware).
- **Subscription Verification**: Verify that the user has `subscription_status` as 'active' or 'trialing' in the `user_profiles` table.
- **Role Verification**: Users with the `admin` role in `user_profiles` bypass subscription checks.
- **Redirection**: Unauthorized users trying to access protected routes should be redirected to `/planes` with a clear message or query parameter.

## 5. Protected Routes
- `/dashboard/**`
- `/curso/**`
- `/cursos/**`
- `/aula/**`
- `/app/**`

## 6. Implementation Strategy
- **Middleware Update**: Enhance `src/middleware.ts` to perform a subscription check for protected routes. 
    - *Note*: Middleware has limited access to the database. We might need to fetch the profile in the middleware or use a cookie-based approach if performance is a concern.
- **Server Component Checks**: Add redundant checks in layout files or page files for sensitive areas.

## 7. Success Criteria
- Non-paid users cannot access `/dashboard` or any `/curso/*` page even if logged in.
- Paid users can access all content seamlessly.
- Admins can access all content regardless of subscription status.
