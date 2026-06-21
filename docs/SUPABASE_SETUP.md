# Manual Supabase Configuration Guide

Complete this setup in the [Supabase Dashboard](https://supabase.com/dashboard) after deploying migrations.

---

## 1. Run database migrations

**Location:** SQL Editor → New query

**Action:** Run both migration files in order:
1. `supabase/migrations/20260618153119_*.sql` (existing questionnaire_responses)
2. `supabase/migrations/20260619170000_platform_schema.sql` (profiles, businesses, submissions, websites, storage)

**Why:** Creates tables, RLS policies, triggers, and storage bucket.

---

## 2. Authentication settings

**Location:** Authentication → Providers → Email

| Setting | Value | Why |
|---------|-------|-----|
| Enable Email provider | ON | Required for signup/login |
| Confirm email | **OFF** (recommended for onboarding) | Allows immediate website generation after signup without blocking on verification |
| Secure email change | ON | Prevents account takeover |

> Email verification is enforced in-app only for `/publish`, `/billing`, and account recovery flows.

---

## 3. Email verification settings

**Location:** Authentication → Email Templates

Customize templates for:
- Confirm signup → redirect URL: `https://YOUR_DOMAIN/verify-email`
- Reset password → redirect URL: `https://YOUR_DOMAIN/reset-password`

**Why:** Branded emails and correct post-click routing.

---

## 4. Redirect URLs

**Location:** Authentication → URL Configuration

**Site URL:**
```
http://localhost:8080
```
(Production: `https://yourdomain.com`)

**Redirect URLs (add all):**
```
http://localhost:8080/**
http://localhost:8080/verify-email
http://localhost:8080/reset-password
http://localhost:8080/login
http://localhost:8080/signup
http://localhost:8080/questionnaire/complete
https://yourdomain.com/**
```

**Why:** Supabase Auth only redirects to whitelisted URLs after email links and OAuth.

---

## 5. Environment variables

**Location:** Local `.env` and deployment platform

| Variable | Example | Required |
|----------|---------|----------|
| `VITE_SUPABASE_URL` | `https://xxx.supabase.co` | Client |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJ...` (anon key) | Client |
| `SUPABASE_URL` | Same as above | Server |
| `SUPABASE_PUBLISHABLE_KEY` | Same anon key | Server |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` (service role) | Server only — never expose to client |

**Why:** Client uses publishable key; server admin operations use service role.

---

## 6. Database setup verification

**Location:** Table Editor

Confirm tables exist:
- `profiles`
- `businesses`
- `questionnaire_submissions`
- `websites`
- `questionnaire_responses` (legacy, optional)

**Why:** App reads/writes these on auth and questionnaire completion.

---

## 7. Row Level Security

**Location:** Authentication → Policies (or Table Editor → RLS)

All tables should have **RLS enabled** with policies from migration:
- Users can SELECT/INSERT/UPDATE/DELETE only where `auth.uid() = user_id` (or `id` for profiles)

**Why:** Prevents cross-tenant data access.

---

## 8. Storage configuration

**Location:** Storage → Buckets

| Bucket | Public | Limit |
|--------|--------|-------|
| `questionnaire-assets` | No | 50 MB |

**Policies:** Migration creates authenticated upload/read/update/delete scoped to `{user_id}/*` paths.

**Why:** Business assets (logos, brochures) upload after account creation.

---

## 9. Email provider (production)

**Location:** Project Settings → Auth → SMTP Settings

Configure custom SMTP (SendGrid, Resend, AWS SES) for production deliverability.

**Why:** Default Supabase email has rate limits unsuitable for paying customers.

---

## 10. Auth hooks (optional)

**Location:** Database → Functions

Triggers `handle_new_user` and `handle_user_email_verified` auto-sync `profiles` from `auth.users`.

**Why:** Keeps profile email and verification status in sync.

---

## 11. API settings

**Location:** Project Settings → API

- Copy **Project URL** and **anon public** key into `.env`
- Copy **service_role** key for server-only use

---

## 12. Local development checklist

```bash
npm install
npm run dev
# Open http://localhost:8080
```

1. Complete questionnaire without login
2. Sign up at `/questionnaire/complete`
3. Verify data in `businesses`, `questionnaire_submissions`, `websites` tables
4. Confirm dashboard shows generated website

---

## 13. Production deployment

1. Set production Site URL and Redirect URLs
2. Run migrations on production Supabase project
3. Set env vars on hosting platform (Vercel, Cloudflare, etc.)
4. Enable custom SMTP
5. Consider enabling "Confirm email" if stricter security is required (update app flow accordingly)

---

## 14. Troubleshooting

| Issue | Fix |
|-------|-----|
| Signup succeeds but no session | Disable "Confirm email" or verify email first |
| RLS policy violation | Ensure user is authenticated; check `user_id` matches `auth.uid()` |
| Storage upload fails | Confirm bucket exists; user must be logged in |
| Redirect after reset fails | Add `/reset-password` to Redirect URLs |
| Questionnaire not saved | Run platform schema migration; check browser localStorage |
