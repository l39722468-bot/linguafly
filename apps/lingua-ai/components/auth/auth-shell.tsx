import Link from "next/link";

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-12">
      <Link href="/" className="text-sm font-medium text-stone-500">
        LinguaFly AI
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 text-base leading-relaxed text-stone-600">{description}</p>
      <div className="mt-8">{children}</div>
    </main>
  );
}
