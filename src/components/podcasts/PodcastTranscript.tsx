'use client'

import { useEffect, useMemo, useRef } from 'react'
import type { DialogueTurn } from '@/lib/podcasts/types'
import { getActiveTurnIndex } from '@/lib/podcasts/transcript-timing'

interface PodcastTranscriptProps {
  turns: DialogueTurn[]
  currentTime?: number
  duration?: number
}

export default function PodcastTranscript({
  turns,
  currentTime = 0,
  duration = 0,
}: PodcastTranscriptProps) {
  const activeRef = useRef<HTMLDivElement>(null)

  const activeIndex = useMemo(
    () => getActiveTurnIndex(turns, currentTime, duration),
    [turns, currentTime, duration]
  )

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [activeIndex])

  return (
    <div className="space-y-3">
      {turns.map((turn, i) => {
        const isActive = i === activeIndex
        return (
          <div
            key={i}
            ref={isActive ? activeRef : undefined}
            className={`flex gap-3 ${turn.speaker === 'B' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                turn.speaker === 'A'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {turn.voice === 'orion' ? 'T' : 'S'}
            </div>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed transition-colors ${
                turn.speaker === 'A'
                  ? 'bg-blue-50 text-slate-800 rounded-tl-sm'
                  : 'bg-emerald-50 text-slate-800 rounded-tr-sm'
              } ${isActive ? 'ring-2 ring-slate-900/20 shadow-sm' : 'opacity-80'}`}
            >
              {turn.text}
            </div>
          </div>
        )
      })}
    </div>
  )
}
