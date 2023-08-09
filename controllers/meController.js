// controllers/meController.js

const User = require('../models/UserModel');

// Function to get the current user's profile
const getMyProfile = async (req, res, next) => {
  const userId = req.user.userId; // Extract userId from the authenticated user's token

  try {
    // Query the database to get the current user's profile
    const user = await User.findById(userId, 'userId username fullName email');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Function to update the current user's information
const updateMyProfile = async (req, res, next) => {
  const userId = req.user.userId; // Extract userId from the authenticated user's token
  const { username, email } = req.body;

  try {
    // Check if the new email is already used by another user
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(409).json({ message: 'Email is already used by another user.' });
    }

    // Update the user's information in the database
    const user = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true, select: 'userId username fullName email' }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Function to delete the current user's account
const deleteMyAccount = async (req, res, next) => {
  const userId = req.user.userId; // Extract userId from the authenticated user's token

  try {
    // Find the user by userId and delete the user's account from the database
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyProfile, updateMyProfile, deleteMyAccount };
