# Environment Configuration

## Quick Setup

1. Copy the example file:

```bash
cp .env.example .env
```

2. Open `.env` and paste your OpenAI API key:

```
OPENAI_API_KEY=sk-your-key-here
```

3. Restart the dev server so Vite picks up the new variables.

That is all you need for AI content generation. The centralized AI service at `src/services/ai/` reads `OPENAI_API_KEY` automatically.

## Where to paste your OpenAI API key

| Variable | Location | Required |
|----------|----------|----------|
| `OPENAI_API_KEY` | `.env` (project root) | Yes, for AI generation |

Get a key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys).

**Important:** Never commit `.env` to git. Only commit `.env.example` (without real keys).

## Optional variables

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_MODEL` | `gpt-4o-mini` | OpenAI model used for content generation |

## Supabase variables

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for auth and database configuration.

## How the app uses these variables

- **Server-side AI calls** (`src/services/ai/config.ts`) read `OPENAI_API_KEY` from `process.env`
- **Client-side Supabase** reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from `import.meta.env`
- When `OPENAI_API_KEY` is not set, AI generation returns a clear error and the pipeline skips AI steps

## Verify configuration

After adding your key, complete a questionnaire and check the dashboard pipeline timeline. With a valid key, stages progress through AI Generation → Template Selection → Website Building.
