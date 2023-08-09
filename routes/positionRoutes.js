// routes/positionRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const positionController = require('../controllers/positionController');

// Route to get positions of friends
router.get('/friends', authMiddleware, positionController.getFriendsPositions);

// Route to update the user's position
router.put('/', authMiddleware, positionController.updatePosition);

module.exports = router;
