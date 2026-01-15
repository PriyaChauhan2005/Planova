import React, { useState } from 'react';
import { X, Calendar, Flag } from 'lucide-react';

const AddReminderModal = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("medium");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return;
    
    onAdd({
      id: Date.now(),
      title,
      date,
      priority
    });
    
    // Reset and Close
    setTitle("");
    setDate("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-planova-dark/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-md rounded-[2rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-planova-dark">Add Reminder</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Assignment Title</label>
            <input 
              required
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Biology Final Exam"
              className="w-full bg-planova-soft border-none rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-planova-mint transition-all"
            />
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Due Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-planova-mint" size={18} />
              <input 
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-planova-soft border-none rounded-xl pl-12 pr-5 py-3 outline-none focus:ring-2 focus:ring-planova-mint transition-all"
              />
            </div>
          </div>

          {/* Priority Selection */}
          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Priority Level</label>
            <div className="flex gap-2">
              {['low', 'medium', 'high'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all border ${
                    priority === p 
                      ? 'bg-planova-mint text-white border-planova-mint shadow-md shadow-planova-mint/20' 
                      : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-planova-mint text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-planova-mint/20 hover:scale-[1.02] active:scale-95 transition-all mt-4"
          >
            Create Reminder
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReminderModal;