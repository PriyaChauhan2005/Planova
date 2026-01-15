import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from "@clerk/clerk-react";
import { fetchTasks, fetchCarriedTasks } from '../services/api';
import Sidebar from '../components/Dashboard/Sidebar';
import Header from '../components/Dashboard/Header';
import CarriedForward from '../components/Plan/CarriedForward';
import TomorrowPlanner from '../components/Plan/TomorrowPlanner';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const Plan = () => {
  const { user } = useUser();
  const [carriedTasks, setCarriedTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAllData = useCallback(async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const carriedRes = await fetchCarriedTasks(user.id);
      setCarriedTasks(carriedRes.data);

      const allRes = await fetchTasks(user.id);
      const endOfToday = new Date(); 
      endOfToday.setHours(23, 59, 59, 999);
      
      const filteredTomorrow = allRes.data.filter(t => new Date(t.createdAt) > endOfToday);
      setTomorrowTasks(filteredTomorrow);
    } catch (err) { 
      console.error("Sync Error:", err); 
    } finally { setIsLoading(false); }
  }, [user]);

  useEffect(() => { loadAllData(); }, [loadAllData]);

  return (
    <div className="flex min-h-screen bg-planova-soft font-jakarta">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 pt-20 pb-12 px-6 md:pt-12 md:px-12">
        <div className="max-w-5xl mx-auto space-y-10">
          <Header />
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black text-planova-dark tracking-tight">Planning Station</h2>
            <p className="text-gray-500 font-medium text-sm">Prepare for a successful tomorrow.</p>
          </div>
          {isLoading ? (
            <div className="h-64 flex items-center justify-center"><LoadingSpinner /></div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <CarriedForward tasks={carriedTasks} refresh={loadAllData} />
              <TomorrowPlanner userId={user?.id} tasks={tomorrowTasks} refresh={loadAllData} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}; // This closing brace was likely missing or misaligned

export default Plan;