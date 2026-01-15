import React, { useState } from 'react';
import { ListPlus, Trash2, CalendarCheck, Loader2 } from 'lucide-react';
import { addTask, deleteTask } from '../../services/api';
import toast from 'react-hot-toast';

const TomorrowPlanner = ({ userId, tasks, refresh }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlan = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setLoading(true);
      
      // Calculate Tomorrow at 9:00 AM
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0);

      await addTask({ 
        userId, 
        title: input, 
        createdAt: tomorrow 
      });
      
      setInput(""); 
      refresh(); // Reload the lists in Plan.jsx
      toast.success("Added to tomorrow's plan!");
    } catch (err) { 
      console.error(err);
      toast.error("Error saving plan."); 
    } finally { setLoading(false); }
  };

  const handleRemove = async (id) => {
    try {
      await deleteTask(id);
      refresh();
      toast.success("Removed from plan");
    } catch (err) { toast.error("Failed to delete."); }
  };

  return (
    <div className="space-y-6">
      <div className="bg-planova-dark p-8 rounded-[2.5rem] text-white shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-planova-mint/20 text-planova-mint rounded-lg"><ListPlus size={18} /></div>
          <h3 className="text-lg font-black tracking-tight">Plan for Tomorrow</h3>
        </div>
        <form onSubmit={handlePlan} className="space-y-4">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Focus goal for tomorrow..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-planova-mint transition-all" 
          />
          <button className="w-full bg-planova-mint py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex justify-center items-center">
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Save Plan"}
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CalendarCheck size={18} className="text-planova-mint" />
            <h3 className="font-bold text-planova-dark text-sm">Tomorrow's List</h3>
          </div>
        </div>
        <div className="space-y-3">
          {tasks && tasks.length > 0 ? tasks.map(t => (
            <div key={t._id} className="flex items-center justify-between p-4 bg-planova-soft/30 rounded-2xl border border-transparent hover:border-planova-mint/20 group transition-all">
              <span className="text-sm font-medium text-planova-dark">{t.title}</span>
              <button onClick={() => handleRemove(t._id)} className="text-gray-300 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          )) : <p className="text-center py-4 text-xs font-bold text-gray-300 italic">No plans yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default TomorrowPlanner;