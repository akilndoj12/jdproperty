-- Databaza e pronave për JD Properties (Supabase)

create table if not exists public.properties (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  title text not null,
  type text not null default 'Apartment',     -- Apartment | Villa | Commercial | Land
  status text not null default 'For Sale',    -- For Sale | For Rent
  city text not null default 'Tirana',
  address text,
  price numeric,
  beds int default 0,
  baths int default 0,
  area numeric,
  featured boolean not null default false,
  description text,
  features text[] not null default '{}',
  images text[] not null default '{}'
);

-- Siguria: të gjithë mund të lexojnë, vetëm admini (përdorues i loguar) shkruan
alter table public.properties enable row level security;

drop policy if exists "Public can read properties" on public.properties;
create policy "Public can read properties" on public.properties
  for select using (true);

drop policy if exists "Admin can insert properties" on public.properties;
create policy "Admin can insert properties" on public.properties
  for insert to authenticated with check (true);

drop policy if exists "Admin can update properties" on public.properties;
create policy "Admin can update properties" on public.properties
  for update to authenticated using (true) with check (true);

drop policy if exists "Admin can delete properties" on public.properties;
create policy "Admin can delete properties" on public.properties
  for delete to authenticated using (true);

-- Fotot: bucket publik për lexim, ngarkim vetëm nga admini
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view property images" on storage.objects;
create policy "Public can view property images" on storage.objects
  for select using (bucket_id = 'property-images');

drop policy if exists "Admin can upload property images" on storage.objects;
create policy "Admin can upload property images" on storage.objects
  for insert to authenticated with check (bucket_id = 'property-images');

drop policy if exists "Admin can delete property images" on storage.objects;
create policy "Admin can delete property images" on storage.objects
  for delete to authenticated using (bucket_id = 'property-images');
