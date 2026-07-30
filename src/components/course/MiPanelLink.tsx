import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';

type MiPanelLinkProps = {
  variant?: 'hero' | 'nav';
  className?: string;
};

const variantClasses: Record<NonNullable<MiPanelLinkProps['variant']>, string> = {
  hero:
    'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors',
  nav:
    'inline-flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl text-xs font-black uppercase tracking-wide text-slate-700 hover:bg-slate-200 transition-colors',
};

export function MiPanelLink({ variant = 'hero', className = '' }: MiPanelLinkProps) {
  const label = variant === 'nav' ? 'Mi panel' : 'Ir a mi panel';

  return (
    <Link href="/mi-panel" className={`${variantClasses[variant]} ${className}`.trim()}>
      <LayoutDashboard className={variant === 'nav' ? 'w-4 h-4' : 'w-4 h-4'} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}
