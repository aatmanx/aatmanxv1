/**
 * Questionnaire & auth flow tests — run manually or integrate with Vitest.
 *
 * Happy path:
 * 1. Visit / → click "start a build" → /questionnaire
 * 2. Select Real Estate → auto-advance to business info
 * 3. Fill required fields → next → complete 8 category questions
 * 4. Land on /questionnaire/complete review screen
 * 5. Sign up → data persisted → redirect to dashboard with website row
 *
 * Edge cases:
 * - Refresh mid-questionnaire restores localStorage state
 * - Back button preserves answers
 * - Invalid email/phone blocked on business info step
 * - Unauthenticated user can complete full questionnaire
 * - Login with pending localStorage data persists on success
 *
 * Security:
 * - User A cannot read User B submissions (RLS)
 * - /dashboard redirects to /login when logged out
 * - /publish requires verified email
 * - Service role key not exposed in client bundle
 */

export const TEST_SCENARIOS = [
  "homepage_cta_routes_to_questionnaire",
  "questionnaire_no_auth_required",
  "localStorage_survives_refresh",
  "real_estate_eight_questions",
  "complete_screen_before_auth",
  "signup_persists_questionnaire",
  "dashboard_shows_websites",
  "protected_routes_redirect",
  "publish_requires_verification",
] as const;
