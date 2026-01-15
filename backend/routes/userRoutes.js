const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to fetch user data and current streak using Clerk ID
router.get('/:clerkId', userController.getUserData);

module.exports = router;