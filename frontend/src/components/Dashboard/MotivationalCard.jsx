import React from 'react';
import { Quote, Flame, Target, Trophy } from 'lucide-react';

const MotivationalCard = ({ progress }) => {
  // Logic to determine which message to show
  const getContent = () => {
    if (progress === 0) {
      return {
        icon: <Target className="text-blue-500" />,
        text: "Every big journey starts with a single task. Let's go!",
        bg: "bg-blue-50"
      };
    } else if (progress < 50) {
      return {
        icon: <Flame className="text-orange-500" />,
        text: "Great start! You're building momentum.",
        bg: "bg-orange-50"
      };
    } else if (progress < 100) {
      return {
        icon: <Quote className="text-planova-mint" />,
        text: "Over the hump! You're more than halfway there.",
        bg: "bg-green-50"
      };
    } else {
      return {
        icon: <Trophy className="text-yellow-500" />,
        text: "Incredible! You've conquered today's goals.",
        bg: "bg-yellow-50"
      };
    }
  };

  const { icon, text, bg } = getContent();

  return (
    <div className={`p-6 rounded-[2rem] border border-transparent transition-all duration-500 flex items-center gap-4 ${bg}`}>
      <div className="p-3 bg-white rounded-2xl shadow-sm">
        {icon}
      </div>
      <p className="text-sm font-bold text-planova-dark leading-snug">
        {text}
      </p>
    </div>
  );
};

export default MotivationalCard;