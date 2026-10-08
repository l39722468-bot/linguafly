'use client';

import { useEffect, useState } from 'react';
import { PlayCircle, X } from 'lucide-react';
import { YouTubeLite } from '@/components/video/YouTubeLite';

interface UnitVideoLauncherProps {
  youtubeId: string;
  title: string;
}

/**
 * Botón flotante común a todas las unidades interactivas: cada curso tiene su
 * propio page.tsx, así que el vídeo se monta desde el layout en lugar de
 * tocar cada pantalla de ejercicios.
 */
export function UnitVideoLauncher({ youtubeId, title }: UnitVideoLauncherProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
      >
        <PlayCircle className="h-5 w-5" aria-hidden />
        Vídeo-clase
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div className="w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="font-bold text-white">{title}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar vídeo"
                className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <YouTubeLite youtubeId={youtubeId} title={title} autoLoad />
          </div>
        </div>
      ) : null}
    </>
  );
}
