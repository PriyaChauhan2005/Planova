import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// User & Streak Services
export const getUserData = (clerkId) => API.get(`/users/${clerkId}`);
export const updateStreak = (clerkId) => API.patch(`/users/${clerkId}/streak`);

// Task Services
export const fetchTasks = (userId) => API.get(`/tasks/${userId}`);
export const fetchCarriedTasks = (userId) => API.get(`/tasks/${userId}/carried`);
export const addTask = (taskData) => API.post('/tasks', taskData);
export const toggleTaskStatus = (id) => API.patch(`/tasks/${id}/toggle`);
export const updateTask = (id, updates) => API.patch(`/tasks/${id}`, updates);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

// Reminder Services
export const fetchReminders = (userId) => API.get(`/reminders/${userId}`);
export const addReminder = (reminderData) => API.post('/reminders/add', reminderData);
export const deleteReminder = (id) => API.delete(`/reminders/${id}`);

export default API;