'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import { useUser } from '@/hooks/useAuth';
import { getArticleReturnPath } from '@/lib/blog-article-return';

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

const panelLabels: Record<NonNullable<MiPanelLinkProps['variant']>, string> = {
  hero: 'Ir a mi panel',
  nav: 'Mi panel',
  outline: 'Volver a mi panel',
};

function MiPanelLinkInner({ variant = 'hero', className = '' }: MiPanelLinkProps) {
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useUser();
  const articleReturnPath = getArticleReturnPath(searchParams);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated && articleReturnPath) {
    return (
      <Link
        href={articleReturnPath}
        className={`${variantClasses[variant]} ${className}`.trim()}
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        <span>Volver al artículo</span>
      </Link>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const label = panelLabels[variant];

  return (
    <Link href="/mi-panel" className={`${variantClasses[variant]} ${className}`.trim()}>
      <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}

export function MiPanelLink(props: MiPanelLinkProps) {
  return (
    <Suspense fallback={null}>
      <MiPanelLinkInner {...props} />
    </Suspense>
  );
}
