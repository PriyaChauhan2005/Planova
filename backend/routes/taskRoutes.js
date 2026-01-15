const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Define all task-related endpoints
router.get('/:userId', taskController.getTasks); // GET /api/tasks/:userId
router.post('/', taskController.addTask); // POST /api/tasks/
router.get('/:userId/carried', taskController.getCarriedTasks); // GET /api/tasks/:userId/carried
router.patch('/:id/toggle', taskController.toggleTaskStatus); // PATCH /api/tasks/:id/toggle
router.patch('/:id', taskController.updateTask); // PATCH /api/tasks/:id
router.delete('/:id', taskController.deleteTask); // DELETE /api/tasks/:id

module.exports = router;