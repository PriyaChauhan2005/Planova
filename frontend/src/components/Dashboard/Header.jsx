import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { getUserData } from '../../services/api';
import { Flame } from 'lucide-react';

const Header = () => {
  const { user } = useUser();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (user) {
      const getStreak = async () => {
        try {
          const response = await getUserData(user.id);
          setStreak(response.data.streak || 0);
        } catch (err) {
          console.error("Error fetching streak:", err);
        }
      };
      getStreak();
    }
  }, [user]);

  // Get current date for the subtitle
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-black text-planova-dark tracking-tight">
          Welcome back, {user?.firstName || 'Student'}! 👋
        </h1>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] mt-1">
          {today}
        </p>
      </div>

      {/* Streak Badge */}
      <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm self-start md:self-center group hover:border-orange-200 transition-colors">
        <div className="bg-orange-50 p-2 rounded-xl group-hover:scale-110 transition-transform">
          <Flame className="text-orange-500 fill-orange-500" size={20} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Streak</p>
          <p className="text-lg font-black text-planova-dark">
            {streak} {streak === 1 ? 'Day' : 'Days'}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;