"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ScenarioId = "free" | "listening" | "restaurant" | "travel" | "interview";
type TurnStatus = "idle" | "recording" | "processing";
type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

type TurnResponse = {
  transcript: string;
  reply: string;
  audio: string | null;
  audioMimeType?: string;
  error?: string;
};

const scenarios: Array<{ id: ScenarioId; title: string; description: string }> = [
  { id: "free", title: "Conversación libre", description: "Habla de tu día, tus aficiones o cualquier tema." },
  { id: "listening", title: "Escucha y responde", description: "Escucha primero sin leer la transcripción y responde en inglés. Puedes revelar el texto después de intentarlo." },
  { id: "restaurant", title: "En un restaurante", description: "Pide comida, pregunta por el menú y resuelve una situación." },
  { id: "travel", title: "Viajes y aeropuerto", description: "Practica situaciones de viaje, hotel y transporte." },
  { id: "interview", title: "Entrevista de trabajo", description: "Practica respuestas profesionales y preguntas habituales." },
];

function decodeBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "No se ha podido procesar el turno. Inténtalo de nuevo.";
}

export function RealtimeConversation({
  cefrLevel,
  explanationLanguage,
}: {
  cefrLevel: string | null;
  explanationLanguage: string;
}) {
  const [scenario, setScenario] = useState<ScenarioId>("free");
  const [status, setStatus] = useState<TurnStatus>("idle");
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const messagesRef = useRef<ChatMessage[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const microphoneStreamRef = useRef<MediaStream | null>(null);
  const recordingChunksRef = useRef<BlobPart[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);
  const playbackUrlRef = useRef<string | null>(null);

  const level = cefrLevel ?? "A1";

  useEffect(() => {
    messagesRef.current = messages;
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const releaseMicrophone = useCallback(() => {
    microphoneStreamRef.current?.getTracks().forEach((track) => track.stop());
    microphoneStreamRef.current = null;
    mediaRecorderRef.current = null;
  }, []);

  const clearPlayback = useCallback(() => {
    if (playbackUrlRef.current) URL.revokeObjectURL(playbackUrlRef.current);
    playbackUrlRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute("src");
      audioRef.current.load();
    }
    setIsPlayingAudio(false);
  }, []);

  useEffect(() => () => {
    releaseMicrophone();
    if (playbackUrlRef.current) URL.revokeObjectURL(playbackUrlRef.current);
    if (audioRef.current) audioRef.current.pause();
  }, [releaseMicrophone]);

  const sendTurn = useCallback(async (audioBlob: Blob | null, startSession: boolean) => {
    setStatus("processing");
    setError(null);
    setNotice(null);

    try {
      const form = new FormData();
      form.append("scenario", scenario);
      form.append("start", String(startSession));
      form.append(
        "history",
        JSON.stringify(messagesRef.current.slice(-10).map(({ role, text }) => ({ role, text }))),
      );

      if (audioBlob) {
        const filename = audioBlob.type.includes("mp4") ? "speech.m4a" : "speech.webm";
        form.append("audio", audioBlob, filename);
      }

      const response = await fetch("/api/conversacion/turn", {
        method: "POST",
        body: form,
        cache: "no-store",
      });
      const result = (await response.json()) as TurnResponse;
      if (!response.ok) throw new Error(result.error || "No se ha podido procesar la respuesta.");

      setMessages((previous) => {
        const next = [...previous];
        if (result.transcript?.trim()) {
          next.push({
            id: crypto.randomUUID(),
            role: "user",
            text: result.transcript.trim(),
          });
        }
        if (result.reply?.trim()) {
          next.push({
            id: crypto.randomUUID(),
            role: "assistant",
            text: result.reply.trim(),
          });
        }
        return next;
      });

      if (result.audio) {
        clearPlayback();
        const bytes = decodeBase64(result.audio);
        const blob = new Blob([bytes], { type: result.audioMimeType || "audio/mpeg" });
        const url = URL.createObjectURL(blob);
        playbackUrlRef.current = url;
        if (audioRef.current) {
          audioRef.current.src = url;
          setIsPlayingAudio(true);
          try {
            await audioRef.current.play();
          } catch {
            setIsPlayingAudio(false);
            setNotice("La respuesta está lista. Pulsa reproducir en el control de audio para escucharla.");
          }
        }
      } else if (result.reply) {
        setNotice("La respuesta aparece en texto, pero la voz no está disponible ahora. Puedes continuar leyendo.");
      }

      setHasStarted(true);
    } catch (turnError) {
      setError(getErrorMessage(turnError));
    } finally {
      setStatus("idle");
    }
  }, [scenario, clearPlayback]);

  const startRecording = useCallback(async () => {
    setError(null);
    setNotice(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
        throw new Error("Este navegador no permite grabar audio. Prueba con una versión reciente de Chrome, Edge o Safari.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      microphoneStreamRef.current = stream;
      recordingChunksRef.current = [];

      const mimeType = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/mp4",
      ].find((candidate) => MediaRecorder.isTypeSupported(candidate));
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) recordingChunksRef.current.push(event.data);
      };
      recorder.onerror = () => {
        releaseMicrophone();
        setStatus("idle");
        setError("Ha fallado la grabación. Comprueba el micrófono y vuelve a intentarlo.");
      };
      recorder.onstop = () => {
        const actualType = recorder.mimeType || "audio/webm";
        const blob = new Blob(recordingChunksRef.current, { type: actualType });
        recordingChunksRef.current = [];
        releaseMicrophone();
        if (blob.size < 500) {
          setStatus("idle");
          setError("La grabación es demasiado corta. Mantén el micrófono activo mientras respondes.");
          return;
        }
        void sendTurn(blob, false);
      };
      recorder.start();
      setStatus("recording");
    } catch (recordError) {
      releaseMicrophone();
      setStatus("idle");
      setError(getErrorMessage(recordError));
    }
  }, [releaseMicrophone, sendTurn]);

  const handleMainAction = useCallback(() => {
    if (status === "recording") {
      mediaRecorderRef.current?.stop();
      setStatus("processing");
      return;
    }
    if (status !== "idle" || isPlayingAudio) return;
    if (!hasStarted) {
      setHasStarted(true);
      void sendTurn(null, true);
      return;
    }
    void startRecording();
  }, [hasStarted, isPlayingAudio, sendTurn, startRecording, status]);

  const finishConversation = useCallback(() => {
    if (status !== "idle") return;
    clearPlayback();
    setMessages([]);
    messagesRef.current = [];
    setShowTranscript(false);
    setHasStarted(false);
    setError(null);
    setNotice(null);
  }, [clearPlayback, status]);

  const buttonLabel = status === "recording"
    ? "Terminar y enviar"
    : status === "processing"
      ? "Procesando…"
      : isPlayingAudio
        ? "Escucha la respuesta…"
        : hasStarted
          ? "Grabar respuesta"
          : "Empezar conversación";

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-700">LinguaFly Coach</p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">Habla inglés, turno a turno</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
              Tu voz se procesa de forma segura en Cloudflare Workers AI. Graba una respuesta breve, escucha al tutor y sigue la conversación.
            </p>
          </div>
          <span className="rounded-full bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-800">
            Nivel {level}
          </span>
        </div>

        {!hasStarted && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {scenarios.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setScenario(option.id)}
                disabled={status !== "idle"}
                aria-pressed={scenario === option.id}
                className={`rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60 ${scenario === option.id ? "border-teal-700 bg-teal-50 ring-1 ring-teal-700" : "border-stone-200 bg-white hover:border-stone-400"}`}
              >
                <span className="block font-semibold text-stone-900">{option.title}</span>
                <span className="mt-1 block text-sm leading-5 text-stone-600">{option.description}</span>
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleMainAction}
            disabled={status === "processing" || (isPlayingAudio && status !== "recording")}
            className={`rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${status === "recording" ? "bg-rose-700 hover:bg-rose-800" : "bg-stone-900 hover:bg-stone-700"}`}
          >
            {buttonLabel}
          </button>
          {hasStarted && status === "idle" && (
            <button
              type="button"
              onClick={finishConversation}
              className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
            >
              Finalizar conversación
            </button>
          )}
          <span className="text-sm text-stone-500" aria-live="polite">
            {status === "recording" ? "El micrófono está activo. Habla en inglés y pulsa terminar cuando acabes." :
              status === "processing" ? "Transcribiendo, preparando la respuesta y generando la voz…" :
                isPlayingAudio ? "Escucha el audio antes de responder." :
                  hasStarted ? "Tu turno: responde en inglés con una frase o varias." :
                    "Elige un escenario y empieza cuando estés preparado."}
          </span>
        </div>

        <audio
          ref={audioRef}
          controls
          className="mt-4 w-full"
          onEnded={() => setIsPlayingAudio(false)}
          onError={() => setIsPlayingAudio(false)}
        />

        {error && (
          <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
            {error}
          </p>
        )}
        {notice && (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="status">
            {notice}
          </p>
        )}
      </div>

      <div className="rounded-3xl border border-stone-200 bg-stone-50 p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">La conversación</h3>
            <p className="mt-1 text-sm text-stone-600">El tutor corrige lo importante con tacto y adapta el inglés a tu nivel.</p>
          </div>
          {scenario === "listening" && messages.some((message) => message.role === "assistant") && (
            <button
              type="button"
              onClick={() => setShowTranscript((visible) => !visible)}
              className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100"
            >
              {showTranscript ? "Ocultar transcripción del tutor" : "Mostrar transcripción del tutor"}
            </button>
          )}
        </div>

        {messages.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-200 text-2xl" aria-hidden="true">🎧</div>
            <h4 className="mt-4 text-lg font-semibold text-stone-900">Tu conversación aparecerá aquí</h4>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-stone-600">
              Pulsa «Empezar conversación» y escucha la primera pregunta. En «Escucha y responde», la transcripción del tutor permanece oculta para que practiques el oído; podrás mostrarla después de intentarlo.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {messages
              .filter((message) => scenario !== "listening" || message.role === "user" || showTranscript)
              .map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <article className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[82%] ${message.role === "user" ? "rounded-br-sm bg-stone-900 text-white" : "rounded-bl-sm border border-stone-200 bg-white text-stone-900"}`}>
                    <p className={`mb-1 text-xs font-semibold ${message.role === "user" ? "text-stone-300" : "text-stone-500"}`}>
                      {message.role === "user" ? "Tú" : "LinguaFly Coach"}
                    </p>
                    <p className="whitespace-pre-wrap text-sm leading-6">{message.text}</p>
                  </article>
                </div>
              ))}
            <div ref={transcriptEndRef} />
          </div>
        )}
      </div>

      <p className="text-xs leading-5 text-stone-500">
        La conversación se procesa por turnos. El navegador envía tu grabación al Worker privado; las transcripciones no se guardan en el historial de la cuenta.
      </p>
    </section>
  );
}
