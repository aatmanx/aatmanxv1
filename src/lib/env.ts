type SupabasePublicConfig = {
  url: string;
  publishableKey: string;
};

type SupabaseServerConfig = SupabasePublicConfig & {
  serviceRoleKey: string;
};

function readProcessEnv(key: string): string | undefined {
  if (typeof process === "undefined") return undefined;
  const value = process.env[key];
  return value && value.length > 0 ? value : undefined;
}

function readViteEnv(key: string): string | undefined {
  if (typeof import.meta === "undefined" || !import.meta.env) return undefined;
  const value = import.meta.env[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/**
 * Public Supabase credentials for browser and SSR client initialization.
 * Prefer VITE_* (inlined by Vite); fall back to unprefixed server vars during SSR.
 */
export function getSupabasePublicConfig(): SupabasePublicConfig {
  const url =
    readViteEnv("VITE_SUPABASE_URL") ??
    readProcessEnv("SUPABASE_URL");
  const publishableKey =
    readViteEnv("VITE_SUPABASE_PUBLISHABLE_KEY") ??
    readProcessEnv("SUPABASE_PUBLISHABLE_KEY");

  if (!url || !publishableKey) {
    const missing = [
      ...(!url ? ["VITE_SUPABASE_URL (or SUPABASE_URL)"] : []),
      ...(!publishableKey ? ["VITE_SUPABASE_PUBLISHABLE_KEY (or SUPABASE_PUBLISHABLE_KEY)"] : []),
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Copy .env.example to .env and set your Supabase project credentials.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }

  return { url, publishableKey };
}

/** Server-only Supabase credentials (service role bypasses RLS). */
export function getSupabaseServerConfig(): SupabaseServerConfig {
  const publicConfig = getSupabasePublicConfig();
  const serviceRoleKey = readProcessEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!serviceRoleKey) {
    const message =
      "Missing Supabase environment variable: SUPABASE_SERVICE_ROLE_KEY. Add it to .env for server-side admin operations.";
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }

  return { ...publicConfig, serviceRoleKey };
}

export function getOpenAiApiKey(): string | undefined {
  return readProcessEnv("OPENAI_API_KEY");
}

export function getOpenAiModel(): string {
  return readProcessEnv("OPENAI_MODEL") ?? "gpt-4o-mini";
}
