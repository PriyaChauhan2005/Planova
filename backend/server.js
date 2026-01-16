require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Route Imports
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const reminderRoutes = require('./routes/reminderRoutes');

const app = express();

// 1. UPDATE CORS: Replace the URL with your actual Vercel frontend URL
app.use(cors({
  origin: ["http://localhost:5173", "https://your-planova-frontend.vercel.app"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

app.use(express.json());

// 2. ATLAS CONNECTION
const connectDB = async () => {
  try {
    // Ensure you set MONGODB_URI in Render's dashboard environment variables
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
  }
};
connectDB();

// 3. HEALTH CHECK (Prevents the 404 error on the root URL)
app.get('/', (req, res) => res.send("Planova API is live!"));

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reminders', reminderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));