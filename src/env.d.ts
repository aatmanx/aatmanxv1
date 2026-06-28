/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly SUPABASE_URL?: string;
      readonly SUPABASE_PUBLISHABLE_KEY?: string;
      readonly SUPABASE_SERVICE_ROLE_KEY?: string;
      readonly OPENAI_API_KEY?: string;
      readonly OPENAI_MODEL?: string;
      readonly NODE_ENV?: "development" | "production" | "test";
    }
  }
}

export {};
