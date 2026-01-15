import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Header from '../components/Dashboard/Header';
// FIX: Ensure this path matches the file name in your hooks folder
import { useDarkMode } from '../hooks/useDarkMode'; 
import { Moon, Sun, Monitor, Bell, Shield } from 'lucide-react';

const Settings = () => {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <div className="flex min-h-screen bg-planova-soft dark:bg-slate-950 font-jakarta transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 pt-20 pb-12 px-6 md:pt-12 md:px-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <Header />
          <h2 className="text-3xl font-black text-planova-dark dark:text-white tracking-tight">Settings</h2>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm space-y-8">
            <section>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Monitor size={14} /> Appearance
              </h3>
              <div className="flex items-center justify-between p-4 bg-planova-soft dark:bg-slate-800/50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white dark:bg-slate-700 rounded-xl shadow-sm text-planova-dark dark:text-planova-mint">
                    {isDark ? <Moon size={20} /> : <Sun size={20} />}
                  </div>
                  <div>
                    <p className="font-bold text-planova-dark dark:text-white">Dark Mode</p>
                    <p className="text-xs text-gray-500">Easier on the eyes at night</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsDark(!isDark)}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${isDark ? 'bg-planova-mint' : 'bg-gray-300'}`}
                >
                  <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isDark ? 'translate-x-6' : ''}`} />
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;