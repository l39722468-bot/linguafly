import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';

type MiPanelLinkProps = {
  variant?: 'hero' | 'nav' | 'outline';
  className?: string;
};

const variantClasses: Record<NonNullable<MiPanelLinkProps['variant']>, string> = {
  hero:
    'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors',
  nav:
    'inline-flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl text-xs font-black uppercase tracking-wide text-slate-700 hover:bg-slate-200 transition-colors',
  outline:
    'inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors print-hidden',
};

const variantLabels: Record<NonNullable<MiPanelLinkProps['variant']>, string> = {
  hero: 'Ir a mi panel',
  nav: 'Mi panel',
  outline: 'Volver a mi panel',
};

export function MiPanelLink({ variant = 'hero', className = '' }: MiPanelLinkProps) {
  const label = variantLabels[variant];

  return (
    <Link href="/mi-panel" className={`${variantClasses[variant]} ${className}`.trim()}>
      <LayoutDashboard className={variant === 'nav' ? 'w-4 h-4' : 'w-4 h-4'} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}
