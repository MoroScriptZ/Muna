-- Pega esto en Supabase > SQL Editor > Run.
-- Los pedidos solo se pueden CREAR con la clave anon (desde /api/checkout).
-- Leerlos o editarlos requiere el panel de Supabase o la service_role (nunca en el navegador).

create table if not exists public.orders (
  id uuid primary key,
  items jsonb not null,
  total_cop integer not null check (total_cop > 0),
  status text not null default 'pendiente',
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

drop policy if exists "crear pedidos" on public.orders;
create policy "crear pedidos" on public.orders
  for insert to anon
  with check (status = 'pendiente');
