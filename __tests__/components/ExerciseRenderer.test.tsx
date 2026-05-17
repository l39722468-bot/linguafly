import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExerciseRenderer from '@/components/ExerciseRenderer';
import type { Exercise } from '@/lib/exercise-generator';

// Mock the gamification hook
jest.mock('@/lib/hooks/use-gamification', () => ({
  useGamification: () => ({
    completeExercise: jest.fn(),
  }),
}));

// Mock the AudioPlayer component
jest.mock('@/components/course/preview/AudioPlayer', () => ({
  AudioPlayer: ({ audioUrl, transcript }: { audioUrl: string; transcript?: string }) => (
    <div data-testid="audio-player">
      <div data-testid="audio-url">{audioUrl}</div>
      {transcript && <div data-testid="audio-transcript">{transcript}</div>}
    </div>
  ),
}));

// Mock other dependencies
jest.mock('@/components/SpeakingExercise', () => {
  return function MockSpeakingExercise() {
    return <div>Speaking Exercise</div>;
  };
});

jest.mock('@/components/exercises/WordSearchExercise', () => {
  return function MockWordSearchExercise() {
    return <div>Word Search</div>;
  };
});

jest.mock('@/components/exercises/CrosswordExercise', () => {
  return function MockCrosswordExercise() {
    return <div>Crossword</div>;
  };
});

jest.mock('@/components/exercises/FlashcardExercise', () => {
  return function MockFlashcardExercise() {
    return <div>Flashcard</div>;
  };
});

jest.mock('@/components/exercises/DragDropExercise', () => {
  return function MockDragDropExercise() {
    return <div>Drag Drop</div>;
  };
});

jest.mock('@/components/exercises/MatchingExercise', () => {
  return function MockMatchingExercise() {
    return <div>Matching</div>;
  };
});

jest.mock('@/components/exercises/InteractiveDialogueExercise', () => {
  return function MockInteractiveDialogueExercise() {
    return <div>Interactive Dialogue</div>;
  };
});

jest.mock('@/components/course/Markdown', () => {
  return function MockMarkdown({ content }: { content: string }) {
    return <div>{content}</div>;
  };
});

jest.mock('@/components/course/exercises/TranslatedText', () => ({
  TranslatedText: ({ text }: { text: string }) => <span>{text}</span>,
  TRANSLATION_TOOLTIP_SPACING: {
    blockWithTranslations: '',
    blockBelow: '',
    betweenOptions: '',
  },
}));

describe('ExerciseRenderer - Audio Integration', () => {
  const mockOnComplete = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render AudioPlayer when exercise has audioUrl', async () => {
    const exerciseWithAudio: Exercise = {
      id: 'ex-1',
      type: 'multiple-choice',
      level: 'A1',
      topic: 'greetings',
      topicName: 'Greetings',
      audioUrl: '/audio/greeting.mp3',
      transcript: 'Hello, how are you?',
      content: {
        title: 'Test Exercise',
        question: 'What is the correct greeting?',
        options: ['Hello', 'Goodbye', 'Maybe', 'Never'],
        correctAnswer: 0,
      },
    };

    render(<ExerciseRenderer exercise={exerciseWithAudio} onComplete={mockOnComplete} />);

    await waitFor(() => {
      const audioPlayer = screen.queryByTestId('audio-player');
      expect(audioPlayer).toBeInTheDocument();
    });

    const audioUrl = screen.getByTestId('audio-url');
    expect(audioUrl).toHaveTextContent('/audio/greeting.mp3');

    const transcript = screen.getByTestId('audio-transcript');
    expect(transcript).toHaveTextContent('Hello, how are you?');
  });

  it('should not render AudioPlayer when exercise has no audioUrl', async () => {
    const exerciseWithoutAudio: Exercise = {
      id: 'ex-2',
      type: 'multiple-choice',
      level: 'A1',
      topic: 'greetings',
      topicName: 'Greetings',
      content: {
        title: 'Test Exercise',
        question: 'What is the correct greeting?',
        options: ['Hello', 'Goodbye', 'Maybe', 'Never'],
        correctAnswer: 0,
      },
    };

    render(<ExerciseRenderer exercise={exerciseWithoutAudio} onComplete={mockOnComplete} />);

    await waitFor(() => {
      const audioPlayer = screen.queryByTestId('audio-player');
      expect(audioPlayer).not.toBeInTheDocument();
    });
  });

  it('should render AudioPlayer for reading exercises with audio', async () => {
    const readingExerciseWithAudio: Exercise = {
      id: 'ex-3',
      type: 'reading-comprehension',
      level: 'A1',
      topic: 'reading',
      topicName: 'Reading Practice',
      audioUrl: '/audio/reading-passage.mp3',
      transcript: 'This is a reading passage about lions and tigers.',
      content: {
        title: 'Reading Comprehension',
        text: 'This is a reading passage about lions and tigers.',
        questions: [
          {
            question: 'What is the main idea?',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: 0,
          },
        ],
      },
    };

    render(<ExerciseRenderer exercise={readingExerciseWithAudio} onComplete={mockOnComplete} />);

    await waitFor(
      () => {
        // Check that audio players are present (should have 2: one in header, one in reading section)
        const audioPlayers = screen.getAllByTestId('audio-player');
        expect(audioPlayers.length).toBeGreaterThanOrEqual(1);
      },
      { timeout: 2000 }
    );

    // Verify audio URLs are correct
    const audioUrls = screen.getAllByTestId('audio-url');
    expect(audioUrls[0]).toHaveTextContent('/audio/reading-passage.mp3');
    
    // Verify transcripts are displayed
    const transcripts = screen.getAllByTestId('audio-transcript');
    expect(transcripts[0]).toHaveTextContent('This is a reading passage about lions and tigers.');
  });

  it('should handle audioUrl with leading slash correctly', async () => {
    const exercise: Exercise = {
      id: 'ex-4',
      type: 'multiple-choice',
      level: 'A1',
      topic: 'test',
      topicName: 'Test',
      audioUrl: 'audio/test.mp3', // No leading slash
      content: {
        title: 'Test',
        question: 'Test question?',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
      },
    };

    render(<ExerciseRenderer exercise={exercise} onComplete={mockOnComplete} />);

    await waitFor(() => {
      const audioUrl = screen.getByTestId('audio-url');
      // Should add leading slash
      expect(audioUrl).toHaveTextContent('/audio/test.mp3');
    });
  });

  it('should render exercise content correctly with bilingual text', async () => {
    const exercise: Exercise = {
      id: 'ex-5',
      type: 'multiple-choice',
      level: 'A1',
      topic: 'greetings',
      topicName: 'Greetings',
      content: {
        title: '[[Hello|Hola]]',
        questions: [
          {
            question: 'What does [[hello|hola]] mean?',
            options: ['Greeting', 'Goodbye', 'Thanks', 'Sorry'],
            correctAnswer: 0,
          },
        ],
      },
    };

    render(<ExerciseRenderer exercise={exercise} onComplete={mockOnComplete} />);

    await waitFor(() => {
      // Exercise should render with the title
      // Our mock TranslatedText just returns the raw text
      expect(screen.getByText('[[Hello|Hola]]')).toBeInTheDocument();
      
      // Verify exercise structure is rendered
      expect(screen.getByText('Greeting')).toBeInTheDocument();
      expect(screen.getByText('Goodbye')).toBeInTheDocument();
    });
  });

  it('should render bilingual feedback in Spanish when answer is incorrect', async () => {
    const exercise: Exercise = {
      id: 'ex-7',
      type: 'fill-blank',
      level: 'A1',
      topic: 'building',
      topicName: 'Building',
      content: {
        title: 'Test feedback',
        questions: [
          {
            question: 'Where is reception?',
            correctAnswer: '[[first floor|primer piso]]',
            type: 'fill-blank',
          },
        ],
      },
    };

    render(<ExerciseRenderer exercise={exercise} onComplete={mockOnComplete} />);

    const input = screen.getByPlaceholderText('Escribe aquí tu respuesta…');
    fireEvent.change(input, { target: { value: 'wrong answer' } });
    fireEvent.click(screen.getByTestId('confirm-button'));

    await waitFor(() => {
      expect(screen.getByText(/Respuesta incorrecta\. La respuesta correcta era:/)).toBeInTheDocument();
      expect(screen.getByText(/primer piso/)).toBeInTheDocument();
      expect(screen.queryByText(/Incorrect\. The correct answer was:/)).not.toBeInTheDocument();
    });
  });
});

describe('ExerciseRenderer - Question-level Audio', () => {
  const mockOnComplete = jest.fn();

  it('should render AudioPlayer for questions with audioUrl', async () => {
    const exerciseWithQuestionAudio: Exercise = {
      id: 'ex-6',
      type: 'multiple-choice',
      level: 'A1',
      topic: 'listening',
      topicName: 'Listening Practice',
      content: {
        title: 'Listening Exercise',
        questions: [
          {
            question: 'What do you hear?',
            audioUrl: '/audio/question1.mp3',
            options: ['Cat', 'Dog', 'Bird', 'Fish'],
            correctAnswer: 2,
          },
        ],
      },
    };

    render(<ExerciseRenderer exercise={exerciseWithQuestionAudio} onComplete={mockOnComplete} />);

    await waitFor(() => {
      const audioPlayer = screen.queryByTestId('audio-player');
      expect(audioPlayer).toBeInTheDocument();
    });

    const audioUrl = screen.getByTestId('audio-url');
    expect(audioUrl).toHaveTextContent('/audio/question1.mp3');
  });
});
