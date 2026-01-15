import React from 'react';

/**
 * ProgressCard Component
 * Renders a circular progress indicator and a motivation badge.
 */
const ProgressCard = ({ percentage = 65 }) => {
  // SVG Math for a smooth circular ring
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 text-center flex flex-col items-center font-jakarta">
      <h3 className="font-bold text-planova-dark text-lg mb-8">Daily Progress</h3>
      
      {/* Circular Progress Container */}
      <div className="relative flex items-center justify-center">
        <svg className="w-48 h-48 transform -rotate-90">
          {/* Background Circle (Gray) */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="14"
            fill="transparent"
            className="text-gray-50"
          />
          {/* Progress Circle (Planova Mint) */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="14"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            className="text-planova-mint transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center Text Labels */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-4xl font-black text-planova-dark">{percentage}%</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Completed</p>
        </div>
      </div>

      {/* Motivation Badge */}
      <div className="mt-8 bg-planova-soft text-planova-mint px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 border border-planova-mint/10">
        <span className="text-sm">⌛</span> Almost there!
      </div>
    </div>
  );
};

export default ProgressCard;