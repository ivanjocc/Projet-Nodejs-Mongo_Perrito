// routes/friendsRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const friendsController = require('../controllers/friendsController');

// Route to get the list of friends
router.get('/', authMiddleware, friendsController.getFriendsList);

// Route to add a friend to the user's friend list
router.post('/:friendId', authMiddleware, friendsController.addFriend);

// Route to remove a friend from the user's friend list
router.delete('/:friendId', authMiddleware, friendsController.removeFriend);

module.exports = router;
