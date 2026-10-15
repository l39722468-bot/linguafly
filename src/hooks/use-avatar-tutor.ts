'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import type { OrbState } from '@/components/tutor/AvatarOrb';

export interface TutorMessage {
  id: string;
  role: 'user' | 'tutor';
  text: string;
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

  const playAudioBase64 = useCallback((base64: string): Promise<void> => {
    return new Promise((resolve) => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(`data:audio/mpeg;base64,${base64}`);
      audioRef.current = audio;
      setOrbState('speaking');
      audio.onended = () => {
        setOrbState('idle');
        resolve();
      };
      audio.onerror = () => {
        setOrbState('idle');
        resolve();
      };
      audio.play().catch(() => {
        setOrbState('idle');
        resolve();
      });
    });
  }, []);

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
      const audioBase64 = typeof payload.audioBase64 === 'string' ? payload.audioBase64 : '';
      if (!greeting) throw new Error('El tutor no ha devuelto un mensaje inicial. Inténtalo de nuevo.');

      const id = crypto.randomUUID();
      setMessages([{ id, role: 'tutor', text: greeting }]);
      historyRef.current = [{ role: 'assistant', content: greeting }];

      setIsActive(true);
      if (audioBase64) {
        await playAudioBase64(audioBase64);
      } else {
        setOrbState('idle');
        if (payload.audioUnavailable === true) {
          setError('El tutor está listo, pero el audio inicial no se pudo generar. Puedes hablar y continuar; estamos recuperando la voz.');
        }
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo iniciar el tutor. Inténtalo de nuevo.');
      setOrbState('idle');
    }
  }, [config, playAudioBase64]);

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
          const fb = data.feedback as TutorFeedback | null | undefined;
          const replyAudio = typeof data.audioBase64 === 'string' ? data.audioBase64 : '';

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
            { id: tutorId2, role: 'tutor', text: reply },
          ]);

          historyRef.current = [
            ...historyRef.current,
            { role: 'user', content: transcription },
            { role: 'assistant', content: reply },
          ];

          if (fb) setFeedback(fb);
          else setFeedback(null);

          if (replyAudio) {
            await playAudioBase64(replyAudio);
            if (data.audioUnavailable === true) {
              setError('La respuesta está en la conversación, pero no se pudo generar el audio de voz.');
            }
          } else {
            setOrbState('idle');
            if (data.audioUnavailable === true || data.audioBase64 === '') {
              setError('La respuesta está en la conversación, pero no se pudo generar el audio de voz.');
            }
          }
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
  }, [orbState, config, playAudioBase64]);

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
    attachImage,
    clearImage,
  };
}
