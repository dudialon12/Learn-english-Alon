import React, { useState } from 'react';
import { Question } from '../types';
import Button from './Button';
import { CheckCircle, XCircle, Volume2, HelpCircle } from 'lucide-react';

interface QuizScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  score: number;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  questionIndex,
  totalQuestions,
  score,
  onAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  // Play a simple sound effect (simulated via Web Audio API ideally, but kept simple here)
  const playFeedback = (correct: boolean) => {
    // In a real app, we would play audio here
  };

  const handleOptionClick = (option: string) => {
    if (isRevealed) return;

    setSelectedOption(option);
    setIsRevealed(true);
    
    const isCorrect = option === question.correctAnswer;
    playFeedback(isCorrect);

    // Wait a moment before moving to next question so kid can see result
    setTimeout(() => {
      onAnswer(isCorrect);
      // Reset local state for next question (though parent component usually remounts or passes new props)
      setSelectedOption(null);
      setIsRevealed(false);
      setShowTranslation(false);
    }, 2000);
  };

  // Calculate progress percentage
  const progress = ((questionIndex) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto animate-pop">
      {/* Header Stats */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border-2 border-gray-100">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 font-bold">שאלה</span>
          <span className="text-2xl font-display text-kidBlue">
            {questionIndex + 1}<span className="text-sm text-gray-400">/{totalQuestions}</span>
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="flex-1 mx-6">
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-kidYellow transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-sm text-gray-500 font-bold">ניקוד</span>
          <span className="text-2xl font-display text-kidPurple">{score}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border-b-8 border-kidBlue mb-6 relative">
        <div className="p-8 md:p-12 text-center">
           {/* Emoji Header */}
           <div className="text-6xl mb-6 animate-bounce-slow">{question.emoji || '🎓'}</div>
           
           {/* Question Text */}
           <h2 className="text-3xl md:text-4xl font-display text-gray-800 mb-4" dir="ltr">
             {question.questionText}
           </h2>

           {/* Translation Toggle */}
           <button 
             onClick={() => setShowTranslation(!showTranslation)}
             className="text-kidBlue hover:bg-blue-50 px-4 py-2 rounded-full transition-colors flex items-center gap-2 mx-auto text-sm font-bold"
           >
             <HelpCircle className="w-4 h-4" />
             {showTranslation ? question.hebrewTranslation : 'צריך עזרה בתרגום?'}
           </button>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, idx) => {
          let buttonVariant: 'primary' | 'success' | 'danger' | 'secondary' = 'white' as any; // default styling
          
          if (isRevealed) {
            if (option === question.correctAnswer) {
              buttonVariant = 'success';
            } else if (option === selectedOption) {
              buttonVariant = 'danger';
            } else {
              buttonVariant = 'secondary';
            }
          } else {
            buttonVariant = selectedOption === option ? 'primary' : 'secondary';
          }

          // Override variants strictly for the visual logic below
          const getClassName = () => {
            const base = "h-20 text-xl md:text-2xl font-medium transition-all transform hover:scale-[1.02]";
            if (!isRevealed) return `${base} bg-white border-2 border-gray-200 text-gray-700 hover:border-kidBlue hover:text-kidBlue`;
            if (option === question.correctAnswer) return `${base} bg-green-100 border-2 border-green-500 text-green-700`;
            if (option === selectedOption && option !== question.correctAnswer) return `${base} bg-red-100 border-2 border-red-500 text-red-700`;
            return `${base} opacity-50 bg-gray-50 border-gray-200`;
          };

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              disabled={isRevealed}
              className={`
                relative rounded-2xl shadow-sm p-4
                ${getClassName()}
              `}
              dir="ltr"
            >
              {option}
              {isRevealed && option === question.correctAnswer && (
                <CheckCircle className="absolute top-1/2 right-4 -translate-y-1/2 text-green-600 w-6 h-6" />
              )}
              {isRevealed && option === selectedOption && option !== question.correctAnswer && (
                <XCircle className="absolute top-1/2 right-4 -translate-y-1/2 text-red-500 w-6 h-6" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizScreen;