'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { PodcastEpisode, PodcastTrack, PodcastDuration } from '@/lib/podcasts/types'
import { isPodcastAudioAvailable } from '@/lib/podcasts/audio-available'

interface PodcastLibraryProps {
  episodes: PodcastEpisode[]
  progress: Record<string, { completed: boolean }>
}

const TRACK_LABELS: Record<PodcastTrack, string> = {
  general: 'General',
  professional: 'Profesional',
  travel: 'Viajes',
}

const TRACK_COLORS: Record<PodcastTrack, string> = {
  general: 'bg-blue-100 text-blue-700',
  professional: 'bg-purple-100 text-purple-700',
  travel: 'bg-emerald-100 text-emerald-700',
}

const DURATION_OPTIONS: PodcastDuration[] = [2, 5, 10, 20, 30]

export default function PodcastLibrary({ episodes, progress }: PodcastLibraryProps) {
  const [activeTrack, setActiveTrack] = useState<PodcastTrack | null>(null)
  const [activeDuration, setActiveDuration] = useState<PodcastDuration | null>(null)

  const filtered = episodes.filter((ep) => {
    if (activeTrack && ep.track !== activeTrack) return false
    if (activeDuration && ep.durationMinutes !== activeDuration) return false
    return true
  })

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {(['general', 'professional', 'travel'] as PodcastTrack[]).map((track) => (
          <button
            key={track}
            onClick={() => setActiveTrack(activeTrack === track ? null : track)}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition ${
              activeTrack === track
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
            }`}
          >
            {TRACK_LABELS[track]}
          </button>
        ))}
        <span className="mx-1 text-slate-300 self-center">|</span>
        {DURATION_OPTIONS.map((d) => (
          <button
            key={d}
            onClick={() => setActiveDuration(activeDuration === d ? null : d)}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition ${
              activeDuration === d
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
            }`}
          >
            {d} min
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-500 mb-5">{filtered.length} episodios</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((ep) => {
          const done = progress[ep.id]?.completed ?? false
          const hasAudio = isPodcastAudioAvailable(ep.id)
          return (
            <Link
              key={ep.id}
              href={`/mi-panel/podcasts/${ep.id}`}
              className="group block bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-400 hover:shadow-sm transition"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${TRACK_COLORS[ep.track]}`}>
                  {TRACK_LABELS[ep.track]}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
                  <span>{ep.durationMinutes} min</span>
                  {!hasAudio && (
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                      Voz navegador
                    </span>
                  )}
                  {done && (
                    <span className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">✓</span>
                  )}
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-700 transition">
                {ep.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ep.description}</p>
              <p className="text-xs text-slate-400 mt-2">Módulo {ep.module} · A1</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
