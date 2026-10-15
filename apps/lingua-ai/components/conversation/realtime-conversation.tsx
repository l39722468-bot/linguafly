"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type ScenarioId = "free" | "listening" | "restaurant" | "travel" | "interview";
type ConnectionStatus = "idle" | "connecting" | "connected";
type TranscriptMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  isFinal: boolean;
};

const scenarios: Array<{ id: ScenarioId; title: string; description: string }> = [
  { id: "free", title: "Conversación libre", description: "Habla de tu día, tus aficiones o cualquier tema." },
  { id: "listening", title: "Escucha y responde", description: "Escucha primero sin leer la transcripción y responde en inglés. Puedes revelar el texto después de intentarlo." },
  { id: "restaurant", title: "En un restaurante", description: "Pide comida, pregunta por el menú y resuelve una situación." },
  { id: "travel", title: "Viajes y aeropuerto", description: "Practica situaciones de viaje, hotel y transporte." },
  { id: "interview", title: "Entrevista de trabajo", description: "Practica respuestas profesionales y preguntas habituales." },
];

const languageLabels: Record<string, string> = {
  es: "español",
  ca: "catalán",
  en: "inglés",
  fr: "francés",
  pt: "portugués",
  de: "alemán",
  it: "italiano",
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "No se ha podido iniciar la conversación. Inténtalo de nuevo.";
}

export function RealtimeConversation({
  cefrLevel,
  explanationLanguage,
}: {
  cefrLevel: string | null;
  explanationLanguage: string;
}) {
  const [scenario, setScenario] = useState<ScenarioId>("free");
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const microphoneStreamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  const level = cefrLevel ?? "A1";
  const correctionLanguage = languageLabels[explanationLanguage] ?? "español";

  const closeConnections = useCallback((updateState = true) => {
    if (dataChannelRef.current) {
      dataChannelRef.current.onopen = null;
      dataChannelRef.current.onmessage = null;
      dataChannelRef.current.onerror = null;
      dataChannelRef.current.close();
      dataChannelRef.current = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.ontrack = null;
      peerConnectionRef.current.onconnectionstatechange = null;
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (microphoneStreamRef.current) {
      microphoneStreamRef.current.getTracks().forEach((track) => track.stop());
      microphoneStreamRef.current = null;
    }

    if (audioRef.current) audioRef.current.srcObject = null;

    if (updateState) {
      setStatus("idle");
      setIsListening(false);
      setIsSpeaking(false);
      setIsMuted(false);
    }
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => () => closeConnections(false), [closeConnections]);

  const upsertTranscript = useCallback((
    role: TranscriptMessage["role"],
    id: string,
    text: string,
    isFinal: boolean,
    append: boolean,
  ) => {
    setMessages((previous) => {
      const messageIndex = previous.findIndex((message) => message.id === id);
      if (messageIndex < 0) {
        return [...previous, { id, role, text, isFinal }];
      }

      const updated = [...previous];
      const existing = updated[messageIndex];
      updated[messageIndex] = {
        ...existing,
        text: append ? existing.text + text : text,
        isFinal: existing.isFinal || isFinal,
      };
      return updated;
    });
  }, []);

  const handleServerEvent = useCallback((rawData: string) => {
    let event: {
      type?: string;
      item_id?: string;
      response_id?: string;
      delta?: string;
      transcript?: string;
      error?: { message?: string; code?: string };
    };

    try {
      event = JSON.parse(rawData) as typeof event;
    } catch {
      return;
    }

    switch (event.type) {
      case "input_audio_buffer.speech_started":
        setIsListening(true);
        setIsSpeaking(false);
        break;
      case "input_audio_buffer.speech_stopped":
        setIsListening(false);
        break;
      case "response.created":
        setIsSpeaking(true);
        setIsListening(false);
        break;
      case "response.done":
        setIsSpeaking(false);
        setIsListening(false);
        break;
      case "conversation.item.input_audio_transcription.completed":
        if (event.transcript?.trim()) {
          const id = event.item_id ?? `user-${Date.now()}`;
          upsertTranscript("user", id, event.transcript.trim(), true, false);
        }
        break;
      case "response.output_audio_transcript.delta":
      case "response.audio_transcript.delta":
        if (event.delta) {
          const id = event.item_id ?? event.response_id ?? "assistant-live";
          upsertTranscript("assistant", id, event.delta, false, true);
        }
        break;
      case "response.output_audio_transcript.done":
      case "response.audio_transcript.done":
        if (event.transcript?.trim()) {
          const id = event.item_id ?? event.response_id ?? "assistant-live";
          upsertTranscript("assistant", id, event.transcript.trim(), true, false);
        }
        break;
      case "error":
        setError(event.error?.message ?? "El tutor ha encontrado un problema con la conexión.");
        break;
      default:
        break;
    }
  }, [upsertTranscript]);

  async function startConversation() {
    if (status !== "idle") return;
    setStatus("connecting");
    setError(null);
    setMessages([]);
    setShowTranscript(false);
    setIsMuted(false);

    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.RTCPeerConnection) {
        throw new Error("Tu navegador no permite conversaciones por voz. Prueba con una versión reciente de Chrome, Edge o Safari.");
      }

      const microphone = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      microphoneStreamRef.current = microphone;

      const peerConnection = new RTCPeerConnection();
      peerConnectionRef.current = peerConnection;

      peerConnection.ontrack = (event) => {
        if (audioRef.current && event.streams[0]) {
          audioRef.current.srcObject = event.streams[0];
          void audioRef.current.play().catch(() => undefined);
        }
      };

      peerConnection.onconnectionstatechange = () => {
        const connectionState = peerConnection.connectionState;
        if (connectionState === "failed" || connectionState === "disconnected") {
          setError("Se ha perdido la conexión de voz. Finaliza la sesión e inténtalo de nuevo.");
          closeConnections();
        }
      };

      for (const track of microphone.getAudioTracks()) {
        peerConnection.addTrack(track, microphone);
      }

      const dataChannel = peerConnection.createDataChannel("oai-events");
      dataChannelRef.current = dataChannel;
      dataChannel.onmessage = (event) => handleServerEvent(event.data);
      dataChannel.onerror = () => {
        setError("Se ha interrumpido el canal de conversación. Inténtalo de nuevo.");
      };
      dataChannel.onopen = () => {
        setStatus("connected");
        dataChannel.send(JSON.stringify({ type: "response.create" }));
      };

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      if (!offer.sdp) throw new Error("No se ha podido preparar el audio del micrófono.");

      const response = await fetch(
        `/api/conversacion/session?scenario=${encodeURIComponent(scenario)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/sdp" },
          body: offer.sdp,
          cache: "no-store",
        },
      );

      if (!response.ok) {
        let message = "No se ha podido conectar con el tutor de voz.";
        try {
          const data = (await response.json()) as { error?: string };
          if (data.error) message = data.error;
        } catch {
          // Keep a clear, user-friendly fallback for a non-JSON error response.
        }
        throw new Error(message);
      }

      const answerSdp = await response.text();
      await peerConnection.setRemoteDescription({ type: "answer", sdp: answerSdp });
    } catch (caughtError) {
      closeConnections();
      setError(getErrorMessage(caughtError));
    }
  }

  function toggleMicrophone() {
    const microphone = microphoneStreamRef.current;
    if (!microphone) return;
    const nextMuted = !isMuted;
    microphone.getAudioTracks().forEach((track) => {
      track.enabled = !nextMuted;
    });
    setIsMuted(nextMuted);
    setIsListening(false);
  }

  function finishConversation() {
    closeConnections();
  }

  const selectedScenario = scenarios.find((item) => item.id === scenario) ?? scenarios[0];

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <Link
        href="/app"
        className="text-sm font-medium text-stone-600 underline underline-offset-4 hover:text-stone-900"
      >
        ← Volver a mi perfil
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
          LINGUAFLY AI · CONVERSACIÓN POR VOZ
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
          Habla inglés con tu tutor IA
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
          Practica con técnicas educativas para escuchar y conversar: inglés ajustado a tu nivel,
          preguntas de comprensión, tiempo para responder, repetición guiada y correcciones útiles.
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.5fr)]">
        <aside className="space-y-5">
          <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-stone-950">Tu sesión</h2>
            <div className="mt-4 rounded-xl bg-stone-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Tu nivel actual</p>
              <p className="mt-1 text-2xl font-semibold text-stone-950">{level}</p>
              <p className="mt-1 text-sm text-stone-600">
                Correcciones en {correctionLanguage}
              </p>
            </div>

            <label htmlFor="conversation-scenario" className="mt-5 block text-sm font-medium text-stone-700">
              ¿Qué quieres practicar?
            </label>
            <select
              id="conversation-scenario"
              value={scenario}
              onChange={(event) => setScenario(event.target.value as ScenarioId)}
              disabled={status !== "idle"}
              className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-3 text-base text-stone-900 outline-none focus:ring-2 focus:ring-stone-400 disabled:bg-stone-100"
            >
              {scenarios.map((item) => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))}
            </select>
            <p className="mt-2 text-sm leading-6 text-stone-600">{selectedScenario.description}</p>

            <div className="mt-6 rounded-xl border border-stone-200 p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-xl transition-all ${isSpeaking ? "bg-cyan-100 ring-4 ring-cyan-50" : isListening && !isMuted ? "bg-sky-100 ring-4 ring-sky-50" : "bg-stone-100"}`}
                  aria-hidden="true"
                >
                  {isSpeaking ? "🔊" : isListening && !isMuted ? "🎙️" : "💬"}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-stone-950">LinguaFly Coach</p>
                  <p className="text-sm text-stone-600">
                    {status === "connecting"
                      ? "Conectando…"
                      : status === "idle"
                        ? "Listo para conversar"
                        : isMuted
                          ? "Micrófono silenciado"
                          : isSpeaking
                            ? "Tu tutor está hablando…"
                            : isListening
                              ? "Te estoy escuchando…"
                              : "Puedes hablar cuando quieras"}
                  </p>
                </div>
              </div>

              {status === "idle" ? (
                <button
                  type="button"
                  onClick={startConversation}
                  className="mt-5 w-full rounded-lg bg-stone-900 px-4 py-3 font-semibold text-white hover:bg-stone-800"
                >
                  Empezar conversación
                </button>
              ) : status === "connecting" ? (
                <button
                  type="button"
                  disabled
                  className="mt-5 w-full cursor-wait rounded-lg bg-stone-900 px-4 py-3 font-semibold text-white opacity-60"
                >
                  Conectando con el tutor…
                </button>
              ) : (
                <div className="mt-5 grid gap-2">
                  <button
                    type="button"
                    onClick={toggleMicrophone}
                    className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 font-medium text-stone-900 hover:bg-stone-50"
                  >
                    {isMuted ? "Activar micrófono" : "Silenciar micrófono"}
                  </button>
                  <button
                    type="button"
                    onClick={finishConversation}
                    className="w-full rounded-lg bg-red-700 px-4 py-3 font-semibold text-white hover:bg-red-800"
                  >
                    Finalizar conversación
                  </button>
                </div>
              )}
            </div>
            <p className="mt-4 text-xs leading-5 text-stone-500">
              El navegador te pedirá permiso para usar el micrófono. Puedes silenciarlo o terminar la sesión cuando quieras.
            </p>
          </section>

          {error ? (
            <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
              {error}
            </div>
          ) : null}
        </aside>

        <section className="flex min-h-[520px] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
            <div>
              <h2 className="font-semibold text-stone-950">Transcripción en directo</h2>
              <p className="mt-1 text-sm text-stone-600">{selectedScenario.title}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${status === "connected" ? "bg-emerald-50 text-emerald-800" : "bg-stone-100 text-stone-600"}`}>
              {status === "connected" ? "En línea" : status === "connecting" ? "Conectando" : "Desconectado"}
            </span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-stone-50/60 p-4 sm:p-6" aria-live="polite" aria-relevant="additions text">
            {messages.length === 0 ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-2xl" aria-hidden="true">🎧</div>
                <h3 className="mt-4 text-lg font-semibold text-stone-900">
                  Tu conversación aparecerá aquí
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-stone-600">
                  Pulsa «Empezar conversación» y permite el micrófono. En «Escucha y responde», la transcripción del tutor permanece oculta para que practiques el oído; podrás mostrarla después de intentarlo.
                </p>
              </div>
            ) : (
              messages
                .filter((message) => scenario !== "listening" || message.role === "user" || showTranscript)
                .map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <article className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[82%] ${message.role === "user" ? "rounded-br-sm bg-stone-900 text-white" : "rounded-bl-sm border border-stone-200 bg-white text-stone-900"}`}>
                    <p className={`mb-1 text-xs font-semibold ${message.role === "user" ? "text-stone-300" : "text-stone-500"}`}>
                      {message.role === "user" ? "Tú" : "LinguaFly Coach"}
                    </p>
                    <p className="whitespace-pre-wrap text-sm leading-6">
                      {message.text}
                      {!message.isFinal ? <span className="ml-1 inline-block h-3 w-1 animate-pulse bg-current align-middle" /> : null}
                    </p>
                  </article>
                </div>
              ))
            )}
            {scenario === "listening" && status !== "idle" ? (
              <button
                type="button"
                onClick={() => setShowTranscript((visible) => !visible)}
                className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 hover:bg-stone-100"
              >
                {showTranscript ? "Ocultar transcripción del tutor" : "Mostrar transcripción del tutor"}
              </button>
            ) : null}
            <div ref={transcriptEndRef} />
          </div>
          <audio ref={audioRef} autoPlay playsInline className="hidden" />
        </section>
      </div>

      <p className="mt-5 text-xs leading-5 text-stone-500">
        Para que la conversación funcione, el Worker privado debe tener configurada la clave de OpenAI con acceso al modelo Realtime. La clave nunca se envía al navegador.
      </p>
    </main>
  );
}
