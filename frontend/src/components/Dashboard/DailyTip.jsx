import React from 'react';
import { Lightbulb } from 'lucide-react';

const DailyTip = () => {
  return (
    <div className="bg-planova-mint/50 p-8 rounded-[2.5rem] text-white shadow-lg shadow-planova-mint/10">
      <div className="flex items-center gap-2 mb-3 opacity-80">
        <Lightbulb size={16} />
        <p className="text-[10px] font-bold uppercase tracking-widest">
          Tip of the day
        </p>
      </div>
      <p className="font-bold text-lg leading-snug">
        Take a 5-minute break for every hour of focus.
      </p>
    </div>
  );
};

export default DailyTip;