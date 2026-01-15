import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { updateTask } from '../../services/api';
import toast from 'react-hot-toast';

const CarriedForward = ({ tasks, refresh }) => {
  const handleMove = async (id) => {
    try {
      // Logic: Update createdAt to 'Now' so it appears on today's Dashboard
      await updateTask(id, { createdAt: new Date() });
      toast.success("Moved to Today's list!");
      refresh(); 
    } catch (err) { toast.error("Failed to move task."); }
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-50 text-orange-500 rounded-lg"><ArrowRightLeft size={18} /></div>
        <h3 className="text-lg font-black text-planova-dark">Carried Forward</h3>
      </div>
      <div className="space-y-3">
        {tasks.length > 0 ? tasks.map(task => (
          <div key={task._id} className="p-4 bg-planova-soft rounded-2xl flex justify-between items-center">
            <span className="text-sm font-bold text-planova-dark">{task.title}</span>
            <button onClick={() => handleMove(task._id)} className="bg-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase text-planova-mint shadow-sm transition-all hover:bg-planova-mint hover:text-white">Move</button>
          </div>
        )) : <p className="text-center py-6 text-xs text-gray-400 font-medium italic">No missed tasks. Great job!</p>}
      </div>
    </div>
  );
};

export default CarriedForward;