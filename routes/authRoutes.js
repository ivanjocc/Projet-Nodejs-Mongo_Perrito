// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to handle user login
router.post('/login', authController.login);

module.exports = router;
