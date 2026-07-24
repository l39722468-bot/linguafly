-- Fix típico: Auth Admin createUser falla con "Database error creating new user"
-- porque public.users exige password_hash / name NOT NULL y un trigger no los rellena.
-- Ejecutar en: Supabase → SQL Editor (proyecto nprqtjljoekoirlrjxlh)

ALTER TABLE public.users
  ALTER COLUMN password_hash SET DEFAULT 'managed-by-supabase-auth';

ALTER TABLE public.users
  ALTER COLUMN name SET DEFAULT '';

-- Si email_verified es boolean NOT NULL sin default:
ALTER TABLE public.users
  ALTER COLUMN email_verified SET DEFAULT false;

-- Opcional: si hay trigger on auth.users que inserta en public.users,
-- asegúrate de que incluya password_hash. Ejemplo seguro:

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, password_hash, email_verified, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1), ''),
    'managed-by-supabase-auth',
    true,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        updated_at = NOW();
  RETURN NEW;
EXCEPTION WHEN others THEN
  -- No tumbar el alta en Auth si falla el espejo en public.users
  RAISE WARNING 'handle_new_user: %', SQLERRM;
  RETURN NEW;
END;
$$;
