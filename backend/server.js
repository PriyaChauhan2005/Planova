require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Route Imports
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const reminderRoutes = require('./routes/reminderRoutes');

const app = express();

// 1. CORS CONFIGURATION
// Add your Vercel URL here once you deploy the frontend
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://planova-iota.vercel.app" 
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

app.use(express.json());

// 2. ATLAS CONNECTION WITH SAFETY CHECK
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    // Check if URI is present
    if (!uri) {
      console.error("❌ CRITICAL ERROR: MONGODB_URI is not defined in the environment.");
      console.log("Check your .env file locally or Environment Variables on Render.");
      return; 
    }

    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
  }
};

// Start the database connection
connectDB();

// 3. HEALTH CHECK ROUTE
// This confirms the server is visible and prevents 404 on the base URL
app.get('/', (req, res) => {
  res.status(200).send("🚀 Planova API is live and connected to Atlas!");
});

// 4. API ROUTES
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reminders', reminderRoutes);

// 5. SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});