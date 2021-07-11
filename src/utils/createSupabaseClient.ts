import { createClient, SupabaseClient } from "@supabase/supabase-js";

export default function createSupabaseClient(): SupabaseClient {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
  return createClient(supabaseUrl, supabaseKey);
}
