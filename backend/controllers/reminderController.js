const Reminder = require('../models/Reminder');

// GET: Fetch all reminders for a specific student
exports.getReminders = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Sort by date so the closest deadlines appear first
    const reminders = await Reminder.find({ userId }).sort({ date: 1 });
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST: Create a new reminder (assignment or exam)
exports.addReminder = async (req, res) => {
  try {
    const { userId, title, date, priority } = req.body;

    // Validation to prevent 400 Bad Requests
    if (!userId || !title || !date) {
      return res.status(400).json({ message: "Missing required fields: userId, title, and date are mandatory" });
    }

    const newReminder = new Reminder({ userId, title, date, priority });
    await newReminder.save();
    res.status(201).json(newReminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE: Remove a reminder (Fixes the 404 error)
exports.deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Reminder.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    
    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};