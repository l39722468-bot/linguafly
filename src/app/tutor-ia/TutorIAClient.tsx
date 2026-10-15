'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Power, RotateCcw, ArrowLeft, AlertCircle, CheckCircle, Camera, X, Volume2 } from 'lucide-react';
import { useAvatarTutor } from '@/hooks/use-avatar-tutor';
import AvatarOrb from '@/components/tutor/AvatarOrb';
import { Navigation } from '@/components/sections/Navigation';
import Link from 'next/link';

const TUTORS = [
  {
    id: 'emma',
    name: 'Emma',
    emoji: '👩‍🏫',
    gender: 'female' as const,
    specialty: 'Conversación general',
    description: 'Profesora de inglés cercana y paciente de Nueva York; explica en español',
    colorFrom: '#FF6B6B',
    colorTo: '#ff9a9e',
    accent: 'from-red-500 to-rose-400',
  },
  {
    id: 'james',
    name: 'James',
    emoji: '👨‍💼',
    gender: 'male' as const,
    specialty: 'Inglés profesional',
    description: 'Tutor práctico y amable de Londres; explica en español',
    colorFrom: '#3b82f6',
    colorTo: '#6366f1',
    accent: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'sofia',
    name: 'Sofia',
    emoji: '👩‍🎓',
    gender: 'female' as const,
    specialty: 'Exámenes oficiales',
    description: 'Especialista en IELTS y Cambridge; explica en español',
    colorFrom: '#8b5cf6',
    colorTo: '#d946ef',
    accent: 'from-violet-500 to-fuchsia-500',
  },
  {
    id: 'carlos',
    name: 'Carlos',
    emoji: '🧑‍🏫',
    gender: 'male' as const,
    specialty: 'Inglés práctico y divertido',
    description: 'Tutor energético que enseña inglés con explicaciones en español',
    colorFrom: '#10b981',
    colorTo: '#06b6d4',
    accent: 'from-emerald-500 to-cyan-500',
  },
];

export default function TutorIAClient() {
  const [step, setStep] = useState<'setup' | 'session'>('setup');
  const [selectedTutor, setSelectedTutor] = useState(TUTORS[0]);
  // B1/general are only safe internal fallbacks; the tutor asks and detects the learner's preferences.
  const [detectedLevel, setDetectedLevel] = useState<string | null>(null);
  const [detectedTopic, setDetectedTopic] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prewarmedTutorVoicesRef = useRef<Set<string>>(new Set());
  const imageInputRef = useRef<HTMLInputElement>(null);

  const {
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
    attachImage,
    clearImage,
    replayPronunciation,
    replayTutorSpeech,
  } = useAvatarTutor({
    tutorId: selectedTutor.id,
    tutorGender: selectedTutor.gender,
    level: detectedLevel ?? 'B1',
    topic: detectedTopic ?? 'general',
    onPreferencesDetected: (preferences) => {
      if (preferences.level) setDetectedLevel(preferences.level);
      if (preferences.topic) setDetectedTopic(preferences.topic);
    },
  });

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  // Prepare the welcome and two common lesson audios while the learner chooses a tutor.
  useEffect(() => {
    const cacheKey = `${selectedTutor.id}:${selectedTutor.gender}`;
    if (prewarmedTutorVoicesRef.current.has(cacheKey)) return;
    prewarmedTutorVoicesRef.current.add(cacheKey);
    void fetch('/api/tutor-avatar/preload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tutorId: selectedTutor.id,
        tutorGender: selectedTutor.gender,
        intents: ['numbers_0_10_examples', 'greetings_examples'],
      }),
    }).catch(() => {
      // TTS prewarming is optional; the tutor still works if it fails.
    });
  }, [selectedTutor.id, selectedTutor.gender]);

  const handleStart = async () => {
    // Unlock browser autoplay policy immediately on user gesture
    try {
      const ctx = new AudioContext();
      await ctx.resume();
      ctx.close();
    } catch { /* ignore */ }

    setDetectedLevel(null);
    setDetectedTopic(null);
    setStep('session');
    await start();
  };

  const handleStop = () => {
    stop();
    setStep('setup');
  };

  const canListen = isActive && orbState === 'idle';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Navigation />

      <main className={`${step === 'session'
        ? 'flex h-[calc(100dvh-4rem)] min-h-0 flex-col overflow-hidden pt-2 pb-2'
        : 'min-h-[calc(100dvh-4rem)] pt-8 pb-16'} px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full`}>
        <div className={`flex shrink-0 items-center gap-2 sm:gap-3 ${step === 'session' ? 'mb-2 min-h-9' : 'mb-8'}`}>
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className={step === 'session' ? 'hidden sm:inline' : ''}>Volver</span>
          </Link>
          <div className="w-px h-4 bg-slate-700" />
          <h1 className={`font-black text-white ${step === 'session' ? 'text-lg sm:text-xl' : 'text-2xl'}`}>Tutor IA de inglés</h1>
          <span className="rounded-full bg-amber-400/10 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-amber-300">
            Beta
          </span>
        </div>

        {step === 'setup' && (
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-white font-black text-xl mb-4">Elige tu tutor</h2>
                <div className="grid grid-cols-2 gap-3">
                  {TUTORS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTutor(t)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all ${
                        selectedTutor.id === t.id
                          ? 'border-white/30 bg-white/10'
                          : 'border-white/5 bg-white/5 hover:bg-white/8'
                      }`}
                    >
                      <span className="text-3xl block mb-2">{t.emoji}</span>
                      <p className="text-white font-black text-base">{t.name}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{t.specialty}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-white font-bold mb-2">Tu clase, a tu medida</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Al comenzar, {selectedTutor.name} te preguntará qué quieres practicar y cuál es tu nivel. Si no lo sabes, te ayudará a elegir un punto de partida.
                </p>
              </div>

            </div>

            <div className="flex flex-col items-center gap-8">
              <AvatarOrb
                state="idle"
                tutor={selectedTutor}
                size={220}
              />
              <div className="text-center">
                <p className="text-white font-black text-2xl">{selectedTutor.name}</p>
                <p className="text-slate-400 mt-1">{selectedTutor.description}</p>
                <p className="text-slate-500 text-sm mt-1">El tutor personalizará la clase durante la conversación</p>
              </div>
              <button
                onClick={handleStart}
                className={`flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-white text-lg bg-gradient-to-r ${selectedTutor.accent} shadow-2xl hover:scale-105 active:scale-95 transition-all`}
              >
                <Power className="w-6 h-6" />
                Empezar clase
              </button>
            </div>
          </div>
        )}

        {step === 'session' && (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 min-h-0 flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-2 sm:gap-3 rounded-2xl border border-white/5 bg-slate-900/35 p-2 sm:p-3">
              <div className="shrink-0 origin-center -m-4 scale-[0.72] sm:m-0 sm:scale-[0.82] lg:scale-100">
                <AvatarOrb
                  state={orbState}
                  tutor={selectedTutor}
                  size={144}
                />
              </div>

              <div className="min-w-0 flex-1 text-left lg:flex-none lg:text-center">
                <p className="truncate text-base font-black text-white sm:text-lg">{selectedTutor.name}</p>
                <p className="truncate text-[11px] text-slate-400 sm:text-xs">{selectedTutor.specialty}</p>
                <p className="mt-1 line-clamp-2 text-[10px] text-slate-500 sm:text-xs">
                  {detectedTopic ? `Tema: ${({
                    general: 'conversación libre',
                    social: 'vida cotidiana',
                    travel: 'viajes',
                    business: 'trabajo',
                    grammar: 'gramática',
                    exams: 'exámenes',
                    vocabulary: 'vocabulario',
                  } as Record<string, string>)[detectedTopic] ?? detectedTopic}` : 'Tema por determinar'}
                  {' · '}
                  {detectedLevel ? `Nivel ${detectedLevel}` : 'nivel por determinar'}
                </p>
                {error && (
                  <div className="mt-2 flex items-start gap-1.5 rounded-lg border border-red-500/30 bg-red-900/40 p-2 text-left">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                    <p className="line-clamp-3 text-[10px] text-red-200 sm:text-xs">{error}</p>
                  </div>
                )}
                <div className="mt-2 hidden items-center justify-center gap-3 lg:flex">
                  <button
                    onClick={handleStop}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-white"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Terminar sesión
                  </button>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    if (orbState === 'listening') stopListening();
                    else void startListening();
                  }}
                  disabled={!canListen && orbState !== 'listening'}
                  aria-label={orbState === 'listening' ? 'Enviar audio' : 'Empezar a hablar'}
                  aria-pressed={orbState === 'listening'}
                  className={`flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all sm:h-16 sm:w-16 ${
                    orbState === 'listening'
                      ? 'bg-green-500 ring-4 ring-green-400/30'
                      : canListen
                        ? 'bg-white hover:scale-105 active:scale-95'
                        : 'cursor-not-allowed bg-slate-700 opacity-50'
                  }`}
                >
                  {orbState === 'listening'
                    ? <MicOff className="h-7 w-7 text-white" />
                    : <Mic className={`h-7 w-7 ${canListen ? 'text-slate-900' : 'text-slate-400'}`} />}
                </button>
                <span className="max-w-16 text-center text-[9px] font-bold leading-tight text-slate-400 sm:max-w-20 sm:text-[10px]">
                  {canListen ? 'Pulsa para hablar' : orbState === 'listening' ? 'Pulsa para enviar' : 'Espera…'}
                </span>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64 = (reader.result as string).split(',')[1];
                      attachImage(base64);
                    };
                    reader.readAsDataURL(file);
                    e.target.value = '';
                  }}
                />
                {pendingImage ? (
                  <button
                    type="button"
                    onClick={clearImage}
                    className="text-[10px] font-semibold text-emerald-300 hover:text-white"
                    aria-label="Quitar imagen"
                  >
                    📷 Quitar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    disabled={!canListen}
                    title="Compartir imagen con el tutor"
                    className="mt-1 flex items-center gap-1 text-[10px] text-slate-500 transition-colors hover:text-slate-300 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Camera className="h-3.5 w-3.5" />
                    Imagen
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleStop}
                  className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 transition-colors hover:text-white lg:hidden"
                  aria-label="Terminar sesión"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Salir
                </button>
              </div>
            </div>
            <div className="lg:col-span-8 min-h-0 flex flex-col gap-3">
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-white/5 bg-slate-800/50">
                <div className="shrink-0 border-b border-white/5 px-4 py-2 sm:px-5 sm:py-3">
                  <p className="text-sm font-black text-white sm:text-base">Conversación</p>
                  <p className="text-[10px] text-slate-500">{messages.length} mensajes</p>
                </div>

                <div ref={messagesContainerRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-3 sm:space-y-4 sm:p-4">
                  {messages.length === 0 && (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-slate-600 text-sm">Tu tutor está preparándose...</p>
                    </div>
                  )}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[92%] px-4 py-2 sm:max-w-[80%] sm:px-5 sm:py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-white text-slate-900 rounded-tr-sm font-medium'
                            : `bg-gradient-to-br ${selectedTutor.accent} text-white rounded-tl-sm`
                        }`}
                      >
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">
                          {msg.role === 'user' ? 'Tú' : selectedTutor.name}
                        </p>
                        <p className="whitespace-pre-line">{msg.text}</p>
                        {msg.role === 'tutor' && (
                          <div className="mt-3 flex flex-wrap gap-2 border-t border-white/15 pt-2">
                            {msg.spokenSpanish && (
                              <button
                                type="button"
                                onClick={() => { void replayTutorSpeech(msg.spokenSpanish ?? msg.text, ''); }}
                                disabled={orbState !== 'idle'}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-black/10 px-3 py-1.5 text-xs font-semibold hover:bg-black/20 disabled:opacity-40 transition-colors"
                                aria-label="Repetir la explicación en español"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                Repetir explicación
                              </button>
                            )}
                            {msg.pronunciationText && (
                              <button
                                type="button"
                                onClick={() => { void replayPronunciation(msg.pronunciationText ?? ''); }}
                                disabled={orbState !== 'idle'}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-black/10 px-3 py-1.5 text-xs font-semibold hover:bg-black/20 disabled:opacity-40 transition-colors"
                                aria-label="Escuchar los ejemplos en inglés con pronunciación británica"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                Escuchar ejemplos en inglés
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {sources.length > 0 && (
                <div className="bg-slate-900/70 border border-cyan-500/20 rounded-2xl p-5">
                  <p className="text-cyan-300 font-black text-xs uppercase tracking-widest mb-3">
                    Guías de LinguaFly para esta conversación
                  </p>
                  <div className="space-y-2">
                    {sources.map((source) => (
                      <a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start justify-between gap-3 rounded-xl bg-white/5 hover:bg-white/10 px-4 py-3 transition-colors"
                      >
                        <span className="text-sm text-slate-200 font-semibold">{source.title}</span>
                        <span className="text-xs text-cyan-400 shrink-0">Leer guía ↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {feedback && (
                <div className="bg-amber-900/30 border border-amber-500/30 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    <p className="text-amber-300 font-black text-sm uppercase tracking-widest">Corrección</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500 text-xs font-bold uppercase mb-1">Dijiste:</p>
                      <p className="text-red-300 line-through">{feedback.original}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs font-bold uppercase mb-1">Mejor así:</p>
                      <p className="text-green-300 font-semibold">{feedback.correction}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-slate-500 text-xs font-bold uppercase mb-1">¿Por qué?</p>
                      <p className="text-slate-300">{feedback.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
