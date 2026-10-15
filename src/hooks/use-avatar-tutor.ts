'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import type { OrbState } from '@/components/tutor/AvatarOrb';

export interface TutorMessage {
  id: string;
  role: 'user' | 'tutor';
  text: string;
  spokenSpanish?: string;
  pronunciationText?: string;
}

export interface TutorFeedback {
  original: string;
  correction: string;
  explanation: string;
}

export interface TutorSource {
  title: string;
  url: string;
  category: string;
  level?: string | null;
}

interface UseTutorConfig {
  tutorId: string;
  tutorGender: 'male' | 'female';
  level: string;
  topic: string;
  onPreferencesDetected?: (preferences: { level?: string; topic?: string }) => void;
}

export function useAvatarTutor(config: UseTutorConfig) {
  const [orbState, setOrbState] = useState<OrbState>('idle');
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [feedback, setFeedback] = useState<TutorFeedback | null>(null);
  const [sources, setSources] = useState<TutorSource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);

  const [pendingImage, setPendingImage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const historyRef = useRef<{ role: string; content: string }[]>([]);

  const unlockAudio = useCallback(async () => {
    try {
      const ctx = new AudioContext();
      await ctx.resume();
      ctx.close();
    } catch { /* ignore */ }
  }, []);

  const speakWithBrowserVoice = useCallback((
    text: string,
    language: 'es' | 'en',
  ): Promise<boolean> => new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text.trim()) {
      resolve(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'es' ? 'es-ES' : 'en-GB';
      utterance.rate = language === 'en' ? 0.70 : 0.88;
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find((voice) =>
        voice.lang.toLowerCase() === utterance.lang.toLowerCase()
      ) ?? voices.find((voice) =>
        voice.lang.toLowerCase().startsWith(language === 'es' ? 'es-ES' : 'en-GB')
      ) ?? (language === 'es'
        ? voices.find((voice) => voice.lang.toLowerCase().startsWith('es'))
        : undefined);
      if (matchingVoice) utterance.voice = matchingVoice;
      utterance.onend = () => resolve(true);
      utterance.onerror = () => resolve(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      resolve(false);
    }
  }), []);

  const playAudioSegments = useCallback((
    segments: { language: 'es' | 'en'; text: string; audioBase64: string }[],
  ): Promise<{ played: number; failed: boolean }> => new Promise((resolve) => {
    if (audioRef.current) audioRef.current.pause();
    const playable = segments.filter((segment) => segment.audioBase64 || segment.text);
    if (playable.length === 0) {
      setOrbState('idle');
      resolve({ played: 0, failed: true });
      return;
    }

    let index = 0;
    let played = 0;
    let failed = false;
    setOrbState('speaking');

    const playNext = () => {
      if (index >= playable.length) {
        setOrbState('idle');
        resolve({ played, failed });
        return;
      }

      const segment = playable[index++];
      let objectUrl: string | null = null;
      let finished = false;
      let fallbackStarted = false;
      const cleanup = () => {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        if (audioRef.current?.src === objectUrl) audioRef.current = null;
      };
      const finish = (success: boolean) => {
        if (finished) return;
        finished = true;
        cleanup();
        if (success) played += 1;
        else failed = true;

        // Leave a perceptible pause between the Spanish explanation and the
        // English model phrase so learners can switch attention and repeat.
        const nextSegment = playable[index];
        const pauseMs = segment.language === 'es' && nextSegment?.language === 'en'
          ? 650
          : 320;
        if (index < playable.length) {
          window.setTimeout(playNext, pauseMs);
        } else {
          playNext();
        }
      };
      const tryBrowserVoice = async () => {
        if (fallbackStarted || finished) return;
        fallbackStarted = true;
        const success = await speakWithBrowserVoice(segment.text, segment.language);
        finish(success);
      };

      if (!segment.audioBase64) {
        void tryBrowserVoice();
        return;
      }

      try {
        // Blob URLs are more reliable than large data: URIs for MP3 playback
        // and make it possible to release the decoded audio after each segment.
        const binary = atob(segment.audioBase64);
        const bytes = new Uint8Array(binary.length);
        for (let byteIndex = 0; byteIndex < binary.length; byteIndex += 1) {
          bytes[byteIndex] = binary.charCodeAt(byteIndex);
        }
        objectUrl = URL.createObjectURL(new Blob([bytes], { type: 'audio/mpeg' }));
        const audio = new Audio(objectUrl);
        audio.preload = 'auto';
        // Slow the generated voice without making English and Spanish equally slow.
        // English model phrases are intentionally slower for pronunciation practice.
        audio.playbackRate = segment.language === 'en' ? 0.78 : 0.88;
        audioRef.current = audio;
        audio.onended = () => finish(true);
        audio.onerror = () => { void tryBrowserVoice(); };
        audio.play().catch(() => { void tryBrowserVoice(); });
      } catch {
        void tryBrowserVoice();
      }
    };

    playNext();
  }), [speakWithBrowserVoice]);

  const requestTutorSpeech = useCallback(async (
    spokenSpanish: string,
    pronunciationText = '',
  ): Promise<void> => {
    setError(null);
    if (!spokenSpanish.trim() && !pronunciationText.trim()) {
      setOrbState('idle');
      return;
    }

    setOrbState('thinking');
    try {
      const response = await fetch('/api/tutor-avatar/speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spokenSpanish,
          pronunciationText,
          tutorGender: config.tutorGender,
        }),
      });
      const data = await response.json().catch(() => ({})) as Record<string, unknown>;
      if (!response.ok) {
        throw new Error(typeof data.error === 'string'
          ? data.error
          : 'No he podido preparar la voz. La respuesta escrita sigue disponible.');
      }

      const segments = Array.isArray(data.segments)
        ? data.segments.filter((segment): segment is { language: 'es' | 'en'; text: string; audioBase64: string } =>
            Boolean(segment && typeof segment === 'object' &&
              ((segment as Record<string, unknown>).language === 'es' || (segment as Record<string, unknown>).language === 'en') &&
              typeof (segment as Record<string, unknown>).text === 'string' &&
              (typeof (segment as Record<string, unknown>).audioBase64 === 'string' ||
                typeof (segment as Record<string, unknown>).text === 'string'))
          ).map((segment) => ({
            language: segment.language,
            text: segment.text,
            audioBase64: typeof segment.audioBase64 === 'string' ? segment.audioBase64 : '',
          }))
        : [];
      if (segments.length === 0) {
        throw new Error('No se ha generado audio. Puedes leer la respuesta y volver a intentarlo.');
      }

      const playback = await playAudioSegments(segments);
      if (playback.played === 0) {
        setError('No se ha podido reproducir el audio. Prueba de nuevo o habilita el sonido del navegador.');
      } else if (playback.failed) {
        setError('Se ha reproducido parte del audio; otra parte no ha podido sonar en este navegador.');
      }
    } catch (error: unknown) {
      setOrbState('idle');
      setError(error instanceof Error
        ? error.message
        : 'El audio no está disponible ahora. La respuesta escrita sigue disponible.');
    }
  }, [config.tutorGender, playAudioSegments]);

  const replayPronunciation = useCallback(async (phrase: string) => {
    await requestTutorSpeech('', phrase);
  }, [requestTutorSpeech]);

  const replayTutorSpeech = useCallback(async (spokenSpanish: string, pronunciationText = '') => {
    await requestTutorSpeech(spokenSpanish, pronunciationText);
  }, [requestTutorSpeech]);

  const attachImage = useCallback((base64: string) => {
    setPendingImage(base64);
  }, []);

  const clearImage = useCallback(() => {
    setPendingImage(null);
  }, []);

  const start = useCallback(async () => {
    setError(null);
    setMessages([]);
    setFeedback(null);
    setSources([]);
    setPendingImage(null);
    historyRef.current = [];
    setOrbState('thinking');

    try {
      const res = await fetch('/api/tutor-avatar/greet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutorId: config.tutorId,
          tutorGender: config.tutorGender,
          topic: config.topic,
        }),
      });
      const payload = await res.json().catch(() => ({})) as Record<string, unknown>;
      if (!res.ok) {
        const message = typeof payload.error === 'string'
          ? payload.error
          : `No se pudo iniciar el tutor (HTTP ${res.status}).`;
        throw new Error(message);
      }

      const greeting = typeof payload.greeting === 'string' ? payload.greeting : '';
      if (!greeting) throw new Error('El tutor no ha devuelto un mensaje inicial. Inténtalo de nuevo.');

      const id = crypto.randomUUID();
      setMessages([{ id, role: 'tutor', text: greeting, spokenSpanish: greeting }]);
      historyRef.current = [{ role: 'assistant', content: greeting }];

      setIsActive(true);
      // Render the welcome immediately, then synthesize and play it asynchronously.
      await requestTutorSpeech(greeting, '');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo iniciar el tutor. Inténtalo de nuevo.');
      setOrbState('idle');
    }
  }, [config, requestTutorSpeech]);

  const startListening = useCallback(async () => {
    if (orbState !== 'idle') return;
    setError(null);
    await unlockAudio();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

        setOrbState('thinking');

        try {
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
            reader.readAsDataURL(blob);
          });

          const imageToSend = pendingImage;
          if (imageToSend) setPendingImage(null);

          const res = await fetch('/api/tutor-avatar/turn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              audioBase64: base64,
              imageBase64: imageToSend,
              history: historyRef.current,
              tutorId: config.tutorId,
              tutorGender: config.tutorGender,
              level: config.level,
              topic: config.topic,
            }),
          });

          const data = await res.json().catch(() => ({})) as Record<string, unknown>;
          if (!res.ok) {
            const message = typeof data.error === 'string'
              ? data.error
              : `El tutor no ha podido responder (HTTP ${res.status}).`;
            throw new Error(message);
          }

          if (data.noSpeechDetected === true) {
            setError('No te escuché. Mantén pulsado el micrófono mientras hablas e inténtalo de nuevo.');
            setOrbState('idle');
            return;
          }

          const transcription = typeof data.transcription === 'string' ? data.transcription : '';
          const reply = typeof data.reply === 'string' ? data.reply : '';
          const spokenSpanish = typeof data.spokenSpanish === 'string' ? data.spokenSpanish : reply;
          const pronunciationText = typeof data.pronunciationText === 'string' ? data.pronunciationText : '';
          const fb = data.feedback as TutorFeedback | null | undefined;

          if (data.levelDetected === true || data.topicDetected === true) {
            config.onPreferencesDetected?.({
              ...(data.levelDetected === true && typeof data.level === 'string' ? { level: data.level } : {}),
              ...(data.topicDetected === true && typeof data.topic === 'string' ? { topic: data.topic } : {}),
            });
          }

          const returnedSources = Array.isArray(data.sources)
            ? data.sources.filter((source): source is TutorSource =>
                Boolean(source && typeof source === 'object' &&
                  typeof (source as Record<string, unknown>).title === 'string' &&
                  typeof (source as Record<string, unknown>).url === 'string' &&
                  typeof (source as Record<string, unknown>).category === 'string')
              ).slice(0, 3)
            : [];
          setSources(returnedSources);

          const userId = crypto.randomUUID();
          const tutorId2 = crypto.randomUUID();

          setMessages((prev) => [
            ...prev,
            { id: userId, role: 'user', text: transcription },
            { id: tutorId2, role: 'tutor', text: reply, spokenSpanish, ...(pronunciationText ? { pronunciationText } : {}) },
          ]);

          historyRef.current = [
            ...historyRef.current,
            { role: 'user', content: transcription },
            { role: 'assistant', content: reply },
          ];

          if (fb) setFeedback(fb);
          else setFeedback(null);

          // Do not wait for TTS before displaying the answer; synthesize speech
          // in a separate request and play Spanish explanation then English example.
          await requestTutorSpeech(spokenSpanish, pronunciationText);
        } catch (e: unknown) {
          setError(e instanceof Error ? e.message : 'No se ha podido procesar tu respuesta. Inténtalo de nuevo.');
          setOrbState('idle');
        }
      };

      mediaRecorder.start();
      setOrbState('listening');
    } catch (e: any) {
      setError('No se pudo acceder al micrófono. Revisa los permisos.');
      setOrbState('idle');
    }
  }, [orbState, config, requestTutorSpeech]);

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && orbState === 'listening') {
      mediaRecorderRef.current.stop();
    }
  }, [orbState]);

  const stop = useCallback(() => {
    if (audioRef.current) audioRef.current.pause();
    if (mediaRecorderRef.current) {
      try { mediaRecorderRef.current.stop(); } catch { /* ignore */ }
    }
    setIsActive(false);
    setOrbState('idle');
    historyRef.current = [];
  }, []);

  return {
    orbState,
    messages,
    feedback,
    sources,
    error,
    isActive,
    pendingImage,
    start,
    startListening,
    stopListening,
    stop,
    unlockAudio,
    replayPronunciation,
    replayTutorSpeech,
    attachImage,
    clearImage,
  };
}
