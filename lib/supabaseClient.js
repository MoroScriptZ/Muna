import { createClient } from "@supabase/supabase-js";

// Sin llaves en .env.local el sitio sigue funcionando (el checkout queda en modo mock).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = url && key ? createClient(url, key) : null;
