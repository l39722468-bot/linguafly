"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  /** Si se define, sustituye al TTS de Workers AI (p. ej. URL en CDN) */
  audioUrl?: string | null;
  /** Si true, solo síntesis del navegador (sin llamar a /api/vocabulario/tts) */
  preferBrowser?: boolean;
  label?: string;
};

function buildTtsApiUrl(word: string): string {
  const params = new URLSearchParams({ text: word });
  return `/api/vocabulario/tts?${params.toString()}`;
}

export function VocabAudioButton({
  text,
  audioUrl,
  preferBrowser = false,
  label = "Escuchar pronunciación",
}: Props) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playBrowser = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.92;
    u.onend = () => setPlaying(false);
    u.onerror = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(u);
  }, [text]);

  const stopCurrent = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  useEffect(() => {
    return () => stopCurrent();
  }, [stopCurrent, text]);

  const playUrl = useCallback(
    (url: string) => {
      const a = new Audio(url);
      audioRef.current = a;
      a.onended = () => {
        setPlaying(false);
        audioRef.current = null;
      };
      a.onerror = () => {
        setPlaying(false);
        audioRef.current = null;
        playBrowser();
      };
      setPlaying(true);
      a.play().catch(() => {
        setPlaying(false);
        audioRef.current = null;
        playBrowser();
      });
    },
    [playBrowser]
  );

  const onClick = () => {
    stopCurrent();

    if (preferBrowser) {
      playBrowser();
      return;
    }
    if (audioUrl) {
      playUrl(audioUrl);
      return;
    }
    playUrl(buildTtsApiUrl(text));
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={playing}
      title={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-coral-600 hover:bg-coral-50 hover:border-coral-200 transition-colors disabled:opacity-60 dark:bg-slate-900 dark:border-slate-700 dark:text-coral-400 dark:hover:bg-slate-800"
      aria-label={label}
    >
      {playing ? (
        <span className="text-xs font-bold">···</span>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 9v6h4l5 4V5L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
      )}
    </button>
  );
}
