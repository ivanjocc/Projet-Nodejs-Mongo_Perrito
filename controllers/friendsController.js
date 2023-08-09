// controllers/friendsController.js

const User = require('../models/UserModel');

// Function to get the list of friends
const getFriendsList = async (req, res, next) => {
  const userId = req.user.userId; // Extract userId from the authenticated user's token

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const friends = user.friends;
    res.status(200).json(friends);
  } catch (error) {
    next(error);
  }
};

// Function to add a friend to the user's friend list
const addFriend = async (req, res, next) => {
  const userId = req.user.userId; // Extract userId from the authenticated user's token
  const { friendId } = req.params;

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the friendId is already in the user's friend list
    if (user.friends.includes(friendId)) {
      return res.status(409).json({ message: 'Friend already added.' });
    }

    // Add the friendId to the user's friend list
    user.friends.push(friendId);
    await user.save();

    res.status(200).json({ message: 'Friend added successfully.' });
  } catch (error) {
    next(error);
  }
};

// Function to remove a friend from the user's friend list
const removeFriend = async (req, res, next) => {
  const userId = req.user.userId; // Extract userId from the authenticated user's token
  const { friendId } = req.params;

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the friendId is in the user's friend list
    if (!user.friends.includes(friendId)) {
      return res.status(409).json({ message: 'Friend not found in the list.' });
    }

    // Remove the friendId from the user's friend list
    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    await user.save();

    res.status(200).json({ message: 'Friend removed successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFriendsList, addFriend, removeFriend };
