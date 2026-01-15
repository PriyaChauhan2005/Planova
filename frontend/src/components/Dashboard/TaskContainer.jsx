import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react"; 
import { Plus, Loader2 } from 'lucide-react';
import { fetchTasks, toggleTaskStatus, deleteTask, addTask as apiAddTask } from '../../services/api'; 
import { usePlanovaUser } from '../../context/UserContext'; 
import TaskCard from './TaskCard';
import LoadingSpinner from '../Common/LoadingSpinner';

const TaskContainer = ({ onProgressUpdate }) => {
  const { user } = useUser(); 
  const { fetchUserStats } = usePlanovaUser(); 
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (user) loadInitialTasks();
  }, [user]);

  const loadInitialTasks = async () => {
    try {
      setIsLoading(true);
      const res = await fetchTasks(user.id);
      setTasks(res.data);
      syncProgress(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const syncProgress = (list) => {
    if (onProgressUpdate) {
      const completed = list.filter(t => t.status === 'completed').length;
      onProgressUpdate(completed, list.length);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || isAdding) return;

    try {
      setIsAdding(true);
      const res = await apiAddTask({ userId: user.id, title: newTaskTitle });
      const updatedList = [res.data, ...tasks];
      setTasks(updatedList);
      setNewTaskTitle(""); 
      syncProgress(updatedList);
    } catch (err) {
      console.error("Add task error:", err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await toggleTaskStatus(id);
      const updatedList = tasks.map(t => t._id === id ? res.data : t);
      setTasks(updatedList);
      syncProgress(updatedList);

      if (res.data.status === 'completed') {
        fetchUserStats();
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      const updatedList = tasks.filter(t => t._id !== id);
      setTasks(updatedList);
      syncProgress(updatedList);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-gray-100 font-jakarta min-h-[400px]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-bold text-planova-dark text-xl">Daily Tasks</h3>
      </div>

      <form onSubmit={handleAddTask} className="mb-8 relative group">
        <input 
          type="text"
          placeholder="What's your main goal for today?"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          disabled={isAdding}
          className="w-full bg-planova-soft/50 border-2 border-transparent focus:border-planova-mint/30 rounded-2xl px-6 py-4 outline-none font-medium pr-14"
        />
        <button 
          type="submit"
          disabled={isAdding}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-planova-mint text-white p-2 rounded-xl"
        >
          {isAdding ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
        </button>
      </form>

      {isLoading ? (
        <LoadingSpinner message="Loading goals..." />
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskCard key={task._id} {...task} onToggle={handleToggle} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskContainer;