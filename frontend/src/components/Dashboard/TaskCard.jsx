import React, { useState } from 'react';
import { Check, Trash2, Loader2 } from 'lucide-react';

const TaskCard = ({ _id, title, status, isFromYesterday, onToggle, onDelete }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const isCompleted = status === 'completed';

  const handleToggle = async () => {
    setIsUpdating(true);
    await onToggle(_id);
    setIsUpdating(false);
  };

  return (
    <div className={`group flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
      isCompleted 
        ? 'bg-gray-50 border-transparent' 
        : 'bg-white border-gray-100 shadow-sm hover:border-planova-mint/30'
    }`}>
      <div className="flex items-center gap-4">
        {/* Checkbox Button */}
        <button
          onClick={handleToggle}
          disabled={isUpdating}
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
            isCompleted 
              ? 'bg-planova-mint border-planova-mint text-white' 
              : 'border-gray-200 text-transparent hover:border-planova-mint'
          }`}
        >
          {isUpdating ? <Loader2 size={14} className="animate-spin text-gray-400" /> : <Check size={14} />}
        </button>

        <div>
          <h4 className={`font-bold transition-all ${
            isCompleted ? 'text-gray-300 line-through' : 'text-planova-dark'
          }`}>
            {title}
          </h4>
          {isFromYesterday && !isCompleted && (
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
              From Yesterday
            </span>
          )}
        </div>
      </div>

      {/* Delete Action */}
      <button
        onClick={() => onDelete(_id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TaskCard;