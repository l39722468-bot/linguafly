import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
        Linguafly
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        LinguaFly AI
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone-600">
        Entrenador personal de inglés. Crea una cuenta o entra para continuar.
      </p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
        <Link
          href="/registro"
          className="inline-flex items-center justify-center rounded-lg bg-stone-900 px-5 py-3 text-center text-base font-medium text-white hover:bg-stone-800"
        >
          Crear cuenta
        </Link>
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-lg border border-stone-300 bg-white px-5 py-3 text-center text-base font-medium text-stone-900 hover:bg-stone-100"
        >
          Iniciar sesión
        </Link>
      </div>
      <Link
        href="/recuperar-contrasena"
        className="mt-5 w-fit text-sm font-medium text-stone-700 underline underline-offset-4 hover:text-stone-900"
      >
        ¿Has olvidado tu contraseña?
      </Link>
    </main>
  );
}
