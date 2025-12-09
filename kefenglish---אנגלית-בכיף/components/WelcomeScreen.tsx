import React from 'react';
import { GradeLevel } from '../types';
import Button from './Button';
import { BookOpen, Star } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (grade: GradeLevel) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-pop text-center max-w-2xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-6xl md:text-8xl font-display text-kidPurple drop-shadow-lg mb-2">
          אנגלית בכיף
          <span className="inline-block animate-wiggle ml-4">🎈</span>
        </h1>
        <p className="text-xl text-gray-600 font-medium">בחר/י את הכיתה שלך ונתחיל לשחק!</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full border-4 border-kidBlue/20">
        <div className="grid grid-cols-2 gap-4">
          {Object.values(GradeLevel).map((grade) => (
            <Button 
              key={grade} 
              onClick={() => onStart(grade)}
              variant="secondary"
              className="hover:scale-105 transform transition-transform"
            >
              <Star className="w-5 h-5 text-kidYellow fill-kidYellow" />
              {grade}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-kidBlue/80 bg-white/50 px-6 py-2 rounded-full">
         <BookOpen className="w-5 h-5" />
         <span>פותח באמצעות בינה מלאכותית</span>
      </div>
    </div>
  );
};

export default WelcomeScreen;