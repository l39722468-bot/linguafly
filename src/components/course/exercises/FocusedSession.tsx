"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Volume2, 
  Play, 
  Star,
  Trophy,
  Lightbulb,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSolutionText, isLikelyEnglish, getEncouragingMessage, stripBilingualMarkup, stripBilingualMarkupEs } from "@/lib/premium-utils";

interface Props {
  block: any;
  onComplete: () => void;
  onExit: () => void;
}

export default function FocusedPremiumSession({ block, onComplete, onExit }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [showInteraction, setShowInteraction] = useState(false);
  const [interactionIndex, setInteractionIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [failCount, setFailCount] = useState<Record<string, number>>({});
  const [isRepairing, setIsRepairing] = useState(false);
  const [selectedWords, setSelectedWords] = useState<any[]>([]);
  const [matchingSelections, setMatchingSelections] = useState<{left?: string, right?: string}>({});
  const [matchingPairs, setMatchingPairs] = useState<Record<string, string>>({});
  const [categorizedItems, setCategorizedItems] = useState<Record<string, string>>({});
  const [inputValues, setInputValues] = useState<Record<number, string>>({});
  const [shuffledRight, setShuffledRight] = useState<any[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);
  const [selectedCategorizationItem, setSelectedCategorizationItem] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  
  const [audioCache, setAudioCache] = useState<Record<string, string>>({});
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const prefetchingRef = useRef<Set<string>>(new Set());

  const queue = block.content;
  const currentItem = queue[currentStep];
  const progress = (currentStep / queue.length) * 100;

  const playAudio = async (url?: string, text?: string) => {
    if (!url && !text) return;
    
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }

    try {
      if (url) {
        try {
          const audio = new Audio(url);
          currentAudioRef.current = audio;
          if (!url.includes('correct.mp3') && !url.includes('wrong.mp3')) {
            audio.playbackRate = 1.1;
          }
          await audio.play();
          return;
        } catch (error) {
          console.warn('Failed to play static audio, falling back to TTS:', error);
          if (!text) return;
        }
      }

      if (text) {
        let audioUrl = audioCache[text];
        
        if (!audioUrl) {
          const response = await fetch('/api/generate-audio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
          });
          if (!response.ok) throw new Error('Failed to generate audio');
          const blob = await response.blob();
          audioUrl = URL.createObjectURL(blob);
          setAudioCache(prev => ({ ...prev, [text]: audioUrl }));
        }

        const audio = new Audio(audioUrl);
        currentAudioRef.current = audio;
        audio.playbackRate = 1.1;
        await audio.play();
      }
    } catch (e) {
      console.error("Audio play failed", e);
    }
  };

  // Pre-fetch audio logic
  useEffect(() => {
    const extractTextsToPreload = (item: any): string[] => {
      const texts: string[] = [];
      if (!item) return texts;

      if (item.stimulus_en) texts.push(stripBilingualMarkup(item.stimulus_en));
      if (item.prompt_en) texts.push(item.prompt_en);
      if (item.text) texts.push(item.text);
      
      if (item.options) {
        item.options.forEach((opt: any) => {
          if (opt.text && isLikelyEnglish(opt.text)) texts.push(opt.text);
        });
      }

      if (item.pairs) {
        item.pairs.forEach((p: any) => {
          if (p.left && isLikelyEnglish(p.left)) texts.push(p.left);
          if (p.right && isLikelyEnglish(p.right)) texts.push(p.right);
        });
      }

      if (item.profiles) {
        item.profiles.forEach((p: any) => {
          if (p.name && p.description) texts.push(`${p.name}. ${p.description}`);
        });
      }

      if (item.descriptions) {
        item.descriptions.forEach((d: any) => {
          if (d.title && d.content) texts.push(`${d.title}. ${d.content}`);
        });
      }

      if (item.main_text) {
        const fullText = item.main_text.replace(/\[GAP \d+\]/g, '...');
        texts.push(fullText);
      }

      if (item.removed_paragraphs) {
        item.removed_paragraphs.forEach((p: any) => {
          if (p.text) texts.push(p.text);
        });
      }

      const solution = getSolutionText(item);
      if (solution && isLikelyEnglish(solution)) texts.push(solution);

      if (item.type === 'true_false' && item.correct_sentence_en) {
          texts.push(item.correct_sentence_en);
      }

      return [...new Set(texts)].filter(t => t.trim().length > 0);
    };

    const preloadNextAudios = async () => {
      const itemsToPreload = [
        queue[currentStep],
        queue[currentStep + 1],
        queue[currentStep + 2]
      ].filter(Boolean);

      const allTexts = itemsToPreload.flatMap(extractTextsToPreload);
      const uniqueTexts = [...new Set(allTexts)];

      for (const text of uniqueTexts) {
        if (!audioCache[text] && !prefetchingRef.current.has(text)) {
          prefetchingRef.current.add(text);
          try {
            const response = await fetch('/api/generate-audio', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text }),
            });
            if (response.ok) {
              const blob = await response.blob();
              const audioUrl = URL.createObjectURL(blob);
              setAudioCache(prev => ({ ...prev, [text]: audioUrl }));
            }
          } catch (e) {
            console.error("Prefetch failed for:", text);
          } finally {
            prefetchingRef.current.delete(text);
          }
        }
      }
    };

    preloadNextAudios();
  }, [currentStep, queue, audioCache]);

  useEffect(() => {
    if (currentItem?.video) {
      setIsVideoMode(true);
    } else {
      setIsVideoMode(false);
    }

    const interaction = currentItem?.video
      ? currentItem.video.interactions[interactionIndex]
      : currentItem;
      
    if (interaction?.type === 'matching' && shuffledRight.length === 0) {
      const rightItems = interaction.pairs.map((p: any) => ({ id: p.id, text: p.right }));
      // Fisher-Yates shuffle
      const shuffled = [...rightItems];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setShuffledRight(shuffled);
    }

    if (interaction?.type === 'reorder_words' && shuffledOptions.length === 0) {
      // Fisher-Yates shuffle
      const shuffled = [...(interaction.options || [])];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setShuffledOptions(shuffled);
    }
  }, [currentItem, interactionIndex, shuffledRight.length, shuffledOptions.length]);

  const handleNext = () => {
    setSelectedWords([]);
    setShuffledRight([]);
    setShuffledOptions([]);
    setMatchingPairs({});
    setMatchingSelections({});
    setInputValues({});
    setCategorizedItems({});
    setSelectedCategorizationItem(null);
    setFeedback(null);

    if (isVideoMode) {
      const video = currentItem.video;
      if (showInteraction) {
        // Handled by feedback continue
        return;
      }

      if (interactionIndex < video.interactions.length) {
        setShowInteraction(true);
      } else if (currentSceneIndex < video.scenes.length - 1) {
        setCurrentSceneIndex(currentSceneIndex + 1);
        setInteractionIndex(0);
      } else {
        if (currentStep < block.content.length - 1) {
          setCurrentStep(currentStep + 1);
          setIsVideoMode(false);
          setCurrentSceneIndex(0);
          setInteractionIndex(0);
        } else {
          setShowSummary(true);
        }
      }
    } else {
      if (currentStep < block.content.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowSummary(true);
      }
    }
  };

  const handleCheckAnswer = (optionId: any) => {
    const interaction = isVideoMode ? currentItem.video.interactions[interactionIndex] : currentItem;
    let isCorrect = false;

    if (interaction.type === 'reorder_words') {
      const selectedText = (optionId as string[]).map(id => 
        (interaction.options || []).find((o: any) => o.id === id)?.text
      ).join(' ').toLowerCase().trim();
      const correctText = (interaction.correct_answer as string[]).map((id: string) => 
        (interaction.options || []).find((o: any) => o.id === id)?.text
      ).join(' ').toLowerCase().trim();
      isCorrect = selectedText === correctText;
    } else if (['true_false', 'odd_one_out', 'multiple_choice', 'role_play'].includes(interaction.type)) {
      // Robust comparison for boolean and string values
      const normalizedOption = typeof optionId === 'string' ? optionId.toLowerCase().trim() : optionId;
      const normalizedCorrect = typeof interaction.correct_answer === 'string' ? interaction.correct_answer.toLowerCase().trim() : interaction.correct_answer;
      
      if (interaction.type === 'true_false') {
        const optBool = String(optionId).toLowerCase().trim() === 'true';
        const correctBool = String(interaction.correct_answer).toLowerCase().trim() === 'true';
        isCorrect = optBool === correctBool;
      } else {
        isCorrect = normalizedOption === normalizedCorrect;
      }
    } else if (interaction.type === 'matching') {
      isCorrect = interaction.pairs.every((p: any) => matchingPairs[p.id] === p.id);
    } else if (interaction.type === 'categorization') {
      const allItems = interaction.categories.flatMap((c: any) => c.items);
      const allCategorizedCorrectly = allItems.every((item: any) => {
        const itemId = typeof item === 'string' ? item : item.id;
        const correctCatId = interaction.categories.find((c: any) => 
          c.items.some((i: any) => (typeof i === 'string' ? i : i.id) === itemId)
        )?.id;
        return categorizedItems[itemId] === correctCatId;
      });
      isCorrect = allCategorizedCorrectly && Object.keys(categorizedItems).length === allItems.length;
    } else if (interaction.type === 'transformation') {
      const input = (optionId as string).trim().toLowerCase();
      const correct = interaction.correct_answer.toLowerCase().trim();
      isCorrect = input === correct;
    } else if (interaction.type === 'short_writing' || interaction.type === 'dictation_guided') {
      const input = (optionId as string).trim().toLowerCase();
      if (interaction.validation_regex) {
        const regex = new RegExp(interaction.validation_regex, 'i');
        isCorrect = regex.test(input);
      } else if (interaction.correct_answer) {
        const correct = String(interaction.correct_answer).toLowerCase().trim();
        isCorrect = input === correct;
      } else {
        isCorrect = input.length > 2; // Simple fallback
      }
    }

    if (isCorrect) {
      setFeedback({
        correct: true,
        message: interaction.feedback_correct_es || getEncouragingMessage(true, 0)
      });
      playAudio('/audio/correct.mp3');
    } else {
      const id = interaction.interaction_id || interaction.mastery_tag;
      const currentFails = (failCount[id] || 0) + 1;
      setFailCount(prev => ({ ...prev, [id]: currentFails }));
      
      let message = "";
      if (currentFails >= 3) {
        message = getSolutionText(interaction);
      } else {
        message = interaction.feedback_incorrect_es || getEncouragingMessage(false, currentFails);
      }

      setFeedback({
        correct: false,
        message: message
      });
      playAudio('/audio/wrong.mp3');
    }
  };

  const handleFeedbackContinue = () => {
    const interaction = isVideoMode ? currentItem.video.interactions[interactionIndex] : currentItem;
    const id = interaction.interaction_id || interaction.mastery_tag;

    if (!feedback?.correct && isVideoMode && currentItem.video.branching && failCount[id] >= 2) {
      setIsRepairing(true);
      setFeedback(null);
      return;
    }

    if (feedback?.correct || ((failCount[id] || 0) >= 3)) {
      if (isVideoMode) {
        setInteractionIndex(interactionIndex + 1);
        setShowInteraction(false);
        if (interactionIndex + 1 >= currentItem.video.interactions.length && currentSceneIndex >= currentItem.video.scenes.length - 1) {
           handleNext();
        } else {
          setFeedback(null);
        }
      } else {
        handleNext();
      }
    } else {
      // Retry - Reset interaction state to allow repeating
      setMatchingPairs({});
      setMatchingSelections({});
      setSelectedWords([]);
      setCategorizedItems({});
      setInputValues({});
      setFeedback(null);
    }
  };

  if (showSummary) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-6 overflow-hidden relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: "50%", 
                y: "50%", 
                scale: 0,
                rotate: 0 
              }}
              animate={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`, 
                scale: [0, 1, 0],
                rotate: 360 
              }}
              transition={{ 
                duration: 2 + Math.random() * 3, 
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              <Sparkles className="text-amber-400 w-6 h-6" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ scale: 0, rotate: -20 }} 
          animate={{ scale: 1, rotate: 0 }} 
          className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-amber-200"
        >
          <Trophy className="w-16 h-16 text-amber-600" />
        </motion.div>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black text-slate-900 mb-4"
        >
          ¡Bloque Completado!
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-slate-600 mb-12"
        >
          Has terminado todas las actividades de {block.title}.
        </motion.p>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-4 w-full max-w-xs z-10"
        >
          <Button onClick={onComplete} className="h-16 rounded-2xl bg-indigo-600 text-white text-xl font-black shadow-lg hover:bg-indigo-700 border-b-8 border-indigo-800 active:translate-y-1 active:border-b-0 transition-all">
            CONTINUAR
          </Button>
          <Button variant="outline" onClick={onExit} className="h-16 rounded-2xl border-2 border-slate-200 text-slate-600 text-lg font-bold hover:bg-slate-50">
            VOLVER AL CURSO
          </Button>
        </motion.div>
      </div>
    );
  }

  const renderInteraction = (interaction: any) => {
    switch (interaction.type) {
      case 'reorder_words':
        return (
          <div className="w-full max-w-2xl mx-auto space-y-12">
            <h2 className="text-3xl font-black text-slate-800 text-center">{stripBilingualMarkupEs(interaction.prompt_es)}</h2>
            <div className="min-h-[140px] border-b-4 border-slate-100 py-6 flex flex-wrap gap-3 items-center justify-center bg-slate-50/50 rounded-3xl px-6">
              {selectedWords.map((word) => (
                <motion.button
                  layoutId={word.id}
                  key={`selected-${word.id}`}
                  onClick={() => setSelectedWords(prev => prev.filter(w => w.id !== word.id))}
                  disabled={!!feedback}
                  className="p-4 px-6 bg-white border-2 border-slate-200 border-b-4 rounded-2xl font-bold text-xl text-slate-700 shadow-sm active:translate-y-0.5"
                >
                  {stripBilingualMarkup(word.text)}
                </motion.button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 justify-center pt-8">
              {shuffledOptions.map((opt: any) => {
                const isSelected = selectedWords.find(sw => sw.id === opt.id);
                return (
                  <motion.button
                    layoutId={opt.id}
                    key={`pool-${opt.id}`}
                    onClick={() => setSelectedWords(prev => [...prev, opt])}
                    disabled={!!feedback || !!isSelected}
                    className={`p-4 px-6 border-2 border-b-4 rounded-2xl font-bold text-xl transition-all ${
                      isSelected ? 'bg-slate-100 border-transparent text-transparent opacity-30 cursor-default' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 active:translate-y-0.5 shadow-sm'
                    }`}
                  >
                    {stripBilingualMarkup(opt.text)}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );

      case 'matching':
        return (
          <div className="w-full max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-black text-slate-800 text-center">{stripBilingualMarkupEs(interaction.prompt_es)}</h2>
            <div className="grid grid-cols-2 gap-8 md:gap-16">
              <div className="space-y-4">
                {interaction.pairs.map((p: any) => (
                  <button
                    key={`left-${p.id}`}
                    onClick={() => {
                      const newSelections = { ...matchingSelections, left: p.id };
                      if (newSelections.right) {
                        setMatchingPairs(prev => ({ ...prev, [newSelections.left!]: newSelections.right! }));
                        setMatchingSelections({});
                      } else setMatchingSelections(newSelections);
                    }}
                    disabled={!!feedback || !!matchingPairs[p.id]}
                    className={`w-full p-5 border-2 border-b-4 rounded-2xl font-bold text-xl transition-all ${
                      matchingPairs[p.id] ? 'bg-slate-50 border-slate-100 text-slate-300' :
                      matchingSelections.left === p.id ? 'bg-indigo-50 border-indigo-500 text-indigo-700 scale-105 shadow-md' :
                      'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {stripBilingualMarkup(p.left)}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                {shuffledRight.map((p: any) => (
                  <button
                    key={`right-${p.id}`}
                    onClick={() => {
                      const newSelections = { ...matchingSelections, right: p.id };
                      if (newSelections.left) {
                        setMatchingPairs(prev => ({ ...prev, [newSelections.left!]: newSelections.right! }));
                        setMatchingSelections({});
                      } else setMatchingSelections(newSelections);
                    }}
                    disabled={!!feedback || Object.values(matchingPairs).includes(p.id)}
                    className={`w-full p-5 border-2 border-b-4 rounded-2xl font-bold text-xl transition-all ${
                      Object.values(matchingPairs).includes(p.id) ? 'bg-slate-50 border-slate-100 text-slate-300' :
                      matchingSelections.right === p.id ? 'bg-indigo-50 border-indigo-500 text-indigo-700 scale-105 shadow-md' :
                      'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {stripBilingualMarkup(p.text)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'multiple_choice':
      case 'odd_one_out':
      case 'role_play':
        return (
          <div className="w-full max-w-2xl mx-auto space-y-8">
            <h2 className="text-2xl font-black text-slate-800 text-center">{stripBilingualMarkupEs(interaction.prompt_es)}</h2>
            {interaction.stimulus_en && (
               <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-100 text-center mb-8 max-h-[40vh] overflow-y-auto">
                  <p className="text-2xl font-bold text-slate-700 leading-relaxed whitespace-pre-line">
                    {stripBilingualMarkup(interaction.stimulus_en)}
                  </p>
               </div>
            )}
            <div className="grid gap-4">
              {interaction.options.map((opt: any) => (
                <button
                  key={opt.id}
                  onClick={() => handleCheckAnswer(opt.id)}
                  disabled={!!feedback}
                  className={`w-full p-6 text-left border-2 border-b-4 rounded-3xl font-bold text-xl transition-all ${
                    feedback 
                      ? opt.id === interaction.correct_answer ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100 bg-white text-slate-300'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:translate-y-1'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {stripBilingualMarkup(opt.text)}
                    {feedback && opt.id === interaction.correct_answer && <CheckCircle2 className="w-6 h-6" />}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'transformation':
        const hasBlank = interaction.stimulus_en?.includes('___');
        const isSolutionInPrompt = interaction.prompt_es && interaction.correct_answer && 
                                   interaction.prompt_es.toLowerCase().trim() === interaction.correct_answer.toLowerCase().trim();
        return (
          <div className="w-full max-w-2xl mx-auto space-y-8">
            <h2 className="text-2xl font-black text-slate-800 text-center">
              {isSolutionInPrompt ? "Completa el espacio:" : stripBilingualMarkupEs(interaction.prompt_es)}
            </h2>
            <div className="bg-slate-50 p-10 rounded-[3rem] border-4 border-slate-200 shadow-inner">
               {hasBlank ? (
                 <div className="text-2xl font-bold text-slate-700 flex flex-wrap justify-center items-center gap-x-4 gap-y-8 max-h-[40vh] overflow-y-auto p-4">
                   {stripBilingualMarkup(interaction.stimulus_en || "").split('___').map((part: string, i: number, arr: any[]) => (
                     <React.Fragment key={i}>
                       <span>{part}</span>
                       {i < arr.length - 1 && (
                         <input 
                           type="text" 
                           autoFocus={i === 0}
                           value={inputValues[i] || ""}
                           disabled={!!feedback}
                           className="min-w-[120px] border-b-4 border-indigo-500 bg-transparent text-center focus:outline-none placeholder:text-slate-300"
                           style={{ width: `${Math.max((inputValues[i]?.length || 2) * 20, 100)}px` }}
                           onChange={(e) => setInputValues(prev => ({ ...prev, [i]: e.target.value }))}
                           onKeyDown={(e) => { 
                             if (e.key === 'Enter') {
                               const stim = interaction.stimulus_en || "";
                               const exp = stim.includes('___') ? stim.split('___').length - 1 : 1;
                               const filledCount = Object.values(inputValues).filter(v => v.trim().length > 0).length;
                               if (filledCount >= exp) {
                                 handleCheckAnswer(Object.values(inputValues).join(' ').trim());
                               }
                             }
                           }}
                         />
                       )}
                     </React.Fragment>
                   ))}
                 </div>
               ) : (
                 <div className="space-y-12">
                   <div className="p-8 bg-white rounded-3xl border-2 border-slate-100 shadow-sm text-2xl font-bold text-slate-800 text-center max-h-[30vh] overflow-y-auto">
                     {stripBilingualMarkup(interaction.stimulus_en)}
                   </div>
                   <input 
                     type="text" 
                     value={inputValues[0] || ""}
                     autoFocus
                     disabled={!!feedback}
                     className="w-full p-6 text-2xl font-black border-b-8 border-indigo-500 bg-transparent text-center focus:outline-none placeholder:text-slate-200"
                     placeholder="Escribe aquí..."
                     onChange={(e) => setInputValues(prev => ({ ...prev, 0: e.target.value }))}
                     onKeyDown={(e) => { if (e.key === 'Enter' && (inputValues[0]?.trim().length || 0) > 0) handleCheckAnswer(inputValues[0] || ""); }}
                   />
                 </div>
               )}
            </div>
          </div>
        );

      case 'categorization':
        const allItems = interaction.categories.flatMap((cat: any) => cat.items || []);
        const remainingItems = allItems.filter((item: any) => {
          const id = typeof item === 'string' ? item : item.id;
          return !categorizedItems[id];
        });
        
        return (
          <div className="w-full max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl font-black text-slate-800 text-center">{stripBilingualMarkupEs(interaction.prompt_es)}</h2>
            <div className="flex flex-wrap gap-4 justify-center p-8 bg-slate-50/50 rounded-3xl border-4 border-dashed border-slate-100 min-h-[120px]">
              {remainingItems.length === 0 ? (
                <p className="text-slate-400 font-black text-xl flex items-center gap-2"><CheckCircle2 /> ¡Todo listo!</p>
              ) : (
                remainingItems.map((item: any, idx: number) => {
                  const id = typeof item === 'string' ? item : item.id;
                  const text = stripBilingualMarkup(typeof item === 'string' ? item : item.text);
                  return (
                    <button
                      key={`${id}-${idx}`}
                      onClick={() => setSelectedCategorizationItem(id)}
                      disabled={!!feedback}
                      className={`p-4 px-8 border-2 border-b-4 rounded-2xl font-bold text-2xl transition-all ${
                        selectedCategorizationItem === id
                          ? 'bg-indigo-600 border-indigo-800 text-white scale-105 shadow-xl'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      {text}
                    </button>
                  );
                })
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {interaction.categories.map((cat: any) => (
                <div 
                  key={cat.id}
                  onClick={() => {
                    if (selectedCategorizationItem && !feedback) {
                      setCategorizedItems(prev => ({ ...prev, [selectedCategorizationItem]: cat.id }));
                      setSelectedCategorizationItem(null);
                    }
                  }}
                  className={`p-8 rounded-[2.5rem] border-4 border-b-[12px] transition-all cursor-pointer min-h-[200px] ${
                    selectedCategorizationItem 
                      ? 'border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50' 
                      : 'border-slate-100 bg-white'
                  }`}
                >
                  <h3 className="text-2xl font-black text-slate-400 mb-6 uppercase tracking-widest">{cat.title || cat.name}</h3>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(categorizedItems).filter(([_, catId]) => catId === cat.id).map(([itemId], idx) => {
                      const originalItem = allItems.find((i: any) => (typeof i === 'string' ? i : i.id) === itemId);
                      const rawText = typeof originalItem === 'string' ? originalItem : originalItem?.text || itemId;
                      const text = stripBilingualMarkup(rawText);
                      
                      return (
                        <button
                          key={`${itemId}-${idx}`}
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            if (!feedback) setCategorizedItems(prev => { 
                              const next = { ...prev }; 
                              delete next[itemId]; 
                              return next; 
                            }); 
                          }}
                          className="p-3 px-5 bg-slate-900 text-white rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-red-500 transition-colors"
                        >
                          {text} <X className="w-4 h-4" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'true_false':
        return (
          <div className="w-full max-w-xl mx-auto space-y-12">
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-black text-slate-800 leading-tight">{stripBilingualMarkupEs(interaction.prompt_es)}</h2>
              {interaction.stimulus_en && (
                <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-100 max-h-[40vh] overflow-y-auto">
                  <p className="text-2xl font-bold text-slate-700 leading-relaxed">
                    {stripBilingualMarkup(interaction.stimulus_en)}
                  </p>
                </div>
              )}
            </div>

            {/* Show correction if wrong order */}
            {feedback && interaction.correct_answer === false && interaction.correct_order && (
              <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-100 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-2">Orden Correcto:</p>
                <p className="text-indigo-900 font-black text-xl italic leading-relaxed">
                  "{interaction.correct_order}"
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6">
              <button 
                onClick={() => handleCheckAnswer(true)}
                disabled={!!feedback}
                className={`p-10 border-2 border-b-[10px] rounded-[2rem] font-black text-3xl transition-all flex items-center justify-between px-12 ${
                  feedback ? (interaction.correct_answer === true ? 'bg-green-100 border-green-500 text-green-700' : 'bg-slate-50 border-slate-100 text-slate-200') 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 active:translate-y-2'
                }`}
              >
                VERDADERO
                {feedback && interaction.correct_answer === true && <CheckCircle2 className="w-10 h-10" />}
              </button>
              <button 
                onClick={() => handleCheckAnswer(false)}
                disabled={!!feedback}
                className={`p-10 border-2 border-b-[10px] rounded-[2rem] font-black text-3xl transition-all flex items-center justify-between px-12 ${
                  feedback ? (interaction.correct_answer === false ? 'bg-green-100 border-green-500 text-green-700' : 'bg-slate-50 border-slate-100 text-slate-200') 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 active:translate-y-2'
                }`}
              >
                FALSO
                {feedback && interaction.correct_answer === false && <CheckCircle2 className="w-10 h-10" />}
              </button>
            </div>
          </div>
        );

      case 'short_writing':
      case 'dictation_guided':
        return (
          <div className="w-full max-w-2xl mx-auto space-y-12">
             <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-800 text-center">{stripBilingualMarkupEs(interaction.prompt_es)}</h2>
                {interaction.example && (
                   <p className="text-center text-slate-400 font-bold text-lg italic">
                     Ejemplo: &quot;{interaction.example}&quot;
                   </p>
                )}
             </div>

             <div className="bg-slate-50 p-10 rounded-[3rem] border-4 border-slate-200 shadow-inner">
                <div className="space-y-8">
                  {interaction.type === 'dictation_guided' && (
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        size="lg"
                        className="h-20 w-20 rounded-full border-4 border-indigo-200"
                        onClick={() => playAudio(interaction.audioUrl || currentItem.audioUrl, interaction.tts_en || interaction.stimulus_en)}
                      >
                        <Volume2 className="w-10 h-10 text-indigo-600" />
                      </Button>
                    </div>
                  )}
                  
                  <input 
                    type="text" 
                    value={inputValues[0] || ""}
                    autoFocus
                    disabled={!!feedback}
                    className="w-full p-6 text-2xl font-black border-b-8 border-indigo-500 bg-transparent text-center focus:outline-none placeholder:text-slate-200"
                    placeholder="Escribe aquí..."
                    onChange={(e) => setInputValues({ 0: e.target.value })}
                    onKeyDown={(e) => { 
                      if (e.key === 'Enter' && (inputValues[0]?.trim().length || 0) > 0) {
                        handleCheckAnswer(inputValues[0] || ""); 
                      }
                    }}
                  />
                </div>
             </div>
          </div>
        );

      default:
        return (
          <div className="text-center p-12 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-200">
            <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest">Actividad No Implementada</h3>
            <p className="text-slate-400 mt-2 font-bold">{interaction.type}</p>
          </div>
        );
    }
  };

  const renderVideoScene = (video: any) => {
    if (isRepairing) {
      return (
        <div className="w-full max-w-2xl mx-auto space-y-8 py-12">
           <div className="bg-orange-50 border-4 border-orange-200 p-12 rounded-[3rem] text-center space-y-8 shadow-2xl shadow-orange-100">
              <div className="w-24 h-24 bg-orange-200 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-12 h-12 text-orange-600" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-orange-900 tracking-tight">Repaso rápido</h2>
                <p className="text-2xl font-bold text-orange-700">{video.branching.repair_scene.narration_es}</p>
              </div>
              <div className="text-4xl font-black text-slate-800 p-8 bg-white rounded-3xl shadow-inner border-2 border-orange-100">
                {video.branching.repair_scene.visual_description}
              </div>
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white font-black px-12 py-8 rounded-[2rem] w-full text-2xl border-b-8 border-orange-700 active:translate-y-1 transition-all"
                onClick={() => {
                  setIsRepairing(false);
                  setFailCount({ ...failCount, [video.interactions[interactionIndex].mastery_tag]: 0 });
                }}
              >
                ¡LO TENGO!
              </Button>
           </div>
        </div>
      );
    }

    if (showInteraction) {
      return renderInteraction(video.interactions[interactionIndex]);
    }

    const scene = video.scenes?.[currentSceneIndex];
    if (!scene) {
      return (
        <div className="text-center p-12 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-200">
          <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest">Escena no encontrada</h3>
          <p className="text-slate-400 mt-2 font-bold">La escena {currentSceneIndex + 1} del video no está disponible.</p>
          <Button 
            className="mt-6 bg-indigo-600 text-white font-black px-8 py-4 rounded-xl"
            onClick={() => {
              if (currentSceneIndex < video.scenes?.length - 1) {
                setCurrentSceneIndex(prev => prev + 1);
              } else {
                setShowInteraction(true);
              }
            }}
          >
            SALTAR ESCENA
          </Button>
        </div>
      );
    }
    return (
      <div className="w-full max-w-2xl mx-auto space-y-12">
        <div className="bg-indigo-50 border-4 border-indigo-100 rounded-[3rem] p-12 flex flex-col items-center gap-10 shadow-xl shadow-indigo-100/20">
           {/* Audio Icon Header */}
           <div className="flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm border border-indigo-100">
              <Volume2 className="w-6 h-6 text-indigo-500" />
              <span className="text-indigo-600 font-black text-sm uppercase tracking-widest">Escucha la conversación</span>
           </div>
           
           {/* Play Button */}
           <motion.div 
             whileHover={{ scale: 1.05 }}
             whileActive={{ scale: 0.95 }}
             onClick={() => playAudio(scene.audioUrl || currentItem.audioUrl, scene.tts_en || scene.dialogue_en)}
             className="w-40 h-40 bg-indigo-500 rounded-full flex items-center justify-center cursor-pointer shadow-2xl shadow-indigo-200 group relative"
           >
             <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />
             <Play className="w-20 h-20 text-white fill-white ml-2 relative z-10" />
           </motion.div>

           {/* Dialogue & Transcription */}
           <div className="space-y-6 text-center">
              <p className="text-indigo-400 font-bold text-xl italic opacity-70">
                &quot;{scene.visual_description || scene.narration_es}&quot;
              </p>
              <h3 className="text-slate-800 text-4xl md:text-5xl font-black tracking-tight leading-tight whitespace-pre-line">
                {scene.dialogue_en}
              </h3>
           </div>

           {/* On-screen text / help if any */}
           {scene.on_screen_text && (
             <div className="bg-white/60 px-8 py-4 rounded-2xl border border-indigo-100 text-indigo-800 font-black text-xl italic">
                {scene.on_screen_text}
             </div>
           )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-y-auto">
      {/* Header */}
      <header className="max-w-5xl mx-auto w-full px-6 py-8 md:py-12 flex items-center gap-6">
        <button onClick={onExit} className="p-3 text-slate-300 hover:text-slate-600 transition-colors">
          <X className="w-8 h-8" />
        </button>
        <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner relative">
          <motion.div 
            className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)] relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          >
            <motion.div 
              className="absolute inset-0 bg-white/30"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              style={{ width: '30%' }}
            />
          </motion.div>
        </div>
        <div className="bg-orange-100 px-4 py-2 rounded-2xl flex items-center gap-2">
          <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
          <span className="text-orange-700 font-black">Lvl 1</span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col justify-center px-6 py-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentStep}-${interactionIndex}-${isRepairing}-${showInteraction}-${currentSceneIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full h-full flex flex-col justify-center"
          >
            {isVideoMode ? renderVideoScene(currentItem.video) : renderInteraction(currentItem)}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Feedback & Footer */}
      <AnimatePresence>
        {feedback && (() => {
          const interaction = isVideoMode ? currentItem.video.interactions[interactionIndex] : currentItem;
          const id = interaction.interaction_id || interaction.mastery_tag;
          return (
            <motion.footer 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className={`fixed bottom-0 left-0 right-0 border-t-[4px] z-50 ${
                feedback.correct ? 'bg-[#d7ffb8] border-[#a5db5e]' : 'bg-[#ffdfe0] border-[#ee9b9e]'
              }`}
            >
              <div className="max-w-4xl mx-auto px-6 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                    feedback.correct ? 'bg-white text-green-500' : 'bg-white text-red-500'
                  }`}>
                    {feedback.correct ? <CheckCircle2 className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className={`text-xl font-black ${feedback.correct ? 'text-[#4b7e02]' : 'text-[#ea2b2b]'}`}>
                      {feedback.correct ? '¡Increíble!' : ((failCount[id] || 0) >= 3 ? 'La solución es:' : '¡Uy! Casi...')}
                    </h3>
                    <p className={`text-base font-bold ${feedback.correct ? 'text-[#4b7e02]/80' : 'text-[#ea2b2b]/80'}`}>
                      {feedback.message}
                    </p>
                    {interaction.tip_es && !feedback.correct && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-2 flex items-start gap-2 bg-white/50 p-3 rounded-xl border border-[#ee9b9e]/50"
                      >
                        <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-sm font-bold text-slate-700 italic">
                          <span className="text-[#ea2b2b] uppercase text-[10px] tracking-wider block mb-0.5">Tip:</span>
                          {interaction.tip_es}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <Button 
                  onClick={handleFeedbackContinue}
                  className={`w-full md:w-auto px-10 py-4 rounded-2xl font-black text-xl border-b-4 active:translate-y-0.5 transition-all ${
                    feedback.correct ? 'bg-[#58cc02] hover:bg-[#46a302] border-[#4b7e02] text-white' : 'bg-[#ff4b4b] hover:bg-[#d33131] border-[#ea2b2b] text-white'
                  }`}
                >
                  CONTINUAR
                </Button>
              </div>
            </motion.footer>
          );
        })()}
      </AnimatePresence>

      <footer className={`p-4 md:p-6 border-t-2 border-slate-100 bg-white ${feedback ? 'hidden' : ''}`}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-4">
          <Button 
            variant="ghost" 
            className="text-slate-400 font-black text-lg hover:text-slate-600 px-6 h-12 rounded-xl"
            onClick={onExit}
          >
            SALIR
          </Button>

          {isVideoMode && !showInteraction ? (
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 border-b-4 border-indigo-800 font-black px-12 h-14 rounded-2xl text-xl text-white shadow-lg active:translate-y-0.5 transition-all"
              onClick={handleNext}
            >
              SIGUIENTE
            </Button>
          ) : (
            <Button 
              disabled={(() => {
                const interaction = isVideoMode ? currentItem.video.interactions[interactionIndex] : currentItem;
                if (interaction.type === 'reorder_words') return selectedWords.length === 0;
                if (interaction.type === 'matching') return Object.keys(matchingPairs).length < interaction.pairs.length;
                if (interaction.type === 'transformation') {
                  const stim = interaction.stimulus_en || "";
                  const exp = stim.includes('___') ? stim.split('___').length - 1 : 1;
                  const filledCount = Object.values(inputValues).filter(v => v.trim().length > 0).length;
                  return filledCount < exp;
                }
                if (interaction.type === 'categorization') {
                  const items = interaction.categories.flatMap((cat: any) => cat.items);
                  return Object.keys(categorizedItems).length < items.length;
                }
                if (['short_writing', 'dictation_guided'].includes(interaction.type)) {
                  return !inputValues[0] || inputValues[0].trim().length === 0;
                }
                return false;
              })()}
              className="bg-[#58cc02] hover:bg-[#46a302] disabled:bg-slate-100 disabled:text-slate-300 disabled:border-slate-200 border-b-4 border-[#4b7e02] font-black px-12 h-14 rounded-2xl text-xl text-white shadow-lg active:translate-y-0.5 transition-all"
              onClick={() => {
                const interaction = isVideoMode ? currentItem.video.interactions[interactionIndex] : currentItem;
                if (interaction.type === 'reorder_words') handleCheckAnswer(selectedWords.map(w => w.id));
                else if (interaction.type === 'matching') handleCheckAnswer(matchingPairs);
                else if (interaction.type === 'categorization') handleCheckAnswer(Object.keys(categorizedItems));
                else if (interaction.type === 'transformation') {
                  const stim = interaction.stimulus_en || "";
                  const exp = stim.includes('___') ? stim.split('___').length - 1 : 1;
                  const answers = [];
                  for (let j = 0; j < exp; j++) answers.push(inputValues[j] || "");
                  handleCheckAnswer(answers.join(' ').trim());
                }
                else if (['short_writing', 'dictation_guided'].includes(interaction.type)) {
                   handleCheckAnswer(inputValues[0] || "");
                }
                else handleNext();
              }}
            >
              {(() => {
                const interaction = isVideoMode ? currentItem.video.interactions[interactionIndex] : currentItem;
                return ['reorder_words', 'matching', 'short_writing', 'transformation', 'categorization', 'dictation_guided'].includes(interaction.type) ? 'COMPROBAR' : 'SIGUIENTE';
              })()}
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
