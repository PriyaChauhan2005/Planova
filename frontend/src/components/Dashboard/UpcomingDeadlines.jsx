import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { fetchReminders } from '../../services/api';
import { Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const UpcomingDeadlines = () => {
  const { user } = useUser();
  const [deadlines, setDeadlines] = useState([]);

  useEffect(() => {
    if (user) {
      const getDeadlines = async () => {
        try {
          const response = await fetchReminders(user.id);
          // Sort by date and take the top 3 closest deadlines
          const sorted = response.data
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3);
          setDeadlines(sorted);
        } catch (err) {
          console.error("Failed to load dashboard deadlines:", err);
        }
      };
      getDeadlines();
    }
  }, [user]);

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm font-jakarta h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-planova-dark text-lg">Upcoming</h3>
        <Link to="/reminders" className="text-planova-mint text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-1">
          View All <ChevronRight size={14} />
        </Link>
      </div>

      <div className="space-y-6">
        {deadlines.length > 0 ? (
          deadlines.map((item) => (
            <div key={item._id} className="flex gap-4 items-start">
              <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                item.priority === 'high' ? 'bg-red-500' : 'bg-planova-mint'
              }`} />
              <div>
                <h4 className="text-sm font-bold text-planova-dark line-clamp-1">{item.title}</h4>
                <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1 mt-1">
                  <Clock size={10} /> {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-xs italic py-4">No upcoming deadlines. You're all clear! ✨</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;