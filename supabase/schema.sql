-- =============================================================================
-- Digital Roofers by SBU — Supabase schema
-- =============================================================================
-- Paste this entire file into the Supabase SQL editor (one shot, click Run).
-- Idempotent: safe to re-run if you need to reset.
--
-- Tables: profiles, leads, audit_picks, images, testimonials
-- Storage: imagery bucket (public read, authenticated write)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- profiles: one row per admin user (joined to auth.users via id)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  is_super_admin boolean not null default false,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz
);

-- Auto-create a profiles row whenever a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', null),
    coalesce(new.raw_user_meta_data->>'username', null)
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- leads: every revenue-estimator submission
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- estimator answers
  city text,
  ticket text,
  leads_per_month text,
  budget text,
  service text,

  -- computed estimate snapshot at submission time
  revenue_low integer,
  revenue_high integer,
  leads_low integer,
  leads_high integer,
  plan text,
  budget_low integer,
  budget_high integer,
  service_label text,
  ticket_label text,

  -- contact info
  contact_first_name text,
  contact_last_name text,
  contact_email text,
  contact_phone text,
  contact_company text,

  -- attribution
  utm_source text,
  utm_content text,
  referrer text,

  -- ops flags
  ghl_synced boolean not null default false
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_contact_email_idx on public.leads (contact_email);

-- ---------------------------------------------------------------------------
-- audit_picks: every free-audit platform selection (Google / Meta / Both)
-- ---------------------------------------------------------------------------
create table if not exists public.audit_picks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  platform text not null check (platform in ('google', 'meta', 'both')),
  utm_source text,
  utm_content text,
  referrer text,
  session_id text
);

create index if not exists audit_picks_created_at_idx on public.audit_picks (created_at desc);

-- ---------------------------------------------------------------------------
-- images: admin-uploaded images for each site slot
-- ---------------------------------------------------------------------------
create table if not exists public.images (
  id uuid primary key default gen_random_uuid(),
  slot text not null,           -- e.g. 'services/google-ads', 'proof/before-after'
  storage_path text not null,   -- path inside the 'imagery' storage bucket
  public_url text not null,     -- resolved public URL for direct <img src>
  alt text,
  width integer,
  height integer,
  active boolean not null default true,
  uploaded_at timestamptz not null default now(),
  uploaded_by uuid references public.profiles(id) on delete set null
);

-- Only one active image per slot.
create unique index if not exists images_one_active_per_slot_idx
  on public.images (slot) where active = true;

create index if not exists images_slot_idx on public.images (slot);

-- ---------------------------------------------------------------------------
-- testimonials: editable client quotes (replaces hardcoded placeholders)
-- ---------------------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  quote text not null,
  name text not null,
  location text,
  label text,                   -- e.g. 'Google Ads client'
  active boolean not null default true,
  sort_order integer not null default 0
);

create index if not exists testimonials_active_sort_idx
  on public.testimonials (active, sort_order);

-- ---------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------

-- Enable RLS on everything
alter table public.profiles      enable row level security;
alter table public.leads         enable row level security;
alter table public.audit_picks   enable row level security;
alter table public.images        enable row level security;
alter table public.testimonials  enable row level security;

-- Helper: is the current request an authenticated admin (any profile)?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid()
  );
$$;

-- Helper: is the current request the super admin?
create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and is_super_admin = true
  );
$$;

-- ---- profiles
drop policy if exists profiles_select_self_or_admin on public.profiles;
create policy profiles_select_self_or_admin on public.profiles
  for select using (
    auth.uid() = id or public.is_admin()
  );

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists profiles_super_admin_all on public.profiles;
create policy profiles_super_admin_all on public.profiles
  for all using (public.is_super_admin()) with check (public.is_super_admin());

-- ---- leads
-- Anonymous can INSERT (the public estimator form). Only admins can SELECT.
drop policy if exists leads_anon_insert on public.leads;
create policy leads_anon_insert on public.leads
  for insert with check (true);

drop policy if exists leads_admin_select on public.leads;
create policy leads_admin_select on public.leads
  for select using (public.is_admin());

drop policy if exists leads_admin_update on public.leads;
create policy leads_admin_update on public.leads
  for update using (public.is_admin()) with check (public.is_admin());

-- ---- audit_picks
-- Same model as leads: anon insert, admin read.
drop policy if exists audit_picks_anon_insert on public.audit_picks;
create policy audit_picks_anon_insert on public.audit_picks
  for insert with check (true);

drop policy if exists audit_picks_admin_select on public.audit_picks;
create policy audit_picks_admin_select on public.audit_picks
  for select using (public.is_admin());

-- ---- images
-- Public read (so <img src=...> works for unauthenticated visitors).
-- Admin-only write.
drop policy if exists images_public_read on public.images;
create policy images_public_read on public.images
  for select using (active = true);

drop policy if exists images_admin_all on public.images;
create policy images_admin_all on public.images
  for all using (public.is_admin()) with check (public.is_admin());

-- ---- testimonials
-- Public read of active; admin-only write.
drop policy if exists testimonials_public_read on public.testimonials;
create policy testimonials_public_read on public.testimonials
  for select using (active = true);

drop policy if exists testimonials_admin_all on public.testimonials;
create policy testimonials_admin_all on public.testimonials
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- STORAGE bucket for admin-uploaded imagery
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('imagery', 'imagery', true)
on conflict (id) do update set public = true;

-- Storage RLS: public read, authenticated write.
drop policy if exists imagery_public_read on storage.objects;
create policy imagery_public_read on storage.objects
  for select using (bucket_id = 'imagery');

drop policy if exists imagery_admin_write on storage.objects;
create policy imagery_admin_write on storage.objects
  for insert with check (
    bucket_id = 'imagery' and public.is_admin()
  );

drop policy if exists imagery_admin_update on storage.objects;
create policy imagery_admin_update on storage.objects
  for update using (
    bucket_id = 'imagery' and public.is_admin()
  );

drop policy if exists imagery_admin_delete on storage.objects;
create policy imagery_admin_delete on storage.objects
  for delete using (
    bucket_id = 'imagery' and public.is_admin()
  );

-- =============================================================================
-- Done. Verify with:
--   select * from public.profiles;   -- empty until you create your first user
--   select * from storage.buckets;   -- should show 'imagery' as public
-- =============================================================================
