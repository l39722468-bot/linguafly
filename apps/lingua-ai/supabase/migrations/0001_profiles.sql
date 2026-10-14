-- LinguaFly AI — perfil del alumno.
-- Preparada para revisión. No se ha ejecutado contra ningún proyecto remoto.
-- Las contraseñas viven solo en auth.users, nunca en esta tabla.
--
-- Aplicar el archivo completo como una sola transacción. Si una sentencia
-- falla, no continuar con el resto: un RAISE deja sin efecto los cambios
-- solo cuando el editor o el runner usan una transacción.
--
-- CREATE TABLE IF NOT EXISTS no actualiza una tabla que ya exista.
-- No añade columnas, restricciones, valores por defecto ni claves que
-- falten. Si public.profiles se creó con otra definición, hay que
-- revisarla o recrearla antes de confiar en este archivo. Las políticas,
-- funciones y triggers de abajo sí se eliminan y se vuelven a crear.
--
-- Este repositorio no se ha conectado al proyecto nuevo, así que no
-- afirma que el rol supabase_auth_admin exista. Antes de aplicar la
-- migración, ejecuta en el SQL editor de ESE proyecto:
--
--   select rolname
--   from pg_catalog.pg_roles
--   where rolname = 'supabase_auth_admin';
--
-- Tiene que devolver una fila. Después comprueba que ese rol es el que
-- inserta en auth.users (GoTrue). Una consulta orientativa, que no
-- sustituye la revisión del proyecto:
--
--   select privilege_type
--   from information_schema.role_table_grants
--   where table_schema = 'auth'
--     and table_name = 'users'
--     and grantee = 'supabase_auth_admin';
--
-- El propietario de auth.users puede insertar aunque esa consulta no
-- muestre un GRANT. Si el rol no existe, o el que inserta tiene otro
-- nombre, no apliques el archivo: cambia el nombre en los dos bloques DO
-- y vuelve a revisar. El primer bloque aborta la transacción si el rol
-- no está en pg_catalog.pg_roles.
--
-- anon y authenticated son los roles de la API que ya usan las políticas.
-- Forman parte de un proyecto Supabase. No se ha comprobado aquí el rol
-- de GoTrue, que es el único que se verifica dentro del script.
--
-- service_role no se revoca: es un rol de plataforma y esta aplicación
-- no lo usa. El propietario de la tabla y los roles con BYPASSRLS no
-- quedan limitados por RLS.

do $require_auth_admin$
begin
  if not exists (
    select 1
    from pg_catalog.pg_roles
    where rolname = 'supabase_auth_admin'
  ) then
    raise exception
      using message =
        'supabase_auth_admin no existe en pg_catalog.pg_roles. '
        'No se aplica la migración. Ejecuta '
        'select rolname from pg_catalog.pg_roles where rolname = ''supabase_auth_admin''; '
        'y concede execute de public.handle_new_user() al rol que inserta en auth.users.';
  end if;
end
$require_auth_admin$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default pg_catalog.now(),
  updated_at timestamptz not null default pg_catalog.now(),
  cefr_level text,
  explanation_language text not null default 'es',
  learning_goal text,
  constraint profiles_cefr_level_check
    check (cefr_level is null or cefr_level in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  constraint profiles_explanation_language_check
    check (pg_catalog.char_length(explanation_language) between 2 and 12),
  constraint profiles_learning_goal_length_check
    check (learning_goal is null or pg_catalog.char_length(learning_goal) <= 200)
);

alter table public.profiles enable row level security;

revoke all on table public.profiles from public;
revoke all on table public.profiles from anon;
revoke all on table public.profiles from authenticated;

grant select (
  id,
  created_at,
  updated_at,
  cefr_level,
  explanation_language,
  learning_goal
) on table public.profiles to authenticated;

grant update (
  cefr_level,
  explanation_language,
  learning_goal
) on table public.profiles to authenticated;

drop policy if exists profiles_insert_own on public.profiles;
drop policy if exists profiles_select_own on public.profiles;
drop policy if exists profiles_update_own on public.profiles;

create policy profiles_select_own
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

create policy profiles_update_own
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create or replace function public.set_profile_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = pg_catalog.now();
  return new;
end;
$$;

revoke all on function public.set_profile_updated_at() from public;
revoke all on function public.set_profile_updated_at() from anon;
revoke all on function public.set_profile_updated_at() from authenticated;
grant execute on function public.set_profile_updated_at() to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public;
revoke all on function public.handle_new_user() from anon;
revoke all on function public.handle_new_user() from authenticated;

do $grant_handle_new_user$
begin
  if exists (
    select 1
    from pg_catalog.pg_roles
    where rolname = 'supabase_auth_admin'
  ) then
    execute 'grant execute on function public.handle_new_user() to supabase_auth_admin';
  else
    raise exception
      using message =
        'supabase_auth_admin no existe. No se concede execute sobre public.handle_new_user().';
  end if;
end
$grant_handle_new_user$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_profile_updated_at();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
