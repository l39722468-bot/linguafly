import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import type { CourseExercise, ExerciseResult } from '../types/exercise';
import {
  checkMultipleChoice,
  checkTextAnswer,
  checkTrueFalse,
  getAudioUrl,
  getExerciseContent,
  getPrimaryQuestion,
} from '../utils/exercise-eval';
import { MultipleChoiceExercise } from './exercises/MultipleChoiceExercise';
import { TrueFalseExercise } from './exercises/TrueFalseExercise';
import { FillBlankExercise } from './exercises/FillBlankExercise';
import { ReadingExercise } from './exercises/ReadingExercise';
import { ListeningExercise } from './exercises/ListeningExercise';
import { FallbackExercise } from './exercises/FallbackExercise';
import { parseBilingual } from '../utils/bilingual';

type Props = {
  exercise: CourseExercise;
  onComplete: (result: ExerciseResult) => void;
};

const SUPPORTED_TYPES = new Set([
  'multiple-choice',
  'true-false',
  'fill-blank',
  'fill-in-the-blank',
  'reading',
  'reading-comprehension',
  'listening',
  'listening-comprehension',
]);

export function ExerciseRenderer({ exercise, onComplete }: Props) {
  const question = getPrimaryQuestion(exercise);
  const content = getExerciseContent(exercise);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [trueFalseValue, setTrueFalseValue] = useState<boolean | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSelectedIndex(null);
    setTrueFalseValue(null);
    setTextAnswer('');
    setSubmitted(false);
  }, [exercise.id]);

  function finish(result: boolean) {
    setSubmitted(true);
    setTimeout(() => {
      onComplete({ success: result, score: result ? 100 : 0 });
    }, 1200);
  }

  function submitMultipleChoice() {
    if (!question || selectedIndex === null) return;
    finish(checkMultipleChoice(question, selectedIndex));
  }

  function submitTrueFalse() {
    if (!question || trueFalseValue === null) return;
    finish(checkTrueFalse(question, trueFalseValue));
  }

  function submitFillBlank() {
    if (!question) return;
    if (question.options?.length) {
      if (selectedIndex === null) return;
      finish(checkMultipleChoice(question, selectedIndex));
      return;
    }
    finish(checkTextAnswer(question, textAnswer));
  }

  if (!question || !SUPPORTED_TYPES.has(exercise.type)) {
    return (
      <FallbackExercise
        exercise={exercise}
        onSkip={() => onComplete({ success: true, score: 0 })}
      />
    );
  }

  const type = exercise.type;
  const isReading =
    (type === 'reading' || type === 'reading-comprehension') &&
    !!(content.text || content.passage || exercise.transcript);
  const isListening = type === 'listening' || type === 'listening-comprehension';

  if (isReading) {
    return (
      <ReadingExercise
        exercise={exercise}
        question={question}
        selectedIndex={selectedIndex}
        submitted={submitted}
        onSelect={setSelectedIndex}
        onSubmit={submitMultipleChoice}
      />
    );
  }

  if (isListening) {
    return (
      <ListeningExercise
        exercise={exercise}
        question={question}
        audioUrl={getAudioUrl(exercise, question)}
        selectedIndex={selectedIndex}
        submitted={submitted}
        onSelect={setSelectedIndex}
        onSubmit={submitMultipleChoice}
      />
    );
  }

  if (type === 'true-false') {
    const correctRaw = question.correctAnswer ?? question.answer;
    const correctValue =
      typeof correctRaw === 'boolean'
        ? correctRaw
        : String(correctRaw).toLowerCase() === 'true';

    return (
      <TrueFalseExercise
        question={question}
        selected={trueFalseValue}
        submitted={submitted}
        correctValue={submitted ? correctValue : null}
        onSelect={setTrueFalseValue}
        onSubmit={submitTrueFalse}
      />
    );
  }

  if (type === 'fill-blank' || type === 'fill-in-the-blank') {
    return (
      <FillBlankExercise
        question={question}
        answer={textAnswer}
        selectedIndex={selectedIndex}
        submitted={submitted}
        onChangeText={setTextAnswer}
        onSelectOption={setSelectedIndex}
        onSubmit={submitFillBlank}
      />
    );
  }

  return (
    <MultipleChoiceExercise
      question={question}
      selectedIndex={selectedIndex}
      submitted={submitted}
      onSelect={setSelectedIndex}
      onSubmit={submitMultipleChoice}
    />
  );
}

export function ExerciseHeader({ exercise }: { exercise: CourseExercise }) {
  const content = getExerciseContent(exercise);
  return (
    <>
      {content.title ? (
        <Text style={{ fontSize: 13, fontWeight: '800', color: '#FF6B6B', marginBottom: 4 }}>
          {parseBilingual(content.title)}
        </Text>
      ) : null}
      {content.instructions ? (
        <Text style={{ fontSize: 14, color: '#64748b', marginBottom: 12, lineHeight: 20 }}>
          {parseBilingual(content.instructions)}
        </Text>
      ) : null}
    </>
  );
}
