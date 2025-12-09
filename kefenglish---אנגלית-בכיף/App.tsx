import React, { useState } from 'react';
import { GradeLevel, AppState, Question, QuizState } from './types';
import { generateQuestions } from './services/geminiService';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { Loader2, AlertTriangle } from 'lucide-react';
import Button from './components/Button';

const QUESTIONS_COUNT = 10;
const POINTS_PER_QUESTION = 10;

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('WELCOME');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    streak: 0,
  });
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleStartGame = async (grade: GradeLevel) => {
    setSelectedGrade(grade);
    setAppState('LOADING');
    setErrorMsg('');

    try {
      const generatedQuestions = await generateQuestions(grade);
      setQuestions(generatedQuestions);
      setQuizState({
        currentQuestionIndex: 0,
        score: 0,
        answers: [],
        streak: 0,
      });
      setAppState('QUIZ');
    } catch (error) {
      console.error(error);
      setErrorMsg('אופס! משהו השתבש ביצירת השאלות. נסה שוב מאוחר יותר.');
      setAppState('ERROR');
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    const points = isCorrect ? POINTS_PER_QUESTION : 0;
    
    setQuizState(prev => {
      const newScore = prev.score + points;
      const newAnswers = [...prev.answers, isCorrect];
      
      // Calculate next step
      const nextIndex = prev.currentQuestionIndex + 1;
      
      if (nextIndex >= questions.length) {
        // Delay state update slightly to allow component to unmount cleanly if needed, 
        // but here we just set state directly.
        // We use setTimeout in the child component for visual feedback, 
        // here we just transition.
        setTimeout(() => setAppState('RESULTS'), 0);
        return {
          ...prev,
          score: newScore,
          answers: newAnswers,
          currentQuestionIndex: prev.currentQuestionIndex // keep index at end
        };
      }

      return {
        ...prev,
        score: newScore,
        answers: newAnswers,
        currentQuestionIndex: nextIndex,
        streak: isCorrect ? prev.streak + 1 : 0
      };
    });
  };

  const handleRestart = () => {
    if (selectedGrade) {
      handleStartGame(selectedGrade);
    } else {
      setAppState('WELCOME');
    }
  };

  const handleHome = () => {
    setAppState('WELCOME');
    setQuestions([]);
    setSelectedGrade(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col font-sans">
      {/* Navbar / Header */}
      <header className="p-4 md:p-6 flex justify-center items-center">
        {/* Simple logo text */}
      </header>

      <main className="flex-grow container mx-auto px-4 py-4 flex flex-col justify-center items-center">
        
        {appState === 'WELCOME' && (
          <WelcomeScreen onStart={handleStartGame} />
        )}

        {appState === 'LOADING' && (
          <div className="text-center space-y-6 animate-pop">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-8 border-gray-200 rounded-full"></div>
              <div className="absolute inset-0 border-8 border-kidBlue rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl">🤖</div>
            </div>
            <h2 className="text-2xl font-bold text-kidPurple">הרובוט מכין שאלות...</h2>
            <p className="text-gray-500">זה ייקח רק כמה שניות</p>
          </div>
        )}

        {appState === 'ERROR' && (
          <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-lg border-2 border-red-100">
            <AlertTriangle className="w-16 h-16 text-kidPink mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">תקלה</h2>
            <p className="text-gray-600 mb-6">{errorMsg}</p>
            <Button onClick={() => setAppState('WELCOME')} variant="primary">
              חזרה להתחלה
            </Button>
          </div>
        )}

        {appState === 'QUIZ' && questions.length > 0 && (
          <QuizScreen 
            question={questions[quizState.currentQuestionIndex]}
            questionIndex={quizState.currentQuestionIndex}
            totalQuestions={questions.length}
            score={quizState.score}
            onAnswer={handleAnswer}
          />
        )}

        {appState === 'RESULTS' && (
          <ResultScreen 
            score={quizState.score} 
            totalQuestions={questions.length}
            onRestart={handleRestart}
            onHome={handleHome}
          />
        )}

      </main>

      <footer className="p-6 text-center text-gray-400 text-sm">
        <p>© 2024 KefEnglish - לימוד אנגלית לילדים</p>
      </footer>
    </div>
  );
};

export default App;