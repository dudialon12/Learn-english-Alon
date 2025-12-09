export enum GradeLevel {
  Grade1 = 'כיתה א׳',
  Grade2 = 'כיתה ב׳',
  Grade3 = 'כיתה ג׳',
  Grade4 = 'כיתה ד׳',
  Grade5 = 'כיתה ה׳',
  Grade6 = 'כיתה ו׳',
}

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  hebrewTranslation: string; // Helpful for kids to understand context
  emoji?: string; // Visual cue
}

export type AppState = 'WELCOME' | 'LOADING' | 'QUIZ' | 'RESULTS' | 'ERROR';

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: boolean[]; // track correct/incorrect for history
  streak: number;
}