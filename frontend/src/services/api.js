import axios from 'axios';

// The Production URL from your Render Dashboard
const RENDER_URL = 'https://planova-backend-4f7t.onrender.com/api';

const API = axios.create({
  baseURL: RENDER_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Helper functions for the project
export const fetchTasks = (userId) => API.get(`/tasks/${userId}`);
export const addTask = (taskData) => API.post('/tasks', taskData);
export const updateTask = (id, updates) => API.patch(`/tasks/${id}`, updates);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const toggleTask = (id) => API.patch(`/tasks/${id}/toggle`);

export const fetchCarriedTasks = (userId) => API.get(`/tasks/${userId}/carried`);

export const fetchUser = (clerkId) => API.get(`/users/${clerkId}`);

export const fetchReminders = (userId) => API.get(`/reminders/${userId}`);
export const addReminder = (data) => API.post('/reminders/add', data);
export const deleteReminder = (id) => API.delete(`/reminders/${id}`);

export default API;