'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { youtubeEmbedUrl, youtubeThumbnailUrl } from '@/lib/video/youtube';

interface YouTubeLiteProps {
  youtubeId: string;
  title: string;
  /** Carga el iframe directamente (p. ej. dentro de un modal que el usuario ya abrió). */
  autoLoad?: boolean;
  className?: string;
}

/**
 * Muestra solo la miniatura hasta que el usuario pulsa: el iframe de YouTube
 * pesa ~1 MB de JS y penalizaría LCP/INP si se cargara con la página.
 */
export function YouTubeLite({ youtubeId, title, autoLoad = false, className = '' }: YouTubeLiteProps) {
  const [active, setActive] = useState(autoLoad);

  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-2xl bg-slate-900 ${className}`}>
      {active ? (
        <iframe
          src={youtubeEmbedUrl(youtubeId, true)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Reproducir vídeo: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={youtubeThumbnailUrl(youtubeId)}
            alt={title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-slate-900/20 transition-colors group-hover:bg-slate-900/10" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-transform group-hover:scale-110">
            <Play className="h-7 w-7 translate-x-0.5 fill-current" aria-hidden />
          </span>
        </button>
      )}
    </div>
  );
}
