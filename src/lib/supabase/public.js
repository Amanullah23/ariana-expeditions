import { createClient as createSupabaseClient } from "@supabase/supabase-js";

function getTimeoutSignal(ms) {
  // AbortSignal.timeout() isn't available in every browser version —
  // fall back to a manual AbortController so older Safari doesn't crash.
  if (
    typeof AbortSignal !== "undefined" &&
    typeof AbortSignal.timeout === "function"
  ) {
    return AbortSignal.timeout(ms);
  }
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        fetch: (url, options = {}) => {
          return fetch(url, { ...options, signal: getTimeoutSignal(8000) });
        },
      },
    },
  );
}
