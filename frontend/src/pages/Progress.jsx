import React from 'react';
import { usePlanovaUser } from '../context/UserContext';
import Sidebar from '../components/Dashboard/Sidebar';
import Header from '../components/Dashboard/Header';
import { RefreshCcw, Calendar, Snowflake, ChevronLeft, ChevronRight } from 'lucide-react';

const Progress = () => {
  const { streak } = usePlanovaUser();

  // Helper to render the calendar header safely
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="flex min-h-screen bg-planova-soft font-jakarta">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 pt-20 pb-12 px-6 md:pt-12 md:px-12">
        <div className="max-w-2xl mx-auto space-y-8 flex flex-col items-center">
          
          {/* 1. Hero Streak Section */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-orange-400 blur-3xl opacity-20 rounded-full animate-pulse"></div>
              <span className="text-7xl">🔥</span>
            </div>
            <h2 className="text-4xl font-black text-planova-dark tracking-tight">You're on fire!</h2>
            <p className="text-gray-500 font-medium max-w-xs mx-auto text-sm leading-relaxed">
              Consistency is the key to mastery. Keep it up!
            </p>
            
            <div className="pt-6">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-7xl font-black text-planova-mint tracking-tighter">{streak}</span>
                <span className="text-2xl font-black text-planova-dark">Days</span>
              </div>
              <div className="w-64 h-2 bg-gray-200 rounded-full mt-4 mx-auto overflow-hidden">
                <div className="h-full bg-planova-mint w-3/4 rounded-full"></div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Current Streak</p>
            </div>
          </div>

          {/* 2. Stats Grid */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-planova-mint">
                <RefreshCcw size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Avg. Completion</p>
                <p className="text-2xl font-black text-planova-dark">85%</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Productive</p>
                <p className="text-2xl font-black text-planova-dark">42 <span className="text-sm text-gray-400 font-bold">days</span></p>
              </div>
            </div>
          </div>

          {/* 3. Activity Calendar (FIXED KEYS HERE) */}
          <div className="bg-white w-full rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-8">
                <ChevronLeft className="text-gray-300 cursor-pointer" />
                <h4 className="font-black text-planova-dark text-lg tracking-tight">January 2026</h4>
                <ChevronRight className="text-gray-300 cursor-pointer" />
             </div>
             
             <div className="grid grid-cols-7 gap-y-4 text-center mb-8">
                {daysOfWeek.map((day, index) => (
                  <span key={`header-day-${day}-${index}`} className="text-[10px] font-black text-gray-300 uppercase">
                    {day}
                  </span>
                ))}

                {[...Array(31)].map((_, i) => (
                  <div key={`calendar-date-${i}`} className="flex justify-center items-center h-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      i < 15 ? 'bg-planova-mint text-white' : 'text-gray-400 border border-gray-50'
                    }`}>
                      {i + 1}
                    </div>
                  </div>
                ))}
             </div>

             <div className="flex justify-center gap-6 border-t border-gray-50 pt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-planova-mint rounded-full"></div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-red-200 rounded-full"></div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Missed</span>
                </div>
             </div>
          </div>

          {/* 4. Streak Freeze Banner */}
          <div className="w-full bg-blue-50/50 border border-blue-100 p-6 rounded-[2rem] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
                <Snowflake size={24} />
              </div>
              <div>
                <p className="font-black text-planova-dark text-sm">Streak Freeze Available</p>
                <p className="text-[11px] text-gray-500 font-medium">Use one to repair a missed day</p>
              </div>
            </div>
            <button className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">Use</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Progress;