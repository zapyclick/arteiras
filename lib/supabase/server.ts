import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function createServerSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  return createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function getUserFromToken(token: string): { user: { id: string } | null; error: string | null } {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return { user: null, error: "Token mal formatado." };
    }

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");
    const payload = JSON.parse(atob(padded));
    const userId = payload.sub;

    if (!userId) {
      return { user: null, error: "Token invalido: usuario nao identificado." };
    }

    return { user: { id: userId }, error: null };
  } catch {
    return { user: null, error: "Token invalido ou mal formatado." };
  }
}
