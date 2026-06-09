-- =============================================================================
-- Migration 01 — Username-based auth helpers
-- =============================================================================
-- Run AFTER supabase/schema.sql (idempotent — safe to re-run).
-- Adds two RPCs that let the admin setup + login flow work with username +
-- password, not email + password. Supabase Auth still uses email under the
-- hood; we just hide it from the UI.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- has_super_admin(): true if at least one super-admin profile exists.
-- Public — used by /admin/setup to decide whether to allow first-run signup.
-- ---------------------------------------------------------------------------
create or replace function public.has_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where is_super_admin = true);
$$;

grant execute on function public.has_super_admin() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- claim_first_super_admin(username, full_name): promote the calling user to
-- super-admin IF no super-admin currently exists. Idempotent + race-safe.
-- Returns true if promoted, false if a super-admin already existed (no-op).
-- ---------------------------------------------------------------------------
create or replace function public.claim_first_super_admin(
  p_username text,
  p_full_name text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid;
  v_existing boolean;
begin
  v_uid := auth.uid();
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  -- Race-safe: lock the profiles table briefly so two simultaneous signups
  -- cannot both claim super-admin.
  perform pg_advisory_xact_lock(hashtext('claim_first_super_admin'));

  select exists (select 1 from public.profiles where is_super_admin = true)
    into v_existing;

  if v_existing then
    return false;
  end if;

  update public.profiles
    set
      is_super_admin = true,
      username = p_username,
      full_name = p_full_name
    where id = v_uid;

  return true;
end;
$$;

grant execute on function public.claim_first_super_admin(text, text) to authenticated;

-- =============================================================================
-- Done. Verify with:
--   select public.has_super_admin();  -- should return false (until first signup)
-- =============================================================================
