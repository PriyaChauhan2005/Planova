import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react"; 
import { fetchReminders, addReminder as apiAddReminder, deleteReminder as apiDeleteReminder } from '../services/api';
import Sidebar from '../components/Dashboard/Sidebar';
import Header from '../components/Dashboard/Header';
import ReminderCard from '../components/Reminders/ReminderCard';
import AddReminderModal from '../modals/AddReminderModal';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import { BellPlus, Search, Wifi, WifiOff } from 'lucide-react'; // Added icons

const Reminders = () => {
  const { user } = useUser();
  const [reminders, setReminders] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  
  // New States: Search and Sync Status
  const [searchQuery, setSearchQuery] = useState("");
  const [isSynced, setIsSynced] = useState(false);

  // 1. Load Reminders on Mount
  useEffect(() => {
    if (user) {
      const getReminders = async () => {
        try {
          const response = await fetchReminders(user.id);
          setReminders(response.data);
          setIsSynced(true); // Connection successful
        } catch (err) {
          console.error("Failed to load reminders:", err);
          setIsSynced(false); // Connection failed
        }
      };
      getReminders();
    }
  }, [user]);

  // 2. Add Reminder to DB
  const handleAddReminder = async (formData) => {
    try {
      const response = await apiAddReminder({
        ...formData,
        userId: user.id 
      });
      setReminders([response.data, ...reminders]);
    } catch (err) {
      console.error("Error adding reminder:", err);
    }
  };

  // 3. Delete Reminder from DB
  const confirmDelete = async () => {
    if (deleteTarget) {
      try {
        await apiDeleteReminder(deleteTarget._id);
        setReminders(prev => prev.filter(r => r._id !== deleteTarget._id));
        setDeleteTarget(null);
      } catch (err) {
        console.error("Error deleting reminder:", err);
      }
    }
  };

  // 4. Derived State: Filtered Reminders
  const filteredReminders = reminders.filter(rem => 
    rem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-planova-soft font-jakarta">
      {/* Pass sync status to Sidebar if you want to show it there */}
      <Sidebar isSynced={isSynced} />
      
      <main className="flex-1 ml-0 md:ml-64 pt-20 pb-12 px-6 md:pt-12 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Header />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-black text-planova-dark tracking-tight">Reminders</h2>
                {/* Sync Badge */}
                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isSynced ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
                }`}>
                  {isSynced ? <Wifi size={12} /> : <WifiOff size={12} />}
                  {isSynced ? "Synced" : "Offline"}
                </span>
              </div>
              <p className="text-gray-500">Stay ahead of your schedule.</p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Search Bar Input */}
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search assignments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-planova-mint outline-none shadow-sm transition-all"
                />
              </div>

              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-planova-mint text-white p-4 rounded-2xl shadow-lg hover:rotate-90 transition-all cursor-pointer"
              >
                <BellPlus size={24} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {filteredReminders.length > 0 ? (
                filteredReminders.map(rem => (
                  <ReminderCard 
                    key={rem._id} 
                    id={rem._id}  
                    {...rem} 
                    onDelete={() => setDeleteTarget(rem)} 
                  />
                ))
              ) : (
                <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-[2rem] p-16 text-center text-gray-400 font-bold">
                  {searchQuery 
                    ? `No results for "${searchQuery}"` 
                    : "No reminders found. Create one to get started! ✨"}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals remain the same */}
      <AddReminderModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddReminder} />
      <ConfirmDeleteModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} itemName={deleteTarget?.title} />
    </div>
  );
};

export default Reminders;