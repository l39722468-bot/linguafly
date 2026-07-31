'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { PodcastEpisode } from '@/lib/podcasts/types'
import { isPodcastAudioAvailable } from '@/lib/podcasts/audio-available'
import PodcastTranscript from './PodcastTranscript'
import PodcastVocabulary from './PodcastVocabulary'
import PodcastQuestions from './PodcastQuestions'

interface PodcastPlayerProps {
  episode: PodcastEpisode
  initialProgress: number
}

type Tab = 'transcript' | 'vocabulary'
type PlaybackMode = 'mp3' | 'browser-tts'

const SPEEDS = [0.75, 1, 1.25] as const

function formatTime(s: number): string {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function estimateTtsDurationSeconds(episode: PodcastEpisode): number {
  const words = episode.transcript.reduce((n, turn) => n + turn.text.split(/\s+/).length, 0)
  return Math.max(episode.durationMinutes * 60, Math.round((words / 130) * 60))
}

export default function PodcastPlayer({ episode, initialProgress }: PodcastPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const ttsTurnRef = useRef(0)
  const ttsElapsedRef = useRef(0)
  const ttsTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isPlayingRef = useRef(false)
  const hasMp3 = isPodcastAudioAvailable(episode.id)

  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>(hasMp3 ? 'mp3' : 'browser-tts')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(initialProgress)
  const [duration, setDuration] = useState(hasMp3 ? 0 : estimateTtsDurationSeconds(episode))
  const [speed, setSpeed] = useState<0.75 | 1 | 1.25>(1)
  const [tab, setTab] = useState<Tab>('transcript')
  const [completed, setCompleted] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [usingBrowserVoice, setUsingBrowserVoice] = useState(!hasMp3)
  const lastSavedRef = useRef(0)

  const stopTtsTimer = useCallback(() => {
    if (ttsTimerRef.current) {
      clearInterval(ttsTimerRef.current)
      ttsTimerRef.current = null
    }
  }, [])

  const stopBrowserTts = useCallback(() => {
    stopTtsTimer()
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    isPlayingRef.current = false
    setIsPlaying(false)
  }, [stopTtsTimer])

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  const saveProgress = useCallback(async (seconds: number, done: boolean) => {
    try {
      await fetch('/api/podcasts/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ episodeId: episode.id, progressSeconds: Math.floor(seconds), completed: done }),
      })
    } catch {
    }
  }, [episode.id])

  const markProgress = useCallback((t: number, total: number) => {
    setCurrentTime(t)
    if (t - lastSavedRef.current >= 10) {
      lastSavedRef.current = t
      const pct = total > 0 ? t / total : 0
      const done = pct >= 0.8
      if (done && !completed) setCompleted(true)
      saveProgress(t, done)
    }
  }, [completed, saveProgress])

  const speakTurn = useCallback((turnIndex: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setAudioError('Tu navegador no puede reproducir audio de este episodio.')
      setIsPlaying(false)
      return
    }

    if (turnIndex >= episode.transcript.length) {
      stopTtsTimer()
      setIsPlaying(false)
      setCompleted(true)
      saveProgress(duration, true)
      return
    }

    ttsTurnRef.current = turnIndex
    const turn = episode.transcript[turnIndex]
    const utterance = new SpeechSynthesisUtterance(turn.text)
    utterance.lang = 'en-US'
    utterance.rate = speed

    utterance.onend = () => {
      if (!isPlayingRef.current) return
      speakTurn(turnIndex + 1)
    }

    utterance.onerror = () => {
      setAudioError('No se pudo reproducir la voz del navegador. Prueba otro navegador o lee la transcripción.')
      stopBrowserTts()
    }

    window.speechSynthesis.speak(utterance)
  }, [duration, episode.transcript, saveProgress, speed, stopBrowserTts, stopTtsTimer])

  const startBrowserTts = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setAudioError('Tu navegador no admite síntesis de voz.')
      return
    }

    setAudioError(null)
    setUsingBrowserVoice(true)
    setPlaybackMode('browser-tts')
    isPlayingRef.current = true
    setIsPlaying(true)

    const estimated = duration || estimateTtsDurationSeconds(episode)
    if (!duration) setDuration(estimated)

    ttsElapsedRef.current = currentTime
    stopTtsTimer()
    ttsTimerRef.current = setInterval(() => {
      ttsElapsedRef.current += 0.25
      markProgress(Math.min(ttsElapsedRef.current, estimated), estimated)
    }, 250)

    const startTurn = Math.min(
      Math.floor((currentTime / estimated) * episode.transcript.length),
      episode.transcript.length - 1
    )
    speakTurn(startTurn)
  }, [currentTime, duration, episode, markProgress, speakTurn, stopTtsTimer])

  useEffect(() => {
    return () => {
      stopBrowserTts()
    }
  }, [stopBrowserTts])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || playbackMode !== 'mp3') return

    const applyInitialProgress = () => {
      if (initialProgress > 0 && Number.isFinite(audio.duration)) {
        audio.currentTime = Math.min(initialProgress, audio.duration)
        setCurrentTime(audio.currentTime)
      }
    }

    if (audio.readyState >= 1) {
      applyInitialProgress()
    } else {
      audio.addEventListener('loadedmetadata', applyInitialProgress, { once: true })
      return () => audio.removeEventListener('loadedmetadata', applyInitialProgress)
    }
  }, [initialProgress, playbackMode])

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    markProgress(audio.currentTime, audio.duration || duration)
  }, [duration, markProgress])

  const handleLoadedMetadata = () => {
    const audio = audioRef.current
    if (!audio) return
    setDuration(audio.duration)
    setAudioError(null)
  }

  const handleAudioError = () => {
    setIsPlaying(false)
    setAudioError('No se pudo cargar el audio de este episodio.')
    setUsingBrowserVoice(true)
    setPlaybackMode('browser-tts')
    if (!duration) setDuration(estimateTtsDurationSeconds(episode))
  }

  const togglePlay = async () => {
    if (playbackMode === 'browser-tts') {
      if (isPlaying) {
        stopBrowserTts()
      } else {
        startBrowserTts()
      }
      return
    }

    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      return
    }

    try {
      await audio.play()
    } catch {
      setIsPlaying(false)
      setAudioError('No se pudo iniciar la reproducción. Usa la voz del navegador como alternativa.')
      setUsingBrowserVoice(true)
      setPlaybackMode('browser-tts')
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value)

    if (playbackMode === 'browser-tts') {
      stopBrowserTts()
      setCurrentTime(t)
      ttsElapsedRef.current = t
      return
    }

    if (audioRef.current) audioRef.current.currentTime = t
    setCurrentTime(t)
  }

  const cycleSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length]
    setSpeed(next)
    if (playbackMode === 'mp3' && audioRef.current) {
      audioRef.current.playbackRate = next
    }
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div>
      {hasMp3 && (
        <audio
          ref={audioRef}
          src={episode.audioUrl}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={handleAudioError}
          onEnded={() => {
            setIsPlaying(false)
            setCompleted(true)
            saveProgress(duration, true)
          }}
        />
      )}

      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">
        <div className="mb-4">
          <h1 className="text-xl font-black text-slate-900">{episode.title}</h1>
          <p className="text-sm text-slate-500 mt-0.5">{episode.description}</p>
        </div>

        {audioError && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {audioError}
            {usingBrowserVoice && playbackMode === 'browser-tts' && !isPlaying && (
              <button
                type="button"
                onClick={startBrowserTts}
                className="mt-2 block font-semibold text-amber-950 underline underline-offset-2"
              >
                Escuchar con la voz del navegador
              </button>
            )}
          </div>
        )}

        {!hasMp3 && !audioError && (
          <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-900">
            El audio grabado aún no está disponible para este episodio. Pulsa reproducir para escucharlo con la voz de tu navegador.
          </div>
        )}

        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-slate-900 hover:bg-slate-700 text-white flex items-center justify-center transition shrink-0"
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            )}
          </button>

          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={duration || episode.durationMinutes * 60}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{duration > 0 ? formatTime(duration) : `${episode.durationMinutes}:00`}</span>
            </div>
          </div>

          <button
            onClick={cycleSpeed}
            className="text-xs font-bold text-slate-600 border border-slate-200 rounded-lg px-2.5 py-1.5 hover:bg-slate-50 transition w-14 text-center"
          >
            {speed}x
          </button>
        </div>

        {progress >= 80 && (
          <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
            <span className="font-bold">✓</span> Episodio completado
          </div>
        )}
      </div>

      <div className="flex border-b border-slate-200 mb-5">
        {(['transcript', 'vocabulary'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition ${
              tab === t
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {t === 'transcript' ? 'Transcripción' : 'Vocabulario'}
          </button>
        ))}
      </div>

      <div className="mb-8">
        {tab === 'transcript' ? (
          <PodcastTranscript turns={episode.transcript} currentTime={currentTime} />
        ) : (
          <PodcastVocabulary items={episode.vocabulary} />
        )}
      </div>

      <div className="border-t border-slate-200 pt-6">
        <h2 className="text-base font-black text-slate-900 mb-4">Preguntas de comprensión</h2>
        <PodcastQuestions questions={episode.comprehensionQuestions} unlocked={completed} />
      </div>
    </div>
  )
}
