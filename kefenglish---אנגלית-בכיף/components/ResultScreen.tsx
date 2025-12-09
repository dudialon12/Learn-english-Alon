import React from 'react';
import Button from './Button';
import { Trophy, RefreshCw, Home } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onHome: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, onRestart, onHome }) => {
  const percentage = (score / (totalQuestions * 10)) * 100;
  
  let message = "";
  let emoji = "";
  let colorClass = "";

  if (percentage === 100) {
    message = "מושלם! את/ה אלוף/ה!";
    emoji = "🏆";
    colorClass = "text-kidYellow";
  } else if (percentage >= 80) {
    message = "כל הכבוד! עבודה מעולה!";
    emoji = "🌟";
    colorClass = "text-kidGreen";
  } else if (percentage >= 50) {
    message = "יפה מאוד! בפעם הבאה נצליח יותר!";
    emoji = "💪";
    colorClass = "text-kidBlue";
  } else {
    message = "לא נורא, העיקר שלמדנו משהו חדש!";
    emoji = "🌱";
    colorClass = "text-kidPink";
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-pop text-center max-w-lg mx-auto bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 border-white ring-4 ring-kidBlue/10">
      
      <div className="relative">
        <div className="absolute inset-0 bg-yellow-200 blur-2xl opacity-50 rounded-full animate-pulse"></div>
        <div className="relative text-8xl mb-4 animate-bounce-slow">{emoji}</div>
      </div>

      <div>
        <h2 className={`text-4xl md:text-5xl font-display font-bold mb-2 ${colorClass}`}>
          {score} נקודות
        </h2>
        <p className="text-gray-400 text-lg font-bold">מתוך {totalQuestions * 10}</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl w-full">
        <h3 className="text-2xl font-bold text-gray-700 mb-2">{message}</h3>
        <p className="text-gray-500">
          ענית נכון על {score / 10} מתוך {totalQuestions} שאלות
        </p>
      </div>

      <div className="flex flex-col w-full gap-4 pt-4">
        <Button onClick={onRestart} variant="primary" size="lg" className="w-full">
          <RefreshCw className="w-6 h-6 animate-spin-slow" />
          לשחק שוב
        </Button>
        <Button onClick={onHome} variant="secondary" size="lg" className="w-full">
          <Home className="w-6 h-6" />
          חזרה לדף הבית
        </Button>
      </div>
    </div>
  );
};

export default ResultScreen;