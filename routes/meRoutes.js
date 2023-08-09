// routes/meRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const meController = require('../controllers/meController');

// Route to get the current user's profile
router.get('/', authMiddleware, meController.getMyProfile);

// Route to update the current user's information
router.put('/', authMiddleware, meController.updateMyProfile);

// Route to delete the current user's account
router.delete('/', authMiddleware, meController.deleteMyAccount);

module.exports = router;
