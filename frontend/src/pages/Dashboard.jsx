import React, { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import Sidebar from '../components/Dashboard/Sidebar';
import Header from '../components/Dashboard/Header';
import ProgressBar from '../components/Dashboard/ProgressBar';
import TaskContainer from '../components/Dashboard/TaskContainer';
import MotivationalCard from '../components/Dashboard/MotivationalCard';
import UpcomingDeadlines from '../components/Dashboard/UpcomingDeadlines';

const Dashboard = () => {
  const [progress, setProgress] = useState(0);

  // 1. Progress Logic: Handles data coming up from TaskContainer
  const updateProgress = useCallback((completed, total) => {
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    setProgress(percentage);

    // Trigger Celebration when 100% reached
    if (percentage === 100 && total > 0) {
      triggerConfetti();
    }
  }, []);

  // 2. Celebration Animation
  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Cannon blasts from both sides of the screen
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="flex min-h-screen bg-planova-soft font-jakarta">
      {/* Navigation */}
      <Sidebar />
      
      <main className="flex-1 ml-0 md:ml-64 pt-20 pb-12 px-6 md:pt-12 md:px-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Greeting Section */}
          <Header />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content: Progress & Tasks */}
            <div className="lg:col-span-2 space-y-8">
              <ProgressBar progress={progress} />
              <MotivationalCard progress={progress} />
              
              {/* TaskContainer sends progress data UP to Dashboard */}
              <TaskContainer onProgressUpdate={updateProgress} />
            </div>

            {/* Side Content: Reminders & Future Widgets */}
            <div className="space-y-8">
              <UpcomingDeadlines />
              
              {/* Pro Tip: This is a great spot for a 'Study Streak' or 'Focus Timer' widget later */}
              <div className="bg-planova-dark p-8 rounded-[2.5rem] text-white shadow-xl overflow-hidden relative group">
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-2">Deep Focus</h4>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed mb-6">
                    Ready for a study session? Turn on Focus Mode to block distractions.
                  </p>
                  <button className="bg-planova-mint text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">
                    Start Session
                  </button>
                </div>
                {/* Decorative Background Element */}
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-planova-mint/10 rounded-full blur-3xl group-hover:bg-planova-mint/20 transition-all"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;