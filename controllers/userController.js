// controllers/userController.js

const User = require('../models/UserModel');

// Function to get the list of all users
const getAllUsers = async (req, res, next) => {
  try {
    // Query the database to get all users with selected fields (userId, username, fullName)
    const users = await User.find({}, 'userId username fullName');

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Function to get user information by userId
const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    // Query the database to get user information by userId
    const user = await User.findById(userId, 'userId username fullName');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getUserById };
