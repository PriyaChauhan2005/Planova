import React from 'react';
import { Calendar, Clock, Trash2 } from 'lucide-react';

const ReminderCard = ({ id, title, date, priority, onDelete }) => {
  // 1. Format the MongoDB ISO date into "Jan 15" format
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const priorityColors = {
    high: 'bg-red-50 text-red-500 border-red-100',
    medium: 'bg-orange-50 text-orange-500 border-orange-100',
    low: 'bg-blue-50 text-blue-500 border-blue-100',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-planova-mint/30 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-5">
        {/* Priority Icon */}
        <div className={`p-3 rounded-xl border ${priorityColors[priority]}`}>
          <Calendar size={20} />
        </div>
        
        <div>
          <h4 className="font-bold text-planova-dark">{title}</h4>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 font-medium">
            <span className="flex items-center gap-1">
              <Clock size={12} /> 9:00 AM
            </span>
            <span>•</span>
            <span className="font-bold text-planova-mint/80">
              Due {formattedDate}
            </span>
          </div>
        </div>
      </div>

      {/* Delete Button - Appears on Hover */}
      <button 
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 cursor-pointer"
        title="Delete Reminder"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default ReminderCard;