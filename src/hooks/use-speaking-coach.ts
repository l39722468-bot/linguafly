import { useState, useCallback, useEffect, useRef } from 'react';
import { useRealtimeAI } from './use-realtime-ai';
import { SPEAKING_SCENARIOS, getSpeakingCoachSystemPrompt } from '@/lib/ai/speaking-scenarios';
import { TUTOR_PROMPTS } from '@/lib/ai/tutor-prompts';

export interface SpeakingCoachState {
  currentSessionId: string | null;
  turnCount: number;
  lastFeedback: any | null;
  isSaving: boolean;
  objectivesMet: string[];
}

export function useSpeakingCoach() {
  const { 
    isConnected, 
    isConnecting, 
    isListening, 
    isSpeaking, 
    transcript, 
    error: aiError, 
    connect: connectAI, 
    disconnect: disconnectAI, 
    startRecording 
  } = useRealtimeAI();

  const [state, setState] = useState<SpeakingCoachState>({
    currentSessionId: null,
    turnCount: 0,
    lastFeedback: null,
    isSaving: false,
    objectivesMet: [],
  });

  const [error, setError] = useState<string | null>(null);
  const transcriptCountRef = useRef(0);

  const startCoachSession = useCallback(async (scenarioId: string, tutorId: string, level: string) => {
    setState(prev => ({ ...prev, isSaving: true }));
    setError(null);

    try {
      const scenario = SPEAKING_SCENARIOS.find(s => s.id === scenarioId);
      if (!scenario) throw new Error('Invalid scenario');

      const tutorPrompt = TUTOR_PROMPTS[tutorId] || TUTOR_PROMPTS.tutor1;
      const sessionId = `local-${Date.now()}`;
      const memory = 'No previous sessions for this scenario.';

      setState(prev => ({ 
        ...prev, 
        currentSessionId: sessionId, 
        isSaving: false,
        turnCount: 0,
        objectivesMet: []
      }));

      const instructions = getSpeakingCoachSystemPrompt(tutorPrompt, scenario, level, memory);
      await connectAI(instructions, (TUTOR_PROMPTS[tutorId] as any)?.voice || 'shimmer');

      return sessionId;
    } catch (err: any) {
      console.error('Error starting session:', err);
      setError(err.message);
      setState(prev => ({ ...prev, isSaving: false }));
      return null;
    }
  }, [connectAI]);

  const persistMessage = useCallback(async (role: 'user' | 'assistant', content: string) => {
    if (!state.currentSessionId) return;

    try {
      let feedback = null;

      if (role === 'assistant' && content.includes('EVALUATION_START')) {
        try {
          const match = content.match(/EVALUATION_START([\s\S]*?)EVALUATION_END/);
          if (match) {
            feedback = JSON.parse(match[1]);
            setState(prev => ({ 
              ...prev, 
              lastFeedback: feedback,
              objectivesMet: Array.from(new Set([...prev.objectivesMet, ...(feedback.objectives_met || [])]))
            }));
          }
        } catch (e) {
          console.error('Failed to parse evaluation JSON', e);
        }
      }

      if (role === 'user') {
        setState(prev => ({ ...prev, turnCount: prev.turnCount + 1 }));
      }
    } catch (err) {
      console.error('Error persisting message:', err);
    }
  }, [state.currentSessionId]);

  useEffect(() => {
    const finalMessages = transcript.filter(m => m.isFinal);
    if (finalMessages.length > transcriptCountRef.current) {
      const newMessages = finalMessages.slice(transcriptCountRef.current);
      newMessages.forEach(msg => {
        persistMessage(msg.role, msg.text);
      });
      transcriptCountRef.current = finalMessages.length;
    }
  }, [transcript, persistMessage]);

  const completeSession = useCallback(async (_summary: string) => {
    if (!state.currentSessionId) return;
    setState(prev => ({ ...prev, currentSessionId: null }));
    disconnectAI();
  }, [state.currentSessionId, disconnectAI]);

  return {
    ...state,
    isConnected,
    isConnecting,
    isListening,
    isSpeaking,
    transcript,
    error: error || aiError,
    startCoachSession,
    disconnectAI,
    startRecording,
    completeSession
  };
}
