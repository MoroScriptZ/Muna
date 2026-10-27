// Crea (o actualiza) un usuario administrador. Corre DESPUES de ejecutar supabase/schema.sql.
// Uso: node --env-file=.env.local scripts/crear-admin.mjs <correo> <contrasena>
const [email, password] = process.argv.slice(2);
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!email || !password || !url || !key) {
  console.error("Uso: node --env-file=.env.local scripts/crear-admin.mjs <correo> <contrasena>");
  process.exit(1);
}
if (password.length < 8) {
  console.error("La contraseña debe tener al menos 8 caracteres.");
  process.exit(1);
}

const cabeceras = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

let res = await fetch(`${url}/auth/v1/admin/users`, {
  method: "POST",
  headers: cabeceras,
  body: JSON.stringify({ email, password, email_confirm: true })
});
let usuario = await res.json();

if (!res.ok) {
  // Si ya existe, se busca y se le actualiza la contrasena.
  const lista = await (await fetch(`${url}/auth/v1/admin/users?per_page=1000`, { headers: cabeceras })).json();
  usuario = lista.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (!usuario) {
    console.error("No se pudo crear el usuario:", usuario?.msg ?? JSON.stringify(lista).slice(0, 200));
    process.exit(1);
  }
  await fetch(`${url}/auth/v1/admin/users/${usuario.id}`, { method: "PUT", headers: cabeceras, body: JSON.stringify({ password }) });
}

res = await fetch(`${url}/rest/v1/admins`, {
  method: "POST",
  headers: { ...cabeceras, Prefer: "resolution=ignore-duplicates" },
  body: JSON.stringify({ user_id: usuario.id })
});
if (!res.ok) {
  console.error("No se pudo registrar como admin (¿ya corriste supabase/schema.sql?):", await res.text());
  process.exit(1);
}
console.log(`Administrador listo: ${email}`);
