const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

// GET all reminders for a specific student
router.get('/:userId', reminderController.getReminders);

// POST a new reminder
router.post('/add', reminderController.addReminder);

// DELETE a reminder - Matches api.deleteReminder(id)
router.delete('/:id', reminderController.deleteReminder);

module.exports = router;