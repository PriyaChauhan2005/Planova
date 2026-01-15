// 1. MUST BE THE VERY FIRST LINE
require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const reminderRoutes = require('./routes/reminderRoutes');

// 2. FAIL-SAFE CHECK
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined in the .env file.");
  console.error("Check if your .env file exists in the /backend folder.");
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

// 3. DATABASE CONNECTION
const connectDB = async () => {
  try {
    // We now know for sure process.env.MONGO_URI is a string here
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reminders', reminderRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Planova Server running on port ${PORT}`));