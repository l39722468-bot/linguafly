-- Mapa de progreso por mundos y desbloqueo secuencial de ejercicios

create table if not exists public.worlds (
  id text primary key,
  level text not null check (level in ('A1','A2','B1','B2','C1','C2')),
  title text not null,
  description text,
  world_order integer not null check (world_order > 0),
  created_at timestamptz not null default now(),
  unique(level, world_order)
);

create table if not exists public.world_exercises (
  id text primary key,
  world_id text not null references public.worlds(id) on delete cascade,
  title text not null,
  description text,
  exercise_order integer not null check (exercise_order > 0),
  created_at timestamptz not null default now(),
  unique(world_id, exercise_order)
);

create table if not exists public.user_world_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  world_id text not null references public.worlds(id) on delete cascade,
  status text not null check (status in ('locked','unlocked','completed')),
  completed_exercises integer not null default 0,
  total_exercises integer not null default 0,
  progress_percent numeric(5,2) not null default 0,
  unlocked_at timestamptz,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, world_id)
);

create table if not exists public.user_exercise_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_id text not null references public.world_exercises(id) on delete cascade,
  world_id text not null references public.worlds(id) on delete cascade,
  status text not null check (status in ('locked','unlocked','completed')),
  best_score integer not null default 0 check (best_score >= 0 and best_score <= 100),
  attempts integer not null default 0,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, exercise_id)
);

create index if not exists idx_worlds_level_order on public.worlds(level, world_order);
create index if not exists idx_world_exercises_world_order on public.world_exercises(world_id, exercise_order);
create index if not exists idx_user_exercise_progress_user_world on public.user_exercise_progress(user_id, world_id, status);

alter table public.worlds enable row level security;
alter table public.world_exercises enable row level security;
alter table public.user_world_progress enable row level security;
alter table public.user_exercise_progress enable row level security;

drop policy if exists worlds_read_all on public.worlds;
create policy worlds_read_all
  on public.worlds for select
  to authenticated
  using (true);

drop policy if exists world_exercises_read_all on public.world_exercises;
create policy world_exercises_read_all
  on public.world_exercises for select
  to authenticated
  using (true);

drop policy if exists user_world_progress_select_own on public.user_world_progress;
create policy user_world_progress_select_own
  on public.user_world_progress for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists user_world_progress_insert_own on public.user_world_progress;
create policy user_world_progress_insert_own
  on public.user_world_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists user_world_progress_update_own on public.user_world_progress;
create policy user_world_progress_update_own
  on public.user_world_progress for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists user_exercise_progress_select_own on public.user_exercise_progress;
create policy user_exercise_progress_select_own
  on public.user_exercise_progress for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists user_exercise_progress_insert_own on public.user_exercise_progress;
create policy user_exercise_progress_insert_own
  on public.user_exercise_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists user_exercise_progress_update_own on public.user_exercise_progress;
create policy user_exercise_progress_update_own
  on public.user_exercise_progress for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

insert into public.worlds (id, level, title, description, world_order)
values
  ('a1-world-1','A1','Mundo 1: Primeros pasos','Fundamentos para empezar con seguridad.',1),
  ('a1-world-2','A1','Mundo 2: Vida diaria','Situaciones cotidianas y vocabulario base.',2),
  ('a1-world-3','A1','Mundo 3: Conversaciones simples','Practica para comunicarte con soltura.',3),
  ('a2-world-1','A2','Mundo 1: Consolidacion','Refuerzo de estructuras del nivel.',1),
  ('a2-world-2','A2','Mundo 2: Trabajo y estudio','Escenarios comunes de estudio y trabajo.',2),
  ('a2-world-3','A2','Mundo 3: Fluidez elemental','Produccion guiada y comprension.',3),
  ('b1-world-1','B1','Mundo 1: Intermedio funcional','Comunicacion en contextos reales.',1),
  ('b1-world-2','B1','Mundo 2: Resolucion de tareas','Retos de comprension y produccion.',2),
  ('b1-world-3','B1','Mundo 3: Confianza comunicativa','Practica de autonomia linguistica.',3),
  ('b2-world-1','B2','Mundo 1: Intermedio alto','Precisión gramatical y lexical.',1),
  ('b2-world-2','B2','Mundo 2: Contextos profesionales','Ingles aplicado a objetivos concretos.',2),
  ('b2-world-3','B2','Mundo 3: Fluidez avanzada','Argumentacion y matices.',3),
  ('c1-world-1','C1','Mundo 1: Avanzado academico','Comprension y expresion complejas.',1),
  ('c1-world-2','C1','Mundo 2: Analisis y detalle','Produccion de alto nivel.',2),
  ('c1-world-3','C1','Mundo 3: Dominio natural','Consistencia en escenarios exigentes.',3),
  ('c2-world-1','C2','Mundo 1: Maestria','Control integral del idioma.',1),
  ('c2-world-2','C2','Mundo 2: Precision total','Matiz, estilo y exactitud.',2),
  ('c2-world-3','C2','Mundo 3: Excelencia','Rendimiento experto sostenido.',3)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  world_order = excluded.world_order;

with all_worlds as (
  select id, level, world_order from public.worlds
),
exercise_numbers as (
  select generate_series(1, 8) as exercise_order
)
insert into public.world_exercises (id, world_id, title, description, exercise_order)
select
  replace(w.id, 'world', 'exercise') || '-' || n.exercise_order::text as id,
  w.id as world_id,
  'Ejercicio ' || n.exercise_order::text as title,
  'Reto ' || n.exercise_order::text || ' del mundo ' || w.world_order::text || ' (' || w.level || ')' as description,
  n.exercise_order
from all_worlds w
cross join exercise_numbers n
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  exercise_order = excluded.exercise_order;
