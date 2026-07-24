'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { getNextUnitSlug } from '@/lib/access/sequential-unit-access';

type UnitJourneyContinueProps = {
  coursePath: string;
  currentUnitId: string;
  totalUnits: number;
  /** Avanza automáticamente a la siguiente unidad tras completar. */
  autoAdvance?: boolean;
  autoAdvanceMs?: number;
  className?: string;
};

/**
 * CTA al terminar una unidad: en modo secuencial avanza a la siguiente
 * sin volver al listado de unidades.
 */
export function UnitJourneyContinue({
  coursePath,
  currentUnitId,
  totalUnits,
  autoAdvance = true,
  autoAdvanceMs = 4500,
  className = '',
}: UnitJourneyContinueProps) {
  const router = useRouter();
  const nextUnitId = getNextUnitSlug(currentUnitId, totalUnits);
  const nextHref = nextUnitId ? `${coursePath}/${nextUnitId}` : null;

  useEffect(() => {
    if (!autoAdvance || !nextHref) return;
    const timer = setTimeout(() => router.push(nextHref), autoAdvanceMs);
    return () => clearTimeout(timer);
  }, [autoAdvance, autoAdvanceMs, nextHref, router]);

  if (nextHref) {
    return (
      <div className={`space-y-3 ${className}`}>
        <Link
          href={nextHref}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-5 text-lg font-black text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-slate-800"
        >
          Siguiente unidad
          <ArrowRight className="h-5 w-5" />
        </Link>
        {autoAdvance && (
          <p className="text-center text-xs text-slate-500">
            Continuando automáticamente en unos segundos…
          </p>
        )}
      </div>
    );
  }

  return (
    <Link
      href={coursePath}
      className={`block w-full rounded-2xl bg-slate-900 py-5 text-center text-lg font-black text-white shadow-xl transition-all hover:bg-slate-800 ${className}`}
    >
      ¡Has completado todo el curso!
    </Link>
  );
}
