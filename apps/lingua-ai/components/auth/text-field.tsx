export function TextField({
  label,
  name,
  type,
  autoComplete,
}: {
  label: string;
  name: string;
  type: "email" | "password";
  autoComplete: string;
}) {
  return (
    <label htmlFor={name} className="block text-sm font-medium text-stone-700">
      {label}
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-3 text-base text-stone-900 outline-none ring-stone-400 focus:ring-2"
      />
    </label>
  );
}
