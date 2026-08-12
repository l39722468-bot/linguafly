import { useState, useCallback, useEffect, useRef } from 'react';
import { useRealtimeAI } from './use-realtime-ai';
import { getPrivateTutorSystemPrompt } from '@/lib/ai/tutor-prompts';
import { TUTOR_PROMPTS } from '@/lib/ai/tutor-prompts';
import { TUTOR_CATEGORIES } from '@/lib/ai/tutor-categories';

export type TutorPhase = 'theory' | 'practice' | 'feedback';

export interface PrivateTutorState {
  currentSessionId: string | null;
  turnCount: number;
  lastFeedback: any | null;
  isSaving: boolean;
  phase: TutorPhase;
  category: string | null;
}

export function usePrivateTutor() {
  const { 
    isConnected, 
    isConnecting, 
    isListening, 
    isSpeaking, 
    transcript, 
    error: aiError, 
    connect: connectAI, 
    disconnect: disconnectAI, 
    startRecording,
    updateInstructions
  } = useRealtimeAI();

  const [state, setState] = useState<PrivateTutorState>({
    currentSessionId: null,
    turnCount: 0,
    lastFeedback: null,
    isSaving: false,
    phase: 'theory',
    category: null,
  });

  const [error, setError] = useState<string | null>(null);
  const transcriptCountRef = useRef(0);
  const currentTutorIdRef = useRef<string>('tutor1');
  const currentLevelRef = useRef<string>('B2');

  const startTutorSession = useCallback(async (categoryId: string, tutorId: string, level: string) => {
    setState(prev => ({ ...prev, isSaving: true, category: categoryId, phase: 'theory' }));
    setError(null);
    currentTutorIdRef.current = tutorId;
    currentLevelRef.current = level;

    try {
      const category = TUTOR_CATEGORIES.find(c => c.id === categoryId);
      if (!category) throw new Error('Invalid category');

      const tutorPrompt = TUTOR_PROMPTS[tutorId] || TUTOR_PROMPTS.tutor1;
      const sessionId = `local-tutor-${Date.now()}`;

      setState(prev => ({ 
        ...prev, 
        currentSessionId: sessionId, 
        isSaving: false,
        turnCount: 0,
      }));

      const instructions = getPrivateTutorSystemPrompt(tutorPrompt, category, level, 'theory');
      await connectAI(instructions, (TUTOR_PROMPTS[tutorId] as any)?.voice || 'shimmer');

      return sessionId;
    } catch (err: any) {
      console.error('Error starting tutor session:', err);
      setError(err.message);
      setState(prev => ({ ...prev, isSaving: false }));
      return null;
    }
  }, [connectAI]);

  const transitionToPhase = useCallback(async (newPhase: TutorPhase) => {
    if (!state.category) return;
    
    const category = TUTOR_CATEGORIES.find(c => c.id === state.category);
    const tutorPrompt = TUTOR_PROMPTS[currentTutorIdRef.current];
    
    const newInstructions = getPrivateTutorSystemPrompt(
      tutorPrompt, 
      category, 
      currentLevelRef.current, 
      newPhase
    );

    setState(prev => ({ ...prev, phase: newPhase }));
    await updateInstructions(newInstructions);
  }, [state.category, updateInstructions]);

  const persistMessage = useCallback(async (role: 'user' | 'assistant', content: string) => {
    if (!state.currentSessionId) return;

    try {
      if (role === 'assistant') {
        const lowerContent = content.toLowerCase();
        if (state.phase === 'theory' && lowerContent.includes("let's move to practice")) {
          transitionToPhase('practice');
        } else if (state.phase === 'practice' && lowerContent.includes("time for some feedback")) {
          transitionToPhase('feedback');
        }

        if (content.includes('EVALUATION_START')) {
          try {
            const match = content.match(/EVALUATION_START([\s\S]*?)EVALUATION_END/);
            if (match) {
              const feedback = JSON.parse(match[1]);
              setState(prev => ({ ...prev, lastFeedback: feedback }));
            }
          } catch (e) {
            console.error('Failed to parse evaluation JSON', e);
          }
        }
      }

      if (role === 'user') {
        setState(prev => ({ ...prev, turnCount: prev.turnCount + 1 }));
      }
    } catch (err) {
      console.error('Error persisting message:', err);
    }
  }, [state.currentSessionId, state.phase, transitionToPhase]);

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
    startTutorSession,
    transitionToPhase,
    disconnectAI,
    startRecording,
    completeSession
  };
}
