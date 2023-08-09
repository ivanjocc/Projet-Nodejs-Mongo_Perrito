// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Route to get the list of all users (with selected fields)
router.get('/', authMiddleware, userController.getAllUsers);

// Route to get user information by userId
router.get('/:userId', authMiddleware, userController.getUserById);

module.exports = router;
