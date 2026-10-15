'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface RealtimeFeedback {
  original?: string;
  correction?: string;
  explanation?: string;
}

export interface RealtimeMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  isFinal: boolean;
  feedback?: RealtimeFeedback | null;
}

export interface RealtimeSessionConfig {
  tutorId?: string;
  level?: string;
  scenario?: string;
}

export interface RealtimeState {
  isConnected: boolean;
  isConnecting: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  transcript: RealtimeMessage[];
  error: string | null;
}

const VOICE_TURN_SILENCE_MS = 1000;
const MIN_SPEECH_MS = 450;
const SPEECH_RMS_THRESHOLD = 0.018;

export function useRealtimeAI() {
  const [state, setState] = useState<RealtimeState>({
    isConnected: false,
    isConnecting: false,
    isListening: false,
    isSpeaking: false,
    transcript: [],
    error: null,
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const silentGainRef = useRef<GainNode | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const turnAbortControllerRef = useRef<AbortController | null>(null);
  const assistantPlayingRef = useRef(false);

  const instructionsRef = useRef('');
  const voiceRef = useRef('shimmer');
  const sessionConfigRef = useRef<Required<RealtimeSessionConfig>>({
    tutorId: 'tutor1',
    level: 'Intermediate',
    scenario: 'Spoken English conversation',
  });
  const transcriptRef = useRef<RealtimeMessage[]>([]);
  const sessionActiveRef = useRef(false);
  const processingTurnRef = useRef(false);
  const speechStartedAtRef = useRef(0);
  const lastVoiceAtRef = useRef(0);

  const appendFinalMessage = useCallback((
    role: 'user' | 'assistant',
    text: string,
    feedback?: RealtimeFeedback | null,
  ) => {
    const message: RealtimeMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      role,
      text,
      isFinal: true,
      ...(feedback ? { feedback } : {}),
    };
    const next = [...transcriptRef.current, message].slice(-40);
    transcriptRef.current = next;
    setState((prev) => ({ ...prev, transcript: next }));
  }, []);

  const processRecordedTurn = useCallback(async (audioBlob: Blob) => {
    if (!sessionActiveRef.current || processingTurnRef.current || audioBlob.size < 1500) return;

    processingTurnRef.current = true;
    const abortController = new AbortController();
    turnAbortControllerRef.current = abortController;
    setState((prev) => ({ ...prev, isListening: false, isSpeaking: false, error: null }));

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'linguafly-voice-turn.webm');
      const transcriptionResponse = await fetch('/api/ai-lab/stt', {
        method: 'POST',
        body: formData,
        signal: abortController.signal,
      });

      if (!sessionActiveRef.current) return;
      if (!transcriptionResponse.ok) {
        throw new Error('No se pudo transcribir el audio. Comprueba la conexión e inténtalo de nuevo.');
      }

      const transcriptionData = await transcriptionResponse.json();
      if (!sessionActiveRef.current) return;
      const userText = typeof transcriptionData.transcription === 'string'
        ? transcriptionData.transcription.trim()
        : '';
      if (!userText) return;

      appendFinalMessage('user', userText);
      const conversationMessages = transcriptRef.current
        .slice(-16)
        .map((message) => ({
          role: message.role,
          content: message.text,
        }));

      const chatResponse = await fetch('/api/ai-tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutorId: sessionConfigRef.current.tutorId,
          messages: conversationMessages,
          level: sessionConfigRef.current.level,
          scenario: sessionConfigRef.current.scenario,
          instructions: instructionsRef.current,
        }),
        signal: abortController.signal,
      });

      if (!sessionActiveRef.current) return;
      if (!chatResponse.ok) {
        throw new Error('El tutor no está disponible ahora. Inténtalo de nuevo.');
      }

      const chatData = await chatResponse.json();
      if (!sessionActiveRef.current) return;
      if (!chatData.success || typeof chatData.reply !== 'string' || !chatData.reply.trim()) {
        throw new Error(chatData.error || 'El tutor no ha podido responder.');
      }

      const reply = chatData.reply.trim();
      const feedbackValue = chatData.feedback && typeof chatData.feedback === 'object'
        ? chatData.feedback as Record<string, unknown>
        : null;
      const feedback = feedbackValue
        ? {
            original: typeof feedbackValue.original === 'string' ? feedbackValue.original.slice(0, 300) : '',
            correction: typeof feedbackValue.correction === 'string' ? feedbackValue.correction.slice(0, 300) : '',
            explanation: typeof feedbackValue.explanation === 'string' ? feedbackValue.explanation.slice(0, 500) : '',
          }
        : null;
      appendFinalMessage('assistant', reply, feedback);

      const speechResponse = await fetch('/api/ai-tutor/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: reply, voiceId: voiceRef.current }),
        signal: abortController.signal,
      });

      if (!sessionActiveRef.current) return;
      if (!speechResponse.ok) {
        throw new Error('La respuesta está disponible en texto, pero no se ha podido generar la voz.');
      }

      const speechBlob = await speechResponse.blob();
      if (!sessionActiveRef.current) return;

      if (!sessionActiveRef.current) return;
      const objectUrl = URL.createObjectURL(speechBlob);
      audioUrlRef.current = objectUrl;
      const audio = new Audio(objectUrl);
      audioRef.current = audio;
      assistantPlayingRef.current = true;
      setState((prev) => ({ ...prev, isSpeaking: true }));

      await new Promise<void>((resolve) => {
        let settled = false;
        const finish = () => {
          if (settled) return;
          settled = true;
          assistantPlayingRef.current = false;
          audio.onended = null;
          audio.onerror = null;
          resolve();
        };
        audio.onended = finish;
        audio.onerror = finish;
        audio.play().catch(() => {
          if (sessionActiveRef.current) {
            setState((prev) => ({
              ...prev,
              error: 'La respuesta está lista, pero el navegador ha bloqueado la reproducción de audio.',
            }));
          }
          finish();
        });
      });

      if (audioUrlRef.current === objectUrl) {
        URL.revokeObjectURL(objectUrl);
        audioUrlRef.current = null;
      }
      if (audioRef.current === audio) audioRef.current = null;
    } catch (error: unknown) {
      if (sessionActiveRef.current) {
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Ha ocurrido un error en la conversación.',
        }));
      }
    } finally {
      processingTurnRef.current = false;
      if (turnAbortControllerRef.current === abortController) turnAbortControllerRef.current = null;
      if (sessionActiveRef.current) {
        setState((prev) => ({ ...prev, isSpeaking: false, isListening: true }));
      }
    }
  }, [appendFinalMessage]);

  const connect = useCallback(async (
    instructions: string,
    voice: string = 'shimmer',
    config: RealtimeSessionConfig = {},
  ) => {
    if (sessionActiveRef.current) return;

    setState((prev) => ({ ...prev, isConnecting: true, error: null }));
    try {
      instructionsRef.current = typeof instructions === 'string' ? instructions.slice(0, 3500) : '';
      voiceRef.current = typeof voice === 'string' ? voice.slice(0, 80) : 'shimmer';
      sessionConfigRef.current = {
        tutorId: typeof config.tutorId === 'string' ? config.tutorId.slice(0, 64) : 'tutor1',
        level: typeof config.level === 'string' ? config.level.slice(0, 32) : 'Intermediate',
        scenario: typeof config.scenario === 'string' ? config.scenario.slice(0, 120) : 'Spoken English conversation',
      };
      transcriptRef.current = [];
      sessionActiveRef.current = true;
      setState((prev) => ({
        ...prev,
        isConnected: true,
        isConnecting: false,
        isListening: false,
        isSpeaking: false,
        transcript: [],
        error: null,
      }));
    } catch {
      sessionActiveRef.current = false;
      setState((prev) => ({
        ...prev,
        isConnected: false,
        isConnecting: false,
        error: 'No se ha podido iniciar la conversación.',
      }));
    }
  }, []);

  const updateInstructions = useCallback((instructions: string) => {
    instructionsRef.current = typeof instructions === 'string' ? instructions.slice(0, 3500) : '';
  }, []);

  const startRecording = useCallback(async () => {
    if (!sessionActiveRef.current || micStreamRef.current) return;

    try {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        throw new Error('Este navegador no permite acceder al micrófono.');
      }
      if (typeof MediaRecorder === 'undefined') {
        throw new Error('Este navegador no admite grabación de audio. Prueba con una versión reciente de Chrome, Edge o Safari.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      if (!sessionActiveRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(2048, 1, 1);
      const silentGain = audioContext.createGain();
      silentGain.gain.value = 0;

      micStreamRef.current = stream;
      audioContextRef.current = audioContext;
      sourceRef.current = source;
      processorRef.current = processor;
      silentGainRef.current = silentGain;

      processor.onaudioprocess = (event) => {
        if (!sessionActiveRef.current || processingTurnRef.current || assistantPlayingRef.current) return;

        const samples = event.inputBuffer.getChannelData(0);
        let sumSquares = 0;
        for (let index = 0; index < samples.length; index += 1) {
          sumSquares += samples[index] * samples[index];
        }
        const rms = Math.sqrt(sumSquares / samples.length);
        const now = Date.now();
        const currentRecorder = recorderRef.current;

        if (currentRecorder?.state === 'recording') {
          if (rms >= SPEECH_RMS_THRESHOLD) {
            lastVoiceAtRef.current = now;
          } else if (
            now - lastVoiceAtRef.current >= VOICE_TURN_SILENCE_MS &&
            now - speechStartedAtRef.current >= MIN_SPEECH_MS
          ) {
            currentRecorder.stop();
            setState((prev) => ({ ...prev, isListening: false }));
          }
          return;
        }

        if (!currentRecorder && rms >= SPEECH_RMS_THRESHOLD) {
          try {
            const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
              ? 'audio/webm;codecs=opus'
              : undefined;
            const recorder = mimeType
              ? new MediaRecorder(stream, { mimeType })
              : new MediaRecorder(stream);

            recordedChunksRef.current = [];
            speechStartedAtRef.current = now;
            lastVoiceAtRef.current = now;
            recorder.ondataavailable = (dataEvent) => {
              if (dataEvent.data.size > 0) recordedChunksRef.current.push(dataEvent.data);
            };
            recorder.onstop = () => {
              const chunks = recordedChunksRef.current;
              recordedChunksRef.current = [];
              if (recorderRef.current === recorder) recorderRef.current = null;
              const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
              const duration = Date.now() - speechStartedAtRef.current;
              if (sessionActiveRef.current && duration >= MIN_SPEECH_MS) {
                void processRecordedTurn(blob);
              }
            };
            recorderRef.current = recorder;
            recorder.start(200);
            setState((prev) => ({ ...prev, isListening: true, error: null }));
          } catch {
            setState((prev) => ({
              ...prev,
              error: 'No se ha podido grabar el audio en este navegador.',
            }));
          }
        }
      };

      source.connect(processor);
      processor.connect(silentGain);
      silentGain.connect(audioContext.destination);
      setState((prev) => ({ ...prev, isListening: true, error: null }));
    } catch (error: unknown) {
      setState((prev) => ({
        ...prev,
        isListening: false,
        error: error instanceof Error ? error.message : 'No se ha podido activar el micrófono.',
      }));
    }
  }, [processRecordedTurn]);

  const cleanup = useCallback(() => {
    sessionActiveRef.current = false;
    processingTurnRef.current = false;
    assistantPlayingRef.current = false;
    turnAbortControllerRef.current?.abort();
    turnAbortControllerRef.current = null;

    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.onstop = null;
      recorderRef.current.stop();
    }
    recorderRef.current = null;
    recordedChunksRef.current = [];

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.onaudioprocess = null;
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    sourceRef.current?.disconnect();
    sourceRef.current = null;
    silentGainRef.current?.disconnect();
    silentGainRef.current = null;
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      void audioContextRef.current.close().catch(() => undefined);
      audioContextRef.current = null;
    }
  }, []);

  const disconnect = useCallback(() => {
    cleanup();
    setState((prev) => ({
      ...prev,
      isConnected: false,
      isConnecting: false,
      isListening: false,
      isSpeaking: false,
    }));
  }, [cleanup]);

  useEffect(() => cleanup, [cleanup]);

  return {
    ...state,
    connect,
    disconnect,
    startRecording,
    updateInstructions,
  };
}
