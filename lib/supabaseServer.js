import { createClient } from "@supabase/supabase-js";

// Cliente con la clave service_role: salta RLS, asi que SOLO se usa en codigo de servidor
// (rutas /api y paginas de servidor). Nunca importar desde un componente "use client".
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseServer = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
