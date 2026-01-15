const Task = require('../models/Task');
const User = require('../models/User');

// GET: Fetch today's tasks for a specific user
exports.getTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const end = new Date(); end.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      userId,
      createdAt: { $gte: start, $lte: end }
    }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) { 
    res.status(500).json({ message: error.message }); 
  }
};

// GET: Fetch tasks from previous days that remain 'pending'
exports.getCarriedTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const startOfToday = new Date(); startOfToday.setHours(0, 0, 0, 0);

    const carried = await Task.find({
      userId,
      status: 'pending',
      createdAt: { $lt: startOfToday }
    });
    res.status(200).json(carried);
  } catch (error) { 
    res.status(500).json({ message: error.message }); 
  }
};

// POST: Add a new task (Fixes 400 Bad Request)
exports.addTask = async (req, res) => {
  try {
    const { userId, title, createdAt } = req.body;
    
    // Validation to prevent 400 Bad Request if Clerk isn't ready
    if (!userId || userId === "undefined") {
      return res.status(400).json({ message: "UserId is required (Clerk ID not found)" });
    }
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = new Task({
      userId,
      title,
      createdAt: createdAt || new Date()
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) { 
    res.status(400).json({ message: error.message }); 
  }
};

// PATCH: Toggle task status and update user streak
exports.toggleTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = task.status === 'pending' ? 'completed' : 'pending';
    await task.save();

    // Streak logic: Increment only if status changed to 'completed'
    if (task.status === 'completed') {
      const user = await User.findOne({ clerkId: task.userId });
      if (user) {
        const today = new Date().toDateString();
        const lastUpdate = user.lastStreakUpdate ? new Date(user.lastStreakUpdate).toDateString() : null;
        
        if (today !== lastUpdate) {
          user.streak += 1;
          user.lastStreakUpdate = new Date();
          await user.save();
        }
      }
    }
    res.status(200).json(task);
  } catch (error) { 
    res.status(500).json({ message: error.message }); 
  }
};

// PATCH: General task updates (e.g., title changes or rescheduling)
exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) { 
    res.status(400).json({ message: error.message }); 
  }
};

// DELETE: Permanently remove a task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) { 
    res.status(500).json({ message: error.message }); 
  }
};