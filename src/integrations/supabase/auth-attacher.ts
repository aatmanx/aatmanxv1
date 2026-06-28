import { createMiddleware } from "@tanstack/react-start";
import { supabase } from "./client";

// Registered as global `functionMiddleware` in `src/start.ts` so the browser
// attaches the bearer token to server function RPCs when they are added.
export const attachSupabaseAuth = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
  },
)
