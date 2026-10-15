'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Bot, Mic, Power, RotateCcw, MessageSquare, Volume2, ShieldAlert, ArrowLeft } from 'lucide-react'
import { useRealtimeAI } from '@/hooks/use-realtime-ai'
import { useMethodologyProgress } from '@/hooks/use-methodology-progress'
import VoiceVisualizer from './VoiceVisualizer'

interface AITutor {
  id: string
  name: string
  avatar: string
  specialty: string
  voice: string
  personality: string
  difficulty: string
}

const aiTutors: AITutor[] = [
  {
    id: 'tutor1',
    name: 'Emma',
    avatar: '👩‍🏫',
    specialty: 'Business English',
    voice: 'shimmer', // Mapped to a Cloudflare Aura speaker
    personality: 'Professional & Friendly',
    difficulty: 'Intermediate'
  },
  {
    id: 'tutor2',
    name: 'James',
    avatar: '👨‍💼',
    specialty: 'Conversational English',
    voice: 'ash',
    personality: 'Patient & Encouraging',
    difficulty: 'Beginner'
  },
  {
    id: 'tutor3',
    name: 'Sofia',
    avatar: '👩‍🎓',
    specialty: 'IELTS Preparation',
    voice: 'alloy',
    personality: 'Academic & Structured',
    difficulty: 'Advanced'
  }
]

const scenarios = [
  { id: 's1', title: 'Job Interview', icon: '💼' },
  { id: 's2', title: 'Restaurant Ordering', icon: '🍽️' },
  { id: 's3', title: 'Business Presentation', icon: '📊' },
  { id: 's4', title: 'Travel Assistance', icon: '✈️' }
]

interface FeedbackData {
  original: string
  correction: string
  explanation: string
  score?: number
}

export default function RealtimeAITutor() {
  const router = useRouter()
  const [selectedTutor, setSelectedTutor] = useState<AITutor>(aiTutors[0])
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0])
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)
  const { isConnected, isConnecting, isListening, isSpeaking, transcript, error, connect, disconnect, startRecording } = useRealtimeAI()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Show only feedback returned by the tutor model; never fabricate a score or correction.
  useEffect(() => {
    const lastMsg = transcript[transcript.length - 1]
    if (lastMsg?.role === 'assistant' && lastMsg.feedback) {
      const item = lastMsg.feedback
      if (item.correction || item.explanation || item.original) {
        setFeedback({
          original: item.original || '',
          correction: item.correction || '',
          explanation: item.explanation || '',
        })
      }
    }
  }, [transcript])

  const handleStart = async () => {
    const instructions = `You are ${selectedTutor.name}, an expert English tutor. 
    Personality: ${selectedTutor.personality}. 
    Scenario: ${selectedScenario.title}. 
    Level: ${selectedTutor.difficulty}.
    Goal: Help the student practice English naturally. 
    FEEDBACK RULE: Whenever the student makes a mistake (grammar, pronunciation, or word choice), 
    provide a polite correction at the end of your response following this format:
    "Correction: [corrected phrase] | Explanation: [brief explanation in Spanish]"
    Keep responses short and conversational.`

    setFeedback(null)
    await connect(instructions, selectedTutor.voice, {
      tutorId: selectedTutor.id,
      level: selectedTutor.difficulty,
      scenario: selectedScenario.title,
    })
    await startRecording()
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button 
        onClick={() => router.push('/')}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Volver a Metodologías
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          AI Speaking Tutor
        </h1>
        <p className="text-gray-600 text-lg flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          Practica por turnos con voz: Workers AI, Whisper y Aura
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3 text-red-700">
          <ShieldAlert className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600" />
              Selecciona Tutor
            </h3>
            <div className="space-y-3">
              {aiTutors.map(tutor => (
                <button
                  key={tutor.id}
                  disabled={isConnected}
                  onClick={() => setSelectedTutor(tutor)}
                  className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                    selectedTutor.id === tutor.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-50 hover:border-blue-200'
                  } ${isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tutor.avatar}</span>
                    <div>
                      <p className="font-bold text-sm">{tutor.name}</p>
                      <p className="text-xs text-gray-500">{tutor.specialty}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Escenario</h3>
            <div className="grid grid-cols-1 gap-2">
              {scenarios.map(s => (
                <button
                  key={s.id}
                  disabled={isConnected}
                  onClick={() => setSelectedScenario(s)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selectedScenario.id === s.id
                      ? 'border-cyan-500 bg-cyan-50'
                      : 'border-gray-50 hover:border-cyan-200'
                  } ${isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    {s.icon} {s.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border-2 border-gray-100 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[550px]">
            {/* Realtime Status Bar */}
            <div className={`p-4 flex items-center justify-between transition-colors ${
              isConnected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="text-3xl">{selectedTutor.avatar}</span>
                  {isConnected && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div>
                  <p className="font-bold">{selectedTutor.name}</p>
                  <p className="text-xs opacity-80">{isConnected ? 'En línea • Escuchando...' : 'Desconectado'}</p>
                </div>
              </div>

              {!isConnected ? (
                <button
                  onClick={handleStart}
                  disabled={isConnecting}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {isConnecting ? 'Iniciando...' : (
                    <>
                      <Power className="w-4 h-4" />
                      Comenzar Sesión
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={disconnect}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  Finalizar
                </button>
              )}
            </div>

            {/* Chat Display */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/50"
            >
              {transcript.length === 0 && !isConnected && (
                <div className="h-full flex flex-col items-center justify-center text-center p-10">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Mic className="w-10 h-10 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">¿Listo para hablar?</h3>
                  <p className="text-gray-500 max-w-xs mt-2">
                    Inicia la sesión para empezar una conversación fluida con tu tutor personal.
                  </p>
                </div>
              )}

              {transcript.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-500 text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border-2 border-gray-100 rounded-tl-none'
                  }`}>
                    <p className="text-sm font-medium mb-1 opacity-70">
                      {msg.role === 'user' ? 'Tú' : selectedTutor.name}
                    </p>
                    <p className="leading-relaxed">
                      {msg.text}
                      {!msg.isFinal && <span className="inline-block w-1 h-4 bg-current animate-pulse ml-1" />}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visualizer Area */}
            <div className="p-6 bg-white border-t border-gray-100">
              <VoiceVisualizer 
                isActive={isConnected}
                isSpeaking={isSpeaking}
                isListening={isListening}
              />
              
              <div className="mt-2 text-center">
                <p className={`text-sm font-medium transition-all ${
                  isSpeaking ? 'text-cyan-600 animate-pulse' : 
                  isListening ? 'text-blue-600 animate-pulse' : 'text-gray-400'
                }`}>
                  {isSpeaking ? `${selectedTutor.name} está hablando...` : 
                   isListening ? 'Te escucho...' : 
                   isConnected ? 'Espera tu turno...' : 'Pulsa comenzar para hablar'}
                </p>
              </div>
            </div>
          </div>

          {/* Feedback Card */}
          {feedback && (
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-blue-100 rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-blue-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Feedback de Pronunciación & Gramática
                </h3>
                {typeof feedback.score === 'number' && (
                  <div className="bg-white px-3 py-1 rounded-full border border-blue-200 shadow-sm">
                    <span className="text-sm font-bold text-blue-600">Puntuación: {feedback.score}%</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/60 p-4 rounded-xl">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Mejor opción:</p>
                  <p className="text-green-700 font-medium">{feedback.correction}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Explicación:</p>
                  <p className="text-gray-700 text-sm">{feedback.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
