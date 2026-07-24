export type ExerciseQuestion = {
  id?: string;
  question?: string;
  text?: string;
  prompt?: string;
  type?: string;
  options?: Array<string | { text?: string }>;
  correctAnswer?: number | string | boolean | string[];
  answer?: number | string | boolean;
  explanation?: string;
  acceptableAnswers?: string[] | string;
  audioUrl?: string;
};

export type ExerciseContent = {
  title?: string;
  instructions?: string;
  questions?: ExerciseQuestion[];
  text?: string;
  transcript?: string;
  audioUrl?: string;
  passage?: string;
};

export type CourseExercise = {
  id: string;
  type: string;
  level?: string;
  topic?: string;
  topicName?: string;
  content?: ExerciseContent;
  transcript?: string;
  audioUrl?: string;
};

export type ExerciseResult = {
  success: boolean;
  score: number;
};
