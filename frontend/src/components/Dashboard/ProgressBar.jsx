import React from 'react';

const ProgressBar = ({ progress }) => {
  // Ensure progress stays between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm font-jakarta">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-xl font-black text-planova-dark tracking-tight">Today's Focus</h3>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
            {clampedProgress === 100 ? "All Goals Completed! 🎉" : "Keep pushing forward"}
          </p>
        </div>
        <span className="text-3xl font-black text-planova-mint">
          {Math.round(clampedProgress)}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="h-4 w-full bg-planova-soft rounded-full overflow-hidden">
        {/* Animated Progress Fill */}
        <div 
          className="h-full bg-planova-mint transition-all duration-700 ease-out shadow-[0_0_20px_rgba(52,211,153,0.3)]"
          style={{ width: `${clampedProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;